import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-active)',
          light: 'var(--primary-light)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        decor: {
          yellow: 'var(--decor-yellow)',
          green: 'var(--decor-green)',
          blue: 'var(--decor-blue)',
          pink: 'var(--decor-pink)',
        },
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      maxWidth: {
        content: 'var(--max-width)',
        prose: 'var(--content-max-width)',
      },
    },
  },
} satisfies Config;
