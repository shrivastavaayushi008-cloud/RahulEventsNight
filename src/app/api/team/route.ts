import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError } from '@/lib/api';

export async function GET(_req: NextRequest) {
  try {
    const team = await db.teamMember.findMany({ where: { published: true }, orderBy: { order: 'asc' } });
    const parsed = team.map(t => ({ ...t, social: t.social ? JSON.parse(t.social) : {} }));
    return ok({ team: parsed });
  } catch (e: any) {
    return serverError(e.message);
  }
}
