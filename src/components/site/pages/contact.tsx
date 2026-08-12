'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Youtube, Send, CheckCircle2, Loader2, Globe, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SectionHeading } from '@/components/site/section-heading';
import type { SiteData } from '@/hooks/use-site-data';
import type { Route } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { EVENT_CATEGORIES } from '@/lib/types';

interface PageProps {
  data: SiteData;
  loading: boolean;
  navigate: (r: Route, p?: string) => void;
}

const EVENT_TYPES = [
  '🛕 Jagran', '🕉️ Hanuman Aradhna', '🕉️ Mata Ki Chowki', '📖 Sundarkand Path',
  '📖 Ram Katha', '🎵 Bhajan Sandhya', '📖 Shiv Katha', '🕉️ Devi Jagran',
  '🎤 Track Singing', '🎤 Live Singing', '🎬 Bollywood Night', '🎶 Sufi Night',
  '🎶 Ghazal Night', '🎤 Karaoke Night', '💍 Wedding Singing', '💃 Sangeet Night',
  '🎉 Birthday Party', '❤️ Anniversary', '👶 Baby Shower', '🏠 Griha Pravesh',
  '🏢 Corporate Function', '🎭 Cultural Program', '🎸 Live Band', 'Other',
];

export function ContactPage({ data, loading, navigate }: PageProps) {
  const settings = data.settings;
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', eventDate: '', eventType: '', message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Submission failed');
      }
      setSuccess(true);
      toast({ title: 'Booking request sent!', description: 'We will call you back within 24 hours.' });
      setForm({ name: '', phone: '', email: '', eventDate: '', eventType: '', message: '' });
    } catch (err: any) {
      toast({ title: 'Could not send', description: err.message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const whatsapp = settings.whatsapp || '';
  const phone = settings.phone || '';
  const phoneDisplay = settings.phoneDisplay || phone;
  const waLink = whatsapp ? `https://wa.me/91${whatsapp}` : '#';
  const waMsg = whatsapp ? `https://wa.me/91${whatsapp}?text=${encodeURIComponent('Hi, I want to book an event with RahulEventsNight.')}` : '#';

  return (
    <>
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            kicker="Get in Touch"
            title="Contact & Booking"
            titleHi="संपर्क एवं बुकिंग"
            subtitle="Book your event or ask any question. We respond quickly — call or WhatsApp anytime."
          />
        </div>
      </section>

      {/* Phone banner - very prominent */}
      <section className="bg-background py-6">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {phone && (
              <a href={`tel:${phone}`} className="group flex items-center gap-4 rounded-2xl bg-maroon-gradient border border-gold/30 p-5 transition-all hover:shadow-lux">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur text-white shadow-lux">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/70">Call for Booking</div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-gold transition-colors">{phoneDisplay}</div>
                </div>
              </a>
            )}
            {whatsapp && (
              <a href={waMsg} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl bg-card border border-whatsapp/30 p-5 transition-all hover:shadow-lux">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lux">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-foreground/60">WhatsApp Booking</div>
                  <div className="font-display text-2xl font-bold text-foreground group-hover:text-whatsapp transition-colors">+91 {whatsapp}</div>
                </div>
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="bg-background py-10 lg:py-14 flex-1">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-gold/15 bg-card p-6 sm:p-8 shadow-lux">
              {success ? (
                <div className="text-center py-10">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-maroon-gradient shadow-lux">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">Booking request received!</h3>
                  <p className="mt-2 text-foreground/60 max-w-md mx-auto">
                    Thank you! Our team will call you back within 24 hours. For urgent booking, please call or WhatsApp.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {phone && (
                      <a href={`tel:${phone}`}>
                        <Button className="bg-gold-gradient text-white hover:opacity-90"><Phone className="mr-2 h-4 w-4" /> Call Now</Button>
                      </a>
                    )}
                    <Button onClick={() => setSuccess(false)} variant="outline">Send Another</Button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-xl font-bold mb-1">Book Your Event</h2>
                  <p className="text-sm text-foreground/60 mb-6">Fill the form and we will call you back. All * fields are required.</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="bg-background" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input id="phone" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" className="bg-background" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="bg-background" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="eventDate">Event Date</Label>
                        <Input id="eventDate" type="date" value={form.eventDate} onChange={e => setForm({ ...form, eventDate: e.target.value })} className="bg-background" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="eventType">Event Type</Label>
                        <select
                          id="eventType"
                          value={form.eventType}
                          onChange={e => setForm({ ...form, eventType: e.target.value })}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Select event type…</option>
                          {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message" required rows={4}
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your event — date, venue, number of guests, what you're looking for…"
                        className="bg-background resize-none"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button type="submit" disabled={submitting} className="bg-maroon-gradient text-white hover:opacity-90 font-semibold shadow-lux h-12 px-6 flex-1 btn-shine">
                        {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</> : <><Send className="mr-2 h-4 w-4" /> Send Booking Request</>}
                      </Button>
                      {whatsapp && (
                        <a href={waMsg} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none">
                          <Button type="button" className="w-full bg-whatsapp text-white hover:bg-whatsapp/90 font-semibold shadow-lux h-12 px-6">
                            <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us
                          </Button>
                        </a>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-gold/15 bg-card p-5">
              <h3 className="font-display text-base font-bold mb-4">Contact Details</h3>
              <ul className="space-y-3">
                {phoneDisplay && (
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold"><Phone className="h-4 w-4" /></div>
                    <div>
                      <div className="text-xs text-foreground/50 uppercase tracking-wider">Phone</div>
                      <a href={`tel:${phone}`} className="text-sm font-semibold hover:text-gold transition-colors">{phoneDisplay}</a>
                    </div>
                  </li>
                )}
                {whatsapp && (
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-whatsapp/15 text-whatsapp"><MessageCircle className="h-4 w-4" /></div>
                    <div>
                      <div className="text-xs text-foreground/50 uppercase tracking-wider">WhatsApp</div>
                      <a href={waLink} target="_blank" rel="noreferrer" className="text-sm font-semibold hover:text-whatsapp transition-colors">+91 {whatsapp}</a>
                    </div>
                  </li>
                )}
                {settings.email && (
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold"><Mail className="h-4 w-4" /></div>
                    <div>
                      <div className="text-xs text-foreground/50 uppercase tracking-wider">Email</div>
                      <a href={`mailto:${settings.email}`} className="text-sm font-semibold hover:text-gold transition-colors break-all">{settings.email}</a>
                    </div>
                  </li>
                )}
                {settings.website && (
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold"><Globe className="h-4 w-4" /></div>
                    <div>
                      <div className="text-xs text-foreground/50 uppercase tracking-wider">Website</div>
                      <span className="text-sm font-semibold">{settings.website}</span>
                    </div>
                  </li>
                )}
                {settings.address && (
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold"><MapPin className="h-4 w-4" /></div>
                    <div>
                      <div className="text-xs text-foreground/50 uppercase tracking-wider">Area</div>
                      <span className="text-sm font-semibold">{settings.address}</span>
                    </div>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold"><Clock className="h-4 w-4" /></div>
                  <div>
                    <div className="text-xs text-foreground/50 uppercase tracking-wider">Hours</div>
                    <span className="text-sm font-semibold">24/7 Booking Available</span>
                  </div>
                </li>
              </ul>

              {/* Socials */}
              <div className="mt-5 pt-4 border-t border-gold/10">
                <div className="text-xs text-foreground/50 uppercase tracking-wider mb-2">Follow Us</div>
                <div className="flex gap-2">
                  {settings.instagram && <a href={settings.instagram} aria-label="Instagram" className="p-2 rounded-full border border-gold/15 hover:border-gold hover:text-gold transition-colors"><Instagram className="h-4 w-4" /></a>}
                  {settings.facebook && <a href={settings.facebook} aria-label="Facebook" className="p-2 rounded-full border border-gold/15 hover:border-gold hover:text-gold transition-colors"><Facebook className="h-4 w-4" /></a>}
                  {settings.youtube && <a href={settings.youtube} aria-label="YouTube" className="p-2 rounded-full border border-gold/15 hover:border-gold hover:text-gold transition-colors"><Youtube className="h-4 w-4" /></a>}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl border border-gold/15 bg-card p-2 overflow-hidden">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                <iframe
                  title="RahulEventsNight Location - Attardah Pokhariyapith"
                  src="https://www.google.com/maps?q=Attardah+Pokhariyapith+Ujjwal+Vidyapith+School+842002&output=embed"
                  width="100%" height="100%" style={{ border: 0, minHeight: '260px' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
