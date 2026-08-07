import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized, bad } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';
import { z } from 'zod';

export async function GET(_req: NextRequest) {
  try {
    await requireAdmin();
    const services = await db.service.findMany({ orderBy: { order: 'asc' } });
    const parsed = services.map(s => ({ ...s, features: s.features ? JSON.parse(s.features) : [] }));
    return ok({ services: parsed });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

const createSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  icon: z.string().default('Sparkles'),
  shortDesc: z.string().min(5),
  description: z.string().min(10),
  features: z.array(z.string()).optional(),
  image: z.string().min(5),
  price: z.string().optional().nullable(),
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
    const service = await db.service.create({
      data: {
        name: d.name,
        slug: d.slug,
        icon: d.icon,
        shortDesc: d.shortDesc,
        description: d.description,
        features: d.features ? JSON.stringify(d.features) : null,
        image: d.image,
        price: d.price || null,
        order: d.order ?? 0,
        published: d.published ?? true,
      },
    });
    return ok({ service }, { status: 201 });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
