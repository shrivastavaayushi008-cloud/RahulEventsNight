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
      .then(r => {
        if (!r.ok) throw new Error('API error');
        return r.json();
      })
      .then(d => {
        if (!mounted) return;
        // Ensure all fields exist to prevent crashes
        const safe: SiteData = {
          events: Array.isArray(d.events) ? d.events : [],
          gallery: Array.isArray(d.gallery) ? d.gallery : [],
          testimonials: Array.isArray(d.testimonials) ? d.testimonials : [],
          artists: Array.isArray(d.artists) ? d.artists : [],
          videos: Array.isArray(d.videos) ? d.videos : [],
          upcoming: Array.isArray(d.upcoming) ? d.upcoming : [],
          settings: d.settings && typeof d.settings === 'object' ? d.settings : {},
        };
        cache = safe;
        setData(safe);
        setLoading(false);
      })
      .catch(() => {
        if (mounted) {
          setData(FALLBACK);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  return { data, loading };
}

export function refreshSiteData() {
  cache = null;
}
