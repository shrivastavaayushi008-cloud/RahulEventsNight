'use client';

import { MessageCircle, Phone } from 'lucide-react';
import type { SiteSettings } from '@/lib/types';

export function FloatingContact({ settings }: { settings: SiteSettings }) {
  const phone = settings.phone;
  const whatsapp = settings.whatsapp;
  if (!phone && !whatsapp) return null;
  const waLink = whatsapp ? `https://wa.me/91${whatsapp}` : '#';

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2.5">
      {phone && (
        <a
          href={`tel:${phone}`}
          className="group flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-gold-gradient text-maroon shadow-gold animate-glow transition-transform hover:scale-110"
          aria-label="Call now"
        >
          <Phone className="h-5 w-5 lg:h-6 lg:w-6" />
        </a>
      )}
      {whatsapp && (
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="group flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lux transition-transform hover:scale-110"
          aria-label="WhatsApp us"
        >
          <MessageCircle className="h-5 w-5 lg:h-6 lg:w-6" />
        </a>
      )}
    </div>
  );
}
