import { Container, Eyebrow, Reveal, Section } from '@/components/ui/Primitives';
import { FrameObject, type PreviewModel } from '@/components/product/ProductPreview';
import { scenePhoto } from '@/features/design-draft/previewModels';
import { defaultCrop } from '@/features/design-draft/recommend';

const photo = scenePhoto('family', 'landscape');
const make = (frameId: string, matId: string): PreviewModel => ({
  kind: 'single',
  photos: [photo],
  activePhotoId: photo.id,
  crop: defaultCrop(),
  sizeId: 'a4',
  orientation: 'landscape',
  frameId,
  matId,
  text: { value: '', style: 'serif' },
  collage: { layoutId: 'classic', slots: [] },
});

/** A real frame, magnified so only a corner shows: wood, mat bevel and print edge. */
function Corner({ frameId, matId, scale = 6, origin = 'tl' }: { frameId: string; matId: string; scale?: number; origin?: 'tl' | 'br' }) {
  return (
    <div className="closeup" aria-hidden="true">
      <div className={`closeup__inner closeup__inner--${origin}`} style={{ width: `${scale * 100}%` }}>
        <FrameObject model={make(frameId, matId)} />
      </div>
    </div>
  );
}

const PROOFS = [
  { title: 'High-quality printing', text: 'Colour-checked prints on archival paper, in the finish that suits the photograph.' },
  { title: 'Carefully selected materials', text: 'Solid wood and metal frames, acid-free mats, clear glazing.' },
  { title: 'Thoughtful framing', text: 'Each frame is assembled by hand and checked before it is packed.' },
  { title: 'Secure packaging', text: 'Rigid boxes with corner protection, made for a long journey.' },
  { title: 'Delivery support', text: 'Tracked orders, and a person to ask if anything is unclear.' },
];

/** 07 — Quality and trust. Craftsmanship shown up close, no invented statistics. */
export function Trust() {
  return (
    <Section tone="sunken" labelledBy="trust-title" id="quality">
      <Container>
        <div className="trust">
          <Reveal className="trust__copy">
            <Eyebrow>Craft</Eyebrow>
            <h2 id="trust-title" className="h1">
              Made properly, then wrapped carefully.
            </h2>
            <ul className="trust__list">
              {PROOFS.map((p) => (
                <li key={p.title} className="trust__item">
                  <h3 className="h3">{p.title}</h3>
                  <p className="small muted">{p.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="trust__visual" delay={100}>
            <div className="trust__closeups">
              <figure className="trust__shot trust__shot--tall">
                <Corner frameId="natural" matId="thin" scale={7} />
                <figcaption className="small">Frame edge</figcaption>
              </figure>
              <figure className="trust__shot">
                <Corner frameId="gallery" matId="wide" scale={5} origin="br" />
                <figcaption className="small">Mat and print</figcaption>
              </figure>
              <figure className="trust__shot">
                <div className="paper-close" aria-hidden="true">
                  <img src={photo.src} alt="" />
                  <i className="paper-close__fold" />
                </div>
                <figcaption className="small">Paper</figcaption>
              </figure>
              <figure className="trust__shot trust__shot--wide">
                <div className="pack" aria-hidden="true">
                  <div className="pack__box">
                    <i className="pack__tape" />
                    <span className="pack__label">Handle with care</span>
                  </div>
                  <i className="pack__tissue" />
                </div>
                <figcaption className="small">Packaging</figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
