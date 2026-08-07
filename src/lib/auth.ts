// JWT helper for admin auth (lightweight, no NextAuth needed for this scope)
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET = process.env.JWT_SECRET || 'rahul-events-night-dev-secret-change-me';

export interface AdminToken {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function signToken(payload: AdminToken): string {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminToken | null {
  try {
    return jwt.verify(token, SECRET) as AdminToken;
  } catch {
    return null;
  }
}

export async function getAdminFromCookie(): Promise<AdminToken | null> {
  const store = await cookies();
  const token = store.get('admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function requireAdmin(): Promise<AdminToken> {
  const admin = await getAdminFromCookie();
  if (!admin) {
    throw new Error('UNAUTHORIZED');
  }
  return admin;
}
