'use client';

import { Phone, MessageCircle, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/site/section-heading';
import type { SiteData } from '@/hooks/use-site-data';
import type { Route } from '@/lib/types';

interface PageProps {
  data: SiteData;
  loading: boolean;
  navigate: (r: Route, p?: string) => void;
}

export function TestimonialsPage({ data, loading, navigate }: PageProps) {
  return (
    <>
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            kicker="Reviews"
            title="Client Testimonials"
            titleHi="ग्राहक प्रशंसा"
            subtitle="What our clients say about our Jagran, singing, and wedding events."
          />
        </div>
      </section>

      <section className="bg-background py-10 lg:py-14 flex-1">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-48 rounded-2xl bg-card animate-pulse" />)}
            </div>
          ) : data.testimonials.length === 0 ? (
            <div className="text-center py-20 text-foreground/60">No testimonials yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.testimonials.map(t => (
                <div key={t.id} className="rounded-2xl border border-gold/15 bg-card p-6 flex flex-col">
                  <Quote className="h-8 w-8 text-gold/30 mb-3" />
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={i < t.rating ? 'h-4 w-4 text-gold fill-gold' : 'h-4 w-4 text-foreground/20'} />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed flex-1 italic">&ldquo;{t.message}&rdquo;</p>
                  <div className="mt-4 pt-4 border-t border-gold/10 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient text-white font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-foreground/60">{t.role}{t.event ? ` · ${t.event}` : ''}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-card/30 py-14 border-t border-gold/10">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h3 className="font-display text-2xl sm:text-3xl font-bold">
            Become our <span className="text-gradient-gold">next happy client</span>
          </h3>
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
