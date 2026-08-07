import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, serverError, unauthorized, notFound } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const service = await db.service.findUnique({ where: { id } });
    if (!service) return notFound();
    return ok({ ...service, features: service.features ? JSON.parse(service.features) : [] });
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
    const exists = await db.service.findUnique({ where: { id } });
    if (!exists) return notFound();
    const data: any = { ...body };
    if (Array.isArray(body.features)) data.features = JSON.stringify(body.features);
    const service = await db.service.update({ where: { id }, data });
    return ok({ service });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    const { id } = await params;
    await db.service.delete({ where: { id } });
    return ok({ ok: true });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
