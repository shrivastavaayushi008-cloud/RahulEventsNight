'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Route } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/site/theme-toggle';
import Image from 'next/image';

interface NavbarProps {
  route: Route;
  navigate: (route: Route) => void;
  phoneDisplay?: string;
  phone?: string;
  whatsapp?: string;
  brandHindi?: string;
}

const NAV_ITEMS: { label: string; route: Route }[] = [
  { label: 'Home', route: 'home' },
  { label: 'About', route: 'about' },
  { label: 'Events', route: 'events' },
  { label: 'Gallery', route: 'gallery' },
  { label: 'Artists', route: 'artists' },
  { label: 'Videos', route: 'videos' },
  { label: 'Testimonials', route: 'testimonials' },
  { label: 'Contact', route: 'contact' },
];

export function Navbar({ route, navigate, phoneDisplay, phone, whatsapp, brandHindi }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [route]);

  const go = (r: Route) => { navigate(r); setOpen(false); };
  const waLink = whatsapp ? `https://wa.me/91${whatsapp}` : '#';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-gold/20 shadow-lux'
          : 'bg-background/70 backdrop-blur-sm'
      )}
    >
      {/* Top contact bar */}
      <div className="hidden md:block bg-maroon-gradient border-b border-gold/10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 flex items-center justify-between h-9 text-xs animate-slide-down">
          <div className="flex items-center gap-4 text-white/90">
            {phoneDisplay && (
              <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-gold transition-colors">
                <Phone className="h-3 w-3 text-gold" /> {phoneDisplay}
              </a>
            )}
            {whatsapp && (
              <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gold transition-colors">
                <MessageCircle className="h-3 w-3 text-gold" /> WhatsApp: +91 {whatsapp}
              </a>
            )}
          </div>
          <div className="font-hindi text-sm text-gold">हर पल यादगार, हर इवेंट शानदार</div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-16 lg:h-18 items-center justify-between">
          {/* Logo */}
          <button onClick={() => go('home')} className="group flex items-center gap-2.5 text-left" aria-label="Home">
            <span className="relative h-10 w-10 lg:h-12 lg:w-12 rounded-full overflow-hidden ring-2 ring-gold/30 group-hover:ring-gold transition-all group-hover:scale-105 shadow-lux">
              <Image
                src="/logo.png"
                alt="RahulEventsNight Logo"
                fill
                className="object-cover"
                priority
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base lg:text-lg font-bold text-foreground">
                Rahul<span className="text-gradient-gold">EventsNight</span>
              </span>
              {brandHindi && (
                <span className="font-hindi text-xs text-gold mt-0.5">{brandHindi}</span>
              )}
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.route}
                onClick={() => go(item.route)}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors',
                  route === item.route ? 'text-gold' : 'text-foreground/80 hover:text-gold'
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {item.label}
                {route === item.route && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 bg-gold-gradient rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* CTA + Theme toggle */}
          <div className="hidden xl:flex items-center gap-2">
            <ThemeToggle />
            <Button
              onClick={() => go('contact')}
              className="btn-shine bg-gold-gradient text-white hover:opacity-90 font-semibold shadow-gold"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className="xl:flex items-center gap-2 hidden">
          </div>
          <div className="flex items-center gap-2 xl:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-background/98 backdrop-blur-md border-t border-gold/20 max-h-[80vh] overflow-y-auto scroll-gold animate-slide-down">
          <nav className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-2 gap-1.5">
            {NAV_ITEMS.map(item => (
              <button
                key={item.route}
                onClick={() => go(item.route)}
                className={cn(
                  'text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  route === item.route
                    ? 'text-gold bg-gold/10'
                    : 'text-foreground/80 hover:text-gold hover:bg-foreground/5'
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="px-4 pb-4 flex gap-2">
            {phone && (
              <a href={`tel:${phone}`} className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-gold-gradient text-white font-semibold btn-shine">
                <Phone className="h-4 w-4" /> Call
              </a>
            )}
            {whatsapp && (
              <a href={waLink} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-lg bg-whatsapp text-white font-semibold">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
