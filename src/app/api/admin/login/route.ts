import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, bad, serverError } from '@/lib/api';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return bad('Invalid credentials');

    const admin = await db.adminUser.findUnique({ where: { email: parsed.data.email } });
    if (!admin) return bad('Invalid credentials', 401);

    const valid = await bcrypt.compare(parsed.data.password, admin.password);
    if (!valid) return bad('Invalid credentials', 401);

    const token = signToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const res = ok({ admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role } });
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e: any) {
    return serverError(e.message);
  }
}

export async function DELETE() {
  const res = ok({ ok: true });
  res.cookies.delete('admin_token');
  return res;
}
