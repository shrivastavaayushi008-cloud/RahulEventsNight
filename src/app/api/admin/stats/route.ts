import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';

export async function GET(_req: NextRequest) {
  try {
    await requireAdmin();
    const [events, gallery, artists, videos, upcoming, testimonials, inquiries] = await Promise.all([
      db.event.count(),
      db.galleryItem.count(),
      db.artist.count(),
      db.video.count(),
      db.upcomingEvent.count(),
      db.testimonial.count(),
      db.inquiry.count(),
    ]);
    const newInquiries = await db.inquiry.count({ where: { status: 'new' } });
    return ok({ events, gallery, artists, videos, upcoming, testimonials, inquiries, newInquiries });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
