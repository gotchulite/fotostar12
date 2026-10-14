import { Icon } from '@/components/ui/Icon';
import { Container, Eyebrow, Reveal, Section } from '@/components/ui/Primitives';
import { FrameObject, ProductPreview, type PreviewModel } from '@/components/product/ProductPreview';
import { scenePhoto } from '@/features/design-draft/previewModels';
import { defaultCrop } from '@/features/design-draft/recommend';

const photo = scenePhoto('festival', 'landscape');
const portrait = scenePhoto('wedding', 'portrait');

const baseModel: PreviewModel = {
  kind: 'single',
  photos: [portrait],
  activePhotoId: portrait.id,
  crop: defaultCrop(),
  sizeId: 'a4',
  orientation: 'portrait',
  frameId: 'black',
  matId: 'thin',
  text: { value: '', style: 'serif' },
  collage: { layoutId: 'classic', slots: [] },
};

function StepVisual({ n }: { n: number }) {
  switch (n) {
    case 0:
      return (
        <div className="hiw__tile hiw__tile--photo">
          <img src={photo.src} alt="" />
          <span className="hiw__badge">
            <Icon name="upload" size={16} />
          </span>
        </div>
      );
    case 1:
      return (
        <div className="hiw__tile hiw__tile--photo">
          <img src={photo.src} alt="" />
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
      );
    case 2:
      return (
        <div className="hiw__tile hiw__tile--object">
          <ProductPreview model={baseModel} variant="object" ratio="1 / 1" />
        </div>
      );
    case 3:
      return (
        <div className="hiw__tile hiw__tile--box" aria-hidden="true">
          <div className="box">
            <i className="box__tape" />
            <span className="box__label">Framed photograph</span>
          </div>
        </div>
      );
    default:
      return (
        <div className="hiw__tile hiw__tile--object">
          <ProductPreview model={{ ...baseModel, frameId: 'natural' }} setting="shelf" sceneAspect={1} />
        </div>
      );
  }
}

const STEPS = [
  { title: 'Upload', text: 'Choose photographs from your phone.' },
  { title: 'Customize', text: 'Crop, pick a size, choose a frame.' },
  { title: 'Preview', text: 'See the finished piece, with its price.' },
  { title: 'Order', text: 'Check out without creating an account.' },
  { title: 'Receive', text: 'Collect it, or have it delivered.' },
];

/** 06 — Five steps, one sentence each. */
export function HowItWorks({ heading = true }: { heading?: boolean }) {
  return (
    <Section labelledBy="how-title" id="how">
      <Container>
        {heading && (
          <Reveal className="section-head">
            <Eyebrow>How it works</Eyebrow>
            <h2 id="how-title" className="h1">
              Five simple steps.
            </h2>
          </Reveal>
        )}
        <ol className="hiw">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 70} className="hiw__step">
              <StepVisual n={i} />
              <p className="hiw__n num">0{i + 1}</p>
              <h3 className="h3">{s.title}</h3>
              <p className="small muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export { FrameObject };
