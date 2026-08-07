import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError } from '@/lib/api';

export async function GET(_req: NextRequest) {
  try {
    const list = await db.siteSetting.findMany();
    const settings: Record<string, string> = {};
    for (const s of list) settings[s.key] = s.value;
    return ok({ settings });
  } catch (e: any) {
    return serverError(e.message);
  }
}
