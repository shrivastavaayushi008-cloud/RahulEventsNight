'use client';

import { useState, useMemo, useEffect } from 'react';
import { Play, X, Calendar, MapPin, ImageIcon, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/site/section-heading';
import type { SiteData } from '@/hooks/use-site-data';
import type { Route, GalleryItem } from '@/lib/types';
import { EVENT_CATEGORIES } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PageProps {
  data: SiteData;
  loading: boolean;
  navigate: (r: Route, p?: string) => void;
}

export function GalleryPage({ data, loading, navigate }: PageProps) {
  const [category, setCategory] = useState('all');
  const [type, setType] = useState<'all' | 'photo' | 'video'>('all');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [extra, setExtra] = useState<GalleryItem[]>([]);
  const [extraLoading, setExtraLoading] = useState(false);

  const allItems = useMemo(() => {
    const seen = new Set<string>();
    return [...data.gallery, ...extra].filter(i => {
      if (seen.has(i.id)) return false;
      seen.add(i.id);
      return true;
    });
  }, [data.gallery, extra]);

  const filtered = useMemo(() => {
    return allItems.filter(item => {
      if (category !== 'all' && item.category !== category) return false;
      if (type !== 'all' && item.type !== type) return false;
      return true;
    });
  }, [allItems, category, type]);

  useEffect(() => {
    setExtraLoading(true);
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (type !== 'all') params.set('type', type);
    fetch(`/api/gallery?${params.toString()}`)
      .then(r => r.json())
      .then(d => setExtra(d.items || []))
      .catch(() => setExtra([]))
      .finally(() => setExtraLoading(false));
  }, [category, type]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <>
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading kicker="Memories" title="Gallery" titleHi="गैलरी" subtitle="Photos and videos from our Jagrans, singing events, and weddings." />
        </div>
      </section>

      <section className="bg-background sticky top-16 lg:top-20 z-30 border-b border-gold/10 py-3">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setCategory('all')}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
                category === 'all' ? 'bg-gold-gradient text-white' : 'border border-gold/20 text-foreground/60 hover:border-gold/50 hover:text-gold')}
            >
              All
            </button>
            {EVENT_CATEGORIES.map(c => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
                  category === c.key ? 'bg-gold-gradient text-white' : 'border border-gold/20 text-foreground/60 hover:border-gold/50 hover:text-gold')}
              >
                {c.icon} {c.key}
              </button>
            ))}
          </div>
          <div className="flex gap-2 shrink-0">
            {([['all', 'All'], ['photo', 'Photos'], ['video', 'Videos']] as [typeof type, string][]).map(([t, label]) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5',
                  type === t ? 'bg-card border border-gold/30 text-foreground' : 'border border-gold/10 text-foreground/50 hover:text-foreground')}
              >
                {t === 'video' && <Play className="h-3 w-3" />}
                {t === 'photo' && <ImageIcon className="h-3 w-3" />}
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-10 lg:py-14 flex-1">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {loading && extraLoading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-card animate-pulse" style={{ aspectRatio: i % 3 === 0 ? '4/5' : '4/3' }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-foreground/60">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              No items match your filters.
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {filtered.map(item => (
                <button
                  key={item.id}
                  onClick={() => setLightbox(item)}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-gold/15 bg-card break-inside-avoid"
                >
                  <img src={item.thumbnail || item.url} alt={item.title} className="w-full transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item.type === 'video' && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-maroon/70 backdrop-blur px-2.5 py-1 text-xs text-gold">
                      <Play className="h-3 w-3 fill-gold" /> Video
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="inline-flex items-center rounded-full bg-gold-gradient px-2.5 py-0.5 text-[10px] font-semibold text-maroon mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-display text-base font-bold text-foreground leading-tight">{item.title}</h3>
                    {item.description && <p className="text-xs text-foreground/70 mt-1 line-clamp-2">{item.description}</p>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 p-2 rounded-full bg-card text-foreground hover:bg-card/80" onClick={() => setLightbox(null)} aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            {lightbox.type === 'video' && lightbox.youtubeId ? (
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${lightbox.youtubeId}`}
                  title={lightbox.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden bg-black">
                <img src={lightbox.url} alt={lightbox.title} className="w-full max-h-[75vh] object-contain" loading="lazy" />
              </div>
            )}
            <div className="mt-4 text-center">
              <span className="inline-flex items-center rounded-full bg-gold-gradient px-3 py-1 text-xs font-semibold text-maroon mb-2">
                {lightbox.category}
              </span>
              <h3 className="font-display text-xl font-bold">{lightbox.title}</h3>
              {lightbox.description && <p className="mt-1 text-foreground/70 max-w-2xl mx-auto text-sm">{lightbox.description}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
