import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError } from '@/lib/api';

export async function GET(_req: NextRequest) {
  try {
    const videos = await db.video.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
    return ok({ videos });
  } catch (e: any) {
    return serverError(e.message);
  }
}
