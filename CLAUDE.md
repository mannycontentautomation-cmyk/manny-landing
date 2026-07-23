# CLAUDE.md

Marketing landing for **Manny** (manny.tools) — single page, scroll-down, **editorial typographic direction**.

> **Landing v5 EN PRODUCCIÓN** (mergeada a `main` y deployada a manny.tools el 2026-07-22). Implementa el comp Figma **`Landing_design`** (archivo `i3ZYmyBqNw7W7rrMc0sd8b`, equipo de Juan). Sistema oscuro con grid cuadriculado, nav isla glass, hero partido full-height con typewriter, copy en español latino neutro (tuteo). La rama de trabajo fue `hero-fluido` (ya mergeada). Vercel auto-deploya `main`.
>
> **Histórico:** `landing-v4` (hero oscuro NordLayer, full-width nav) y `landing-v3` ("torre de control", benefit blocks) quedaron en sus ramas/historial. El WIP v3 viejo (Pillars) está en `juan-v3-wip`. La v5 conserva la estructura de secciones de v4 pero rehace todo el look.

## Stack

- **Astro 5** (static SSG, no SSR) + **TypeScript strict**
- **Tailwind CSS v3** via `@astrojs/tailwind` (token mapping in `tailwind.config.ts`, but actual styles live in component `<style>` blocks — Tailwind utilities are minimal)
- Fonts: **Instrument Serif** (display/headlines, italics; **solo Regular** — el browser falsea el bold feo) + **Instrument Sans** (body, weights 400/500/600/700). Google Fonts `<link>` in `BaseLayout.astro`. (Ya NO es Inter.)
- **Dark grid system**: toda la página vive sobre `--block-dark` (#19171D) con un grid cuadriculado (`--grid-line` = rgba blanco .055) pintado en `.page`. Secciones oscuras transparentes; ComoArrancas es la excepción clara.
- **Deployed live** at `https://manny.tools` (Vercel apex, DNS via Porkbun → CNAME to Vercel hash). Sister project `manny-platform` serves `app.manny.tools`. Vercel Web Analytics activo (componente oficial `@vercel/analytics/astro`). See `MEMORY/project_deployment.md` for the full topology and DNS records.

## Commands

```bash
npm run dev      # Astro dev server at http://localhost:4321
npm run build    # Static build to dist/
npm run preview  # Preview the build
```

## File structure

```
src/
├── pages/index.astro          ← landing entrypoint + `.page` wrapper (grid-bg, flow-root)
├── layouts/BaseLayout.astro   ← <head>, fonts, meta SEO, lang="es", <Analytics/>, JSON-LD, script de atribución de CTA
├── styles/tokens.css          ← design tokens, layout primitives, typography helpers
└── components/
    ├── Nav.astro              ← isla flotante glass (backdrop-filter con feTurbulence+feDisplacementMap = refracción real, técnica jh3y; solo Chrome/FF, Safari cae al blur). Brand + descriptor + CTAs outline "Pedí una demo" (data-cta="nav-demo") + filled "Sumate a la lista" (data-cta="nav"). SCRIPT: toggle .nav--over-light (logo/botón oscuros) cuando la isla pisa el card claro de ComoArrancas (rAF-throttled)
    ├── Hero.astro             ← hero partido full-height. H1 con TYPEWRITER (script: "Ordena cada cuenta." ↔ "Coordina cada entrega.", caret violeta; el HTML trae la 1ª frase, sin JS/reduced-motion queda estática; texto real en .sr-only, span aria-hidden). Payoff italico violeta. Derecha: mockup Inicio + 2 tarjetas narrativas flotantes
    ├── Desafio.astro          ← screen 2: eyebrow "El desafío" + reframe H2 + subhead + showcase de la plataforma (window-chrome + 4 satélites UI orbitando, aria-hidden; el showcase tiene un role="img")
    ├── Dolores.astro          ← screen 3: fila de 4 dolores sobre oscuro, sin título (cuelga de Desafio). Cada uno: line-icon SVG + título en 2ª persona + body que pivotea a la resolución. Espejan los 4 bullets/promesas del hero
    ├── ComoArrancas.astro     ← screen 4, ÚNICA sección clara: tarjeta flotante. Eyebrow "Cómo arrancás" + H2 numerado ("Ordená tu agencia en tres pasos.") + subhead + 3 pasos como tarjetas-pantalla del producto (perfil / calendario / vista cliente) con número en círculo dark. CTA de cierre "Pedí una demo en vivo" (data-cta). Es onboarding, NO el viejo "proceso en 4 tiempos"
    ├── Principio.astro        ← cierre de confianza: solo el headline "Las decisiones son de tu equipo. Manny las ordena." Deliberadamente estático
    ├── CTAFooter.astro        ← bloque oscuro (#beta-final): H2 + WaitlistForm + footer integrado (LinkedIn icon, sin Privacy/Terms/Contact). Sin mascota/peek (removidos en v4)
    ├── WaitlistForm.astro     ← email pill + DOS botones submit: "Sumarme a la lista" (data-intent="waitlist") + "Quiero una demo" (data-intent="demo"). El submitter decide el intent (e.submitter.dataset.intent), sin checkbox. Variantes light/dark, submit vanilla JS. POST manda `intent` + `source` = `formId:via` (via ∈ hero|nav|direct, de sessionStorage `manny-cta`)
    ├── Wordmark.astro         ← SVG-based "manny!" wordmark (color prop)
    └── MannyMark.astro        ← SVG-based mark (color prop)

public/
├── favicon-32.png             ← 32×32 brand favicon (mascota Manny)
├── apple-touch-icon.png       ← 180×180 for iOS home / "add to home screen"
├── logo.png                   ← 2025×2025 source for icon variants and JSON-LD logo
├── robots.txt                 ← Allow all + sitemap reference
├── llms.txt                   ← GEO context file (positioning, audience, pillars, glossary)
└── assets/
    ├── og-image.png           ← 1200×630 social card (imagen oscura editorial, v5)
    ├── manny-mark-{blue,white}.svg
    └── manny-word-{blue,white,black}.svg

api/
└── waitlist.ts                ← Vercel function: POST email → insert best-effort en Supabase + aviso interno + contacto Resend + confirmación
```

Section order in `index.astro`: **Nav → Hero → Desafio → Dolores → ComoArrancas → Principio → CTAFooter**. (Las sobras v3/v4 sin usar — Highlight, VistaCentral, ContextoOmnicanal, RelacionCliente, Disenador — se borraron el 2026-07-23.) El viejo "proceso en 4 tiempos" (HowItWorks) fue removido a propósito — no traerlo de vuelta.

**Nav CTAs espejan el hero**: outline "Pedí una demo" (`data-cta="nav-demo"`) + filled "Sumate a la lista" (`data-cta="nav"`). No hay chip de status.

**WaitlistForm dual intent**: email input + DOS botones submit. El submitter define si es `waitlist` o `demo` (leído via `e.submitter.dataset.intent`), sin checkbox. Los CTAs demo de hero/nav/ComoArrancas solo anclan a `#beta-final` con `data-cta` para atribución — el visitante elige el camino real en el footer.

**Product mockups son HTML/CSS dentro de los componentes** (Desafio, ComoArrancas), low-fi según el wireframe etapa-1 (`manny-platform/Docs/mockups/wireframe-etapa-1.dc.html`). El producto real todavía no existe: cuando exista, se cambian por capturas reales sin tocar estructura. El texto de los mockups sigue las reglas de voz (tuteo neutro, 13px min); nombres de cliente ficticios (Café Aurora, Vinoteca Peralta, Librería del Sur, Vivero Alsina).

## Layout patterns

- **`.section-wrap` / `.section-wrap--fluid` son los contenedores canónicos.** `.section-wrap`: `max-width: 1280px`, padding-inline 24/48/80px. `.section-wrap--fluid`: gutter fluido (5.56vw ≈ 84px), usado por las secciones que respiran a ancho de viewport. Usar dentro de cada sección para que los anchos alineen.

- **Hero fills the viewport on desktop.** At ≥1024px, `.hero` es `min-height: calc(100vh - var(--nav-height))` con columna centrada verticalmente, así el próximo bloque aparece al scrollear. Mobile mantiene el padding normal (nada de 100vh forzado). `--nav-height: 80px` en tokens.css; los anchors tienen `[id] { scroll-margin-top }` en tokens.css para que la isla sticky nunca los tape.

- **Grid background**: `.page` (wrapper en index.astro) tiene `display: flow-root` (contiene el margin-top del nav para que el grid arranque en y=0) y pinta el grid con dos `linear-gradient` usando `--grid-line` (rgba blanco .055) a 64px/48px. Decorativo.

- **Animation principle: animate the product, not the page.** El movimiento vive DENTRO de los mockups (pulsos de estado, flote de tarjetas, celdas del calendario), todo CSS-only transform/opacity con opt-out de reduced-motion. Highlight/Principio quedan quietos a propósito. ⚠️ La regla global de reduced-motion en tokens.css fuerza `animation-duration: 0.01ms`, que convierte loops infinitos en strobe: toda animación en loop DEBE traer su propio `@media (prefers-reduced-motion: reduce) { animation: none }` con un estado estático sensato.

- **Scripts de cliente (3, + el form).** Astro es cero-JS por defecto; los únicos scripts son: (1) atribución de CTA en `BaseLayout.astro` (guarda `data-cta` en sessionStorage `manny-cta`); (2) typewriter del H1 en `Hero.astro`; (3) toggle del nav sobre el card claro en `Nav.astro`. Más el handler de submit del `WaitlistForm.astro`. La vieja IIFE de choreografía (choreo/animate/approve) + peek-bubble de v3/v4 fue removida.

- **Editorial typography helpers en `tokens.css`:**
  - `.hero-h1` / display headers: Instrument Serif Regular, clamp grande (H1 en vw), `line-height` apretado.
  - `.italic-accent` / `.italic-accent-light`: italic violeta en la segunda cláusula de los titulares (la firma editorial — Hero payoff, CTA H2).
  - Body: Instrument Sans a **13px mínimo**. Nunca `text-xs` (12px), nunca `font-size: 11px`.

- **Smooth scroll** global (`html { scroll-behavior: smooth; }`). Anchors como `#beta-final` desde el Hero scrollean suave al CTAFooter.

## Copy & voice rules

The landing copy MUST respect these:

1. **Español latino neutro (tuteo).** "eliges", "diseñas", "apruebas", "tú". NO voseo ("elegís/aprobás/vos") ni tonada rioplatense ("acá", "recién") en copy visible. Decisión de Juan (2026-07-22) que reemplaza la regla anterior de voseo argentino. Imperativos: "Súmate", "Pide", "Carga", "Cuéntanos". El `lang`/`og:locale`/`inLanguage` = `es` (neutro). (OK "acá/recién" en aria-labels y comentarios.)

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
   - **Auto-improvement loop**: every approved piece feeds back into the perfil (ex "brief vivo"), and the next proposal gets more faithful.

## Current phase

**Pre-launch / waitlist phase.** The landing CTAs are all "Sumarme a la lista" / "Quiero una demo". `brief.md` V1 originally had `CTA → app.manny.tools/login` (in-app signup) but that's outdated. Don't restore that wording without explicit signal from Juan.

The dark CTAFooter block (`#beta-final`) has the WaitlistForm. The Hero and Nav CTAs anchor-scroll to that block. There is NO form above the fold by design.

## SEO / GEO setup

The landing has a baseline configured for both traditional search and LLM-driven discovery (Generative Engine Optimization):

- **Sitemap**: auto-generated by `@astrojs/sitemap` → `/sitemap-index.xml` + `/sitemap-0.xml` at build time.
- **`public/robots.txt`**: `User-agent: *` + `Allow: /` + sitemap reference. Doesn't disallow any AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) — the goal is to BE cited, not blocked.
- **`public/llms.txt`**: structured markdown for LLMs per [llmstxt.org](https://llmstxt.org/) spec. Encodes the 4 pillars, audience, flow, glossary. Edit this when product positioning shifts.
- **JSON-LD** in `BaseLayout.astro`: `Organization` + `WebSite` graph with logo, sameAs (LinkedIn), description, `inLanguage: 'es'`. Keep `description` aligned with `llms.txt`.
- **`og-image.png`** at `/assets/og-image.png` (1200×630, imagen oscura editorial v5). `BaseLayout.astro` defaults `ogImage = '/assets/og-image.png'`.
- **Meta**: `theme-color: #4427FF`, `og:site_name`, `og:locale: es`, canonical, Twitter card. `<html lang="es">`.

When editing copy that affects positioning (Hero H1, ComoArrancas steps, Desafio reframe), keep `llms.txt` in sync — both are read by LLMs and inconsistency degrades citation quality.

## Waitlist backend

The form is wired to a real backend (since 2026-05-10; hardened 2026-07-23):

- **Endpoint**: [api/waitlist.ts](api/waitlist.ts) — Vercel function at `/api/waitlist`. Receives `{ email, source, intent }`, validates, y guarda por **3 vías**: insert en Supabase (best-effort), aviso interno por mail, y contacto en Resend. Manda confirmación al visitante.
- **Insert best-effort (clave)**: el free tier de Supabase **pausa el proyecto tras ~7 días sin uso**, y una DB caída NO debe romper el form. Si el insert falla, el endpoint **loguea y sigue** (devuelve `ok:true` igual). La lista sobrevive en el inbox + Resend aunque la DB esté dormida. Solo email inválido (400) / método (405) devuelven error.
- **Aviso interno en TODA alta** (no solo demo): mail a `TEAM_INBOX` (`WAITLIST_NOTIFY_EMAIL`, o la dirección dentro de `RESEND_FROM_EMAIL`). Si la DB no guardó, el mail lo dice explícito (`⚠️ La DB no guardó esta alta`) — así se sabe cuándo está pausada. Es el registro a prueba de pausas.
- **Storage**: Supabase project `manny-landing` (ref `nfijzwwdqttuhusvxpui`, region `sa-east-1`), tabla `public.waitlist` con RLS enabled, sin policies (service_role bypassea). Schema: `id uuid`, `email text unique`, `source text`, `user_agent text`, `created_at timestamptz`.
- **Email provider**: Resend, dominio `manny.tools` verificado. Single Audience (no `audienceId`). Templates de confirmación inline en `api/waitlist.ts` (HTML + plaintext, estilos inline para compat de clientes de mail).
- **Demo intent**: el endpoint acepta `intent: 'demo'` → confirmación distinta ("Coordinemos una demo de Manny") + el aviso interno con asunto "Pedido de demo en vivo". `source` recibe prefijo `demo+` para queryear sin tocar schema.
- **Duplicados**: unique constraint en `email`. En `23505` devuelve `{ ok: true, alreadySignedUp: true }` y no reenvía confirmación (si la DB estaba caída no lo sabe, así que manda). El form muestra "Ya estabas en la lista...".
- **Env vars** (Production + Preview en Vercel): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API` (no `_KEY`), `RESEND_FROM_EMAIL` (= `Manny <hola@manny.tools>`), `WAITLIST_NOTIFY_EMAIL` (opcional).
- **Arquitectura**: Vercel function suelta en `/api/*.ts`, NO un endpoint de Astro. Mantiene Astro como puro SSG. ⚠️ Los flujos de mail no se pueden testear localmente (las keys viven en Vercel): verificar en deploy. **Ambos flujos (waitlist + demo) testeados en prod OK el 2026-07-23.**

## Pending TODOs

- **Re-scrapear la OG**: la imagen nueva (oscura editorial) necesita forzar cache en [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) / Facebook Sharing Debugger, sino se ve la vieja.

- **Supabase se re-pausa**: con poco tráfico el proyecto se vuelve a pausar cada ~7 días. El form ya no se rompe (best-effort), pero si se quiere conservar el registro SQL prolijo, agregar un cron liviano (Vercel Cron o GitHub Action) que toque la DB semanalmente. Opcional.

- **Submit sitemap to search engines**: register `manny.tools` in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters), submit `https://manny.tools/sitemap-index.xml`. Bing importa (ChatGPT search corre sobre Bing). ~5 min cada uno.

- **GEO backlog** (low priority hasta que haya pilotos):
  - One-line extractive sentence en `llms.txt` ("Manny es \[categoría\] para \[audiencia\] que \[problema\]").
  - Surface qué tipo de "piezas" produce Manny (post / story / reel / banner) en el home — hoy solo vive en el glosario de `llms.txt`.
  - Diferenciación nombrada vs competidores (Jasper, Canva, Notion AI, ChatGPT) cuando el posicionamiento esté afilado.
  - Evidence/proof: nombres de agencias piloto, screenshots, case study — cuando existan pilotos.

- **Astro upgrade**: currently 5.18.x; 6.x disponible (`npx @astrojs/upgrade`). No urgente.

## Build constraints

- Lighthouse Mobile target: Performance ≥ 95, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95 (`brief.md` §9).
- Min font size: 13px absoluto. No `text-xs` (12px), no `font-size: 11px`.
- No animation libraries; CSS-only motion. `prefers-reduced-motion` respetado globalmente en tokens.css.
- Cero JS por defecto (Astro static). El JS de cliente son 3 scripts chicos (atribución CTA en BaseLayout, typewriter en Hero, toggle nav en Nav) + el handler del WaitlistForm que hace `POST /api/waitlist`. El endpoint corre como Vercel function (Node), no toca Astro. Más el bundle de Vercel Analytics (inyectado por `<Analytics/>`, solo prod).

## Common QA commands

```bash
# Voseo check: el copy es tuteo neutro, así que NO debe haber voseo (los hits válidos son aria-labels/comentarios)
grep -rEni '\b(vos|elegís|diseñás|aprobás|cargás|pedí|sumate|ordená|coordiná|ganá|subí|armá|compartí|producí|contanos|trabajás|probá|revisá|acá|recién)\b' src/ --include='*.astro'

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

## Reference docs (repo aparte)

The strategic source of truth vive en el repo **`github.com/mannycontentautomation-cmyk/manny-docs`** (clonable con la credencial del llavero, la misma cuenta que usa `origin`):

```bash
git clone --depth 1 https://github.com/mannycontentautomation-cmyk/manny-docs.git
```

Los docs de copy están en `Docs/Comunicacion/`. Para cualquier decisión de posicionamiento/voz, clonar y leer en vez de asumir. **Dos trampas de copy que salen de ahí** (aplican a toda superficie): (1) Manny NO es herramienta de diseño (el diseño lo hace la agencia; Manny ordena el pedido a diseño); (2) "la información en un solo lugar" está marcada como verdad a medias (el valor es que el contexto *viaje y se use*, no que se guarde). Mensaje raíz: *"El cuello de botella no es la creatividad. Es la coordinación."* Categoría: *"la torre de control de la agencia de contenido."*

Most useful for copy decisions:
- `Docs/Comunicacion/01_POSICIONAMIENTO.md` — positioning, audience, category framing
- `Docs/Comunicacion/03_MENSAJES_CLAVE.md` — **best doc for copy.** Mensaje raíz, 4 pilares, mensajes por segmento × funnel stage, frases prohibidas con alternativa
- `Docs/Comunicacion/04_VOZ_Y_TONO_EXTERNO.md` — voice rules per channel
- `Docs/Comunicacion/07_COMPETENCIA_Y_DIFERENCIACION.md` — how to position vs competitors

Design handoff: comp Figma `Landing_design` (`i3ZYmyBqNw7W7rrMc0sd8b`). El handoff editorial viejo (Landing.jsx prototype, tokens.css, SVG assets) vivía en la máquina de Juan; los SVG ya están en `public/assets/`.

**OG image**: se genera a mano (no hay script en el repo). Template HTML que matchea el look oscuro editorial (grid, logo blanco mark+word, Instrument Serif blanco + italic `#A89EFF`, Instrument Sans para audiencia) renderizado a 1200×630 con Playwright. Copy actual: *"El sistema que ordena el trabajo de todos tus clientes."* + *"Para agencias creativas, estudios y freelancers."* Al cambiarla, re-scrapear cache en LinkedIn Post Inspector / FB Debugger.

When `brief.md` and `Docs/Comunicacion/` disagree, prefer the docs (they're more recent). When current implementation and either disagree, the implementation reflects Juan's most recent decisions — see CLAUDE memory entries for context.
