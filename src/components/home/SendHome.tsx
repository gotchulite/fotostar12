import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container, Eyebrow, Reveal, Section } from '@/components/ui/Primitives';
import { ProductPreview, FrameObject, type PreviewModel } from '@/components/product/ProductPreview';
import { scenePhoto } from '@/features/design-draft/previewModels';
import { defaultCrop } from '@/features/design-draft/recommend';
import { useLocale } from '@/hooks/useLocale';

const JOURNEY = ['You', 'Create', 'We print', 'Nepal', 'Your family'];

const model: PreviewModel = (() => {
  const photo = scenePhoto('parents', 'landscape');
  return {
    kind: 'single',
    photos: [photo],
    activePhotoId: photo.id,
    crop: defaultCrop(),
    sizeId: 'c30',
    orientation: 'landscape',
    frameId: 'dark',
    matId: 'wide',
    text: { value: '', style: 'serif' },
    collage: { layoutId: 'classic', slots: [] },
  };
})();

/** 04 — Send a memory home. Phone abroad on the left, the finished frame in a family home on the right. */
export function SendHome() {
  const { t } = useLocale();
  return (
    <Section tone="ink" labelledBy="send-title" id="send">
      <Container>
        <div className="sendhome">
          <Reveal className="sendhome__copy">
            <Eyebrow>For families apart</Eyebrow>
            <h2 id="send-title" className="display sendhome__title">
              {t('send.title')}
            </h2>
            <p className="lede">{t('send.sub')}</p>
            <div className="btn-row">
              <Button to="/send" variant="inverse" size="lg" iconRight="arrow-right">
                {t('cta.send')}
              </Button>
            </div>
            <ul className="sendhome__trust">
              <li>
                <Icon name="truck" size={18} />
                Tracked delivery
              </li>
              <li>
                <Icon name="box" size={18} />
                Carefully packaged
              </li>
              <li>
                <Icon name="heart" size={18} />
                Made in Nepal
              </li>
            </ul>
          </Reveal>

          <Reveal className="sendhome__visual" delay={120}>
            <div className="sendhome__abroad" aria-hidden="true">
              <div className="phone phone--small">
                <i className="phone__notch" />
                <div className="phone__screen phone__screen--ui">
                  <div className="mini-ui">
                    <div className="mini-ui__top">
                      <span>To your family</span>
                    </div>
                    <div className="mini-ui__stage">
                      <div className="mini-ui__frame">
                        <FrameObject model={model} />
                      </div>
                    </div>
                    <div className="mini-ui__msg">Happy birthday, Aama. Missing you from Sydney.</div>
                    <div className="mini-ui__btn">Continue</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sendhome__arrow" aria-hidden="true">
              <Icon name="arrow-right" size={28} />
            </div>
            <div className="sendhome__home">
              <ProductPreview model={model} setting="sofa" sceneAspect={4 / 5} />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <ol className="journey" aria-label="How it travels">
            {JOURNEY.map((j, i) => (
              <li key={j} className="journey__step">
                <span className="journey__dot" aria-hidden="true" />
                <span className="journey__label">{j}</span>
                {i < JOURNEY.length - 1 && <span className="journey__line" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
