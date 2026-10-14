import { useState, type ReactNode } from 'react';
import { Icon, type IconName } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export interface DockTab {
  id: string;
  label: string;
  icon: IconName;
}

interface Props {
  tabs: DockTab[];
  active: string;
  onChange: (id: string) => void;
  children: ReactNode;
  /** Usually a <StickyActionBar/>. */
  footer?: ReactNode;
  className?: string;
}

/**
 * Secondary controls. A side panel on desktop; on phones a bottom sheet that keeps the
 * photograph visible and can be collapsed to a single row of tabs.
 */
export function ControlDock({ tabs, active, onChange, children, footer, className }: Props) {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className={cn('dock', expanded && 'dock--expanded', className)}>
      <button
        type="button"
        className="dock__handle"
        aria-label={expanded ? 'Collapse controls' : 'Expand controls'}
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        <span className="dock__grip" />
      </button>
      <div className="dock__tabs" role="tablist" aria-label="Controls">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            className={cn('dock__tab', active === t.id && 'dock__tab--active')}
            onClick={() => {
              onChange(t.id);
              setExpanded(true);
            }}
          >
            <Icon name={t.icon} size={18} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
      <div className="dock__panel" role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
        {children}
      </div>
      {footer && <div className="dock__footer">{footer}</div>}
    </aside>
  );
}
