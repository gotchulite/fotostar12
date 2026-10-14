import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@/components/ui/Button';
import { Container, Eyebrow, Reveal, Section } from '@/components/ui/Primitives';
import { ProductTile } from '@/components/product/ProductTile';
import { PRODUCTS, RAIL_SLUGS } from '@/data/products';

/** 02 — What can you create? A swipeable rail, never a grid of service cards. */
export function ProductRailSection() {
  const railRef = useRef<HTMLUListElement>(null);
  const items = RAIL_SLUGS.map((s) => PRODUCTS.find((p) => p.slug === s)!).filter(Boolean);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <Section labelledBy="create-title" id="create">
      <Container>
        <Reveal className="section-head section-head--row">
          <div>
            <Eyebrow>What can you create?</Eyebrow>
            <h2 id="create-title" className="h1">
              Start with a photograph.
              <br />
              End with something real.
            </h2>
          </div>
          <div className="rail-controls">
            <IconButton icon="arrow-left" label="Previous products" onClick={() => scrollBy(-1)} />
            <IconButton icon="arrow-right" label="Next products" onClick={() => scrollBy(1)} />
          </div>
        </Reveal>
      </Container>

      <ul className="rail" ref={railRef} aria-label="Products">
        {items.map((p) => (
          <li key={p.slug} className="rail__item">
            <ProductTile product={p} />
          </li>
        ))}
      </ul>

      <Container>
        <Link to="/products" className="btn btn--text rail__all">
          Browse all products
        </Link>
      </Container>
    </Section>
  );
}
