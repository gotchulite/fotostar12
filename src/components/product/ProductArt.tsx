import { modelForProduct, scenePhoto } from '@/features/design-draft/previewModels';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';
import { ProductPreview, type PreviewSetting } from './ProductPreview';

interface Props {
  product: Product;
  /** Width / height of the visual. Tiles use 4/5. */
  aspect?: number;
  setting?: PreviewSetting;
  className?: string;
}

function AlbumArt() {
  return (
    <div className="art art--album" aria-hidden="true">
      <div className="album album--back" />
      <div className="album">
        <i className="album__spine" />
        <div className="album__window">
          <img src={scenePhoto('travel', 'portrait').src} alt="" />
        </div>
        <span className="album__foil" />
      </div>
    </div>
  );
}

function GiftArt() {
  return (
    <div className="art art--gift" aria-hidden="true">
      <div className="mug">
        <div className="mug__body">
          <img src={scenePhoto('parents', 'landscape').src} alt="" />
          <i className="mug__shine" />
        </div>
        <i className="mug__handle" />
      </div>
      <div className="cushion">
        <img src={scenePhoto('family', 'landscape').src} alt="" />
      </div>
    </div>
  );
}

function RestorationArt() {
  const src = scenePhoto('grandparents', 'landscape').src;
  return (
    <div className="art art--restore" aria-hidden="true">
      <div className="restore restore--before">
        <img src={src} alt="" />
        <i className="restore__scratch" />
      </div>
      <div className="restore restore--after">
        <img src={src} alt="" />
      </div>
      <span className="restore__label restore__label--a">Before</span>
      <span className="restore__label restore__label--b">After</span>
    </div>
  );
}

/**
 * The tangible visual for any catalogue product. Frames and collages use the real
 * ProductPreview renderer; albums, gifts and restoration have their own small scenes.
 */
export function ProductArt({ product, aspect = 4 / 5, setting, className }: Props) {
  const wrap = (child: React.ReactNode) => (
    <div className={cn('art-wrap', className)} style={{ aspectRatio: `${aspect}` }}>
      {child}
    </div>
  );

  if (product.slug === 'album') return wrap(<AlbumArt />);
  if (product.slug === 'photo-gift') return wrap(<GiftArt />);
  if (product.slug === 'restoration') return wrap(<RestorationArt />);

  const model = modelForProduct(product);
  const pair = product.slug === 'aama-and-buwa' ? modelForProduct(product, { scene: 'grandparents' }) : undefined;

  if (product.slug === 'photo-print') {
    return wrap(<ProductPreview model={{ ...model, frameId: 'none', matId: 'thin', orientation: 'landscape' }} variant="object" ratio={`${aspect}`} />);
  }

  const chosen: PreviewSetting =
    setting ??
    (product.slug === 'family-memory' || product.slug === 'wedding-memory' ? 'sofa' : product.slug === 'grandparents' || product.slug === 'memory-set' ? 'desk' : 'shelf');

  return wrap(<ProductPreview model={model} pair={pair} setting={chosen} sceneAspect={aspect} />);
}
