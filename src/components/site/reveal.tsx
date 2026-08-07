'use client';

import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  animation?: 'up' | 'left' | 'right' | 'scale' | 'fade';
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

export function Reveal({ children, className, delay = 0, animation = 'up', as = 'div' }: RevealProps) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();
  const Tag = as as any;

  const animClass = {
    up: 'reveal',
    left: 'reveal',
    right: 'reveal',
    scale: 'reveal',
    fade: 'reveal',
  }[animation];

  const style: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
  };

  // Apply different initial transforms based on animation type
  if (!revealed) {
    if (animation === 'left') style.transform = 'translateX(-40px)';
    if (animation === 'right') style.transform = 'translateX(40px)';
    if (animation === 'scale') style.transform = 'scale(0.92)';
  }

  return (
    <Tag
      ref={ref}
      className={cn(animClass, revealed && 'revealed', className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
