import type { CSSProperties } from 'react';
import { coverMetrics } from '@/lib/crop';
import type { CropState } from '@/types';

interface Props {
  src: string;
  /** Natural width / height of the photograph, before rotation. */
  photoAspect: number;
  /** Width / height of the crop box the photo is covering. */
  boxAspect: number;
  crop: CropState;
  alt?: string;
  className?: string;
  draggable?: boolean;
}

/**
 * Draws a photograph covering its nearest `container-type: size` ancestor, with the
 * shared crop state applied (zoom, pan, quarter-turn rotation). Both the editor stage
 * and every ProductPreview use this, so the print always matches what was cropped.
 */
export function PhotoLayer({ src, photoAspect, boxAspect, crop, alt = '', className, draggable = false }: Props) {
  const m = coverMetrics(photoAspect, boxAspect, crop.rotation);
  const visW = `${m.vw * 100}cqw`;
  const visH = `${m.vh * 100}cqh`;
  const style: CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: m.swapped ? visH : visW,
    height: m.swapped ? visW : visH,
    maxWidth: 'none',
    transform: `translate(-50%, -50%) translate(${crop.ox * 100}cqw, ${crop.oy * 100}cqh) scale(${crop.zoom}) rotate(${crop.rotation}deg)`,
    transformOrigin: 'center',
    userSelect: 'none',
    pointerEvents: 'none',
  };
  return <img className={className} src={src} alt={alt} style={style} draggable={draggable} />;
}
