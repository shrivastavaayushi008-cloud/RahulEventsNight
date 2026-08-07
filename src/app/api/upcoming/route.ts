import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError } from '@/lib/api';

export async function GET(_req: NextRequest) {
  try {
    const upcoming = await db.upcomingEvent.findMany({ where: { published: true }, orderBy: { eventDate: 'asc' } });
    return ok({ upcoming });
  } catch (e: any) {
    return serverError(e.message);
  }
}
