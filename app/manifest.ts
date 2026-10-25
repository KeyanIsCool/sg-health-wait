import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SG Health Wait',
    short_name: 'SG Health',
    description: 'Singapore healthcare wait times & nearby facilities.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0d6efd',
    icons: [
      // TODO: add real icons at /public/icon-192.png and /public/icon-512.png
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
