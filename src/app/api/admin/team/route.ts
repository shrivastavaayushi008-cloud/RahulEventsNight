import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized, bad } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

export async function GET(_req: NextRequest) {
  try {
    await requireAdmin();
    const items = await db.teamMember.findMany({ orderBy: { order: 'asc' } });
    const parsed = items.map(t => ({ ...t, social: t.social ? JSON.parse(t.social) : {} }));
    return ok({ items: parsed });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

const createSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  bio: z.string().optional().nullable(),
  avatar: z.string().min(5),
  social: z.record(z.string()).optional(),
  order: z.number().optional(),
  published: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) return bad(parsed.error.issues[0]?.message || 'Invalid');
    const d = parsed.data;
    const item = await db.teamMember.create({
      data: {
        name: d.name,
        role: d.role,
        bio: d.bio || null,
        avatar: d.avatar,
        social: d.social ? JSON.stringify(d.social) : null,
        order: d.order ?? 0,
        published: d.published ?? true,
      },
    });
    return ok({ item }, { status: 201 });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
