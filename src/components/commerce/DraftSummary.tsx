import { finishById, frameById, matById, sizeById } from '@/data/catalog';
import { productBySlug } from '@/data/products';
import { ProductPreview } from '@/components/product/ProductPreview';
import { cn, formatDimensions } from '@/lib/utils';
import type { DesignDraft, Quote } from '@/types';
import { LivePrice } from './LivePrice';

interface Props {
  draft: DesignDraft;
  quote: Quote;
  /** Show the sender / recipient summary lines. */
  showParties?: boolean;
  showPrice?: boolean;
  className?: string;
}

/** The same ProductPreview plus the plain facts about it. Used beside every gifting step. */
export function DraftSummary({ draft, quote, showParties = false, showPrice = true, className }: Props) {
  const product = productBySlug(draft.productId);
  const frame = draft.frameId === 'none' ? undefined : frameById(draft.frameId);
  const g = draft.gift;
  return (
    <aside className={cn('dsum', className)} aria-label="Your memory">
      <ProductPreview model={draft} variant="object" ratio="5 / 4" />
      <div className="dsum__body">
        <p className="eyebrow">{product?.name ?? 'Your memory'}</p>
        <dl className="spec spec--stack">
          <div>
            <dt>Size</dt>
            <dd className="num">
              {sizeById(draft.sizeId).label}, outer {formatDimensions(quote.outerWidthCm, quote.outerHeightCm)}
            </dd>
          </div>
          <div>
            <dt>Frame</dt>
            <dd>{frame ? `${frame.label}, ${matById(draft.matId).label.toLowerCase()}` : 'Print only'}</dd>
          </div>
          <div>
            <dt>Finish</dt>
            <dd>{finishById(draft.finishId).label}</dd>
          </div>
          {showParties && (
            <>
              <div>
                <dt>From</dt>
                <dd>{g.sender.name || 'You'}{g.sender.country ? `, ${g.sender.country}` : ''}</dd>
              </div>
              <div>
                <dt>To</dt>
                <dd>{g.recipient.name ? `${g.recipient.name}${g.recipient.city ? `, ${g.recipient.city}` : ''}` : 'Your family'}</dd>
              </div>
            </>
          )}
        </dl>
        {showPrice && <LivePrice total={quote.total} estimate={quote.estimate} />}
      </div>
    </aside>
  );
}
