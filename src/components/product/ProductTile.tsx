import { Link } from 'react-router-dom';
import { cn, formatMoney } from '@/lib/utils';
import type { Product } from '@/types';
import { Icon } from '@/components/ui/Icon';
import { ProductArt } from './ProductArt';

interface Props {
  product: Product;
  aspect?: number;
  className?: string;
}

/** Image-led product card with a clear price and next step. */
export function ProductTile({ product, aspect = 4 / 5, className }: Props) {
  return (
    <Link to={`/products/${product.slug}`} className={cn('tile', className)}>
      <div className="tile__media">
        <ProductArt product={product} aspect={aspect} />
      </div>
      <div className="tile__body">
        <h3 className="tile__name">{product.name}</h3>
        <p className="small muted tile__text">{product.description}</p>
        <p className="small tile__price num">
          Starting at <strong>{formatMoney(product.fromPrice)}</strong>
        </p>
        <span className="tile__action">
          View details <Icon name="arrow-right" size={16} />
        </span>
      </div>
    </Link>
  );
}
