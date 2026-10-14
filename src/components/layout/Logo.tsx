import { Link } from 'react-router-dom';

/** Shared FotoStar brand mark. */
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="logo" aria-label="FotoStar Nepal, home" onClick={onClick}>
      <img src="/images/fotostarlogobad.jpeg" alt="FotoStar Nepal" className="logo__mark" />
    </Link>
  );
}
