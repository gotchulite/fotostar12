import { memo, type CSSProperties } from 'react';
import { layoutById } from '@/data/collageLayouts';
import { frameById, matById } from '@/data/catalog';
import { outerDimensions, printDimensions } from '@/features/pricing/pricing';
import { cn, formatDimensions } from '@/lib/utils';
import type { DesignDraft } from '@/types';
import { Icon } from '@/components/ui/Icon';
import { PhotoLayer } from './PhotoLayer';

/** The slice of a design draft needed to draw the physical product. */
export type PreviewModel = Pick<
  DesignDraft,
  'kind' | 'photos' | 'activePhotoId' | 'crop' | 'sizeId' | 'orientation' | 'frameId' | 'matId' | 'text' | 'collage'
>;

/** The print itself: one cropped photograph, or a collage sheet. Fills its container. */
export function PrintCanvas({ model }: { model: PreviewModel }) {
  const p = printDimensions(model);
  const boxAspect = p.w / p.h;

  if (model.kind === 'collage') {
    const layout = layoutById(model.collage.layoutId);
    return (
      <div className="pc pc--collage" style={{ background: layout.paper }}>
        {layout.slots.map((slot, i) => {
          const photo = model.photos.find((ph) => ph.id === model.collage.slots[i]);
          const style: CSSProperties = { left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.w}%`, height: `${slot.h}%` };
          return (
            <div key={i} className={cn('pc__slot', !photo && 'pc__slot--empty')} style={style}>
              {photo ? <img src={photo.src} alt="" draggable={false} /> : <Icon name="plus" size={16} />}
            </div>
          );
        })}
      </div>
    );
  }

  const photo = model.photos.find((ph) => ph.id === model.activePhotoId) ?? model.photos[0];
  return (
    <div className="pc">
      {photo ? (
        <PhotoLayer src={photo.src} photoAspect={photo.width / photo.height} boxAspect={boxAspect} crop={model.crop} />
      ) : (
        <div className="pc__empty">
          <Icon name="image" size={28} />
        </div>
      )}
      {model.text.value && <p className={cn('pc__caption', `pc__caption--${model.text.style}`)}>{model.text.value}</p>}
    </div>
  );
}

/** The framed object, drawn at true proportions. Width is set by the parent. */
export const FrameObject = memo(function FrameObject({ model }: { model: PreviewModel }) {
  const frame = model.frameId === 'none' ? undefined : frameById(model.frameId);
  const mat = matById(model.matId);
  const outer = outerDimensions(model);
  const fw = ((frame?.widthCm ?? 0) / outer.w) * 100; // cqw
  const mw = (mat.widthCm / outer.w) * 100; // cqw
  const style = {
    aspectRatio: `${outer.w} / ${outer.h}`,
    '--fw': `${fw}cqw`,
    '--mw': `${mw}cqw`,
    '--mat-color': mat.color,
  } as CSSProperties;
  return (
    <div className={cn('fo', `fo--${frame?.id ?? 'none'}`)} style={style}>
      <div className="fo__mat">
        <div className="fo__print">
          <PrintCanvas model={model} />
          <span className="fo__depth" aria-hidden="true" />
        </div>
      </div>
      <span className="fo__glass" aria-hidden="true" />
    </div>
  );
});

export type PreviewSetting = 'shelf' | 'sofa' | 'desk';

const ROOM_SCENES: Record<PreviewSetting, string> = {
  shelf: '/images/lifestyle/onthewall.jpg',
  sofa: '/images/lifestyle/abovethesofa.jpg',
  desk: '/images/lifestyle/ondesk.jpg',
};

interface PreviewProps {
  model: PreviewModel;
  /** "wall": the product in a room, to communicate scale. "object": the product alone. */
  variant?: 'wall' | 'object';
  /** Which room the "wall" variant draws. */
  setting?: PreviewSetting;
  /** Width / height of the wall scene. */
  sceneAspect?: number;
  /** When set, a second matching frame hangs beside the first (Aama & Buwa). */
  pair?: PreviewModel;
  showDimensions?: boolean;
  className?: string;
  /** Aspect ratio of the "object" stage, e.g. "4 / 5". */
  ratio?: string;
}

const PAIR_GAP_CM = 3;

/**
 * ProductPreview: the one component that draws the physical product everywhere
 * (editor, frame customizer, homepage demo, cart, send flow, order tracking).
 */
export function ProductPreview({
  model,
  variant = 'wall',
  setting = 'shelf',
  sceneAspect = 4 / 3,
  pair,
  showDimensions = false,
  className,
  ratio = '4 / 5',
}: PreviewProps) {
  const outer = outerDimensions(model);
  const print = printDimensions(model);

  if (variant === 'object') {
    const groupW = pair ? outer.w * 2 + PAIR_GAP_CM : outer.w;
    const r = groupW / outer.h;
    return (
      <figure className={cn('pv pv--object', className)} style={{ aspectRatio: ratio }}>
        <div className="pv__stage">
          <div className="pv__fit pv__pair" style={{ width: `min(86cqw, calc(86cqh * ${r}))`, gap: `${(PAIR_GAP_CM / groupW) * 100}%` }}>
            <div style={{ width: pair ? `${(outer.w / groupW) * 100}%` : '100%' }}>
              <FrameObject model={model} />
            </div>
            {pair && (
              <div style={{ width: `${(outer.w / groupW) * 100}%` }}>
                <FrameObject model={pair} />
              </div>
            )}
          </div>
        </div>
        {showDimensions && <figcaption className="pv__dims">{formatDimensions(outer.w, outer.h)}</figcaption>}
      </figure>
    );
  }

  // Use a consistent room width so larger selected prints appear proportionally larger.
  const groupCm = pair ? outer.w * 2 + PAIR_GAP_CM : outer.w;
  const standing = setting === 'desk';
  const sceneCm = setting === 'desk' ? 210 : setting === 'sofa' ? 300 : 260;
  const unit = 100 / sceneCm; // cqw per cm
  const frameW = groupCm * unit;
  const framePosition = setting === 'desk'
    ? { left: '75%', bottom: '22%' }
    : { left: '50%', top: setting === 'sofa' ? '42%' : '35%' };

  return (
    <figure className={cn('pv pv--wall pv--photo-scene', `pv--${setting}`, className)}>
      <div className="pv__scene" style={{ aspectRatio: `${sceneAspect}` }} aria-label={`Preview, ${formatDimensions(outer.w, outer.h)}`}>
        <img className="pv__room-photo" src={ROOM_SCENES[setting]} alt="" aria-hidden="true" draggable={false} />
        <div className="pv__light" />

        {standing ? (
          <div
            className="pv__stand pv__pair"
            style={{ width: `${frameW}cqw`, left: framePosition.left, bottom: framePosition.bottom, gap: `${(PAIR_GAP_CM / groupCm) * 100}%` }}
          >
            <div style={{ width: pair ? `${(outer.w / groupCm) * 100}%` : '100%' }}>
              <FrameObject model={model} />
            </div>
            {pair && (
              <div style={{ width: `${(outer.w / groupCm) * 100}%` }}>
                <FrameObject model={pair} />
              </div>
            )}
          </div>
        ) : (
          <div
            className="pv__frame pv__pair"
            style={{ width: `${frameW}cqw`, left: framePosition.left, top: framePosition.top, gap: `${(PAIR_GAP_CM / groupCm) * 100}%` }}
          >
            <div style={{ width: pair ? `${(outer.w / groupCm) * 100}%` : '100%' }}>
              <FrameObject model={model} />
            </div>
            {pair && (
              <div style={{ width: `${(outer.w / groupCm) * 100}%` }}>
                <FrameObject model={pair} />
              </div>
            )}
          </div>
        )}
      </div>
      {showDimensions && (
        <figcaption className="pv__dims">
          <span>Outer {formatDimensions(outer.w, outer.h)}</span>
          <span className="pv__dims-sep">·</span>
          <span>Print {formatDimensions(print.w, print.h)}</span>
        </figcaption>
      )}
    </figure>
  );
}
