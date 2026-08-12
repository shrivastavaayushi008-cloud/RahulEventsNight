'use client';

import {
  Heart, Cake, Building2, Music, Camera, Video, Sparkles, Speaker,
  Check, ArrowRight, Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/site/section-heading';
import { useSiteData } from '@/hooks/use-site-data';
import type { SiteData } from '@/hooks/use-site-data';
import type { Route } from '@/lib/types';

const ICONS: Record<string, any> = {
  Heart, Cake, Building2, Music, Camera, Video, Sparkles, Speaker,
};

interface PageProps {
  data: SiteData;
  loading: boolean;
  navigate: (r: Route, p?: string) => void;
}

export function ServicesPage({ data, loading, navigate }: PageProps) {
  return (
    <>
      <ServicesHero />
      <ServicesList services={data.services} loading={loading} navigate={navigate} />
      <Process />
      <Pricing />
      <CTA navigate={navigate} phone={data.settings.phone} />
    </>
  );
}

function ServicesHero() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src="/images/services/decoration.jpg" alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-gold" />
            <span className="kicker">Our Services</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Eight specialised services.
            <span className="block text-gradient-gold">One relentless standard.</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
            From the first sketch to the final toast, every service below is delivered by an
            in-house specialist — no outsourcing, no compromise. Pick what you need, or hand us
            the whole production.
          </p>
        </div>
      </div>
    </section>
  );
}

function ServicesList({
  services,
  loading,
  navigate,
}: {
  services: SiteData['services'];
  loading: boolean;
  navigate: (r: Route) => void;
}) {
  if (loading) {
    return (
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="aspect-[4/3] rounded-3xl bg-muted animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 w-2/3 bg-muted animate-pulse rounded" />
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon] || Sparkles;
          const reversed = i % 2 === 1;
          return (
            <div
              key={s.id}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              {/* Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lux">
                  <img src={s.image} alt={s.name} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-gold/10 rounded-3xl" />
                </div>
                <div className="absolute -bottom-5 -left-5 sm:-bottom-6 sm:-left-6 hidden sm:flex items-center gap-3 bg-black border border-gold/30 rounded-2xl px-5 py-3 shadow-lux">
                  <Icon className="h-6 w-6 text-gold" />
                  <span className="text-xs uppercase tracking-wider text-white/60">{s.price || 'Custom Quote'}</span>
                </div>
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-5xl font-bold text-gold/30">0{i + 1}</span>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">{s.name}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{s.description}</p>
                {s.features && s.features.length > 0 && (
                  <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    onClick={() => navigate('contact')}
                    className="bg-gold-gradient text-black hover:opacity-90 font-semibold shadow-gold"
                  >
                    Enquire Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => navigate('gallery')}
                    variant="outline"
                    className="border-border"
                  >
                    See Examples
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: '01', title: 'Discovery Call', desc: 'We start with a 30-minute call to understand your vision, budget, and timeline. No obligation, no pressure.' },
    { n: '02', title: 'Concept & Quote', desc: 'Within 48 hours, you receive a tailored concept deck, a detailed quote, and a recommended production timeline.' },
    { n: '03', title: 'Pre-Production', desc: 'Once you say yes, our team takes over — venue, vendors, design, logistics. You get a single point of contact and weekly status updates.' },
    { n: '04', title: 'Event Day', desc: 'We arrive first, leave last, and run every cue. You enjoy the event; we handle everything behind the scenes.' },
    { n: '05', title: 'Delivery', desc: 'Within two weeks, you receive edited photos, films, and a full debrief. We stick around until you are thrilled.' },
  ];
  return (
    <section className="bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker="How We Work" title="Our 5-Step Process" subtitle="A clear, proven path from first call to final delivery — so you always know what's happening." light />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-white/10 bg-card p-6 transition-all hover:border-gold/40 hover:-translate-y-1"
            >
              <div className="font-display text-4xl font-bold text-gradient-gold mb-3">{s.n}</div>
              <h3 className="font-display text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 h-4 w-4 text-gold/40" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const packages = [
    {
      name: 'Essentials',
      price: '₹75,000',
      tagline: 'Small celebrations, big impact',
      features: ['Up to 50 guests', 'Theme & decor design', '1 vendor coordination', '6 hours on-site', 'Photography (4 hours)', 'Post-event debrief'],
      featured: false,
    },
    {
      name: 'Signature',
      price: '₹2,50,000',
      tagline: 'Our most popular package',
      features: ['Up to 250 guests', 'Full decor & design', 'All vendor coordination', '12 hours on-site', 'Photography + film', 'DJ (4 hours)', 'Dedicated planner'],
      featured: true,
    },
    {
      name: 'Bespoke',
      price: 'Custom',
      tagline: 'Multi-day, multi-city productions',
      features: ['Unlimited guests', 'Multi-day planning', 'Venue scouting', 'Cinema-grade film crew', 'Live streaming', 'Concert sound & lights', '24/7 concierge'],
      featured: false,
    },
  ];
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker="Packages" title="Transparent Pricing" subtitle="Three starting points. Every package is fully customisable — treat these as a baseline, not a ceiling." />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {packages.map((p, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-8 transition-all hover:-translate-y-1 ${
                p.featured
                  ? 'bg-black border-2 border-gold shadow-gold text-white'
                  : 'bg-card border border-border'
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold-gradient text-xs font-bold text-black">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className={`text-sm mt-1 ${p.featured ? 'text-white/60' : 'text-muted-foreground'}`}>{p.tagline}</p>
              <div className="mt-5">
                <span className={`font-display text-4xl font-bold ${p.featured ? 'text-gradient-gold' : ''}`}>{p.price}</span>
                <span className={`text-sm ml-1 ${p.featured ? 'text-white/50' : 'text-muted-foreground'}`}>onwards</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f, j) => (
                  <li key={j} className={`flex items-start gap-2 text-sm ${p.featured ? 'text-white/80' : ''}`}>
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${p.featured ? 'text-gold' : 'text-gold'}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">
          All packages include a free consultation. Final pricing depends on guest count, location, and date.
        </p>
      </div>
    </section>
  );
}

function CTA({ navigate, phone }: { navigate: (r: Route) => void; phone?: string }) {
  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 px-6 py-14 sm:px-14 text-center">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Not sure which service you need?
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">
              Tell us about your event. We will recommend the right combination of services for your vision and budget.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={() => navigate('contact')}
                size="lg"
                className="bg-gold-gradient text-black hover:opacity-90 font-semibold shadow-gold h-12 px-8"
              >
                Get a Recommendation
              </Button>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-md border border-white/30 text-white hover:bg-white/10"
                >
                  <Phone className="h-4 w-4 text-gold" /> {phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
