'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Phone, MessageCircle, Play, ArrowRight, Calendar, MapPin, Star,
  Quote, ChevronLeft, ChevronRight, Sparkles, Music, Heart, Users, Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/site/section-heading';
import { CardSkeleton } from '@/components/site/skeletons';
import { Reveal } from '@/components/site/reveal';
import type { SiteData } from '@/hooks/use-site-data';
import type { Route, EventItem, Testimonial, UpcomingEvent, Artist } from '@/lib/types';
import { EVENT_CATEGORIES as CATS } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PageProps {
  data: SiteData;
  loading: boolean;
  navigate: (r: Route, p?: string) => void;
}

export function HomePage({ data, loading, navigate }: PageProps) {
  return (
    <>
      <Hero settings={data.settings} navigate={navigate} />
      <Stats settings={data.settings} />
      <Categories navigate={navigate} />
      <FeaturedEvents events={data.events} loading={loading} navigate={navigate} />
      <UpcomingEvents upcoming={data.upcoming} loading={loading} settings={data.settings} />
      <ArtistsPreview artists={data.artists} loading={loading} navigate={navigate} />
      <GalleryPreview data={data} loading={loading} navigate={navigate} />
      <Testimonials testimonials={data.testimonials} loading={loading} />
      <ContactCTA settings={data.settings} navigate={navigate} />
    </>
  );
}

/* ----------------------------- Hero ----------------------------- */
function Hero({ settings, navigate }: { settings: any; navigate: (r: Route) => void }) {
  const phone = settings.phoneDisplay || settings.phone || '';
  const whatsapp = settings.whatsapp || '';
  const waLink = whatsapp ? `https://wa.me/91${whatsapp}` : '#';

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-black">
      {/* Banner background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/banner.png"
          alt="RahulEventsNight Banner"
          className="h-full w-full object-cover object-center animate-kenburns"
        />
        {/* Strong left-to-right dark gradient so left text area is always readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20 w-full">
        <div className="max-w-2xl animate-fade-up">
          {/* Tagline pill - solid dark background for contrast */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur border border-gold/50 mb-5">
            <Sparkles className="h-4 w-4 text-gold shrink-0" />
            <span className="font-hindi text-sm font-bold text-gold">{settings.taglineHindi || 'हर पल यादगार, हर इवेंट शानदार'}</span>
          </div>

          {/* Main heading - solid white, extra bold, with strong shadow */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] text-white hero-text-shadow">
            RahulEventsNight
          </h1>
          <p className="mt-3 font-hindi text-xl sm:text-2xl lg:text-3xl font-bold text-gold hero-text-shadow">
            राहुल इवेंट्स नाईट
          </p>

          <p className="mt-5 text-sm sm:text-base lg:text-lg font-medium text-white leading-relaxed max-w-xl hero-text-shadow">
            Jagran · Hanuman Aradhna · Track Singing · Wedding Song Events —
            professional live performances for every celebration.
          </p>

          {/* CTA buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => navigate('contact')}
              size="lg"
              className="btn-shine bg-gold-gradient text-white hover:opacity-90 font-bold shadow-gold h-11 sm:h-12 px-6 sm:px-7 text-base"
            >
              Book Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {whatsapp && (
              <a href={waLink} target="_blank" rel="noreferrer">
                <Button
                  size="lg"
                  className="bg-whatsapp text-white hover:bg-whatsapp/90 font-bold shadow-lux h-11 sm:h-12 px-6 sm:px-7 text-base"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Booking
                </Button>
              </a>
            )}
          </div>

          {/* Phone prominent - solid dark pill behind for readability */}
          {phone && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`tel:${settings.phone}`} className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/60 backdrop-blur border border-white/10 hover:border-gold/50 transition-colors">
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gold-gradient text-white shadow-gold animate-glow shrink-0">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[10px] sm:text-xs font-bold text-gold uppercase tracking-wider">Call for Booking</span>
                  <span className="block font-display text-lg sm:text-xl font-extrabold text-white">{phone}</span>
                </span>
              </a>
              {whatsapp && (
                <a href={waLink} target="_blank" rel="noreferrer" className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/60 backdrop-blur border border-white/10 hover:border-whatsapp/50 transition-colors">
                  <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-whatsapp text-white shadow-lux shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] sm:text-xs font-bold text-whatsapp uppercase tracking-wider">WhatsApp</span>
                    <span className="block font-display text-lg sm:text-xl font-extrabold text-white">+91 {whatsapp}</span>
                  </span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold hero-text-shadow">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-gold to-transparent animate-bounce-subtle" />
      </div>
    </section>
  );
}

/* ----------------------------- Stats ----------------------------- */
function Stats({ settings }: { settings: any }) {
  const stats = [
    { value: settings.stats_events || '500+', label: 'Events Done', icon: Calendar },
    { value: settings.stats_clients || '1000+', label: 'Happy Clients', icon: Users },
    { value: settings.stats_years || '15', label: 'Years Experience', icon: Award },
    { value: settings.stats_artists || '25+', label: 'Expert Artists', icon: Music },
  ];
  return (
    <section className="relative bg-maroon-gradient border-y border-gold/15 py-10 overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 100} animation="scale">
              <div className="text-center">
                <s.icon className="h-6 w-6 text-gold mx-auto mb-2 animate-float" style={{ animationDelay: `${i * 0.3}s` }} />
                <div className="font-display text-3xl sm:text-4xl font-bold text-gradient-gold">{s.value}</div>
                <div className="mt-1 text-xs sm:text-sm uppercase tracking-[0.15em] text-white/70">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Categories ----------------------------- */
function Categories({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Our Services"
            title="Event Categories"
            titleHi="इवेंट श्रेणियाँ"
            subtitle="From spiritual Jagrans to live singing and weddings — we cover every celebration."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATS.map((cat, i) => (
            <Reveal key={cat.key} delay={i * 80} animation="scale">
              <button
                onClick={() => navigate('events')}
                className="group w-full rounded-2xl border border-gold/15 bg-card p-5 text-center transition-all hover:-translate-y-2 hover:border-gold/40 hover:shadow-gold card-lift"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <div className="font-display text-sm font-bold text-foreground">{cat.label}</div>
                <div className="font-hindi text-xs text-gold mt-0.5">{cat.labelHi}</div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Featured Events ----------------------------- */
function FeaturedEvents({
  events,
  loading,
  navigate,
}: {
  events: EventItem[];
  loading: boolean;
  navigate: (r: Route) => void;
}) {
  const featured = events.filter(e => e.featured).slice(0, 5);
  const display = featured.length > 0 ? featured : events.slice(0, 5);

  return (
    <section className="bg-card/30 py-16 lg:py-24 border-y border-gold/10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeading
              kicker="Featured"
              title="Featured Events"
              titleHi="विशेष इवेंट"
              align="left"
            />
            <Button onClick={() => navigate('events')} variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 shrink-0 btn-shine">
              View All Events <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {display.map((e, i) => (
              <Reveal key={e.id} delay={i * 100}>
                <FeaturedEventCard event={e} navigate={navigate} large={i === 0} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedEventCard({ event, navigate, large }: { event: EventItem; navigate: (r: Route) => void; large?: boolean }) {
  return (
    <button
      onClick={() => navigate('events')}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-gold/15 bg-card text-left transition-all hover:-translate-y-1 hover:shadow-lux',
        large && 'sm:col-span-2 lg:col-span-1'
      )}
    >
      <div className={cn('relative overflow-hidden', large ? 'aspect-[16/10]' : 'aspect-[4/3]')}>
        <img src={event.coverImage} alt={event.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
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
        <h3 className="font-display text-lg font-bold text-foreground">{event.title}</h3>
        {event.subCategory && event.subCategory !== event.title && (
          <p className="text-xs text-gold mt-0.5">{event.subCategory}</p>
        )}
        <p className="mt-2 text-sm text-foreground/60 line-clamp-2">{event.description}</p>
      </div>
    </button>
  );
}

/* ----------------------------- Upcoming Events ----------------------------- */
function UpcomingEvents({
  upcoming,
  loading,
  settings,
}: {
  upcoming: UpcomingEvent[];
  loading: boolean;
  settings: any;
}) {
  const waLink = settings.whatsapp ? `https://wa.me/91${settings.whatsapp}` : '#';
  const phone = settings.phone || '';

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Schedule"
            title="Upcoming Events"
            titleHi="आगामी कार्यक्रम"
            subtitle="Join us at our next live performance. Book your spot or book a similar event for yourself."
          />
        </Reveal>
        {loading ? (
          <div className="mt-10 space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 rounded-2xl bg-card animate-pulse" />)}</div>
        ) : upcoming.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-gold/15 bg-card p-10 text-center text-foreground/60">
            <Calendar className="h-10 w-10 mx-auto mb-3 opacity-50" />
            No upcoming events scheduled. Book your own!
          </div>
        ) : (
          <div className="mt-10 space-y-3">
            {upcoming.map((u, i) => {
              const d = new Date(u.eventDate);
              const day = d.getDate();
              const month = d.toLocaleDateString('en-IN', { month: 'short' });
              return (
                <Reveal key={u.id} delay={i * 80} animation="left">
                  <div className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-gold/15 bg-card p-4 sm:p-5 transition-all hover:border-gold/40 hover:shadow-lux card-lift">
                    {/* Date */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-gold-gradient text-white">
                        <span className="font-display text-2xl font-bold leading-none">{day}</span>
                        <span className="text-xs uppercase tracking-wider">{month}</span>
                      </div>
                    {u.eventTime && (
                      <div className="text-xs text-foreground/50">
                        <div>{u.eventTime}</div>
                      </div>
                    )}
                  </div>
                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-display text-lg font-bold text-foreground">{u.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/10 text-gold font-medium">{u.category}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-foreground/60">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-gold" /> {u.venue}{u.city ? `, ${u.city}` : ''}
                      </span>
                    </div>
                    {u.description && <p className="text-xs text-foreground/50 mt-1 line-clamp-1">{u.description}</p>}
                  </div>
                  {/* CTA */}
                  <div className="flex gap-2 shrink-0">
                    {u.bookingOpen && settings.whatsapp && (
                      <a href={waLink} target="_blank" rel="noreferrer">
                        <Button size="sm" className="btn-shine bg-gold-gradient text-white hover:opacity-90">
                          Book Now
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------- Artists Preview ----------------------------- */
function ArtistsPreview({ artists, loading, navigate }: { artists: Artist[]; loading: boolean; navigate: (r: Route) => void }) {
  const display = artists.slice(0, 4);
  return (
    <section className="bg-card/30 py-16 lg:py-24 border-y border-gold/10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeading kicker="Our Talent" title="Meet Our Artists" titleHi="हमारे कलाकार" align="left" />
            <Button onClick={() => navigate('artists')} variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 shrink-0 btn-shine">
              All Artists <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Reveal>
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="aspect-[3/4] rounded-2xl bg-card animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {display.map((a, i) => (
              <Reveal key={a.id} delay={i * 100} animation="up">
                <button
                  onClick={() => navigate('artists')}
                  className="group w-full rounded-2xl border border-gold/15 bg-background overflow-hidden text-left transition-all hover:-translate-y-2 hover:shadow-lux card-lift"
                >
                  <div className="relative aspect-[3/4] overflow-hidden img-zoom">
                    <img src={a.avatar} alt={a.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    {a.featured && (
                      <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-gold-gradient px-2 py-0.5 text-[10px] font-bold text-white">
                        <Star className="h-2.5 w-2.5 fill-white" /> Top
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold text-foreground">{a.name}</h3>
                    <p className="text-xs text-gold mt-0.5">{a.role}</p>
                    {a.specialty && <p className="text-xs text-foreground/50 mt-1 line-clamp-1">{a.specialty}</p>}
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------- Gallery Preview ----------------------------- */
function GalleryPreview({ data, loading, navigate }: { data: SiteData; loading: boolean; navigate: (r: Route) => void }) {
  const photos = data.gallery.filter(g => g.type === 'photo').slice(0, 6);
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeading kicker="Memories" title="Gallery Highlights" titleHi="गैलरी" align="left" />
          <Button onClick={() => navigate('gallery')} variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 shrink-0">
            View Gallery <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-square rounded-xl bg-card animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {photos.map(g => (
              <button
                key={g.id}
                onClick={() => navigate('gallery')}
                className="group relative aspect-square overflow-hidden rounded-xl border border-gold/15 bg-card"
              >
                <img src={g.thumbnail || g.url} alt={g.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-6 w-6 text-gold" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------- Testimonials ----------------------------- */
function Testimonials({ testimonials, loading }: { testimonials: Testimonial[]; loading: boolean }) {
  const [idx, setIdx] = useState(0);
  const list = testimonials.slice(0, 6);

  useEffect(() => {
    if (list.length === 0) return;
    const t = setInterval(() => setIdx(i => (i + 1) % list.length), 6000);
    return () => clearInterval(t);
  }, [list.length]);

  if (loading || list.length === 0) return null;
  const t = list[idx];

  return (
    <section className="bg-card/30 py-16 lg:py-24 border-y border-gold/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-dots opacity-50" />
      <div className="relative mx-auto max-w-4xl px-4 lg:px-8">
        <SectionHeading kicker="Reviews" title="What Clients Say" titleHi="ग्राहकों की राय" />
        <div className="mt-10 relative">
          <Quote className="absolute -top-2 -left-2 h-14 w-14 text-gold/15" />
          <div className="relative">
            <div className="flex items-center gap-1 justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn('h-5 w-5', i < t.rating ? 'text-gold fill-gold' : 'text-foreground/20')} />
              ))}
            </div>
            <p className="text-center font-display text-lg sm:text-xl lg:text-2xl text-foreground leading-relaxed italic">
              &ldquo;{t.message}&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-white font-bold">
                {t.name.charAt(0)}
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-foreground/60">{t.role}{t.event ? ` · ${t.event}` : ''}</div>
              </div>
            </div>
          </div>
        </div>
        {list.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={() => setIdx(i => (i - 1 + list.length) % list.length)} className="p-2 rounded-full border border-gold/20 text-foreground/60 hover:border-gold hover:text-gold transition-colors" aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={cn('h-1.5 rounded-full transition-all', i === idx ? 'w-6 bg-gold' : 'w-1.5 bg-foreground/20')}
                  aria-label={`Go to ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={() => setIdx(i => (i + 1) % list.length)} className="p-2 rounded-full border border-gold/20 text-foreground/60 hover:border-gold hover:text-gold transition-colors" aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ----------------------------- Contact CTA ----------------------------- */
function ContactCTA({ settings, navigate }: { settings: any; navigate: (r: Route) => void }) {
  const phone = settings.phoneDisplay || settings.phone || '';
  const whatsapp = settings.whatsapp || '';
  const waLink = whatsapp ? `https://wa.me/91${whatsapp}` : '#';

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-festive-gradient border border-gold/30 px-6 py-12 sm:px-12 sm:py-16 text-center">
          <div className="absolute inset-0 bg-pattern-dots opacity-40" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold" />
              <span className="kicker">Book Your Event</span>
              <span className="h-px w-8 bg-gold" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              अपना इवेंट बुक करें
              <span className="block text-gradient-gold mt-1">Book Your Memorable Event</span>
            </h2>
            <p className="mt-4 text-base text-foreground/70 max-w-2xl mx-auto">
              Call now or WhatsApp us to book Jagran, Hanuman Aradhna, Track Singing, or any event. Quick response guaranteed.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {phone && (
                <a href={`tel:${settings.phone}`}>
                  <Button size="lg" className="bg-maroon-gradient text-white hover:opacity-90 font-semibold shadow-lux h-12 px-7 btn-shine">
                    <Phone className="mr-2 h-4 w-4" /> {phone}
                  </Button>
                </a>
              )}
              {whatsapp && (
                <a href={waLink} target="_blank" rel="noreferrer">
                  <Button size="lg" className="bg-whatsapp text-white hover:bg-whatsapp/90 font-semibold shadow-lux h-12 px-7">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp +91 {whatsapp}
                  </Button>
                </a>
              )}
              <Button onClick={() => navigate('contact')} size="lg" variant="outline" className="border-foreground/20 text-foreground hover:bg-foreground/5 h-12 px-7">
                Booking Form
              </Button>
            </div>
            <p className="mt-5 font-hindi text-gold/80 text-sm">{settings.tagline2 || 'आपका विश्वास, हमारी पहचान'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
