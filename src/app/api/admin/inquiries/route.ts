import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';

export async function GET(_req: NextRequest) {
  try {
    await requireAdmin();
    const items = await db.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
    return ok({ items });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
