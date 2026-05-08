import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://manny.tools',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
