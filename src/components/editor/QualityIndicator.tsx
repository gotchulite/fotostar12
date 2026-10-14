import { QUALITY_COPY } from '@/features/design-draft/recommend';
import { cn } from '@/lib/utils';
import type { Quality } from '@/types';
import { Icon } from '@/components/ui/Icon';

interface Props {
  quality: Quality;
  /** Show only the label (for thumbnails). */
  compact?: boolean;
  extra?: string;
  className?: string;
}

/** Friendly sharpness guidance. Never exposes resolution numbers. */
export function QualityIndicator({ quality, compact, extra, className }: Props) {
  const copy = QUALITY_COPY[quality];
  return (
    <div className={cn('quality', `quality--${quality}`, compact && 'quality--compact', className)}>
      <span className="quality__icon" aria-hidden="true">
        <Icon name={quality === 'soft' ? 'alert' : 'check'} size={compact ? 12 : 14} />
      </span>
      <span className="quality__text">
        <span className="quality__title">{copy.title}</span>
        {!compact && <span className="quality__hint small muted">{extra ?? copy.hint}</span>}
      </span>
    </div>
  );
}
