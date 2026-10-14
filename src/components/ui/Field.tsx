import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface FieldShell {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
}

function Shell({ id, label, hint, error, optional, className, children }: FieldShell & { id: string; children: ReactNode }) {
  return (
    <div className={cn('field', error && 'field--error', className)}>
      <label className="field__label" htmlFor={id}>
        {label}
        {optional && <span className="field__optional"> optional</span>}
      </label>
      {children}
      {error ? (
        <p className="field__error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="field__hint">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  hint,
  error,
  optional,
  className,
  ...rest
}: FieldShell & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>) {
  const id = useId();
  return (
    <Shell id={id} {...{ label, hint, error, optional, className }}>
      <input id={id} className="field__input" aria-invalid={!!error} {...rest} />
    </Shell>
  );
}

export function TextArea({
  label,
  hint,
  error,
  optional,
  className,
  ...rest
}: FieldShell & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>) {
  const id = useId();
  return (
    <Shell id={id} {...{ label, hint, error, optional, className }}>
      <textarea id={id} className="field__input field__input--area" aria-invalid={!!error} {...rest} />
    </Shell>
  );
}

export function SelectField({
  label,
  hint,
  error,
  optional,
  className,
  children,
  ...rest
}: FieldShell & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'>) {
  const id = useId();
  return (
    <Shell id={id} {...{ label, hint, error, optional, className }}>
      <select id={id} className="field__input field__input--select" aria-invalid={!!error} {...rest}>
        {children}
      </select>
    </Shell>
  );
}
