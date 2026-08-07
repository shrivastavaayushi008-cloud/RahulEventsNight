import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError } from '@/lib/api';

export async function GET(_req: NextRequest) {
  try {
    const artists = await db.artist.findMany({ where: { published: true }, orderBy: { order: 'asc' } });
    const parsed = artists.map(a => ({ ...a, social: a.social ? JSON.parse(a.social) : {} }));
    return ok({ artists: parsed });
  } catch (e: any) {
    return serverError(e.message);
  }
}
