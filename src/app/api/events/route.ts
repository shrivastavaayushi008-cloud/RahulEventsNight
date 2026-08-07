import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError } from '@/lib/api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');

    const where: any = { published: true };
    if (featured === 'true') where.featured = true;
    if (category) where.category = category;

    const events = await db.event.findMany({ where, orderBy: { createdAt: 'desc' } });
    const parsed = events.map(e => ({ ...e, gallery: e.gallery ? JSON.parse(e.gallery) : [] }));
    return ok({ events: parsed });
  } catch (e: any) {
    return serverError(e.message);
  }
}
