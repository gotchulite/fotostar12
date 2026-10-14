import { cn } from '@/lib/utils';
import type { MessageSurface } from '@/types';

interface Props {
  message: string;
  surface: MessageSurface;
  senderName?: string;
  recipientName?: string;
  className?: string;
}

const PLACEHOLDER = 'Happy birthday, Aama. Missing you from Sydney.';

/**
 * Shows how the message could appear: a printed card in the box, or a note on the back of
 * the frame. Devanagari renders through the Noto fallback fonts in the type stack.
 */
export function MessageCardPreview({ message, surface, senderName, recipientName, className }: Props) {
  const text = message.trim() || PLACEHOLDER;
  const isPlaceholder = !message.trim();
  return (
    <figure className={cn('msg-preview', `msg-preview--${surface}`, className)}>
      {surface === 'card' ? (
        <div className="msg-card">
          <div className="msg-card__inner">
            {recipientName && <p className="msg-card__to">{recipientName},</p>}
            <p className={cn('msg-card__text', isPlaceholder && 'msg-card__text--placeholder')} lang="ne-x-mixed">
              {text}
            </p>
            {senderName && <p className="msg-card__from">{senderName}</p>}
          </div>
        </div>
      ) : (
        <div className="msg-back">
          <div className="msg-back__panel">
            <span className="msg-back__hook" aria-hidden="true" />
            <div className="msg-back__note">
              <p className={cn('msg-back__text', isPlaceholder && 'msg-card__text--placeholder')} lang="ne-x-mixed">
                {text}
              </p>
              {senderName && <p className="msg-back__from">{senderName}</p>}
            </div>
          </div>
        </div>
      )}
      <figcaption className="small muted">
        {surface === 'card' ? 'Printed card, packed with the frame' : 'Note on the back of the frame'}
      </figcaption>
    </figure>
  );
}
