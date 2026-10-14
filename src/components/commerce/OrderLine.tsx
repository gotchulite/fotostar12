import { ProductPreview } from '@/components/product/ProductPreview';
import { finishById, frameById, matById, sizeById } from '@/data/catalog';
import { productBySlug } from '@/data/products';
import { cn, formatDimensions, formatMoney, type CurrencyCode } from '@/lib/utils';
import type { CartItem } from '@/types';

interface Props {
  item: CartItem;
  currency?: CurrencyCode;
  /** Smaller preview and fewer lines, for the checkout and confirmation summaries. */
  compact?: boolean;
  onRemove?: () => void;
  className?: string;
}

/**
 * One product in an order: the same ProductPreview the customer designed with, plus the plain
 * facts the brief asks every summary to show (photo, frame, size, message, recipient, delivery).
 */
export function OrderLine({ item, currency = 'NPR', compact = false, onRemove, className }: Props) {
  const { draft, quote } = item;
  const product = productBySlug(draft.productId);
  const frame = draft.frameId === 'none' ? undefined : frameById(draft.frameId);
  const size = sizeById(draft.sizeId);
  const g = draft.gift;
  const isGift = draft.mode === 'gift';
  const placed = draft.collage.slots.filter(Boolean).length;
  const photoLabel =
    draft.kind === 'collage' ? `${placed} photograph${placed === 1 ? '' : 's'} in a collage` : (draft.photos.find((p) => p.id === draft.activePhotoId) ?? draft.photos[0])?.name;

  return (
    <article className={cn('oline', compact && 'oline--compact', className)}>
      <div className="oline__media">
        <ProductPreview model={draft} variant="object" ratio="1 / 1" />
      </div>
      <div className="oline__body">
        <div className="oline__head">
          <h3 className="oline__name">{product?.name ?? 'Your memory'}</h3>
          <p className="oline__price num">{formatMoney(quote.total, currency)}</p>
        </div>
        <dl className="spec spec--stack">
          <div>
            <dt>Photo</dt>
            <dd>{photoLabel}</dd>
          </div>
          <div>
            <dt>Frame</dt>
            <dd>{frame ? `${frame.label}, ${matById(draft.matId).label.toLowerCase()}` : 'Print only'}</dd>
          </div>
          <div>
            <dt>Size</dt>
            <dd className="num">
              {size.label}
              {!compact && `, outer ${formatDimensions(quote.outerWidthCm, quote.outerHeightCm)}`}
              {!compact && ` · ${finishById(draft.finishId).label}`}
            </dd>
          </div>
          {isGift && g.message.trim() && (
            <div>
              <dt>Message</dt>
              <dd className="oline__msg" lang="ne-x-mixed">
                “{g.message.trim().length > 70 ? `${g.message.trim().slice(0, 70)}…` : g.message.trim()}”
              </dd>
            </div>
          )}
          {isGift && (
            <div>
              <dt>To</dt>
              <dd>
                {g.recipient.name || 'Your family'}
                {g.recipient.city ? `, ${g.recipient.city}` : ''}
              </dd>
            </div>
          )}
          <div>
            <dt>Delivery</dt>
            <dd>{`Estimated ${quote.estimate.label}`}</dd>
          </div>
        </dl>
        {onRemove && (
          <button type="button" className="linklike small oline__remove" onClick={onRemove}>
            Remove
          </button>
        )}
      </div>
    </article>
  );
}
