import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, notFound } from '@/lib/api';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const event = await db.event.findUnique({ where: { slug } });
    if (!event) return notFound('Event not found');
    return ok({ ...event, gallery: event.gallery ? JSON.parse(event.gallery) : [] });
  } catch (e: any) {
    return serverError(e.message);
  }
}
