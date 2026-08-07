'use client';

import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageCircle, Globe } from 'lucide-react';
import type { Route, SiteSettings } from '@/lib/types';

interface FooterProps {
  navigate: (route: Route) => void;
  settings: SiteSettings;
}

export function Footer({ navigate, settings }: FooterProps) {
  const year = new Date().getFullYear();
  const phone = settings.phone || '';
  const phoneDisplay = settings.phoneDisplay || phone;
  const whatsapp = settings.whatsapp || '';
  const email = settings.email || '';
  const website = settings.website || '';
  const waLink = whatsapp ? `https://wa.me/91${whatsapp}` : '#';

  return (
    <footer className="mt-auto bg-background border-t border-gold/20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient">
                <Sparkles className="h-5 w-5 text-maroon" />
              </span>
              <div>
                <div className="font-display text-lg font-bold text-foreground">
                  Rahul<span className="text-gradient-gold">EventsNight</span>
                </div>
                {settings.companyNameHindi && (
                  <div className="font-hindi text-sm text-gold">{settings.companyNameHindi}</div>
                )}
              </div>
            </div>
            <p className="text-sm text-foreground/60 leading-relaxed">
              {settings.tagline} — {settings.taglineHindi}
            </p>
            <p className="mt-2 font-hindi text-sm text-gold/80">{settings.tagline2}</p>
            <div className="flex gap-2 mt-5">
              {settings.instagram && (
                <a href={settings.instagram} aria-label="Instagram" className="p-2 rounded-full border border-gold/20 hover:border-gold hover:text-gold transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {settings.facebook && (
                <a href={settings.facebook} aria-label="Facebook" className="p-2 rounded-full border border-gold/20 hover:border-gold hover:text-gold transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {settings.youtube && (
                <a href={settings.youtube} aria-label="YouTube" className="p-2 rounded-full border border-gold/20 hover:border-gold hover:text-gold transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {([
                ['home', 'Home'],
                ['about', 'About Us'],
                ['events', 'Events'],
                ['gallery', 'Gallery'],
                ['artists', 'Artists'],
                ['videos', 'Videos'],
                ['contact', 'Contact'],
              ] as [Route, string][]).map(([r, label]) => (
                <li key={r}>
                  <button onClick={() => navigate(r)} className="text-foreground/60 hover:text-gold transition-colors">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-4">Our Events</h4>
            <ul className="space-y-2.5 text-sm text-foreground/60">
              <li>🛕 Jagran & Hanuman Aradhna</li>
              <li>🎤 Track Singing & Live Singing</li>
              <li>💍 Wedding & Sangeet Night</li>
              <li>🎉 Birthday & Anniversary</li>
              <li>🏢 Corporate Functions</li>
              <li>🎭 Live Band Shows</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-medium mb-4">Contact & Booking</h4>
            <ul className="space-y-3 text-sm text-foreground/60">
              {phoneDisplay && (
                <li>
                  <a href={`tel:${phone}`} className="flex items-start gap-2.5 hover:text-gold transition-colors">
                    <Phone className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                    <span>
                      <div className="text-xs text-foreground/40">Call</div>
                      <div className="font-semibold text-foreground">{phoneDisplay}</div>
                    </span>
                  </a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a href={waLink} target="_blank" rel="noreferrer" className="flex items-start gap-2.5 hover:text-gold transition-colors">
                    <MessageCircle className="h-4 w-4 text-whatsapp mt-0.5 shrink-0" />
                    <span>
                      <div className="text-xs text-foreground/40">WhatsApp</div>
                      <div className="font-semibold text-foreground">+91 {whatsapp}</div>
                    </span>
                  </a>
                </li>
              )}
              {email && (
                <li className="flex items-start gap-2.5">
                  <Mail className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-gold transition-colors break-all">{email}</a>
                </li>
              )}
              {website && (
                <li className="flex items-start gap-2.5">
                  <Globe className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span>{website}</span>
                </li>
              )}
              {settings.address && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                  <span>{settings.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-foreground/40">
            © {year} RahulEventsNight. All rights reserved.
          </p>
          <button
            onClick={() => navigate('admin')}
            className="text-xs text-foreground/30 hover:text-gold transition-colors"
          >
            Admin Login
          </button>
        </div>
      </div>
    </footer>
  );
}
