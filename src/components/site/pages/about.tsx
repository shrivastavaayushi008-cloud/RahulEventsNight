'use client';

import { Sparkles, Target, Eye, Heart, Award, Users, Music, Phone, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/site/section-heading';
import type { SiteData } from '@/hooks/use-site-data';
import type { Route } from '@/lib/types';

interface PageProps {
  data: SiteData;
  loading: boolean;
  navigate: (r: Route, p?: string) => void;
}

export function AboutPage({ data, loading, navigate }: PageProps) {
  const settings = data.settings;
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-card/30 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-gold" />
              <span className="kicker font-hindi">हमारे बारे में</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              About <span className="text-gradient-gold">RahulEventsNight</span>
            </h1>
            <p className="mt-3 font-hindi text-2xl text-gold">राहुल इवेंट्स नाईट</p>
            <p className="mt-5 text-lg text-foreground/70 leading-relaxed">
              {settings.tagline} — {settings.taglineHindi}. We specialise in Jagran, Hanuman Aradhna, Track Singing,
              and Wedding Song Events, bringing devotion and celebration together on one stage.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-maroon-gradient border-y border-gold/15 py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: settings.stats_events || '500+', label: 'Events Done', icon: Calendar },
              { value: settings.stats_clients || '1000+', label: 'Happy Clients', icon: Users },
              { value: settings.stats_years || '15', label: 'Years Experience', icon: Award },
              { value: settings.stats_artists || '25+', label: 'Expert Artists', icon: Music },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <s.icon className="h-6 w-6 text-gold mx-auto mb-2" />
                <div className="font-display text-3xl sm:text-4xl font-bold text-gradient-gold">{s.value}</div>
                <div className="mt-1 text-xs sm:text-sm uppercase tracking-wider text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-lux border border-gold/20">
              <img src="/images/hero/hero-jagran.png" alt="Jagran event" className="h-full w-full object-cover" />
            </div>
          </div>
          <div>
            <SectionHeading kicker="Our Story" title="हर पल यादगार" align="left" />
            <div className="mt-5 space-y-4 text-foreground/70 leading-relaxed">
              <p>
                RahulEventsNight was founded with a single mission — to bring professional live music
                and devotional singing to every celebration. For over {settings.stats_years || '15'} years, we have
                performed at hundreds of Jagrans, Hanuman Aradhnas, weddings, and private events across Delhi NCR and beyond.
              </p>
              <p>
                Our team features trained classical singers, bhajan specialists, Bollywood vocalists, Sufi performers,
                and a full live band. Whether it is an overnight Jagran, a romantic sangeet night, or a high-energy
                Bollywood party, we bring the same dedication and professionalism to every event.
              </p>
              <p className="font-hindi text-gold">
                {settings.tagline2 || 'आपका विश्वास, हमारी पहचान'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-card/30 py-16 lg:py-24 border-y border-gold/10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading kicker="Our Values" title="हमारी प्रतिबद्धता" titleHi="What We Stand For" />
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              { icon: Target, title: 'Mission', desc: 'To make every event memorable with soulful live music — whether devotional or celebratory.' },
              { icon: Eye, title: 'Vision', desc: 'To be the most trusted name for Jagran, singing, and wedding events across India.' },
              { icon: Heart, title: 'Values', desc: 'Devotion, punctuality, and quality. We treat every event as our own family celebration.' },
            ].map((v, i) => (
              <div key={i} className="rounded-2xl border border-gold/15 bg-background p-7">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading kicker="Why Us" title="Why Choose RahulEventsNight?" titleHi="क्यों चुनें हमें" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Music, title: 'Expert Artists', desc: 'Trained classical and Bollywood singers, harmonium, tabla, and full band.' },
              { icon: Calendar, title: 'On-Time', desc: 'We arrive early, setup on time, and perform as scheduled. Every single event.' },
              { icon: Sparkles, title: 'Premium Setup', desc: 'Professional sound system, stage lighting, and decor for every performance.' },
              { icon: Heart, title: 'Devotional & Fun', desc: 'From soulful Jagrans to energetic sangeet nights — we do both with equal passion.' },
            ].map((v, i) => (
              <div key={i} className="rounded-2xl border border-gold/15 bg-card p-6">
                <div className="font-display text-3xl font-bold text-gradient-gold mb-3">0{i + 1}</div>
                <v.icon className="h-6 w-6 text-gold mb-2" />
                <h3 className="font-display text-base font-bold">{v.title}</h3>
                <p className="mt-1.5 text-sm text-foreground/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card/30 py-16 border-t border-gold/10">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-festive-gradient border border-gold/30 px-6 py-12 sm:px-12 text-center">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Ready to <span className="text-gradient-gold">book your event?</span>
              </h2>
              <p className="mt-3 text-foreground/70">Call now or WhatsApp for instant booking.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {settings.phone && (
                  <a href={`tel:${settings.phone}`}>
                    <Button size="lg" className="bg-gold-gradient text-white hover:opacity-90 font-semibold shadow-gold h-12 px-7">
                      <Phone className="mr-2 h-4 w-4" /> {settings.phoneDisplay || settings.phone}
                    </Button>
                  </a>
                )}
                <Button onClick={() => navigate('contact')} size="lg" variant="outline" className="border-gold/30 hover:bg-gold/10 h-12 px-7">
                  Booking Form
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
