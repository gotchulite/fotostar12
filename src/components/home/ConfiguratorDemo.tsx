import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container, Eyebrow, Reveal, Section } from '@/components/ui/Primitives';
import { OptionSwatch } from '@/components/editor/OptionSwatch';
import { FrameSwatch } from '@/components/product/FrameSwatch';
import { ProductPreview, type PreviewModel } from '@/components/product/ProductPreview';
import { AnimatedPrice } from '@/components/commerce/LivePrice';
import { FRAMES, sizeById, sizesForShape } from '@/data/catalog';
import { SAMPLE_PHOTOS } from '@/data/samplePhotos';
import { createDraft, useDraft } from '@/features/design-draft/store';
import { defaultCrop, photoOrientation } from '@/features/design-draft/recommend';
import { quoteDraft, outerDimensions } from '@/features/pricing/pricing';
import { useLocale } from '@/hooks/useLocale';
import { cn, formatDimensions } from '@/lib/utils';

const DEMO_PHOTOS = [SAMPLE_PHOTOS[0], SAMPLE_PHOTOS[2], SAMPLE_PHOTOS[1]];
const DEMO_SIZES = sizesForShape('iso');

/**
 * 03 — The homepage demonstrates the product. This is a miniature of the real tool, driven
 * by local state (it never touches the customer's own draft) but priced and rendered by the
 * same pricing and ProductPreview code.
 */
export function ConfiguratorDemo() {
  const { t } = useLocale();
  const { start } = useDraft();
  const [photoId, setPhotoId] = useState(DEMO_PHOTOS[0].id);
  const [frameId, setFrameId] = useState('black');
  const [sizeId, setSizeId] = useState('a4');
  const [matId, setMatId] = useState('thin');

  const photo = DEMO_PHOTOS.find((p) => p.id === photoId) ?? DEMO_PHOTOS[0];
  const orientation = photoOrientation(photo);

  const base = useMemo(() => createDraft('framed-print', 'self'), []);
  const model = useMemo<PreviewModel>(
    () => ({
      kind: 'single',
      photos: [photo],
      activePhotoId: photo.id,
      crop: defaultCrop(),
      sizeId,
      orientation,
      frameId,
      matId,
      text: { value: '', style: 'serif' },
      collage: { layoutId: 'classic', slots: [] },
    }),
    [photo, sizeId, orientation, frameId, matId],
  );
  const quote = useMemo(() => quoteDraft({ ...base, ...model }), [base, model]);
  const outer = outerDimensions(model);
  const size = sizeById(sizeId);

  return (
    <Section tone="sunken" labelledBy="demo-title" id="try">
      <Container>
        <Reveal className="section-head">
          <Eyebrow>Try it now</Eyebrow>
          <h2 id="demo-title" className="h1">
            See it before you order it.
          </h2>
          <p className="lede">Pick a frame and a size. The photograph, the price and the arrival estimate all update.</p>
        </Reveal>

        <div className="demo">
          <div className="demo__preview">
            <ProductPreview model={model} setting="shelf" />
            <p className="demo__dims small muted num">
              {size.label} · Outer {formatDimensions(outer.w, outer.h)}
            </p>
          </div>

          <div className="demo__panel">
            <div className="demo__group">
              <p className="demo__label">Photograph</p>
              <ul className="demo__photos">
                {DEMO_PHOTOS.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={cn('demo__photo', p.id === photoId && 'demo__photo--active')}
                      aria-label={p.name}
                      aria-pressed={p.id === photoId}
                      onClick={() => setPhotoId(p.id)}
                    >
                      <img src={p.src} alt="" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="demo__group">
              <p className="demo__label">Frame</p>
              <div className="swatch-grid swatch-grid--frames" role="radiogroup" aria-label="Frame">
                {FRAMES.map((f) => (
                  <OptionSwatch
                    key={f.id}
                    label={f.label}
                    selected={frameId === f.id}
                    onClick={() => {
                      setFrameId(f.id);
                      setMatId(f.suggestedMat);
                    }}
                  >
                    <FrameSwatch model={model} frameId={f.id} />
                  </OptionSwatch>
                ))}
              </div>
            </div>

            <div className="demo__group">
              <p className="demo__label">Size</p>
              <div className="chip-row" role="radiogroup" aria-label="Size">
                {DEMO_SIZES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={sizeId === s.id}
                    className={cn('chip', sizeId === s.id && 'chip--selected')}
                    onClick={() => setSizeId(s.id)}
                  >
                    {s.label}
                    <span className="chip__sub num"> {s.w} × {s.h}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="demo__summary">
              <div>
                <p className="demo__label">Price</p>
                <AnimatedPrice npr={quote.total} className="demo__price" />
              </div>
              <div>
                <p className="demo__label">Estimated arrival</p>
                <p className="demo__eta num">{quote.estimate.label}</p>
              </div>
            </div>

            <div className="btn-row">
              <Button to="/create" size="lg" variant="accent" onClick={() => start('framed-print', 'self')} iconRight="arrow-right">
                {t('cta.create')}
              </Button>
            </div>
            <p className="small muted">Indicative prices and timings update as you customise. The final total is confirmed before checkout.</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
