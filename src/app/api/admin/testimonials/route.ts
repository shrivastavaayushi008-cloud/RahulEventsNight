import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized, bad } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

export async function GET(_req: NextRequest) {
  try {
    await requireAdmin();
    const items = await db.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
    return ok({ items });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

const createSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  company: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  rating: z.number().min(1).max(5).default(5),
  message: z.string().min(5),
  event: z.string().optional().nullable(),
  published: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) return bad(parsed.error.issues[0]?.message || 'Invalid');
    const d = parsed.data;
    const item = await db.testimonial.create({
      data: {
        name: d.name,
        role: d.role,
        company: d.company || null,
        avatar: d.avatar || null,
        rating: d.rating,
        message: d.message,
        event: d.event || null,
        published: d.published ?? true,
      },
    });
    return ok({ item }, { status: 201 });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
