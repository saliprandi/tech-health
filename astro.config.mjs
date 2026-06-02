import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://saliprandi.github.io/tech-health/',
  base: '/tech-health',
  output: 'static',
  integrations: [tailwind()]
});
