import { ORDER_STAGES } from '@/data/orderStages';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface Props {
  /** Index of the current stage in ORDER_STAGES. */
  stage: number;
  compact?: boolean;
}

/** A calm vertical timeline in customer language. */
export function StatusTimeline({ stage, compact = false }: Props) {
  return (
    <ol className={cn('timeline', compact && 'timeline--compact')} aria-label="Order progress">
      {ORDER_STAGES.map((s, i) => {
        const state = i < stage ? 'done' : i === stage ? 'current' : 'todo';
        return (
          <li key={s.id} className={cn('timeline__item', `timeline__item--${state}`)} aria-current={state === 'current' ? 'step' : undefined}>
            <span className="timeline__dot" aria-hidden="true">
              {state === 'done' ? <Icon name="check" size={14} /> : null}
            </span>
            <div className="timeline__body">
              <p className="timeline__title">{s.title}</p>
              {!compact && state !== 'todo' && <p className="small muted">{state === 'done' ? s.done : s.message}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
