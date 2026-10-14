import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Props {
  nextLabel: string;
  onNext: () => void;
  disabled?: boolean;
  onBack?: () => void;
  hint?: ReactNode;
  className?: string;
}

/** Sticky continue bar for steps that have no control dock (upload, message, recipient...). */
export function FlowFooter({ nextLabel, onNext, disabled, onBack, hint, className }: Props) {
  return (
    <div className={cn('flow-footer', className)}>
      <div className="flow-footer__inner container">
        {hint && <p className="flow-footer__hint small muted">{hint}</p>}
        <div className="flow-footer__buttons">
          {onBack && (
            <Button variant="secondary" size="lg" onClick={onBack} icon="arrow-left" aria-label="Back">
              Back
            </Button>
          )}
          <Button size="lg" onClick={onNext} disabled={disabled} iconRight="arrow-right">
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
