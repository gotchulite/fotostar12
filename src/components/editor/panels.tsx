import { FINISHES, SHAPES, finishById, sizeById, sizesForShape } from '@/data/catalog';
import { qualityFor, recommend } from '@/features/design-draft/recommend';
import { useDraft } from '@/features/design-draft/store';
import { cn, formatMoney } from '@/lib/utils';
import { OptionSwatch } from './OptionSwatch';
import { QualityIndicator } from './QualityIndicator';

/** Size choices, shared by the photo editor and the frame customizer. */
export function SizePanel() {
  const d = useDraft();
  const { draft, photo } = d;
  const rec = recommend(photo, draft);
  const sizes = sizesForShape(draft.shapeId);
  const current = sizeById(draft.sizeId);
  const quality = photo ? qualityFor(photo, current, draft.crop.zoom) : 'good';
  const recSize = sizeById(rec.sizeId);

  return (
    <div className="dock-section">
      <p className="small muted">
        {SHAPES.find((s) => s.id === draft.shapeId)?.label} sizes. Frame and mat add to the outer dimensions.
      </p>
      <div className="swatch-grid swatch-grid--sizes" role="radiogroup" aria-label="Print size">
        {sizes.map((s) => {
          const q = photo ? qualityFor(photo, s, draft.crop.zoom) : 'good';
          const ar = s.w / s.h;
          return (
            <OptionSwatch
              key={s.id}
              label={s.label}
              meta={`${s.w} × ${s.h} cm`}
              hint={`Print ${formatMoney(s.printPrice)}`}
              selected={draft.sizeId === s.id}
              recommended={rec.sizeId === s.id}
              onClick={() => d.setSize(s.id)}
            >
              <span className="size-outline">
                <span
                  className={cn('size-outline__rect', `size-outline__rect--${q}`)}
                  style={{ aspectRatio: `${ar}`, [ar >= 1 ? 'width' : 'height']: '78%' }}
                />
              </span>
            </OptionSwatch>
          );
        })}
      </div>
      {quality === 'soft' && <QualityIndicator quality="soft" extra={`Try ${recSize.label} for a sharper print.`} />}
    </div>
  );
}

/** Paper finish, shared by the photo editor and the frame customizer. */
export function FinishPanel() {
  const d = useDraft();
  const { draft } = d;
  return (
    <div className="dock-section">
      <ul className="radio-list" role="radiogroup" aria-label="Paper finish">
        {FINISHES.map((f) => (
          <li key={f.id}>
            <button
              type="button"
              role="radio"
              aria-checked={draft.finishId === f.id}
              className={cn('radio-row', draft.finishId === f.id && 'radio-row--selected')}
              onClick={() => d.setFinish(f.id)}
            >
              <span className="radio-row__dot" aria-hidden="true" />
              <span className="radio-row__text">
                <span className="radio-row__title">{f.label}</span>
                <span className="small muted">{f.hint}</span>
              </span>
              {f.id === 'matte' && <span className="radio-row__badge">Recommended</span>}
            </button>
          </li>
        ))}
      </ul>
      <p className="small muted">Selected: {finishById(draft.finishId).label}. The price is included in your total.</p>
    </div>
  );
}
