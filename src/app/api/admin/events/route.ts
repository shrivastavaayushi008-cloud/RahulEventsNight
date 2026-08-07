import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized, bad, notFound } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

export async function GET(_req: NextRequest) {
  try {
    await requireAdmin();
    const events = await db.event.findMany({ orderBy: { createdAt: 'desc' } });
    const parsed = events.map(e => ({ ...e, gallery: e.gallery ? JSON.parse(e.gallery) : [] }));
    return ok({ events: parsed });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

const createSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(5),
  longDesc: z.string().optional().nullable(),
  coverImage: z.string().min(5),
  gallery: z.array(z.string()).optional(),
  eventDate: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) return bad(parsed.error.issues[0]?.message || 'Invalid');
    const d = parsed.data;
    const event = await db.event.create({
      data: {
        title: d.title,
        slug: d.slug,
        category: d.category,
        description: d.description,
        longDesc: d.longDesc || null,
        coverImage: d.coverImage,
        gallery: d.gallery ? JSON.stringify(d.gallery) : null,
        eventDate: d.eventDate || null,
        location: d.location || null,
        featured: d.featured ?? false,
        published: d.published ?? true,
      },
    });
    return ok({ event }, { status: 201 });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
