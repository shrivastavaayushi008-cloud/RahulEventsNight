import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized, bad } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

export async function GET(_req: NextRequest) {
  try {
    await requireAdmin();
    const items = await db.upcomingEvent.findMany({ orderBy: { eventDate: 'asc' } });
    return ok({ items });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

const schema = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  eventDate: z.string().min(5),
  eventTime: z.string().optional().nullable(),
  venue: z.string().min(2),
  city: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  bookingOpen: z.boolean().optional(),
  published: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return bad(parsed.error.issues[0]?.message || 'Invalid');
    const d = parsed.data;
    const item = await db.upcomingEvent.create({
      data: {
        title: d.title,
        category: d.category,
        eventDate: d.eventDate,
        eventTime: d.eventTime || null,
        venue: d.venue,
        city: d.city || null,
        description: d.description || null,
        coverImage: d.coverImage || null,
        bookingOpen: d.bookingOpen ?? true,
        published: d.published ?? true,
      },
    });
    return ok({ item }, { status: 201 });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
