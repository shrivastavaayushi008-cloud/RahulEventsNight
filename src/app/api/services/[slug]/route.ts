import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, notFound } from '@/lib/api';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const service = await db.service.findUnique({ where: { slug } });
    if (!service) return notFound('Service not found');
    return ok({ ...service, features: service.features ? JSON.parse(service.features) : [] });
  } catch (e: any) {
    return serverError(e.message);
  }
}
