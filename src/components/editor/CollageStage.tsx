import { useState, type CSSProperties, type DragEvent } from 'react';
import { layoutById } from '@/data/collageLayouts';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import type { CollageState, Photo } from '@/types';

interface Props {
  photos: Photo[];
  collage: CollageState;
  boxAspect: number;
  selected: number | null;
  onSelect: (index: number | null) => void;
  onDropPhoto: (index: number, photoId: string) => void;
  onClear: (index: number) => void;
}

/** Interactive collage sheet: tap a slot, then tap a photograph; or drag a photograph onto a slot. */
export function CollageStage({ photos, collage, boxAspect, selected, onSelect, onDropPhoto, onClear }: Props) {
  const layout = layoutById(collage.layoutId);
  const [hover, setHover] = useState<number | null>(null);

  const onDrop = (e: DragEvent, i: number) => {
    e.preventDefault();
    setHover(null);
    const id = e.dataTransfer.getData('text/photo-id');
    if (id) onDropPhoto(i, id);
  };

  return (
    <div className="stage">
      <div className="stage__area">
        <div
          className="stage__box stage__box--collage"
          style={{ width: `min(88cqw, calc(88cqh * ${boxAspect}))`, aspectRatio: `${boxAspect}`, background: layout.paper }}
        >
          {layout.slots.map((slot, i) => {
            const photo = photos.find((p) => p.id === collage.slots[i]);
            const style: CSSProperties = { left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.w}%`, height: `${slot.h}%` };
            return (
              <div
                key={i}
                className={cn('cslot', selected === i && 'cslot--selected', hover === i && 'cslot--hover', !photo && 'cslot--empty')}
                style={style}
                onDragOver={(e) => {
                  e.preventDefault();
                  setHover(i);
                }}
                onDragLeave={() => setHover(null)}
                onDrop={(e) => onDrop(e, i)}
              >
                <button
                  type="button"
                  className="cslot__btn"
                  aria-label={photo ? `Slot ${i + 1}: ${photo.name}. Select to replace.` : `Slot ${i + 1}, empty. Select, then choose a photograph.`}
                  aria-pressed={selected === i}
                  onClick={() => onSelect(selected === i ? null : i)}
                >
                  {photo ? <img src={photo.src} alt="" draggable={false} /> : <Icon name="plus" size={20} />}
                </button>
                {photo && selected === i && (
                  <button type="button" className="cslot__clear" onClick={() => onClear(i)} aria-label="Empty this slot">
                    <Icon name="close" size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
