'use client';

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { getProjectsUsing, getSkill } from '@/data/skills';
import { useIsClient } from '@/lib/useIsClient';

const OPEN_EVENT = 'itsken:skill-popover-open';
const GAP = 10; // space between trigger and tooltip
const EDGE_PADDING = 16; // min distance from the screen edges

type Position = { top: number; left: number; placement: 'top' | 'bottom' };
type OpenSource = 'mouse' | 'tap';

type SkillPopoverProps = {
  /** Skill or tag name, e.g. "Next.js" */
  name: string;
  /** Optional project-specific text (overrides the general description) */
  note?: string;
  /** When opened from a project, hide that project from "used in" */
  excludeProject?: string;
  className?: string;
  buttonClassName?: string;
  children: React.ReactNode;
};

export default function SkillPopover({
  name,
  note,
  excludeProject,
  className = '',
  buttonClassName = '',
  children,
}: SkillPopoverProps) {
  const id = useId();
  const tooltipId = `${id}-tooltip`;

  const mounted = useIsClient();
  const [open, setOpen] = useState(false);
  const [openedBy, setOpenedBy] = useState<OpenSource>('mouse');
  const [position, setPosition] = useState<Position | null>(null);

  const triggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastPointerType = useRef<string>('');

  const skill = getSkill(name);
  const url = skill?.url;
  const description = note ?? skill?.description;
  const usedIn = getProjectsUsing(name).filter((title) => title !== excludeProject);

  const show = useCallback((source: OpenSource) => {
    setOpenedBy(source);
    setOpen(true);
  }, []);

  const hide = useCallback(() => setOpen(false), []);

  // Only one tooltip open at a time
  useEffect(() => {
    if (!open) return;
    window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }));
  }, [open, id]);

  useEffect(() => {
    const onOtherOpen = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id) setOpen(false);
    };

    window.addEventListener(OPEN_EVENT, onOtherOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOtherOpen);
  }, [id]);

  // Close on scroll, resize, Escape, or a tap/click outside the trigger
  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      close();
    };

    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('resize', close);
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  // Position under the trigger (or above if there's no room), inside the viewport
  useLayoutEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;

    const t = trigger.getBoundingClientRect();
    const p = panel.getBoundingClientRect();

    const left = Math.max(
      EDGE_PADDING,
      Math.min(t.left, window.innerWidth - p.width - EDGE_PADDING)
    );

    const fitsBelow = t.bottom + GAP + p.height <= window.innerHeight - EDGE_PADDING;
    const top = fitsBelow ? t.bottom + GAP : t.top - GAP - p.height;

    setPosition({ top, left, placement: fitsBelow ? 'bottom' : 'top' });
  }, [open]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const fromMouse = lastPointerType.current === 'mouse';
    lastPointerType.current = '';

    // Mouse: the tooltip is already showing from hover, the link just opens.
    if (fromMouse) return;

    // Touch / keyboard: first tap shows the details, second tap follows the link.
    if (!open) {
      e.preventDefault();
      show('tap');
      return;
    }

    if (!url) hide();
  };

  const triggerProps = {
    ref: (el: HTMLElement | null) => {
      triggerRef.current = el;
    },
    'aria-describedby': open ? tooltipId : undefined,
    'data-open': open ? '' : undefined,
    className: `focus:outline-none ${buttonClassName}`,
    onClick: handleClick,
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
      lastPointerType.current = e.pointerType;
    },
    onPointerEnter: (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === 'mouse') show('mouse');
    },
    onPointerLeave: (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === 'mouse') hide();
    },
  };

  const offsetY = position?.placement === 'top' ? -6 : 6;

  return (
    <div className={className}>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" {...triggerProps}>
          {children}
        </a>
      ) : (
        <button type="button" {...triggerProps}>
          {children}
        </button>
      )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                id={tooltipId}
                role="tooltip"
                initial={{ opacity: 0, y: offsetY }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: offsetY }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                style={
                  position
                    ? { top: position.top, left: position.left }
                    : { top: 0, left: 0, visibility: 'hidden' }
                }
                className="pointer-events-none fixed z-[60] w-[min(20rem,calc(100vw-2rem))] rounded border border-[#EF8A76] bg-[#212844]/95 p-4 text-[#F0E8D5] shadow-xl backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-heading text-2xl uppercase leading-none">
                    {skill?.name ?? name}
                  </h4>

                  {skill?.category && (
                    <span className="shrink-0 rounded border border-[#EF8A76]/60 px-2 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-[#EF8A76]">
                      {skill.category}
                    </span>
                  )}
                </div>

                <p className="mt-3 font-body text-[13px] font-semibold leading-relaxed text-[#F0E8D5]/85">
                  {description ?? 'Details coming soon.'}
                </p>

                {usedIn.length > 0 && (
                  <div className="mt-4">
                    <p className="font-body text-[10px] font-black uppercase tracking-[0.18em] text-[#F0E8D5]/50">
                      {excludeProject ? 'Also used in' : 'Used in'}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {usedIn.map((title) => (
                        <span
                          key={title}
                          className="rounded bg-[#EF8A76]/15 px-2 py-1 font-body text-[11px] font-bold"
                        >
                          {title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {url && (
                  <p className="mt-4 font-body text-[11px] font-black uppercase tracking-[0.12em] text-[#EF8A76]">
                    {openedBy === 'mouse' ? 'Click to learn more ↗' : 'Tap again to learn more ↗'}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}