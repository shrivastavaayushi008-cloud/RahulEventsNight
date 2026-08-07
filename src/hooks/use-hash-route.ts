'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Route } from '@/lib/types';

function parseHash(): { route: Route; param?: string } {
  if (typeof window === 'undefined') return { route: 'home' };
  const hash = window.location.hash.replace(/^#\/?/, ''); // remove "#/" or "#"
  const [r, p] = hash.split('/');
  // Support both 'admin' and 'admin-login' as admin routes
  const valid: Route[] = ['home', 'about', 'events', 'gallery', 'artists', 'videos', 'testimonials', 'contact', 'admin'];
  let route = r as Route;
  if (r === 'admin-login') route = 'admin';
  const finalRoute = (valid.includes(route) ? route : 'home') as Route;
  return { route: finalRoute, param: p };
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = hash;
    }
  }, []);

  return { route: state.route, param: state.param, navigate };
}
