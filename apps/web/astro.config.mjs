import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

const { PORT } = process.env;

// https://astro.build/config
export default defineConfig({
  site: 'https://madboks.org',
  output: 'hybrid',
  integrations: [tailwind()],
  server: {
    port: PORT ? Number(PORT) : 8000
  }
});
