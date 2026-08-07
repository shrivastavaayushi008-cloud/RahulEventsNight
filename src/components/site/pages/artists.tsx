'use client';

import { useState, useMemo } from 'react';
import { Phone, MessageCircle, Star, Youtube, Instagram, Facebook, Mic, Music, Users as UsersIcon, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/site/section-heading';
import type { SiteData } from '@/hooks/use-site-data';
import type { Route, Artist } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PageProps {
  data: SiteData;
  loading: boolean;
  navigate: (r: Route, p?: string) => void;
}

const ROLE_FILTERS = ['all', 'Singer', 'Anchor', 'Musician', 'Band Member', 'Organiser'];
const ROLE_ICONS: Record<string, any> = {
  Singer: Mic,
  Anchor: User,
  Musician: Music,
  'Band Member': UsersIcon,
  Organiser: Briefcase,
};

export function ArtistsPage({ data, loading, navigate }: PageProps) {
  const [role, setRole] = useState('all');
  const filtered = useMemo(() => {
    if (role === 'all') return data.artists;
    return data.artists.filter(a => a.role.toLowerCase().includes(role.toLowerCase()));
  }, [data.artists, role]);

  return (
    <>
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            kicker="Our Talent"
            title="Meet Our Artists"
            titleHi="हमारे कलाकार"
            subtitle="Singers, anchors, musicians, and band members — the talented people behind every memorable performance."
          />
        </div>
      </section>

      <section className="bg-background sticky top-16 lg:top-20 z-30 border-b border-gold/10 py-3">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 flex gap-2 overflow-x-auto no-scrollbar">
          {ROLE_FILTERS.map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={cn('px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all capitalize',
                role === r ? 'bg-gold-gradient text-white' : 'border border-gold/20 text-foreground/60 hover:border-gold/50 hover:text-gold')}
            >
              {r === 'all' ? 'All Artists' : r + 's'}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-background py-10 lg:py-14 flex-1">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-card overflow-hidden">
                  <div className="aspect-[3/4] animate-pulse bg-muted" />
                  <div className="p-4 space-y-2"><div className="h-4 w-2/3 bg-muted animate-pulse rounded" /><div className="h-3 w-1/2 bg-muted animate-pulse rounded" /></div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-foreground/60">
              <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
              No artists found.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map(a => <ArtistCard key={a.id} artist={a} navigate={navigate} />)}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card/30 py-14 border-t border-gold/10">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h3 className="font-display text-2xl sm:text-3xl font-bold">
            Want to <span className="text-gradient-gold">book an artist?</span>
          </h3>
          <p className="mt-2 text-foreground/60">Call or WhatsApp to check availability for your event date.</p>
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

function ArtistCard({ artist, navigate }: { artist: Artist; navigate: (r: Route) => void }) {
  const RoleIcon = ROLE_ICONS[artist.role] || User;
  return (
    <div className="group rounded-2xl border border-gold/15 bg-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lux">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img src={artist.avatar} alt={artist.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        {artist.featured && (
          <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-gold-gradient px-2 py-0.5 text-[10px] font-bold text-maroon">
            <Star className="h-2.5 w-2.5 fill-maroon" /> Top
          </span>
        )}
        {artist.phone && (
          <a
            href={`tel:${artist.phone}`}
            className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient text-white opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={`Call ${artist.name}`}
            onClick={e => e.stopPropagation()}
          >
            <Phone className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1.5 text-gold text-xs mb-1">
          <RoleIcon className="h-3.5 w-3.5" />
          {artist.role}
        </div>
        <h3 className="font-display text-base font-bold">{artist.name}</h3>
        {artist.specialty && <p className="text-xs text-foreground/60 mt-0.5">{artist.specialty}</p>}
        {artist.bio && <p className="text-xs text-foreground/50 mt-2 line-clamp-2 leading-relaxed">{artist.bio}</p>}
        {artist.social && Object.keys(artist.social).length > 0 && (
          <div className="mt-3 flex gap-1.5">
            {artist.social.youtube && (
              <a href={artist.social.youtube} className="p-1.5 rounded-md border border-gold/15 hover:border-gold hover:text-gold transition-colors" aria-label="YouTube">
                <Youtube className="h-3.5 w-3.5" />
              </a>
            )}
            {artist.social.instagram && (
              <a href={artist.social.instagram} className="p-1.5 rounded-md border border-gold/15 hover:border-gold hover:text-gold transition-colors" aria-label="Instagram">
                <Instagram className="h-3.5 w-3.5" />
              </a>
            )}
            {artist.social.facebook && (
              <a href={artist.social.facebook} className="p-1.5 rounded-md border border-gold/15 hover:border-gold hover:text-gold transition-colors" aria-label="Facebook">
                <Facebook className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
