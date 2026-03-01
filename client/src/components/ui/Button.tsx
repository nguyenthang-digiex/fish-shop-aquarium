import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

type Variant = 'solid' | 'outline' | 'ghost';
type Color = 'ocean' | 'coral' | 'deep';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  color?: Color;
  size?: Size;
  loading?: boolean;
}

export default function Button({
  children,
  variant = 'solid',
  color = 'ocean',
  size = 'md',
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-xl font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const colors = {
    ocean: {
      solid:
        'bg-ocean text-white shadow-lg shadow-ocean/30 hover:scale-105 hover:shadow-ocean/50 focus:ring-ocean',
      outline:
        'border border-ocean text-ocean hover:bg-ocean hover:text-white focus:ring-ocean',
      ghost: 'text-ocean hover:bg-ocean/10 focus:ring-ocean',
    },
    coral: {
      solid:
        'bg-coral text-white shadow-lg shadow-coral/30 hover:scale-105 hover:shadow-coral/50 focus:ring-coral',
      outline:
        'border border-coral text-coral hover:bg-coral hover:text-white focus:ring-coral',
      ghost: 'text-coral hover:bg-coral/10 focus:ring-coral',
    },
    deep: {
      solid:
        'bg-deep text-white shadow-lg shadow-black/30 hover:scale-105 hover:shadow-black/50 focus:ring-deep',
      outline:
        'border border-deep text-deep hover:bg-deep hover:text-white focus:ring-deep',
      ghost: 'text-deep hover:bg-deep/10 focus:ring-deep',
    },
  };

  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        base,
        sizes[size],
        colors[color][variant],
        (disabled || loading) && 'cursor-not-allowed opacity-50',
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  );
}
