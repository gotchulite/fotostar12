import { Link } from 'react-router-dom';
import { Container, Eyebrow, Reveal, Section } from '@/components/ui/Primitives';
import { ProductArt } from '@/components/product/ProductArt';
import { PRODUCTS } from '@/data/products';
import { formatMoney } from '@/lib/utils';
import type { PreviewSetting } from '@/components/product/ProductPreview';

interface Feature {
  slug: string;
  setting: PreviewSetting;
  place: string;
  line: string;
}

const FEATURES: Feature[] = [
  { slug: 'family-memory', setting: 'sofa', place: 'Living room wall', line: 'The whole family, where everyone sees it.' },
  { slug: 'aama-and-buwa', setting: 'shelf', place: 'Family shelf', line: 'Two portraits, side by side.' },
  { slug: 'grandparents', setting: 'desk', place: 'Bedside table', line: 'A face you would like to see each morning.' },
  { slug: 'wedding-memory', setting: 'sofa', place: 'Above the sofa', line: 'The day, kept properly.' },
];

/** 05 — Memory products as tangible objects in real settings. */
export function FeaturedMemories() {
  const [lead, ...rest] = FEATURES;
  const leadProduct = PRODUCTS.find((p) => p.slug === lead.slug)!;
  return (
    <Section labelledBy="memories-title" id="memories">
      <Container>
        <Reveal className="section-head">
          <Eyebrow>Memory products</Eyebrow>
          <h2 id="memories-title" className="h1">
            Made for the people in the photograph.
          </h2>
        </Reveal>

        <div className="memories">
          <Reveal className="memories__lead">
            <Link to={`/products/${lead.slug}`} className="memory">
              <div className="memory__media">
                <ProductArt product={leadProduct} aspect={4 / 3} setting={lead.setting} />
              </div>
              <div className="memory__body">
                <p className="eyebrow">{lead.place}</p>
                <h3 className="h2">{leadProduct.name}</h3>
                <p className="muted">{lead.line}</p>
                <p className="small num">from {formatMoney(leadProduct.fromPrice)}</p>
              </div>
            </Link>
          </Reveal>

          <div className="memories__rest">
            {rest.map((f, i) => {
              const p = PRODUCTS.find((x) => x.slug === f.slug)!;
              return (
                <Reveal key={f.slug} delay={i * 80}>
                  <Link to={`/products/${f.slug}`} className="memory memory--small">
                    <div className="memory__media">
                      <ProductArt product={p} aspect={4 / 3} setting={f.setting} />
                    </div>
                    <div className="memory__body">
                      <p className="eyebrow">{f.place}</p>
                      <h3 className="h3">{p.name}</h3>
                      <p className="small muted">{f.line}</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>

        <p className="memories__more small muted">
          Also: <Link to="/products/travel-memory">Travel Memory</Link>, <Link to="/products/our-story">Our Story</Link> and{' '}
          <Link to="/products/year-in-memories">Year in Memories</Link>.
        </p>
      </Container>
    </Section>
  );
}
