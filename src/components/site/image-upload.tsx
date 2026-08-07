'use client';

import { useState, useRef } from 'react';
import { Upload, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  aspect?: string; // e.g. 'aspect-square', 'aspect-[4/3]'
  className?: string;
}

export function ImageUpload({ label, value, onChange, folder = 'misc', aspect = 'aspect-[4/3]', className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      const res = await fetch('/api/upload', { method: 'POST', body: formData, credentials: 'include' });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      onChange(data.url);
    } catch (e: any) {
      console.error('Upload error:', e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium">{label}</label>
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-border bg-muted">
          <div className={cn('relative', aspect)}>
            <img src={value} alt={label} className="h-full w-full object-cover" />
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1 right-1 p-1.5 rounded-md bg-red-500/80 text-white hover:bg-red-500"
            aria-label="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div
          className={cn('rounded-lg border-2 border-dashed border-border flex items-center justify-center text-foreground/30 cursor-pointer hover:border-gold/50 transition-colors', aspect)}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImageIcon className="h-8 w-8" />}
        </div>
      )}
      <div className="flex gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-md bg-gold-gradient text-white text-xs font-medium hover:opacity-90 disabled:opacity-50 shrink-0"
        >
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          Upload
        </button>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="or paste URL"
          className="text-xs h-9"
        />
      </div>
    </div>
  );
}
