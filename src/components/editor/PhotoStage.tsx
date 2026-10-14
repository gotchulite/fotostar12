import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { PhotoLayer } from '@/components/product/PhotoLayer';
import { maxOffsets } from '@/lib/crop';
import { clamp, cn } from '@/lib/utils';
import type { CropState, Photo } from '@/types';

interface Props {
  photo: Photo | undefined;
  crop: CropState;
  /** Print width / height of the chosen size and orientation. */
  boxAspect: number;
  onCrop: (patch: Partial<CropState>) => void;
  label?: string;
  badge?: string;
  hint?: string;
}

/**
 * The large central stage. Drag to reposition, scroll or pinch to zoom. The area outside
 * the crop is shown dimmed so the customer sees what will be left out.
 */
export function PhotoStage({ photo, crop, boxAspect, onCrop, label, badge, hint }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; zoom: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const photoAspect = photo ? photo.width / photo.height : 1;

  const cropRef = useRef(crop);
  cropRef.current = crop;

  const apply = useCallback(
    (next: Partial<CropState>) => {
      onCrop(next);
    },
    [onCrop],
  );

  // Wheel zoom needs a non-passive listener so the page does not scroll underneath.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = clamp(cropRef.current.zoom * (e.deltaY < 0 ? 1.06 : 0.94), 1, 4);
      apply({ zoom: next });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [apply]);

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setDragging(true);
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), zoom: cropRef.current.zoom };
    }
  };

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev || !boxRef.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      apply({ zoom: clamp(pinch.current.zoom * (dist / pinch.current.dist), 1, 4) });
      return;
    }

    const rect = boxRef.current.getBoundingClientRect();
    const c = cropRef.current;
    const max = maxOffsets(c, photoAspect, boxAspect);
    apply({
      ox: clamp(c.ox + (e.clientX - prev.x) / rect.width, -max.x, max.x),
      oy: clamp(c.oy + (e.clientY - prev.y) / rect.height, -max.y, max.y),
    });
  };

  const onUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) setDragging(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = 0.02;
    const c = cropRef.current;
    const max = maxOffsets(c, photoAspect, boxAspect);
    if (e.key === 'ArrowLeft') apply({ ox: clamp(c.ox - step, -max.x, max.x) });
    else if (e.key === 'ArrowRight') apply({ ox: clamp(c.ox + step, -max.x, max.x) });
    else if (e.key === 'ArrowUp') apply({ oy: clamp(c.oy - step, -max.y, max.y) });
    else if (e.key === 'ArrowDown') apply({ oy: clamp(c.oy + step, -max.y, max.y) });
    else if (e.key === '+' || e.key === '=') apply({ zoom: clamp(c.zoom + 0.1, 1, 4) });
    else if (e.key === '-') apply({ zoom: clamp(c.zoom - 0.1, 1, 4) });
    else return;
    e.preventDefault();
  };

  return (
    <div className="stage">
      <div className="stage__area">
        <div
          ref={boxRef}
          className={cn('stage__box', dragging && 'stage__box--dragging')}
          style={{ width: `min(88cqw, calc(88cqh * ${boxAspect}))`, aspectRatio: `${boxAspect}` }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          tabIndex={0}
          role="application"
          aria-label="Photo crop area. Drag to reposition, use plus and minus to zoom."
          onKeyDown={onKey}
        >
          {photo ? (
            <>
              <div className="stage__ghost">
                <PhotoLayer src={photo.src} photoAspect={photoAspect} boxAspect={boxAspect} crop={crop} />
              </div>
              <div className="stage__clip">
                <PhotoLayer src={photo.src} photoAspect={photoAspect} boxAspect={boxAspect} crop={crop} alt="Your photograph" />
              </div>
            </>
          ) : (
            <div className="stage__empty">Add a photograph to begin</div>
          )}
          <div className="stage__guides" aria-hidden="true">
            <i className="stage__corner stage__corner--tl" />
            <i className="stage__corner stage__corner--tr" />
            <i className="stage__corner stage__corner--bl" />
            <i className="stage__corner stage__corner--br" />
            <i className="stage__third stage__third--v1" />
            <i className="stage__third stage__third--v2" />
            <i className="stage__third stage__third--h1" />
            <i className="stage__third stage__third--h2" />
          </div>
        </div>
      </div>
      {(label || badge || hint) && (
        <div className="stage__caption">
          {label && <span className="num">{label}</span>}
          {badge && <span className="stage__badge">{badge}</span>}
          {hint && <span className="stage__hint">{hint}</span>}
        </div>
      )}
    </div>
  );
}
