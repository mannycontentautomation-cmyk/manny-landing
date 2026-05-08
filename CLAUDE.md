# CLAUDE.md

Marketing landing for **Manny** (manny.tools) — single page, scroll-down, **editorial typographic direction**.

## Stack

- **Astro 5** (static SSG, no SSR) + **TypeScript strict**
- **Tailwind CSS v3** via `@astrojs/tailwind` (token mapping in `tailwind.config.ts`, but actual styles live in component `<style>` blocks — Tailwind utilities are minimal)
- Fonts: **Instrument Serif** (display, with italics) + **Inter** (body), loaded via Google Fonts `<link>` in `BaseLayout.astro`
- Deploy target: Vercel apex domain `manny.tools` (DNS already configured)

## Commands

```bash
npm run dev      # Astro dev server at http://localhost:4321
npm run build    # Static build to dist/
npm run preview  # Preview the build
```

## File structure

```
src/
├── pages/index.astro          ← landing entrypoint
├── layouts/BaseLayout.astro   ← <head>, fonts, meta SEO, lang="es-AR"
├── styles/tokens.css          ← design tokens, layout primitives, typography helpers
└── components/
    ├── Nav.astro              ← logo + wordmark only (no nav links)
    ├── Hero.astro             ← eyebrow + H1 (2 lines) + lead + "Sumate a la lista →"
    ├── HowItWorks.astro       ← 4 numbered steps with italic violet numerals
    ├── Highlight.astro        ← centered pull quote ("El cuello de botella...")
    ├── CTAFooter.astro        ← dark block: H2 + WaitlistForm + footer integrado
    ├── WaitlistForm.astro     ← email pill, light/dark variants, vanilla JS submit
    ├── Wordmark.astro         ← SVG-based "manny!" wordmark (color prop)
    └── MannyMark.astro        ← SVG-based mark (color prop)

public/
├── favicon.svg
└── assets/                    ← manny-mark-{blue,white}.svg + manny-word-{blue,white,black}.svg
```

Section order in `index.astro`: **Nav → Hero → HowItWorks → Highlight → CTAFooter**.

## Layout patterns

- **`.section-wrap` is the canonical container.** `max-width: 1280px`, `padding-inline: 24px (mobile) / 48px (tablet) / 80px (desktop)`. Use it inside every section so widths align across Nav, Hero, body sections, and CTAFooter inner content. The dark CTAFooter wraps both the CTA grid and the BlackFooter inner with `.section-wrap`.

- **Editorial typography helpers in `tokens.css`:**
  - `.display-h1` / `.hero-h1`: Instrument Serif, big clamp, `line-height: 0.92`
  - `.display-h2` / `.cta-h2` / `.highlight-text`: all share `var(--text-h2)` (`clamp(36px, 6vw, 76px)`) — the H2 of Highlight and CTA are deliberately the same size for visual rhythm
  - `.italic-accent` / `.italic-accent-light`: italic violet on the second clause of headlines (the editorial signature — used in Hero H1, Highlight, CTA H2)
  - All body text: Inter at **13px minimum**. Never `text-xs` (12px), never `font-size: 11px`. (Brief rule.)

- **Subtle grid background**: `.grid-bg` on the page wrapper paints a 32px (mobile) / 64px (desktop) grid using `rgba(25,23,29,0.05)` lines. Decorative.

- **Smooth scroll** is global (`html { scroll-behavior: smooth; }` in tokens.css). Anchors like `#beta-final` from the Hero link smooth-scroll to the CTAFooter.

## Copy & voice rules

The landing copy MUST respect these:

1. **Voseo argentino always.** "elegís", "diseñás", "aprobás", "vos". Never "tú/tienes/puedes/haces". Source: `brief.md` §5 + `Docs/Comunicacion/04_VOZ_Y_TONO_EXTERNO.md`.

2. **No em-dashes (—) in user-visible copy.** Juan flagged em-dash as AI-writing tic. Replace with period (split sentences) or comma. OK in aria-labels and code comments.

3. **No prohibited phrases** (full list in `brief.md` §5 and `Docs/Comunicacion/03_MENSAJES_CLAVE.md`):
   - "potenciado por AI" / "inteligencia artificial" as selling point
   - "todo en uno" / "solución integral"
   - "transformá tu agencia" / "el futuro de las agencias"
   - "innovador" / "disruptivo" / "fácil de usar"
   - "agencia de marketing" (use "agencia creativa")

4. **AI is invisible.** The subject is always **Manny**, never "la AI". Reference: `04_VOZ_Y_TONO` section "Cómo hablar de la AI".

5. **Specific glossary preferences:**
   - "piezas" not "lote" (Juan rejected "lote" — sounds like jargon, even though brief glossary had it as preferred)
   - "agencias creativas" not "agencias de marketing"
   - "campaña" not "estrategia"
   - "Manny se hace cargo de la producción repetitiva" — the canonical framing for what Manny does, NOT "Manny produce las piezas" (which sounds AI-generative)

## Current phase

**Pre-launch / waitlist phase.** The landing CTAs are all "Sumarme a la lista", "Avisame", "Te avisamos cuando esté lista". `brief.md` V1 originally had `CTA → app.manny.tools/login` (in-app signup) but that's outdated. Don't restore that wording without explicit signal from Juan.

The dark CTAFooter block (`#beta-final`) has the WaitlistForm. The Hero has a discreet `Sumate a la lista →` link that anchor-scrolls to that block. There is NO form above the fold by design.

## Pending TODOs

- **WaitlistForm endpoint** [BLOCKER for launch]: currently `preventDefault` + 600ms simulated success. Wire to a real provider (Resend / Supabase / Mailchimp). See `// TODO:` comment in [WaitlistForm.astro](src/components/WaitlistForm.astro#L120).

- **og-image.png** [needed for social sharing]: needs to be generated at `public/og-image.png` (1200×630). `BaseLayout.astro` already references `/og-image.png` in OG meta tags.

- **Footer links**: `Privacidad`, `Términos`, `Contacto` in [CTAFooter.astro](src/components/CTAFooter.astro#L7-L11) currently point to `#`. Replace with real URLs when those pages exist.

- **Astro upgrade**: currently 5.18.1; 6.x is available (`npx @astrojs/upgrade`). Not urgent.

## Build constraints

- Lighthouse Mobile target: Performance ≥ 95, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95 (`brief.md` §9).
- Min font size: 13px absolute. No `text-xs` (12px), no `font-size: 11px`.
- No animation libraries; CSS-only motion. `prefers-reduced-motion` respected globally in tokens.css.
- Cero JS por defecto (Astro static). El único JS es el handler del WaitlistForm (`<script>` en el componente).

## Common QA commands

```bash
# Voseo check (placeholder "tu@email.com" is OK, otherwise should be empty)
grep -rEn '\b(tú|tienes|puedes|haces|debes)\b' src/ --include='*.astro'

# Em-dash check (none in user-visible copy; OK in code comments)
grep -rn "—" src/components/ src/pages/ src/layouts/ --include='*.astro'

# Prohibited phrases (should be empty)
grep -rEinE '(potenciado por ai|todo en uno|solución integral|transformá tu agencia|el futuro de las agencias|innovador|disruptivo|fácil de usar)' src/ --include='*.astro'

# Sub-13px font sizes (should be empty)
grep -rEn 'font-size:\s*1[012]px' src/ --include='*.astro' --include='*.css'

# "lote" check (should be empty per Juan's call)
grep -rn "lote" src/ --include='*.astro'
```

## Reference docs (NOT in repo)

The strategic source of truth lives in `Docs/` (gitignored, on Juan's machine at `/Users/juanpaz/Documents/Juan stuff/manny/manny-landing/Docs/`).

Most useful for copy decisions:
- `Docs/Comunicacion/01_POSICIONAMIENTO.md` — positioning, audience, category framing
- `Docs/Comunicacion/03_MENSAJES_CLAVE.md` — **best doc for copy.** Mensaje raíz, 4 pilares, mensajes por segmento × funnel stage, frases prohibidas con alternativa
- `Docs/Comunicacion/04_VOZ_Y_TONO_EXTERNO.md` — voice rules per channel
- `Docs/Comunicacion/07_COMPETENCIA_Y_DIFERENCIACION.md` — how to position vs competitors

Design handoff (separate folder, also not in repo): `/Users/juanpaz/Downloads/design_handoff_landing/` — Editorial direction reference (Landing.jsx prototype, full tokens.css, SVG assets). The SVGs from there are already copied to `public/assets/`.

When `brief.md` and `Docs/Comunicacion/` disagree, prefer the docs (they're more recent). When current implementation and either disagree, the implementation reflects Juan's most recent decisions — see CLAUDE memory entries for context.
