import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { LivePrice } from './LivePrice';
import type { DeliveryEstimate } from '@/types';

interface Action {
  label: string;
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface Props {
  total: number;
  estimate: DeliveryEstimate;
  primary: Action;
  secondary?: Action;
  note?: ReactNode;
}

/**
 * Sticky to the bottom of the screen on phones; docked at the bottom of the control
 * panel on larger screens. Always carries the price, the arrival estimate and one action.
 */
export function StickyActionBar({ total, estimate, primary, secondary, note }: Props) {
  const render = (a: Action, variant: 'primary' | 'secondary') =>
    a.to && !a.disabled ? (
      <Button to={a.to} variant={variant} size="lg" onClick={a.onClick}>
        {a.label}
      </Button>
    ) : (
      <Button variant={variant} size="lg" onClick={a.onClick} disabled={a.disabled}>
        {a.label}
      </Button>
    );
  return (
    <div className="action-bar">
      <LivePrice total={total} estimate={estimate} layout="inline" />
      {note && <p className="action-bar__note small muted">{note}</p>}
      <div className="action-bar__buttons">
        {secondary && render(secondary, 'secondary')}
        {render(primary, 'primary')}
      </div>
    </div>
  );
}
