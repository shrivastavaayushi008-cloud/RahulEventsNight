import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError } from '@/lib/api';

export async function GET(_req: NextRequest) {
  try {
    let events: any[] = [];
    let gallery: any[] = [];
    let testimonials: any[] = [];
    let artists: any[] = [];
    let videos: any[] = [];
    let upcoming: any[] = [];
    let settingsList: any[] = [];

    try {
      [events, gallery, testimonials, artists, videos, upcoming, settingsList] = await Promise.all([
        db.event.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } }).catch(() => []),
        db.galleryItem.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' }, take: 12 }).catch(() => []),
        db.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' }, take: 8 }).catch(() => []),
        db.artist.findMany({ where: { published: true }, orderBy: { order: 'asc' } }).catch(() => []),
        db.video.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } }).catch(() => []),
        db.upcomingEvent.findMany({ where: { published: true }, orderBy: { eventDate: 'asc' } }).catch(() => []),
        db.siteSetting.findMany().catch(() => []),
      ]);
    } catch (e) {
      // Database not seeded or not accessible — return empty data
      console.error('DB error:', e);
    }

    const settings: Record<string, string> = {};
    for (const s of settingsList) settings[s.key] = s.value;

    // Fallback defaults (in case DB is not seeded)
    const DEFAULTS: Record<string, string> = {
      companyName: 'RahulEventsNight',
      companyNameHindi: 'राहुल इवेंट्स नाईट',
      tagline: 'Every Event, Every Emotion, One Stage',
      taglineHindi: 'हर पल यादगार, हर इवेंट शानदार',
      tagline2: 'आपका विश्वास, हमारी पहचान',
      phone: '9709954777',
      phoneDisplay: '+91 97099 54777',
      whatsapp: '7979962408',
      email: 'officialrohit0201@gmail.com',
      website: 'rahuleventsnight.online',
      address: 'Attardah Pokhariyapith near Ujjwal Vidyapith School 842002',
      stats_events: '500+',
      stats_clients: '1000+',
      stats_years: '15',
      stats_artists: '25+',
    };
    for (const [k, v] of Object.entries(DEFAULTS)) {
      if (!settings[k]) settings[k] = v;
    }

    const parsedEvents = events.map(e => ({ ...e, gallery: e.gallery ? (typeof e.gallery === 'string' ? JSON.parse(e.gallery) : e.gallery) : [] }));
    const parsedArtists = artists.map(a => ({ ...a, social: a.social ? (typeof a.social === 'string' ? JSON.parse(a.social) : a.social) : {} }));

    return ok({
      events: parsedEvents,
      gallery,
      testimonials,
      artists: parsedArtists,
      videos,
      upcoming,
      settings,
    });
  } catch (e: any) {
    return serverError(e.message);
  }
}
