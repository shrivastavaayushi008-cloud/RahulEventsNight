'use client';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  titleHi?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  titleHi,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {kicker && (
        <div className={cn('flex items-center gap-3 mb-3', align === 'center' && 'justify-center')}>
          <span className="h-px w-8 bg-gold" />
          <span className="kicker">{kicker}</span>
          <span className="h-px w-8 bg-gold" />
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground">
        {title}
      </h2>
      {titleHi && (
        <p className="mt-2 font-hindi text-xl sm:text-2xl text-gold">{titleHi}</p>
      )}
      {subtitle && (
        <p className={cn('mt-3 text-base text-foreground/60 leading-relaxed', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
