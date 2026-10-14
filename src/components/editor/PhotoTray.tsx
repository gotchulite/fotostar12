import { Icon } from '@/components/ui/Icon';
import { qualityFor } from '@/features/design-draft/recommend';
import { sizeById } from '@/data/catalog';
import { cn } from '@/lib/utils';
import type { Photo } from '@/types';
import { QualityIndicator } from './QualityIndicator';

interface Props {
  photos: Photo[];
  activeId: string | null;
  sizeId: string;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
  onAdd?: () => void;
  /** Photos already placed in a collage slot get a small mark. */
  placedIds?: string[];
  className?: string;
  /** Lets thumbnails be dragged onto collage spaces (desktop). */
  draggable?: boolean;
}

/** Strip of uploaded photographs. Used by upload, editor and collage. */
export function PhotoTray({ photos, activeId, sizeId, onSelect, onRemove, onAdd, placedIds = [], className, draggable = false }: Props) {
  const size = sizeById(sizeId);
  return (
    <ul className={cn('tray', className)} aria-label="Your photographs">
      {photos.map((p) => {
        const q = qualityFor(p, size);
        return (
          <li key={p.id} className={cn('tray__item', p.id === activeId && 'tray__item--active')}>
            <button
              type="button"
              className="tray__thumb"
              onClick={() => onSelect?.(p.id)}
              aria-label={`Select ${p.name}`}
              aria-pressed={p.id === activeId}
              draggable={draggable}
              onDragStart={(e) => e.dataTransfer.setData('text/photo-id', p.id)}
            >
              <img src={p.src} alt="" draggable={false} />
              {placedIds.includes(p.id) && (
                <span className="tray__placed" aria-label="In collage">
                  <Icon name="check" size={12} />
                </span>
              )}
              <span className={cn('tray__dot', `tray__dot--${q}`)} aria-hidden="true" />
            </button>
            {onRemove && (
              <button type="button" className="tray__remove" onClick={() => onRemove(p.id)} aria-label={`Remove ${p.name}`}>
                <Icon name="close" size={12} />
              </button>
            )}
            <span className="sr-only">
              <QualityIndicator quality={q} compact />
            </span>
          </li>
        );
      })}
      {onAdd && (
        <li className="tray__item">
          <button type="button" className="tray__add" onClick={onAdd} aria-label="Add more photographs">
            <Icon name="plus" size={20} />
          </button>
        </li>
      )}
    </ul>
  );
}
