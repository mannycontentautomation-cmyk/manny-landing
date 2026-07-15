# CLAUDE.md

Marketing landing for **Manny** (manny.tools) — single page, scroll-down, **editorial typographic direction**.

> **Branch `landing-v3` (2026-07-09):** implements the copy v3 replanteo ("torre de control", benefit blocks with promise headers) from `manny-docs/Docs/Comunicacion/12_LANDING_COPY_V3.md`. Developed by Lion (Juan handed off the landing to focus on the platform). `main` still serves the previous version; Juan merges this branch when he decides to deploy. When merged, the v3 doc drops its ⚠️ and becomes the record of what's live.
>
> **Branch `landing-v4` (2026-07-13, in progress):** visual redesign on top of v3, screen by screen, from reference captures Lion picked (first one: NordLayer hero). Dark hero with split layout, triple-hit headline, proof-point bullets, dual-intent CTAs (waitlist / live demo). Section colors get decided at the end of the pass; everything stays within Manny design guidelines.

## Stack

- **Astro 5** (static SSG, no SSR) + **TypeScript strict**
- **Tailwind CSS v3** via `@astrojs/tailwind` (token mapping in `tailwind.config.ts`, but actual styles live in component `<style>` blocks — Tailwind utilities are minimal)
- Fonts: **Instrument Serif** (display, with italics) + **Inter** (body), loaded via Google Fonts `<link>` in `BaseLayout.astro`
- **Deployed live** at `https://manny.tools` (Vercel apex, DNS via Porkbun → CNAME to Vercel hash). Sister project `manny-platform` serves `app.manny.tools`. See `MEMORY/project_deployment.md` for the full topology and DNS records.

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
    ├── Nav.astro              ← STICKY and DARK (v4: same block color as hero/footer, backdrop blur); brand white + descriptor (≥900px) + status chip outline (≥640px) + filled CTA "Sumate a la lista"; wordmark hidden <480px
    ├── Hero.astro             ← v4 dark split hero (NordLayer-pattern): eyebrow (mobile only) + 3-hit headline (payoff line italic --primary-on-dark) + 4 proof-point bullets + dual CTA (primary "Sumate a la lista" / secondary outline "Pedí una demo en vivo" with data-intent-demo) + risk microcopy. Right: compact Inicio mockup + 2 floating narrative cards (client approval, design order sent)
    ├── Highlight.astro        ← el reframe: pull quote ("El cuello de botella...") at --text-h2-cta size, alone. Deliberately static: never animate it
    ├── VistaCentral.astro     ← Bloque A "Todo, de un vistazo." + HTML mockup of the Inicio view. ALIVE: the Vinoteca Peralta chip cycles through the account lifecycle (propuesta → espera → aprobado → producción), 12s CSS loop, pauses on hover, only one animated row on purpose
    ├── ContextoOmnicanal.astro← Bloques B + C side by side: "El contexto no se pierde." / "Una campaña. Todos los canales."
    ├── RelacionCliente.astro  ← "El feedback de tus clientes..." + HTML mockup of the client approval screen (white-label: header is the agency's, never "Manny"). ALIVE with hybrid trigger: "Aprobar" is the only clickable element (idle pulse affordance); on click or ~6s after entering viewport, the sequence runs: pressed → chip "Aprobada" + registro "lunes 13 · 14:32" → Valeria's comment slides in. Runs once, stays
    ├── Disenador.astro        ← "Todo listo para producir? El pedido lo arma Manny." + HTML mockup of the design order (assignee Marcos, freelance). ALIVE: the 4 ✓ pop in sequence on viewport entry + single pulse of "Enviar pedido →"
    ├── Principio.astro        ← cierre de confianza: "Las decisiones son de tu equipo. Manny las ordena." Deliberately static
    ├── CTAFooter.astro        ← dark block: H2 + WaitlistForm + footer integrado (LinkedIn icon, no Privacy/Terms/Contact). The mascot peeks over the top edge (`.peek`: cropped MannyMark, decorative, the single brand guiño of the page) and greets with a speech bubble ("No veo las horas de poder ayudarte!") the first time the visitor reaches the bottom of the page (`.peek-bubble`, shown by the BaseLayout script, stays once shown)
    ├── WaitlistForm.astro     ← email pill + "Quiero una demo en vivo" checkbox (pre-checked by any [data-intent-demo] CTA; visitor can uncheck), light/dark variants, vanilla JS submit. POST sends `intent` (waitlist|demo) + `source` = `formId:via` where via ∈ hero|hero-demo|nav|direct (sessionStorage `manny-cta` set in BaseLayout)
    ├── Wordmark.astro         ← SVG-based "manny!" wordmark (color prop)
    └── MannyMark.astro        ← SVG-based mark (color prop)

public/
├── favicon-32.png             ← 32×32 brand favicon (mascota Manny)
├── apple-touch-icon.png       ← 180×180 for iOS home / "add to home screen"
├── logo.png                   ← 2025×2025 source for icon variants and JSON-LD logo
├── robots.txt                 ← Allow all + sitemap reference
├── llms.txt                   ← GEO context file (positioning, audience, pillars, glossary)
└── assets/
    ├── og-image.png           ← 1200×630 social card
    ├── manny-mark-{blue,white}.svg
    └── manny-word-{blue,white,black}.svg

api/
└── waitlist.ts                ← Vercel function: POST email → Supabase insert + Resend contact + confirmation email
```

Section order in `index.astro` (v4, in progress): **Nav → Hero → Desafio → Dolores → ComoArrancas → ContextoOmnicanal → RelacionCliente → Disenador → Principio → CTAFooter**.

**ComoArrancas.astro** (v4 screen 4, NordLayer "How to deploy" pattern): the FIRST LIGHT section (breaks the dark arc above). Centered eyebrow "Cómo arrancás" + numbered H2 ("Ordená tu agencia en tres pasos." — the "Ordená" closes the loop with the hero's first line) + objection-killer subhead, then 3 steps: violet number square + light laptop wireframe (outline + `::after` base) holding a white mini-card (paso 1 perfil+checks, paso 2 calendar grid, paso 3 client link + approval/order chips) + step title + body. Closing centered CTA "Pedí una demo en vivo" (`data-intent-demo`, pre-checks the form demo checkbox). NOTE: this is onboarding ("how easy to start"), NOT the v3 "proceso en 4 tiempos" pipeline that was killed — different objection, comes after promise/reframe/pains.

**Dolores.astro** (v4 screen 3): 4-column pain row on dark, no section title (hangs from Desafio). Each column: inline line-icon SVG (single color --primary-on-dark) + pain title in second person (bold sans, white) + short body that pivots to the resolution. The 4 pains mirror the 4 hero bullets on purpose (pain ↔ promise symmetry, same as the reference). ⚠️ Pains 2/3/4 thematically overlap the old v3 sections below (ContextoOmnicanal, RelacionCliente, Disenador): decide at the end of the v4 pass whether those survive. The old "proceso en 4 tiempos" (HowItWorks) was removed on purpose — don't bring it back. `Highlight.astro` and `VistaCentral.astro` are out of the flow (absorbed by Desafio: the reframe is its H2 and the big dashboard replaced "Todo, de un vistazo"); the files remain in the repo until the v4 pass finishes, then delete if nothing reclaims them.

**Desafio.astro** (v4 screen 2, NordLayer "The Challenge" pattern): dark section, centered eyebrow "El desafío" + reframe H2 + subhead, then the platform showcase: a window-chrome mockup (traffic lights, sidebar nav, account map) with 4 satellite UI fragments orbiting it (Equipo panel peeking behind on the left ≥1024px, "+ Nueva campaña" dark pill, "Nueva aprobación de Valeria" light pill, and the client-view dark widget "Café Aurora · 2 aprobadas · 1 comentario"). Satellites are aria-hidden; the showcase has one role="img" description. Overlaps between satellites and window content are intentional (composition, not data table).

**Product mockups are HTML/CSS built into the components** (VistaCentral, RelacionCliente, Disenador), styled low-fi after the etapa-1 wireframe (`manny-platform/Docs/mockups/wireframe-etapa-1.dc.html`). The real product doesn't exist yet (rebuild pending), so no screenshots: when it ships, swap mockups for real captures without touching structure. Mockup text follows the same voice rules (voseo, 13px min); client names are fictional (Café Aurora, Vinoteca Peralta, Librería del Sur, Vivero Alsina).

## Layout patterns

- **`.section-wrap` is the canonical container.** `max-width: 1280px`, `padding-inline: 24px (mobile) / 48px (tablet) / 80px (desktop)`. Use it inside every section so widths align across Nav, Hero, body sections, and CTAFooter inner content. The dark CTAFooter wraps both the CTA grid and the BlackFooter inner with `.section-wrap`.

- **Hero fills the viewport on desktop.** At ≥1024px, `.hero` is `min-height: calc(100vh - var(--nav-height))` with `flex-direction: column` + `justify-content: center` so the eyebrow/H1/lead/link block is vertically centered and the next section appears on scroll. Mobile keeps the regular padding flow (no forced 100vh — looks ugly with the browser bar). `--nav-height: 72px` is defined in tokens.css (slimmed when the nav went sticky); anchor targets get `[id] { scroll-margin-top }` clearance in tokens.css so the sticky nav never covers them.

- **Animation principle: animate the product, not the page.** Movement lives INSIDE the mockups (the "torre de control viva"); Highlight and Principio stay still on purpose, the still/alive contrast is what makes the alive parts read. The only animation JS on the page is one IntersectionObserver script in `BaseLayout.astro` (~25 lines): it adds `.armed` to `[data-choreo]` mockups on load (hides the choreography's payoff states; no JS = full static mockup), `.in-view` when a `[data-animate]`/`[data-choreo]` block enters the viewport (loops start only when someone is watching), and `.played` on click of `[data-approve]` or 6s after in-view. All animation is transform/opacity with reserved widths (grid-area stacking): zero layout shift, zero Lighthouse cost. ⚠️ The global reduced-motion rule in tokens.css forces `animation-duration: 0.01ms`, which turns infinite loops into strobe: every looped animation MUST ship its own `@media (prefers-reduced-motion: reduce) { animation: none }` showing a sensible static state (see chip-cycle and approve-pulse).

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

6. **Watch for Argentine regional connotations.** Some neutral-Spanish phrasing carries unintended weight in rioplatense. Examples flagged:
   - "Manny pone orden" → "poner orden" reads as authority/discipline ("te voy a poner orden"). Avoid framings where Manny disciplines the user.
   - When in doubt, validate the phrase doesn't drift into authority/condescension when read with rioplatense ear.

7. **First person plural ("ordenamos", "nosotros") is a valid subject** alongside "Manny". Juan picked *"Ordenamos la información, tu equipo hace lo suyo"* over *"Manny ordena…"* — feels closer, less institutional. Doesn't break the "AI invisible" rule because the subject is still humans, not "la AI".

8. **The four positioning pillars** (per `Docs/Comunicacion/03_MENSAJES_CLAVE.md` and Juan's confirmation):
   - **Brief / contexto del cliente as the core**: agencies upload notes, briefs, brand guidelines. That's what Manny processes. Not generic content.
   - **The agency keeps control of every decision.** Manny *proposes*, the agency *decides* and *edits*. Avoid "Manny propone tres direcciones" (the specific number isn't always true) — use "Manny propone direcciones".
   - **AI is invisible / the support, not the protagonist.** "Nos apoyamos en la AI para agregar valor, pero el control es de la agencia."
   - **Auto-improvement loop**: every approved piece feeds back into the perfil (ex "brief vivo"), and the next proposal gets more faithful. In v3 this lives in Bloque B ("se afina con cada pieza aprobada").

## Current phase

**Pre-launch / waitlist phase.** The landing CTAs are all "Sumarme a la lista", "Avisame", "Te avisamos cuando esté lista". `brief.md` V1 originally had `CTA → app.manny.tools/login` (in-app signup) but that's outdated. Don't restore that wording without explicit signal from Juan.

The dark CTAFooter block (`#beta-final`) has the WaitlistForm. The Hero has a discreet `Sumate a la lista →` link that anchor-scrolls to that block. There is NO form above the fold by design.

## SEO / GEO setup

The landing has a baseline configured for both traditional search and LLM-driven discovery (Generative Engine Optimization):

- **Sitemap**: auto-generated by `@astrojs/sitemap` → `/sitemap-index.xml` + `/sitemap-0.xml` at build time.
- **`public/robots.txt`**: `User-agent: *` + `Allow: /` + sitemap reference. Doesn't disallow any AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) — the goal is to BE cited, not blocked.
- **`public/llms.txt`**: structured markdown for LLMs per [llmstxt.org](https://llmstxt.org/) spec. Encodes the 4 pillars, audience, flow, glossary. Edit this when product positioning shifts. LLMs with web search read it in real time on each user query — no re-indexing cost.
- **JSON-LD** in `BaseLayout.astro`: `Organization` + `WebSite` graph with logo, sameAs (LinkedIn), description. Keep `description` aligned with `llms.txt` for consistency.
- **`og-image.png`** at `/assets/og-image.png` (1200×630). `BaseLayout.astro` defaults `ogImage = '/assets/og-image.png'`.
- **Meta**: `theme-color: #4427FF`, `og:site_name`, canonical, Twitter card.

When editing copy that affects positioning (Hero H1, HowItWorks steps, Highlight), keep `llms.txt` in sync — both are read by LLMs and inconsistency degrades citation quality.

## Waitlist backend

The form is wired to a real backend (since 2026-05-10):

- **Endpoint**: [api/waitlist.ts](api/waitlist.ts) — Vercel function at `/api/waitlist`. Receives `{ email, source }`, validates, inserts in Supabase with `service_role`, upserts the contact in Resend, and sends a branded confirmation email.
- **Storage**: Supabase project `manny-landing` (ref `nfijzwwdqttuhusvxpui`, region `sa-east-1`), table `public.waitlist` with RLS enabled, no policies (service_role bypasses). Schema: `id uuid`, `email text unique`, `source text`, `user_agent text`, `created_at timestamptz`.
- **Email provider**: Resend, domain `manny.tools` verified. Single Audience (new Resend API model — no `audienceId` needed). Confirmation email template lives inline in `api/waitlist.ts:19-79` (HTML + plaintext fallback, inline styles for email-client compat).
- **Env vars** (Production + Preview in Vercel): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API` (note: not `_KEY`), `RESEND_FROM_EMAIL` (= `Manny <hola@manny.tools>`).
- **Duplicate handling**: relies on the unique constraint on `email`. On `23505` (Postgres unique violation) the endpoint returns `{ ok: true, alreadySignedUp: true }` and the form shows "Ya estabas en la lista..." instead of resending the confirmation.
- **Demo intent (v4)**: the endpoint accepts `intent: 'demo'`. Demo requests get a different confirmation email ("Coordinemos una demo de Manny") AND an internal notification email to the team inbox (`WAITLIST_NOTIFY_EMAIL` env var, falls back to the address inside `RESEND_FROM_EMAIL`). The notification fires even when the email was already on the list (that signal matters more than the insert). `source` gets a `demo+` prefix so demo rows are queryable without a schema change. ⚠️ Email flows can't be tested locally (env keys live in Vercel): verify on the first preview deploy.
- **Architecture choice**: Vercel function suelta en `/api/*.ts`, NOT an Astro endpoint. Keeps Astro as pure SSG. Vercel auto-detects the folder alongside the static build.

## Pending TODOs

- **Enable Vercel Web Analytics** in the Vercel dashboard (project manny-landing → Analytics). The snippet (`/_vercel/insights/script.js`, PROD-only) already ships in `BaseLayout.astro`; without the dashboard toggle it 404s silently. Once live, read submits by `source` (`cta-waitlist:hero|nav|direct`) in Supabase to see which CTA converts.

- **Submit sitemap to search engines**: register `manny.tools` in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters), submit `https://manny.tools/sitemap-index.xml`. Bing matters specifically — ChatGPT search is powered by Bing. ~5 min each.

- **GEO backlog** (from agent audit, low priority until pilots exist):
  - One-line extractive sentence in `llms.txt` ("Manny es \[categoría\] para \[audiencia\] que \[problema\]") — LLMs prefer citing single self-contained lines.
  - Surface what kind of "piezas" Manny outputs (post / story / reel / banner) somewhere on the home — today it only lives in the `llms.txt` glossary.
  - Named differentiation vs competitors (Jasper, Canva, Notion AI, ChatGPT) once positioning is sharp enough.
  - Evidence/proof: pilot agency names, screenshots, case study — once pilots exist.

- **Astro upgrade**: currently 5.18.1; 6.x is available (`npx @astrojs/upgrade`). Not urgent.

## Build constraints

- Lighthouse Mobile target: Performance ≥ 95, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95 (`brief.md` §9).
- Min font size: 13px absolute. No `text-xs` (12px), no `font-size: 11px`.
- No animation libraries; CSS-only motion. `prefers-reduced-motion` respected globally in tokens.css.
- Cero JS por defecto (Astro static). El único JS cliente es el handler del WaitlistForm (`<script>` en el componente) que hace `POST /api/waitlist`. El endpoint corre como Vercel function (Node), no toca Astro.

## Common QA commands

```bash
# Voseo check (placeholder "tu@email.com" is OK, otherwise should be empty)
grep -rEn '\b(tú|tienes|puedes|haces|debes)\b' src/ --include='*.astro'

# Em-dash check (none in user-visible copy; OK in code comments)
grep -rn "—" src/components/ src/pages/ src/layouts/ --include='*.astro'
grep -n "—" public/llms.txt   # llms.txt is also user-visible to LLMs — keep clean

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
