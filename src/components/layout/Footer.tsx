import { Link } from 'react-router-dom';
import { useLocale } from '@/hooks/useLocale';
import { Logo } from './Logo';

export function Footer() {
  const { locale, setLocale } = useLocale();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo />
          <p className="small muted footer__blurb">Printing and framing, made for the photographs that matter.</p>
        </div>
        <nav aria-label="Products" className="footer__col">
          <h2 className="eyebrow">Products</h2>
          <Link to="/products?type=framed">Framed photographs</Link>
          <Link to="/products?type=collages">Collages</Link>
          <Link to="/products?type=memory">Memory products</Link>
          <Link to="/products?type=albums">Albums</Link>
        </nav>
        <nav aria-label="Services" className="footer__col">
          <h2 className="eyebrow">Services</h2>
          <Link to="/send">Send a Memory Home</Link>
          <Link to="/services">Restoration and ID photos</Link>
          <Link to="/future">Studio services</Link>
        </nav>
        <nav aria-label="Help" className="footer__col">
          <h2 className="eyebrow">Help</h2>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/track">Track an order</Link>
          <Link to="/account">Saved designs</Link>
        </nav>
        <div className="footer__col">
          <h2 className="eyebrow">Studio</h2>
          <p className="small muted">Studio address and contact details are available on request.</p>
          <button
            type="button"
            className="footer__lang small"
            onClick={() => setLocale(locale === 'en' ? 'ne' : 'en')}
            lang={locale === 'en' ? 'ne' : 'en'}
          >
            {locale === 'en' ? 'नेपालीमा हेर्नुहोस्' : 'View in English'}
          </button>
        </div>
      </div>
      <div className="container footer__legal small muted">
        <span>© FotoStar Nepal. Thoughtful printing and framing for the memories that matter.</span>
        <span>Prices shown in NPR.</span>
      </div>
    </footer>
  );
}
