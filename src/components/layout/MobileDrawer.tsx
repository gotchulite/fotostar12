import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { useDraft } from '@/features/design-draft/store';
import { useLocale } from '@/hooks/useLocale';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: Props) {
  const { t, locale, setLocale } = useLocale();
  const { start } = useDraft();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const links = [
    { to: '/create', label: t('nav.create'), onClick: () => start('framed-print', 'self') },
    { to: '/products', label: t('nav.products') },
    { to: '/send', label: t('nav.send') },
    { to: '/services', label: t('nav.services') },
    { to: '/how-it-works', label: t('nav.how') },
  ];

  return (
    <div className={cn('drawer', open && 'drawer--open')} aria-hidden={!open}>
      <div className="drawer__scrim" onClick={onClose} />
      <div className="drawer__panel" role="dialog" aria-modal="true" aria-label="Menu" tabIndex={-1} ref={panelRef}>
        <div className="drawer__top">
          <span className="eyebrow">Menu</span>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>

        <nav className="drawer__nav" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => { l.onClick?.(); onClose(); }} className="drawer__link">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="drawer__bottom">
          <Button to="/create" size="lg" variant="accent" block onClick={() => { start('framed-print', 'self'); onClose(); }}>
            {t('cta.create')}
          </Button>
          <Button to="/send" variant="secondary" size="lg" block onClick={onClose}>
            {t('cta.send')}
          </Button>
          <div className="drawer__meta">
            <Link to="/account" onClick={onClose} className="small muted">
              Saved designs
            </Link>
            <Link to="/track" onClick={onClose} className="small muted">
              Track an order
            </Link>
            <button
              type="button"
              className="small muted drawer__lang"
              onClick={() => setLocale(locale === 'en' ? 'ne' : 'en')}
            >
              {locale === 'en' ? 'नेपाली' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
