import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized, bad } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

export async function GET(_req: NextRequest) {
  try {
    await requireAdmin();
    const items = await db.artist.findMany({ orderBy: { order: 'asc' } });
    const parsed = items.map(a => ({ ...a, social: a.social ? JSON.parse(a.social) : {} }));
    return ok({ items: parsed });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

const schema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  specialty: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().min(5),
  phone: z.string().optional().nullable(),
  social: z.record(z.string()).optional(),
  order: z.number().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return bad(parsed.error.issues[0]?.message || 'Invalid');
    const d = parsed.data;
    const item = await db.artist.create({
      data: {
        name: d.name,
        role: d.role,
        specialty: d.specialty || null,
        bio: d.bio || null,
        avatar: d.avatar,
        phone: d.phone || null,
        social: d.social ? JSON.stringify(d.social) : null,
        order: d.order ?? 0,
        featured: d.featured ?? false,
        published: d.published ?? true,
      },
    });
    return ok({ item }, { status: 201 });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
