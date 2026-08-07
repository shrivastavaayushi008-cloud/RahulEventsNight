'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card hover:border-gold transition-colors overflow-hidden group',
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun className={cn(
        'h-4 w-4 absolute transition-all duration-500',
        theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100 text-maroon'
      )} />
      <Moon className={cn(
        'h-4 w-4 absolute transition-all duration-500',
        theme === 'dark' ? 'opacity-100 rotate-0 scale-100 text-gold' : 'opacity-0 -rotate-90 scale-0'
      )} />
    </button>
  );
}
