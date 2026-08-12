import { NextRequest } from 'next/server';
import { ok, serverError, bad, unauthorized } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'misc';

    if (!file) return bad('No file provided');

    // Validate file type
    if (!file.type.startsWith('image/')) return bad('File must be an image');

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) return bad('File size must be less than 5MB');

    // Create upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    if (!existsSync(uploadDir)) {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'png';
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;
    const filepath = path.join(uploadDir, filename);

    // Write file
    const bytes = await file.arrayBuffer();
    await fs.writeFile(filepath, Buffer.from(bytes));

    // Return the public URL
    const url = `/uploads/${folder}/${filename}`;
    return ok({ url, filename });
  } catch (e: any) {
    if (e.message === 'UNAUTHORIZED') return unauthorized();
    return serverError(e.message);
  }
}
