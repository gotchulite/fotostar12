import { useAnimatedNumber } from '@/hooks/useMotion';
import { formatMoney, type CurrencyCode } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { DeliveryEstimate } from '@/types';

/** Price that ticks to its new value, so changes are noticed without being loud. */
export function AnimatedPrice({ npr, currency = 'NPR', className }: { npr: number; currency?: CurrencyCode; className?: string }) {
  const v = useAnimatedNumber(npr);
  return (
    <span className={cn('num', className)} aria-live="polite">
      {formatMoney(Math.round(v), currency)}
    </span>
  );
}

interface Props {
  total: number;
  estimate: DeliveryEstimate;
  currency?: CurrencyCode;
  layout?: 'stacked' | 'inline';
  className?: string;
}

/** Price and estimated arrival, together, always. */
export function LivePrice({ total, estimate, currency = 'NPR', layout = 'stacked', className }: Props) {
  return (
    <div className={cn('live-price', `live-price--${layout}`, className)}>
      <div className="live-price__total">
        <span className="live-price__label">Total</span>
        <AnimatedPrice npr={total} currency={currency} className="live-price__value" />
      </div>
      <div className="live-price__eta">
        <span className="live-price__label">Estimated arrival</span>
        <span className="live-price__value-sm">{estimate.label}</span>
      </div>
    </div>
  );
}
