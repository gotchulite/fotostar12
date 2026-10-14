import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'secondary' | 'accent' | 'text' | 'inverse';
type Size = 'lg' | 'md' | 'sm';

interface Common {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  block?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & { to?: undefined };
type LinkProps = Common & { to: string; onClick?: () => void; state?: unknown };

export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', size = 'md', icon, iconRight, block, children, className } = props;
  const cls = cn('btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', className);
  const inner = (
    <>
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={18} />}
    </>
  );
  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={cls} onClick={props.onClick} state={props.state}>
        {inner}
      </Link>
    );
  }
  const {
    variant: _v,
    size: _s,
    icon: _i,
    iconRight: _ir,
    block: _b,
    children: _c,
    className: _cn,
    to: _to,
    ...rest
  } = props as ButtonProps;
  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  );
}

export function IconButton({
  icon,
  label,
  className,
  ...rest
}: { icon: IconName; label: string; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn('icon-btn', className)} aria-label={label} title={label} {...rest}>
      <Icon name={icon} />
    </button>
  );
}
