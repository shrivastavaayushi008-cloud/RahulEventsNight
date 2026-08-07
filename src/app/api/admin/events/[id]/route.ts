import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized, bad, notFound } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const event = await db.event.findUnique({ where: { id } });
    if (!event) return notFound();
    return ok({ ...event, gallery: event.gallery ? JSON.parse(event.gallery) : [] });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const exists = await db.event.findUnique({ where: { id } });
    if (!exists) return notFound();
    const data: any = { ...body };
    if (Array.isArray(body.gallery)) data.gallery = JSON.stringify(body.gallery);
    if (body.features !== undefined) delete data.features;
    const event = await db.event.update({ where: { id }, data });
    return ok({ event });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await db.event.delete({ where: { id } });
    return ok({ ok: true });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
