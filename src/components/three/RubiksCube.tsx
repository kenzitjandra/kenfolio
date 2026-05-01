'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Axis = 'x' | 'y' | 'z';
type Layer = -1 | 0 | 1;
type Dir = 1 | -1;
type Move = { axis: Axis; layer: Layer; dir: Dir };

type Sticker = {
  id: string;
  coord: THREE.Vector3; // integer grid position (-1..1). One axis is +/-1 (on the surface)
  normal: THREE.Vector3; // integer normal axis unit, e.g. (0,1,0)
  group: THREE.Group; // visual node
};

/* ================= Visual constants ================= */

const COLORS = {
  U: '#F3E6C8', // warm cream
  D: '#F2C86B', // soft golden yellow
  F: '#7BBF91', // softened green
  B: '#6F8FD6', // soft blue
  R: '#D96F6F', // muted coral red
  L: '#E89A5E', // warm soft orange
  BORDER: '#1A2138', // dark navy border
  CORE: '#232C49', // dark navy core
};

const stickerMatCache = new Map<string, THREE.MeshBasicMaterial>();
function stickerMat(hex: string) {
  if (!stickerMatCache.has(hex)) {
    stickerMatCache.set(
      hex,
      new THREE.MeshBasicMaterial({
        color: hex,
        side: THREE.DoubleSide,
        toneMapped: false,
      })
    );
  }
  return stickerMatCache.get(hex)!;
}

const borderMat = new THREE.MeshBasicMaterial({
  color: COLORS.BORDER,
  side: THREE.DoubleSide,
  toneMapped: false,
});

const coreMat = new THREE.MeshToonMaterial({
  color: COLORS.CORE,
});

/* ================= Move helpers ================= */

function invertMoves(moves: Move[]): Move[] {
  return [...moves].reverse().map((m) => ({ ...m, dir: (m.dir === 1 ? -1 : 1) as Dir }));
}

function rotateVec90(v: THREE.Vector3, axis: Axis, dir: Dir) {
  // rotates integer vector by 90° about axis (right-handed)
  const x = v.x,
    y = v.y,
    z = v.z;

  if (axis === 'x') {
    v.y = dir === 1 ? -z : z;
    v.z = dir === 1 ? y : -y;
  } else if (axis === 'y') {
    v.x = dir === 1 ? z : -z;
    v.z = dir === 1 ? -x : x;
  } else {
    v.x = dir === 1 ? -y : y;
    v.y = dir === 1 ? x : -x;
  }

  v.set(Math.round(v.x), Math.round(v.y), Math.round(v.z));
}

function isInLayer(s: Sticker, axis: Axis, layer: Layer) {
  if (axis === 'x') return s.coord.x === layer;
  if (axis === 'y') return s.coord.y === layer;
  return s.coord.z === layer;
}

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function normalToQuat(n: THREE.Vector3) {
  // plane default faces +Z; rotate it so +Z aligns with normal n
  const z = new THREE.Vector3(0, 0, 1);
  const q = new THREE.Quaternion().setFromUnitVectors(z, n.clone().normalize());
  return q;
}

/* ================= Predetermined scramble =================
   Edit this list to change your “starting scramble”.
   This is deterministic. Solve is automatically the inverse. */

const PRESET_SCRAMBLE: Move[] = [
  { axis: 'y', layer: 1, dir: 1 },  // U
  { axis: 'x', layer: 1, dir: 1 },  // R
  { axis: 'y', layer: 1, dir: -1 }, // U'
  { axis: 'x', layer: 1, dir: -1 }, // R'
  { axis: 'z', layer: 1, dir: 1 },  // F
  { axis: 'y', layer: 0, dir: -1 }, // E'
  { axis: 'x', layer: -1, dir: 1 }, // L
  { axis: 'z', layer: -1, dir: -1 },// B'
  { axis: 'y', layer: -1, dir: 1 }, // D
  { axis: 'x', layer: 0, dir: 1 },  // M (x middle)
  { axis: 'z', layer: 0, dir: -1 }, // S'
  { axis: 'y', layer: 1, dir: 1 },  // U
  { axis: 'z', layer: 1, dir: -1 }, // F'
  { axis: 'x', layer: 1, dir: 1 },  // R
  { axis: 'y', layer: -1, dir: -1 },// D'
];

/* ================= Main component ================= */

export default function RubiksCube({ t }: { t: number }) {
  const mainRef = useRef<THREE.Group>(null);
  const pivotRef = useRef<THREE.Group>(null);

  // tighter = less chance seeing inside
  const SPACING = 1.0; // grid spacing
  const FACE_OFFSET = 1.52; // how far stickers sit from center (slightly > 1.5)

  const stickersRef = useRef<Sticker[]>([]);
  const initializedRef = useRef(false);

  const solveMoves = useMemo(() => invertMoves(PRESET_SCRAMBLE), []);
  const totalMoves = solveMoves.length;

  const timelineRef = useRef(0);
  const completedRef = useRef(0);

  const activeRef = useRef<{
    move: Move;
    stickers: Sticker[];
  } | null>(null);

  const stickerDefs = useMemo(() => {
    // 54 stickers in solved state:
    // For each face, 3x3 with fixed normal.
    const defs: Array<{
      id: string;
      coord: [number, number, number];
      normal: [number, number, number];
      color: string;
    }> = [];

    const addFace = (face: 'U' | 'D' | 'F' | 'B' | 'R' | 'L') => {
      const color = COLORS[face];
      for (let a = -1; a <= 1; a++) {
        for (let b = -1; b <= 1; b++) {
          let coord: [number, number, number];
          let normal: [number, number, number];

          if (face === 'U') {
            coord = [a, 1, b];
            normal = [0, 1, 0];
          } else if (face === 'D') {
            coord = [a, -1, b];
            normal = [0, -1, 0];
          } else if (face === 'F') {
            coord = [a, b, 1];
            normal = [0, 0, 1];
          } else if (face === 'B') {
            coord = [a, b, -1];
            normal = [0, 0, -1];
          } else if (face === 'R') {
            coord = [1, a, b];
            normal = [1, 0, 0];
          } else {
            coord = [-1, a, b];
            normal = [-1, 0, 0];
          }

          defs.push({
            id: `${face}:${a},${b}`,
            coord,
            normal,
            color,
          });
        }
      }
    };

    addFace('U');
    addFace('D');
    addFace('F');
    addFace('B');
    addFace('R');
    addFace('L');

    return defs;
  }, []);

  const positionSticker = (s: Sticker) => {
    // Snap to exact surface position based on coord + normal
    const c = s.coord;
    const n = s.normal;

    const pos = new THREE.Vector3(c.x * SPACING, c.y * SPACING, c.z * SPACING);
    pos.add(n.clone().multiplyScalar(FACE_OFFSET - 1.0)); // push to surface

    s.group.position.copy(pos);
    s.group.quaternion.copy(normalToQuat(n));
  };

  const applyMoveInstant = (move: Move) => {
    const list = stickersRef.current;
    for (const s of list) {
      if (!isInLayer(s, move.axis, move.layer)) continue;
      rotateVec90(s.coord, move.axis, move.dir);
      rotateVec90(s.normal, move.axis, move.dir);
      positionSticker(s);
    }
  };

  const beginMove = (move: Move) => {
    const main = mainRef.current;
    const pivot = pivotRef.current;
    if (!main || !pivot) return;

    pivot.rotation.set(0, 0, 0);
    pivot.position.set(0, 0, 0);

    const slice = stickersRef.current.filter((s) => isInLayer(s, move.axis, move.layer));
    slice.forEach((s) => pivot.attach(s.group));

    activeRef.current = { move, stickers: slice };
  };

  const finishMove = () => {
    const active = activeRef.current;
    const main = mainRef.current;
    const pivot = pivotRef.current;
    if (!active || !main || !pivot) return;

    // Snap pivot to exact 90° visually, then bake into logical coords
    const { move } = active;

    pivot.rotation.set(0, 0, 0);
    const snap = move.dir * (Math.PI / 2);
    if (move.axis === 'x') pivot.rotation.x = snap;
    if (move.axis === 'y') pivot.rotation.y = snap;
    if (move.axis === 'z') pivot.rotation.z = snap;

    // Reattach to main
    active.stickers.forEach((s) => main.attach(s.group));

    // Update logical coords + normals + snap transforms
    active.stickers.forEach((s) => {
      rotateVec90(s.coord, move.axis, move.dir);
      rotateVec90(s.normal, move.axis, move.dir);
      positionSticker(s);
    });

    pivot.rotation.set(0, 0, 0);
    activeRef.current = null;
  };

  useEffect(() => {
    if (initializedRef.current) return;
    const main = mainRef.current;
    if (!main) return;

    // Find the sticker groups we render and bind them to runtime Sticker objects
    const runtime: Sticker[] = [];
    const groups = main.children.filter((c) => (c as any).type === 'Group') as THREE.Group[];

    // First child is pivot group (we add it first), so skip any that aren't sticker
    const stickerGroups = groups.filter((g) => (g as any).userData?.isSticker);

    stickerGroups.sort((a, b) =>
      String((a as any).userData.id).localeCompare(String((b as any).userData.id))
    );

    for (const g of stickerGroups) {
      const id = String((g as any).userData.id);
      const coordArr = (g as any).userData.coord as [number, number, number];
      const normalArr = (g as any).userData.normal as [number, number, number];

      const s: Sticker = {
        id,
        coord: new THREE.Vector3(coordArr[0], coordArr[1], coordArr[2]),
        normal: new THREE.Vector3(normalArr[0], normalArr[1], normalArr[2]),
        group: g,
      };

      positionSticker(s);
      runtime.push(s);
    }

    stickersRef.current = runtime;

    // Apply predetermined scramble ONCE instantly
    for (const m of PRESET_SCRAMBLE) applyMoveInstant(m);

    initializedRef.current = true;
  }, []);

  useFrame((_, delta) => {
    const main = mainRef.current;
    const pivot = pivotRef.current;
    if (!main || !pivot) return;
    if (!initializedRef.current) return;

    const p = THREE.MathUtils.clamp(t, 0, 1);
    const targetTimeline = p * totalMoves;

    // Smooth chase so progress jumps don't stutter turns
    const CHASE = 7.0;
    timelineRef.current = THREE.MathUtils.lerp(
      timelineRef.current,
      targetTimeline,
      1 - Math.exp(-CHASE * delta)
    );

    const whole = Math.floor(timelineRef.current);
    const frac = THREE.MathUtils.clamp(timelineRef.current - whole, 0, 1);
    const eased = easeInOutCubic(frac);

    // Apply any completed moves we passed
    while (completedRef.current < whole) {
      if (activeRef.current) {
        finishMove();
        completedRef.current += 1;
      } else {
        applyMoveInstant(solveMoves[completedRef.current]);
        completedRef.current += 1;
      }
    }

    // Optional subtle global motion (comment out if you want completely static)
    main.rotation.y += delta * 0.6;
    main.rotation.x += delta * 0.2;

    // Animate current move slice
    if (completedRef.current < totalMoves) {
      const move = solveMoves[completedRef.current];

      if (!activeRef.current) beginMove(move);
      if (!activeRef.current) return;

      const angle = move.dir * (Math.PI / 2) * eased;

      pivot.rotation.set(0, 0, 0);
      if (move.axis === 'x') pivot.rotation.x = angle;
      if (move.axis === 'y') pivot.rotation.y = angle;
      if (move.axis === 'z') pivot.rotation.z = angle;

      if (frac > 0.999) {
        finishMove();
        completedRef.current += 1;
      }
    } else {
      if (activeRef.current) {
        finishMove();
        completedRef.current += 1;
      }
    }
  });

  // Geometry sizes
  const TILE = 0.9; // sticker size
  const BORDER = 1; // border plane size (slightly larger than tile)

  return (
    <group position={[0, -0.15, 0]} scale={0.5}>
      <group ref={mainRef}>
        {/* Core cube to hide interior (no gaps showing) */}
        <mesh>
          <boxGeometry args={[2.1, 2.1, 2.1]} />
          <primitive object={coreMat} attach="material" />
        </mesh>

        <group ref={pivotRef} />

        {/* Stickers */}
        {stickerDefs.map((d) => (
          <group
            key={d.id}
            userData={{
              isSticker: true,
              id: d.id,
              coord: d.coord,
              normal: d.normal,
            }}
          >
            {/* Border */}
            <mesh material={borderMat} renderOrder={1}>
              <planeGeometry args={[BORDER, BORDER]} />
            </mesh>

            {/* Colored tile */}
            <mesh material={stickerMat(d.color)} position={[0, 0, 0.001]} renderOrder={2}>
              <planeGeometry args={[TILE, TILE]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}