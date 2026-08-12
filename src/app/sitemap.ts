import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.rahuleventsnight.online';
  const lastModified = new Date();

  const routes = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${baseUrl}/#/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/#/events`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/#/gallery`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/#/artists`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/#/videos`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/#/testimonials`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/#/contact`, priority: 0.9, changeFrequency: 'monthly' as const },
  ];

  return routes.map(route => ({
    url: route.url,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
