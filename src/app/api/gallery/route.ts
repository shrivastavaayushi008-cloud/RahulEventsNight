import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError } from '@/lib/api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    const where: any = { published: true };
    if (category && category !== 'All') where.category = category;
    if (type && type !== 'all') where.type = type;

    const items = await db.galleryItem.findMany({ where, orderBy: { createdAt: 'desc' } });
    return ok({ items });
  } catch (e: any) {
    return serverError(e.message);
  }
}
