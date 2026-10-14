import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '@/hooks/useMotion';
import { cn } from '@/lib/utils';

export function Container({
  children,
  className,
  as: Tag = 'div',
  narrow,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  narrow?: boolean;
}) {
  return <Tag className={cn('container', narrow && 'container--narrow', className)}>{children}</Tag>;
}

export function Section({
  children,
  className,
  id,
  tone,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: 'paper' | 'sunken' | 'ink';
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('section', tone && `section--${tone}`, className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('eyebrow', className)}>{children}</p>;
}

/** Fades and lifts children into view once. Respects reduced motion via CSS. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties;
  return (
    <Tag ref={ref} style={style} className={cn('reveal', inView && 'reveal--in', className)}>
      {children}
    </Tag>
  );
}

export function Chip({
  selected,
  onClick,
  children,
  disabled,
  className,
}: {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn('chip', selected && 'chip--selected', className)}
      aria-pressed={selected}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
