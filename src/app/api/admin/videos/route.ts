import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized, bad } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

export async function GET(_req: NextRequest) {
  try {
    await requireAdmin();
    const items = await db.video.findMany({ orderBy: { createdAt: 'desc' } });
    return ok({ items });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

const schema = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  youtubeId: z.string().min(5),
  thumbnail: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  published: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return bad(parsed.error.issues[0]?.message || 'Invalid');
    const d = parsed.data;
    const item = await db.video.create({
      data: {
        title: d.title,
        category: d.category,
        youtubeId: d.youtubeId,
        thumbnail: d.thumbnail || `https://img.youtube.com/vi/${d.youtubeId}/maxresdefault.jpg`,
        description: d.description || null,
        duration: d.duration || null,
        published: d.published ?? true,
      },
    });
    return ok({ item }, { status: 201 });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
