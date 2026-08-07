'use client';

import { useState, useMemo } from 'react';
import { Play, X, Youtube, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/site/section-heading';
import type { SiteData } from '@/hooks/use-site-data';
import type { Route, Video } from '@/lib/types';
import { EVENT_CATEGORIES } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PageProps {
  data: SiteData;
  loading: boolean;
  navigate: (r: Route, p?: string) => void;
}

export function VideosPage({ data, loading, navigate }: PageProps) {
  const [category, setCategory] = useState('all');
  const [active, setActive] = useState<Video | null>(null);

  const filtered = useMemo(() => {
    if (category === 'all') return data.videos;
    return data.videos.filter(v => v.category === category);
  }, [data.videos, category]);

  const cats = ['all', ...EVENT_CATEGORIES.map(c => c.key)];

  return (
    <>
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            kicker="Watch Us"
            title="Video Gallery"
            titleHi="वीडियो गैलरी"
            subtitle="Live performance videos from our Jagrans, singing events, and weddings."
          />
        </div>
      </section>

      <section className="bg-background sticky top-16 lg:top-20 z-30 border-b border-gold/10 py-3">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 flex gap-2 overflow-x-auto no-scrollbar">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn('px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all capitalize',
                category === c ? 'bg-gold-gradient text-maroon' : 'border border-gold/20 text-foreground/60 hover:border-gold/50 hover:text-gold')}
            >
              {c === 'all' ? 'All Videos' : c}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-background py-10 lg:py-14 flex-1">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-video rounded-2xl bg-card animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-foreground/60">
              <Youtube className="h-12 w-12 mx-auto mb-4 opacity-50" />
              No videos yet. Check back soon!
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(v => (
                <button
                  key={v.id}
                  onClick={() => setActive(v)}
                  className="group rounded-2xl border border-gold/15 bg-card overflow-hidden text-left transition-all hover:-translate-y-1 hover:shadow-lux"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`}
                      alt={v.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-maroon fill-maroon ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex items-center rounded-full bg-maroon/80 backdrop-blur px-2.5 py-0.5 text-[10px] font-semibold text-gold">
                        {v.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold leading-snug line-clamp-2">{v.title}</h3>
                    {v.description && <p className="mt-1 text-xs text-foreground/60 line-clamp-2">{v.description}</p>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card/30 py-14 border-t border-gold/10">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h3 className="font-display text-2xl sm:text-3xl font-bold">
            Like our performances? <span className="text-gradient-gold">Book us!</span>
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {data.settings.phone && (
              <a href={`tel:${data.settings.phone}`}>
                <Button size="lg" className="bg-gold-gradient text-maroon hover:opacity-90 font-semibold shadow-gold h-12 px-7">
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

      {/* Video modal */}
      {active && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setActive(null)}>
          <button className="absolute top-4 right-4 p-2 rounded-full bg-card text-foreground hover:bg-card/80" onClick={() => setActive(null)} aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1`}
                title={active.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4 text-center">
              <span className="inline-flex items-center rounded-full bg-gold-gradient px-3 py-1 text-xs font-semibold text-maroon mb-2">
                {active.category}
              </span>
              <h3 className="font-display text-xl font-bold">{active.title}</h3>
              {active.description && <p className="mt-1 text-foreground/70 text-sm">{active.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
