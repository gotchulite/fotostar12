import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Primitives';
import { ProductPreview, type PreviewModel } from '@/components/product/ProductPreview';
import { PhotoLayer } from '@/components/product/PhotoLayer';
import { useDraft } from '@/features/design-draft/store';
import { scenePhoto } from '@/features/design-draft/previewModels';
import { defaultCrop } from '@/features/design-draft/recommend';
import { useLocale } from '@/hooks/useLocale';
import { useReducedMotion } from '@/hooks/useMotion';
import { cn } from '@/lib/utils';

const STAGES = [
  { id: 0, label: 'On your phone' },
  { id: 1, label: 'Make it yours' },
  { id: 2, label: 'In your home' },
];

/**
 * The hero transformation: digital memory → customization → crafted object.
 * Plays once (about four seconds), then rests on the finished frame. The dots below let
 * anyone replay or jump to a stage. With reduced motion it simply shows the final state.
 */
function HeroTransformation() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(reduced ? 2 : 0);

  useEffect(() => {
    if (reduced) {
      setStage(2);
      return;
    }
    const t1 = setTimeout(() => setStage(1), 1700);
    const t2 = setTimeout(() => setStage(2), 3900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  const photo = useMemo(() => scenePhoto('family', 'landscape'), []);
  const model = useMemo<PreviewModel>(
    () => ({
      kind: 'single',
      photos: [photo],
      activePhotoId: photo.id,
      crop: defaultCrop(),
      sizeId: 'a3',
      orientation: 'landscape',
      frameId: 'natural',
      matId: 'thin',
      text: { value: '', style: 'serif' },
      collage: { layoutId: 'classic', slots: [] },
    }),
    [photo],
  );

  return (
    <div className={cn('ht', `ht--s${stage}`)}>
      <div className="ht__canvas">
        {/* Stage 0: phone */}
        <div className="ht__layer ht__phone-layer" aria-hidden={stage !== 0}>
          <div className="phone">
            <i className="phone__notch" />
            <div className="phone__screen">
              <img src={photo.src} alt="" />
              <div className="phone__ui">
                <span>Today</span>
                <span className="phone__dot" />
              </div>
            </div>
          </div>
          <p className="ht__note ht__note--phone">A photograph, waiting on a phone.</p>
        </div>

        {/* Stage 1: customization */}
        <div className="ht__layer ht__editor-layer" aria-hidden={stage !== 1}>
          <div className="ht__crop">
            <div className="ht__crop-box">
              <div className="ht__crop-ghost">
                <PhotoLayer src={photo.src} photoAspect={photo.width / photo.height} boxAspect={4 / 3} crop={{ ...defaultCrop(), zoom: 1.12, ox: 0.02 }} />
              </div>
              <div className="ht__crop-clip">
                <PhotoLayer src={photo.src} photoAspect={photo.width / photo.height} boxAspect={4 / 3} crop={defaultCrop()} />
              </div>
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
            <div className="ht__chips">
              <span className="ht__chip">A3</span>
              <span className="ht__chip">Natural wood</span>
              <span className="ht__chip">Thin mat</span>
            </div>
          </div>
        </div>

        {/* Stage 2: the object */}
        <div className="ht__layer ht__object-layer" aria-hidden={stage !== 2}>
          <ProductPreview model={model} setting="shelf" sceneAspect={5 / 4} />
        </div>
      </div>

      <div className="ht__steps" role="tablist" aria-label="From photograph to frame">
        {STAGES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={stage === s.id}
            className={cn('ht__step', stage === s.id && 'ht__step--active')}
            onClick={() => setStage(s.id)}
          >
            <span className="ht__step-n num">0{s.id + 1}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useLocale();
  const { start } = useDraft();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container className="hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title" className="display">
            {t('hero.title')}
          </h1>
          <p className="lede">{t('hero.sub')}</p>
          <div className="btn-row hero__cta">
            <Button to="/create" size="lg" variant="accent" onClick={() => start('framed-print', 'self')}>
              {t('cta.create')}
            </Button>
            <Button to="/send" size="md" variant="text">
              {t('cta.send')}
            </Button>
          </div>
          <p className="small muted hero__foot">
            Prints, frames and collages, made to order.{' '}
            <Link to="/how-it-works" className="hero__link">
              See how it works
            </Link>
          </p>
        </div>
        <div className="hero__visual">
          <HeroTransformation />
        </div>
      </Container>
    </section>
  );
}
