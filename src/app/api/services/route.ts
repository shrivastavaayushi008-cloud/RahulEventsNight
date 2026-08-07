import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError } from '@/lib/api';

export async function GET(_req: NextRequest) {
  try {
    const services = await db.service.findMany({ where: { published: true }, orderBy: { order: 'asc' } });
    const parsed = services.map(s => ({ ...s, features: s.features ? JSON.parse(s.features) : [] }));
    return ok({ services: parsed });
  } catch (e: any) {
    return serverError(e.message);
  }
}
