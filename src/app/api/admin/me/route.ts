import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized } from '@/lib/api';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET(_req: NextRequest) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return unauthorized();
    return ok({ admin });
  } catch (e: any) {
    return serverError(e.message);
  }
}
