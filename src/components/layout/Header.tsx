import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { PRODUCTS, PRODUCT_CATEGORIES } from '@/data/products';
import { useDraft } from '@/features/design-draft/store';
import { useCart } from '@/features/cart/store';
import { useLocale } from '@/hooks/useLocale';
import { useScrolled } from '@/hooks/useMotion';
import { sceneSrc } from '@/lib/sceneArt';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';
import { MobileDrawer } from './MobileDrawer';

type Panel = 'products' | 'services' | null;

const SERVICE_LINKS = [
  { to: '/services#restoration', title: 'Photo restoration', text: 'Repair old and damaged photographs', scene: 'grandparents' as const },
  { to: '/services#passport', title: 'Passport and ID photos', text: 'Correct size, ready quickly', scene: 'portrait' as const },
  { to: '/services#events', title: 'Event and professional printing', text: 'Large runs, careful colour', scene: 'festival' as const },
  { to: '/services#albums', title: 'Albums', text: 'Lay-flat books for big occasions', scene: 'travel' as const },
];

export function Header({ overlay = false }: { overlay?: boolean }) {
  const scrolled = useScrolled(24);
  const { t } = useLocale();
  const { count } = useCart();
  const { start } = useDraft();
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setPanel(null);
  }, [location.pathname]);

  const solid = !overlay || scrolled || !!panel;
  const featured = ['framed-print', 'collage', 'aama-and-buwa', 'album']
    .map((s) => PRODUCTS.find((p) => p.slug === s)!)
    .filter(Boolean);

  return (
    <>
      <header
        className={cn('header', solid ? 'header--solid' : 'header--clear', panel && 'header--open')}
        onMouseLeave={() => setPanel(null)}
      >
        <div className="header__bar container">
          <Logo />

          <nav className="header__nav" aria-label="Primary">
            <NavLink to="/create" onClick={() => start('framed-print', 'self')} className="nav-link" onMouseEnter={() => setPanel(null)}>
              {t('nav.create')}
            </NavLink>
            <NavLink
              to="/products"
              className="nav-link"
              onMouseEnter={() => setPanel('products')}
              onFocus={() => setPanel('products')}
            >
              {t('nav.products')}
            </NavLink>
            <NavLink to="/send" className="nav-link" onMouseEnter={() => setPanel(null)}>
              {t('nav.send')}
            </NavLink>
            <NavLink
              to="/services"
              className="nav-link"
              onMouseEnter={() => setPanel('services')}
              onFocus={() => setPanel('services')}
            >
              {t('nav.services')}
            </NavLink>
            <NavLink to="/how-it-works" className="nav-link" onMouseEnter={() => setPanel(null)}>
              {t('nav.how')}
            </NavLink>
          </nav>

          <div className="header__actions">
            <Link to="/cart" className="header__icon" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
              <Icon name="cart" />
              {count > 0 && <span className="header__badge">{count}</span>}
            </Link>
            <Link to="/account" className="header__icon header__icon--desktop" aria-label="Account and saved designs">
              <Icon name="user" />
            </Link>
            <Button
              to="/create"
              size="sm"
              variant="accent"
              className="header__cta"
              onClick={() => start('framed-print', 'self')}
            >
              {t('cta.create')}
            </Button>
            <button
              type="button"
              className="header__icon header__menu"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>

        {panel && (
          <div className="mega" onMouseEnter={() => setPanel(panel)}>
            <div className="container mega__inner">
              {panel === 'products' ? (
                <>
                  <div className="mega__tiles">
                    {featured.map((p) => (
                      <Link key={p.slug} to={`/products/${p.slug}`} className="mega__tile">
                        <img src={sceneSrc(p.scene)} alt="" loading="lazy" />
                        <span className="mega__tile-name">{p.name}</span>
                        <span className="mega__tile-text small muted">{p.tagline}</span>
                      </Link>
                    ))}
                  </div>
                  <ul className="mega__list">
                    <li className="eyebrow">Browse</li>
                    {PRODUCT_CATEGORIES.map((c) => (
                      <li key={c.id}>
                        <Link to={`/products?type=${c.id}`}>{c.label}</Link>
                      </li>
                    ))}
                    <li>
                      <Link to="/products" className="mega__all">
                        View all products
                      </Link>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <div className="mega__tiles">
                    {SERVICE_LINKS.map((s) => (
                      <Link key={s.to} to={s.to} className="mega__tile">
                        <img src={sceneSrc(s.scene)} alt="" loading="lazy" />
                        <span className="mega__tile-name">{s.title}</span>
                        <span className="mega__tile-text small muted">{s.text}</span>
                      </Link>
                    ))}
                  </div>
                  <ul className="mega__list">
                    <li className="eyebrow">Coming next</li>
                    <li>
                      <Link to="/future">Family Memory Vault</Link>
                    </li>
                    <li>
                      <Link to="/future">AI Memory Designer</Link>
                    </li>
                    <li>
                      <Link to="/future">Wall Preview</Link>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </header>
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
