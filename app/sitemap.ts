import { MetadataRoute } from 'next';
import { systems } from '@/content/systems';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://example.vercel.app';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/systems`, lastModified: new Date(), priority: 0.9 },
  ];

  const systemPages = systems.map((system) => ({
    url: `${baseUrl}/systems/${system.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticPages, ...systemPages];
}
