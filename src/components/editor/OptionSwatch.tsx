import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  label: string;
  hint?: string;
  meta?: string;
  selected?: boolean;
  recommended?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

/** A visual choice (frame sample, size outline, layout thumbnail) instead of a dropdown. */
export function OptionSwatch({ label, hint, meta, selected, recommended, onClick, children, className }: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={!!selected}
      className={cn('swatch', selected && 'swatch--selected', className)}
      onClick={onClick}
    >
      <span className="swatch__visual">{children}</span>
      <span className="swatch__label">{label}</span>
      {meta && <span className="swatch__meta num">{meta}</span>}
      {hint && <span className="swatch__hint small muted">{hint}</span>}
      {recommended && <span className="swatch__badge">Recommended</span>}
    </button>
  );
}
