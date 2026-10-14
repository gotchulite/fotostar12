import { Button } from '@/components/ui/Button';
import { Container, Reveal, Section } from '@/components/ui/Primitives';
import { useDraft } from '@/features/design-draft/store';
import { useLocale } from '@/hooks/useLocale';

/** 08 — End quietly and confidently. */
export function FinalCta() {
  const { t } = useLocale();
  const { start } = useDraft();
  return (
    <Section labelledBy="final-title" className="final">
      <Container narrow>
        <Reveal className="final__inner">
          <h2 id="final-title" className="display final__title">
            {t('final.title')}
          </h2>
          <div className="btn-row final__cta">
            <Button to="/create" size="lg" variant="accent" onClick={() => start('framed-print', 'self')}>
              {t('cta.create')}
            </Button>
            <Button to="/send" size="md" variant="text">
              {t('cta.send')}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
