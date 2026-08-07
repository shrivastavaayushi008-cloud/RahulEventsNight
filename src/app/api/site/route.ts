import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError } from '@/lib/api';

export async function GET(_req: NextRequest) {
  try {
    const [events, gallery, testimonials, artists, videos, upcoming, settingsList] = await Promise.all([
      db.event.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } }),
      db.galleryItem.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' }, take: 12 }),
      db.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' }, take: 8 }),
      db.artist.findMany({ where: { published: true }, orderBy: { order: 'asc' } }),
      db.video.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } }),
      db.upcomingEvent.findMany({ where: { published: true }, orderBy: { eventDate: 'asc' } }),
      db.siteSetting.findMany(),
    ]);
    const settings: Record<string, string> = {};
    for (const s of settingsList) settings[s.key] = s.value;

    const parsedEvents = events.map(e => ({ ...e, gallery: e.gallery ? JSON.parse(e.gallery) : [] }));
    const parsedArtists = artists.map(a => ({ ...a, social: a.social ? JSON.parse(a.social) : {} }));

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
