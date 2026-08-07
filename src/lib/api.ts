import { NextResponse } from 'next/server';

export function ok(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function notFound(msg = 'Not found') {
  return NextResponse.json({ error: msg }, { status: 404 });
}

export function serverError(msg: string) {
  return NextResponse.json({ error: msg }, { status: 500 });
}
