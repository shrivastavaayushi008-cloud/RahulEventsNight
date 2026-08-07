'use client';

import { useEffect, useState } from 'react';
import type {
  EventItem,
  GalleryItem,
  Testimonial,
  Artist,
  Video,
  UpcomingEvent,
  SiteSettings,
} from '@/lib/types';

export interface SiteData {
  events: EventItem[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  artists: Artist[];
  videos: Video[];
  upcoming: UpcomingEvent[];
  settings: SiteSettings;
}

const FALLBACK: SiteData = {
  events: [],
  gallery: [],
  testimonials: [],
  artists: [],
  videos: [],
  upcoming: [],
  settings: {},
};

let cache: SiteData | null = null;

export function useSiteData() {
  const [data, setData] = useState<SiteData>(cache || FALLBACK);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    let mounted = true;
    if (cache) {
      setData(cache);
      setLoading(false);
      return;
    }
    fetch('/api/site')
      .then(r => r.json())
      .then(d => {
        if (!mounted) return;
        cache = d as SiteData;
        setData(d as SiteData);
        setLoading(false);
      })
      .catch(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return { data, loading };
}

export function refreshSiteData() {
  cache = null;
}
