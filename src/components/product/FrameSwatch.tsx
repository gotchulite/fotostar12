import { FrameObject, type PreviewModel } from './ProductPreview';

/** A real miniature of the frame around the customer's own photograph. */
export function FrameSwatch({ model, frameId }: { model: PreviewModel; frameId: string }) {
  const mini: PreviewModel = {
    ...model,
    frameId,
    // Keep the mini consistent: use a modest mat so the frame edge is the focus.
    matId: frameId === 'none' ? 'none' : model.matId === 'none' ? 'thin' : model.matId,
    text: { value: '', style: 'serif' },
  };
  return (
    <span className="frame-swatch">
      <span className="frame-swatch__box">
        <FrameObject model={mini} />
      </span>
    </span>
  );
}
