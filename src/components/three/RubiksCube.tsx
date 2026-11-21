'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Axis = 'x' | 'y' | 'z';
type Layer = -1 | 0 | 1;
type Dir = 1 | -1;
type Turns = 1 | 2;
type Move = { axis: Axis; layer: Layer; dir: Dir; turns: Turns };

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

const FACE_MOVES: Record<string, { axis: Axis; layer: Layer; dir: Dir }> = {
  R: { axis: 'x', layer: 1, dir: -1 },
  L: { axis: 'x', layer: -1, dir: 1 },
  U: { axis: 'y', layer: 1, dir: -1 },
  D: { axis: 'y', layer: -1, dir: 1 },
  F: { axis: 'z', layer: 1, dir: -1 },
  B: { axis: 'z', layer: -1, dir: 1 },
};

const ORIENTATION: Record<string, string> = {
  U: 'D',
  D: 'U',
  F: 'B',
  B: 'F',
  R: 'R',
  L: 'L',
};

function parseAlg(alg: string): Move[] {
  return alg
    .trim()
    .split(/\s+/)
    .map((token) => {
      const base = FACE_MOVES[ORIENTATION[token[0]]];
      if (!base) throw new Error(`Unknown move in algorithm: "${token}"`);

      const turns: Turns = token.includes('2') ? 2 : 1;
      const prime = token.includes("'");

      return {
        ...base,
        dir: (prime ? -base.dir : base.dir) as Dir,
        turns,
      };
    });
}

/* ================= Move helpers ================= */

function invertMoves(moves: Move[]): Move[] {
  return [...moves]
    .reverse()
    .map((m) => ({ ...m, dir: (m.dir === 1 ? -1 : 1) as Dir }));
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

function rotateVecByMove(v: THREE.Vector3, move: Move) {
  for (let i = 0; i < move.turns; i++) rotateVec90(v, move.axis, move.dir);
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
  return new THREE.Quaternion().setFromUnitVectors(z, n.clone().normalize());
}

/* ================= The algorithm =================- */

const SOLVE_ALG = "R U R' F' R U R' U' R' F R2 U' R'"; // Jb perm
const SOLVE_MOVES = parseAlg(SOLVE_ALG);
const START_STATE = invertMoves(SOLVE_MOVES);

// Half turns (R2) get a bit more time than quarter turns
const HALF_TURN_WEIGHT = 1.6;
const MOVE_WEIGHTS = SOLVE_MOVES.map((m) => (m.turns === 2 ? HALF_TURN_WEIGHT : 1));
const MOVE_STARTS: number[] = [];
let TIMELINE_LENGTH = 0;
for (const w of MOVE_WEIGHTS) {
  MOVE_STARTS.push(TIMELINE_LENGTH);
  TIMELINE_LENGTH += w;
}

/* ================= Main component ================= */

export default function RubiksCube({ t }: { t: number }) {
  const mainRef = useRef<THREE.Group>(null);
  const pivotRef = useRef<THREE.Group>(null);

  const SPACING = 1.0; // grid spacing
  const FACE_OFFSET = 1.52; // how far stickers sit from center (slightly > 1.5)

  const stickersRef = useRef<Sticker[]>([]);
  const initializedRef = useRef(false);

  const totalMoves = SOLVE_MOVES.length;

  const timelineRef = useRef(0);
  const completedRef = useRef(0);

  const activeRef = useRef<{
    move: Move;
    stickers: Sticker[];
  } | null>(null);

  const stickerDefs = useMemo(() => {
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

          defs.push({ id: `${face}:${a},${b}`, coord, normal, color });
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
    const c = s.coord;
    const n = s.normal;

    const pos = new THREE.Vector3(c.x * SPACING, c.y * SPACING, c.z * SPACING);
    pos.add(n.clone().multiplyScalar(FACE_OFFSET - 1.0)); // push to surface

    s.group.position.copy(pos);
    s.group.quaternion.copy(normalToQuat(n));
  };

  const applyMoveInstant = (move: Move) => {
    for (const s of stickersRef.current) {
      if (!isInLayer(s, move.axis, move.layer)) continue;
      rotateVecByMove(s.coord, move);
      rotateVecByMove(s.normal, move);
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

  const setPivotAngle = (move: Move, angle: number) => {
    const pivot = pivotRef.current;
    if (!pivot) return;

    pivot.rotation.set(0, 0, 0);
    if (move.axis === 'x') pivot.rotation.x = angle;
    if (move.axis === 'y') pivot.rotation.y = angle;
    if (move.axis === 'z') pivot.rotation.z = angle;
  };

  const finishMove = () => {
    const active = activeRef.current;
    const main = mainRef.current;
    const pivot = pivotRef.current;
    if (!active || !main || !pivot) return;

    const { move } = active;

    // Snap to the exact final angle, then bake into logical coords
    setPivotAngle(move, move.dir * move.turns * (Math.PI / 2));

    active.stickers.forEach((s) => main.attach(s.group));

    active.stickers.forEach((s) => {
      rotateVecByMove(s.coord, move);
      rotateVecByMove(s.normal, move);
      positionSticker(s);
    });

    pivot.rotation.set(0, 0, 0);
    activeRef.current = null;
  };

  useEffect(() => {
    if (initializedRef.current) return;
    const main = mainRef.current;
    if (!main) return;

    const runtime: Sticker[] = [];
    const stickerGroups = main.children.filter(
      (c) => c.type === 'Group' && c.userData?.isSticker
    ) as THREE.Group[];

    for (const g of stickerGroups) {
      const coordArr = g.userData.coord as [number, number, number];
      const normalArr = g.userData.normal as [number, number, number];

      const s: Sticker = {
        id: String(g.userData.id),
        coord: new THREE.Vector3(...coordArr),
        normal: new THREE.Vector3(...normalArr),
        group: g,
      };

      positionSticker(s);
      runtime.push(s);
    }

    stickersRef.current = runtime;

    // Put the cube into the Jb case instantly
    for (const m of START_STATE) applyMoveInstant(m);

    main.rotation.x = Math.PI;

    initializedRef.current = true;
  }, []);

  useFrame((_, delta) => {
    const main = mainRef.current;
    const pivot = pivotRef.current;
    if (!main || !pivot) return;
    if (!initializedRef.current) return;

    const p = THREE.MathUtils.clamp(t, 0, 1);
    const target = p * TIMELINE_LENGTH;

    // Smooth chase so progress jumps don't stutter turns
    const CHASE = 7.0;
    timelineRef.current = THREE.MathUtils.lerp(
      timelineRef.current,
      target,
      1 - Math.exp(-CHASE * delta)
    );

    const T = timelineRef.current;

    // Complete every move whose end we've (practically) passed
    while (
      completedRef.current < totalMoves &&
      T >= MOVE_STARTS[completedRef.current] + MOVE_WEIGHTS[completedRef.current] - 0.02
    ) {
      if (activeRef.current) {
        finishMove();
      } else {
        applyMoveInstant(SOLVE_MOVES[completedRef.current]);
      }
      completedRef.current += 1;
    }

    main.rotation.y -= delta * 0.45;

    // Animate the current move
    if (completedRef.current < totalMoves) {
      const i = completedRef.current;
      const move = SOLVE_MOVES[i];

      if (!activeRef.current) beginMove(move);
      if (!activeRef.current) return;

      const frac = THREE.MathUtils.clamp((T - MOVE_STARTS[i]) / MOVE_WEIGHTS[i], 0, 1);
      const angle = move.dir * move.turns * (Math.PI / 2) * easeInOutCubic(frac);

      setPivotAngle(move, angle);
    }
  });

  // Geometry sizes
  const TILE = 0.9; // sticker size
  const BORDER = 1; // border plane size (slightly larger than tile)

  return (
    <group position={[0, -0.15, 0]} scale={0.5}>
      <group ref={mainRef}>
        {/* Core cube to hide interior */}
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
            <mesh material={borderMat} renderOrder={1}>
              <planeGeometry args={[BORDER, BORDER]} />
            </mesh>

            <mesh material={stickerMat(d.color)} position={[0, 0, 0.001]} renderOrder={2}>
              <planeGeometry args={[TILE, TILE]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}