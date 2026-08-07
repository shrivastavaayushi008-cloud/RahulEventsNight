import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';

export async function GET(_req: NextRequest) {
  try {
    await requireAdmin();
    const list = await db.siteSetting.findMany();
    const settings: Record<string, string> = {};
    for (const s of list) settings[s.key] = s.value;
    return ok({ settings });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    // body is { settings: { key: value, ... } }
    const updates = body.settings || body;
    for (const [key, value] of Object.entries(updates)) {
      await db.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }
    const list = await db.siteSetting.findMany();
    const settings: Record<string, string> = {};
    for (const s of list) settings[s.key] = s.value;
    return ok({ settings });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
