'use client';

import { useState, useMemo } from 'react';
import { Phone, MessageCircle, ArrowRight, Calendar, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/site/section-heading';
import { CardSkeleton } from '@/components/site/skeletons';
import type { SiteData } from '@/hooks/use-site-data';
import type { Route, EventItem } from '@/lib/types';
import { EVENT_CATEGORIES } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PageProps {
  data: SiteData;
  loading: boolean;
  navigate: (r: Route, p?: string) => void;
}

export function EventsPage({ data, loading, navigate }: PageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const grouped = useMemo(() => {
    const map: Record<string, EventItem[]> = {};
    for (const e of data.events) {
      if (!map[e.category]) map[e.category] = [];
      map[e.category].push(e);
    }
    return map;
  }, [data.events]);

  const filtered = activeCategory === 'all' ? data.events : (grouped[activeCategory] || []);

  return (
    <>
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            kicker="Our Events"
            title="Event Categories"
            titleHi="इवेंट श्रेणियाँ"
            subtitle="Browse all our event types — from spiritual Jagrans to live singing and wedding celebrations."
          />
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-background sticky top-16 lg:top-20 z-30 border-b border-gold/10 py-4">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                activeCategory === 'all'
                  ? 'bg-gold-gradient text-white'
                  : 'border border-gold/20 text-foreground/70 hover:border-gold/50 hover:text-gold'
              )}
            >
              All Events
            </button>
            {EVENT_CATEGORIES.map(c => (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5',
                  activeCategory === c.key
                    ? 'bg-gold-gradient text-white'
                    : 'border border-gold/20 text-foreground/70 hover:border-gold/50 hover:text-gold'
                )}
              >
                <span>{c.icon}</span> {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events grid */}
      <section className="bg-background py-12 lg:py-16 flex-1">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-foreground/60">
              <Calendar className="h-10 w-10 mx-auto mb-3 opacity-50" />
              No events in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(e => (
                <EventCard key={e.id} event={e} navigate={navigate} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card/30 py-14 border-t border-gold/10">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h3 className="font-display text-2xl sm:text-3xl font-bold">
            Don't see your event type? <span className="text-gradient-gold">Just ask!</span>
          </h3>
          <p className="mt-2 text-foreground/60">We customise every event to your needs. Call or WhatsApp now.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {data.settings.phone && (
              <a href={`tel:${data.settings.phone}`}>
                <Button size="lg" className="bg-gold-gradient text-white hover:opacity-90 font-semibold shadow-gold h-12 px-7">
                  <Phone className="mr-2 h-4 w-4" /> {data.settings.phoneDisplay || data.settings.phone}
                </Button>
              </a>
            )}
            {data.settings.whatsapp && (
              <a href={`https://wa.me/91${data.settings.whatsapp}`} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="border-whatsapp/40 text-whatsapp hover:bg-whatsapp/10 h-12 px-7">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function EventCard({ event, navigate }: { event: EventItem; navigate: (r: Route) => void }) {
  return (
    <div className="group rounded-2xl border border-gold/15 bg-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lux">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={event.coverImage} alt={event.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-gold-gradient px-3 py-1 text-xs font-semibold text-maroon">
            {event.category}
          </span>
        </div>
        {event.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-maroon/80 backdrop-blur px-2.5 py-1 text-xs font-medium text-gold">
              <Star className="h-3 w-3 fill-gold" /> Featured
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold">{event.title}</h3>
        {event.subCategory && event.subCategory !== event.title && (
          <p className="text-xs text-gold mt-0.5">{event.subCategory}</p>
        )}
        <p className="mt-2 text-sm text-foreground/60 line-clamp-2">{event.description}</p>
        <Button
          onClick={() => navigate('contact')}
          variant="outline"
          size="sm"
          className="mt-4 w-full border-gold/30 text-gold hover:bg-gold/10"
        >
          Book This Event <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
