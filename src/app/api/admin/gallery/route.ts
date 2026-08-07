import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized, bad } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

export async function GET(_req: NextRequest) {
  try {
    await requireAdmin();
    const items = await db.galleryItem.findMany({ orderBy: { createdAt: 'desc' } });
    return ok({ items });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

const createSchema = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  type: z.enum(['photo', 'video']),
  url: z.string().min(5),
  thumbnail: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  eventDate: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  published: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) return bad(parsed.error.issues[0]?.message || 'Invalid');
    const d = parsed.data;
    const item = await db.galleryItem.create({
      data: {
        title: d.title,
        category: d.category,
        type: d.type,
        url: d.url,
        thumbnail: d.thumbnail || d.url,
        description: d.description || null,
        eventDate: d.eventDate || null,
        location: d.location || null,
        published: d.published ?? true,
      },
    });
    return ok({ item }, { status: 201 });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
