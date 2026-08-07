import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized, notFound } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const exists = await db.teamMember.findUnique({ where: { id } });
    if (!exists) return notFound();
    const data: any = { ...body };
    if (body.social && typeof body.social === 'object') data.social = JSON.stringify(body.social);
    const item = await db.teamMember.update({ where: { id }, data });
    return ok({ item });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await db.teamMember.delete({ where: { id } });
    return ok({ ok: true });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
