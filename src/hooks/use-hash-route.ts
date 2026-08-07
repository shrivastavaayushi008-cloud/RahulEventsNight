'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Route } from '@/lib/types';

function parseHash(): { route: Route; param?: string } {
  if (typeof window === 'undefined') return { route: 'home' };
  const hash = window.location.hash.replace(/^#\/?/, ''); // remove "#/" or "#"
  const [r, p] = hash.split('/');
  const valid: Route[] = ['home', 'about', 'events', 'gallery', 'artists', 'videos', 'testimonials', 'contact', 'admin'];
  const route = (valid.includes(r as Route) ? r : 'home') as Route;
  return { route, param: p };
}

export function useHashRoute() {
  const [state, setState] = useState<{ route: Route; param?: string }>({ route: 'home' });

  useEffect(() => {
    const sync = () => {
      setState(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const navigate = useCallback((route: Route, param?: string) => {
    const hash = param ? `#/${route}/${param}` : `#/${route}`;
    if (window.location.hash === hash) {
      // already there, just scroll up
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = hash;
    }
  }, []);

  return { route: state.route, param: state.param, navigate };
}
