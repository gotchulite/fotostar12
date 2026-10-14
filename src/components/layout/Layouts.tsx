import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useCart } from '@/features/cart/store';
import { useDraft } from '@/features/design-draft/store';
import { useFlow } from '@/features/design-draft/useFlow';
import { cn } from '@/lib/utils';
import { Footer } from './Footer';
import { Header } from './Header';
import { Logo } from './Logo';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/** Marketing and browsing pages: full header and footer. */
export function SiteLayout() {
  const { pathname } = useLocation();
  const overlay = pathname === '/';
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Header overlay={overlay} />
      <main id="main" className={cn('page', !overlay && 'has-offset')} key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

/** Creation, checkout and tracking: a quiet header so the customer stays focused. */
export function FocusLayout({ stepper = true }: { stepper?: boolean }) {
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <FocusHeader stepper={stepper} />
      <main id="main" className="page page--focus" key={pathname}>
        <Outlet />
      </main>
    </>
  );
}

function FocusHeader({ stepper }: { stepper: boolean }) {
  const { count } = useCart();
  const { draft } = useDraft();
  const { steps, current, groups, groupIndex, prev } = useFlow();
  const navigate = useNavigate();
  const isGift = draft.mode === 'gift';

  return (
    <header className="fheader">
      <div className="fheader__bar container">
        <div className="fheader__left">
          {stepper && prev ? (
            <button type="button" className="icon-btn" aria-label="Back" onClick={() => navigate(prev.path)}>
              <Icon name="arrow-left" />
            </button>
          ) : (
            <Link to="/" className="icon-btn" aria-label="Back to home">
              <Icon name="arrow-left" />
            </Link>
          )}
          <Logo />
        </div>

        {stepper && (
          <ol className="stepper" aria-label="Progress">
            {groups.map((g, i) => (
              <li
                key={g}
                className={cn('stepper__item', i < groupIndex && 'stepper__item--done', i === groupIndex && 'stepper__item--current')}
                aria-current={i === groupIndex ? 'step' : undefined}
              >
                <span className="stepper__n">{i + 1}</span>
                <span className="stepper__label">{g}</span>
              </li>
            ))}
          </ol>
        )}

        <div className="fheader__right">
          {isGift && stepper && <span className="fheader__tag eyebrow">Sending home</span>}
          <Link to="/cart" className="header__icon" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
            <Icon name="cart" />
            {count > 0 && <span className="header__badge">{count}</span>}
          </Link>
        </div>
      </div>
      {stepper && (
        <p className="fheader__mobile-step small" aria-hidden="true">
          Step {Math.min(groupIndex + 1, groups.length)} of {groups.length}
          <span> · {current.title}</span>
          <i className="fheader__progress" style={{ width: `${((steps.indexOf(current) + 1) / steps.length) * 100}%` }} />
        </p>
      )}
    </header>
  );
}
