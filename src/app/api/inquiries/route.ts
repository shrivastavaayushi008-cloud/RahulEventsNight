import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { ok, bad, serverError } from '@/lib/api';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(7, 'Valid phone is required'),
  email: z.string().email('Valid email is required'),
  eventDate: z.string().optional().nullable(),
  eventType: z.string().optional().nullable(),
  message: z.string().min(5, 'Message is required'),
});

export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
    return ok({ inquiries });
  } catch (e: any) {
    return serverError(e.message);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return bad(parsed.error.issues[0]?.message || 'Invalid input');
    }
    const inquiry = await db.inquiry.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        eventDate: parsed.data.eventDate || null,
        eventType: parsed.data.eventType || null,
        message: parsed.data.message,
        status: 'new',
      },
    });
    return ok({ inquiry }, { status: 201 });
  } catch (e: any) {
    return serverError(e.message);
  }
}
