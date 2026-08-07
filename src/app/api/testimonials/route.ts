import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError } from '@/lib/api';

export async function GET(_req: NextRequest) {
  try {
    const testimonials = await db.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } });
    return ok({ testimonials });
  } catch (e: any) {
    return serverError(e.message);
  }
}
