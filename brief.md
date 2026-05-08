# Manny — Landing Brief (V1)

> **Para qué sirve este documento:** es el handoff completo para el agente que va a implementar la landing pública de Manny en `manny.tools`. Self-contained — no necesita acceso al repo de la app.
>
> **Cómo usarlo:** copiar/pegar la sección "Prompt inicial al agente" como primer mensaje al agente del repo de landing. Las secciones siguientes son referencia que el agente puede consultar.

---

## 0 · Prompt inicial al agente

```
Sos un agente de desarrollo trabajando en el repo de la landing pública de
Manny en manny.tools. Tu tarea: implementar la landing V1 según este brief.

Stack: Astro + Tailwind CSS + TypeScript.

Reglas no negociables:
- Voseo argentino. Nunca "tú", siempre "vos".
- Mobile-first responsive.
- Sin librerías de animación pesadas (CSS o Astro built-ins si hace falta).
- Sin "powered by AI", sin "todo en uno", sin hype. Voz definida en §7.
- Headlines, sub-headlines y copy de pilares están en §4. Usá los textos
  EXACTOS — son el output de un trabajo de copy ya hecho. No reescribas.
- Tipografía: Inter (Google Fonts). Mínimo absoluto 13px. Nunca text-xs.

Antes de codear:
1. Leé el brief completo.
2. Si hay ambigüedad, preguntá antes de implementar.
3. Lighthouse 100 (Performance + A11y) es el bar — Astro te lo da out of
   the box; no lo rompas.

Output esperado: una landing estática, deployable en Vercel, lista para
apuntar al apex `manny.tools`. CTA principal linkea a
https://app.manny.tools/login (signup vive en la app).
```

---

## 1 · Producto en un minuto

**Manny** es el pipeline de producción de contenido para agencias creativas: desde la primera reunión con el cliente hasta las piezas listas para publicar.

**Qué resuelve:** las agencias hoy producen contenido para sus clientes saltando entre 5 herramientas que no se hablan (Notion para el brief, una planilla para el calendario, Canva para las piezas, Drive para compartir, WhatsApp para aprobaciones). El pipeline vive en la cabeza del dueño. Manny lo convierte en un sistema concreto y repetible.

**Audiencia V1 (foco de la landing):**

- **B2B principal:** agencias creativas chicas (2 a 8 personas) que manejan 5–20 clientes simultáneamente.
- **B2B secundario:** freelancers senior de marketing que manejan 4–8 clientes solos (agencia unipersonal).
- **B2C (mencionar pero sin protagonismo):** emprendedores y equipos de comunicación in-house que producen contenido para una sola marca, la propia. La UI diferenciada para B2C es post-V1.

**Quiénes NO son cliente:** equipos in-house enterprise, agencias de paid media/performance, agencias con menos de 3 clientes activos, gente buscando una herramienta para aprender diseño.

**Categoría:** *pipeline de producción para agencias creativas* (no "todo en uno", no "plataforma de gestión").

**App productiva:** la app autenticada vive en `https://app.manny.tools`. Esta landing es marketing puro — todos los CTAs principales linkean al signup de la app.

---

## 2 · Stack y setup

### Stack recomendado

- **Astro** (última estable). Landing estática, builds en segundos, Lighthouse 100 nativo.
- **Tailwind CSS** vía integración oficial de Astro.
- **TypeScript** para los componentes Astro y cualquier script.
- **Inter** desde Google Fonts (la app usa la misma — coherencia visual).

### Comandos de arranque

```bash
npm create astro@latest -- --template minimal --typescript strict
npx astro add tailwind
npm run dev
```

### Estructura de carpetas sugerida

```
src/
├── pages/
│   └── index.astro          ← la landing
├── components/
│   ├── Nav.astro
│   ├── Hero.astro
│   ├── Pillars.astro
│   ├── Audience.astro
│   ├── NotManny.astro
│   ├── FinalCTA.astro
│   └── Footer.astro
├── layouts/
│   └── BaseLayout.astro     ← <head>, fonts, tokens, meta
└── styles/
    └── tokens.css           ← copiar §6 de este brief
public/
├── favicon.svg
└── og-image.png             ← 1200x630, generar con el hero copy
```

### Deploy

- Proyecto nuevo en Vercel (no reusar el proyecto de la app).
- Conectar el dominio `manny.tools` (apex) — DNS ya configurado, solo agregar dominio al proyecto de Vercel.
- Build command: `astro build`. Output: `dist/`. Vercel lo detecta solo.

---

## 3 · Estructura de la landing V1

Una sola página, scroll vertical, secciones separadas con espaciado generoso (`--space-24` o `--space-30` entre bloques). Mobile-first. Sin nav fija (el contenido es corto, no hace falta).

### Orden de secciones

1. **Nav** (logo + CTA "Empezar gratis")
2. **Hero** (tagline + sub + CTA primary)
3. **El problema** (corta — opcional pero recomendada)
4. **Pilares** (cuatro bloques de valor)
5. **Para quién es** (3 segmentos: agencias / freelancers / in-house)
6. **Lo que Manny NO es** (diferenciación contra competencia)
7. **CTA final**
8. **Footer**

---

## 4 · Copy listo (USAR LITERAL)

> Estos textos vienen de los docs de comunicación v4.0 / v3.0 / v2.0. Ya están validados. **No reescribir.**

### 4.1 — Nav

- **Logo:** "Manny" en peso 700, sin signo de exclamación (el "!" del branding queda para producto, no para nav).
- **CTA derecha:** botón primary "Empezar gratis" → `https://app.manny.tools/login`
- Sin links de navegación interna (la landing es corta, scroll directo).

### 4.2 — Hero

**Headline (H1):**

> Manny ordena la información para que tu equipo se enfoque en lo creativo.

**Sub-headline (~22px / regular):**

> Propuesta, brief, calendario y producción de piezas. En un solo flujo, con el contexto de cada cliente viajando de principio a fin.

**CTA primary:** "Empezar gratis" → `https://app.manny.tools/login`
**CTA secondary** (link, no botón): "Ver cómo funciona" → ancla a sección de Pilares (`#pilares`)

**Visual del hero:** placeholder por ahora. Idealmente un mockup de la app (dashboard con cliente activo + sidebar). Si no tenemos imagen lista, dejar un bloque ilustrado simple con los íconos de los módulos del flow (propuesta → brief → campaña → calendario → piezas) conectados con flechas. Que el agente proponga 2 opciones.

### 4.3 — El problema (sección corta)

**H2:**

> El pipeline de producción vive en la cabeza del dueño.

**Párrafo único:**

> El brief en Notion, el calendario en una planilla, las piezas en Canva, las aprobaciones en WhatsApp. Cinco herramientas que no se hablan. El contexto del cliente se pierde en cada handoff. Y cuando el dueño no está, la producción se frena.

(Opcional: un mini-diagrama o lista visual de las 5 herramientas + íconos. Sin sobre-diseñar.)

### 4.4 — Pilares (4 bloques)

Cuatro bloques visuales en fila (desktop) o en columna (mobile). Cada uno con un ícono o color decorativo distinto (usar los `--decor-`* de los tokens), un título corto, un claim, y 2-3 puntos de prueba.

#### Pilar 1 — El flujo conectado

- **Color decorativo:** `--decor-blue` (#B4E4FF).
- **Título:** El flujo conectado
- **Claim (H3):** Una sola herramienta donde el contexto de cada cliente viaja de principio a fin.
- **Bajada:**
  > Las notas de la reunión se convierten en propuesta. La propuesta alimenta el brief. El brief informa la campaña. El calendario aprobado dispara la producción del lote. Sin handoffs manuales entre módulos.
- **Bullets:**
  - El brief vivo del cliente se enriquece con cada producción
  - La generación de copy usa el tono, las restricciones y el historial de cada cliente
  - El flujo es continuo — no hay que coordinar entre herramientas

#### Pilar 2 — Manny ordena, el equipo crea

- **Color decorativo:** `--decor-green` (#C8F2C7).
- **Título:** Manny ordena, el equipo crea
- **Claim (H3):** Manny se hace cargo de la información para que tu equipo se dedique a lo que sabe hacer.
- **Bajada:**
  > Las personas más talentosas de tu agencia hoy pasan media jornada coordinando. Manny concentra la información de cada cliente y la distribuye al momento indicado. El equipo se queda con la estrategia, el diseño y la creatividad.
- **Bullets:**
  - El brief de cada cliente está disponible para todo el equipo
  - Un integrante nuevo puede arrancar a trabajar sin que nadie le explique el contexto
  - La producción no depende de que esté el dueño

#### Pilar 3 — La memoria de marca

- **Color decorativo:** `--decor-pink` (#FFBFE9).
- **Título:** La memoria de marca
- **Claim (H3):** Cargás la información de cada cliente una vez. Manny la usa siempre.
- **Bajada:**
  > El brief vivo es la memoria permanente de cada marca. Se enriquece con cada producción aprobada, registra los copies que funcionaron, recuerda lo que el cliente pidió evitar. Cuanto más producís, mejor conoce Manny a tu cliente.
- **Bullets:**
  - El brief aprende de cada producción aprobada
  - Cambiar de integrante del equipo no borra el conocimiento del cliente
  - Cada nueva campaña arranca con más contexto que la anterior

#### Pilar 4 — Hecho para LatAm

- **Color decorativo:** `--decor-yellow` (#FFF5A3).
- **Título:** Hecho para LatAm
- **Claim (H3):** Manny entiende cómo se trabaja en Argentina y en la región.
- **Bajada:**
  > No es una herramienta gringa localizada. Es una herramienta pensada desde acá.
- **Bullets:**
  - Completamente en español, con voseo y tono de agencia argentina
  - Propuestas en ARS y USD, con la dualidad de precios del contexto local
  - Calendario con efemérides y temporadas relevantes para LatAm

### 4.5 — Para quién es

**H2:**

> Pensado para equipos creativos que escalan su producción.

**Tres cards:**

#### Card 1 — Agencias creativas

- **Título:** Agencias creativas
- **Texto:**
  > Equipo de 2 a 8 personas, manejando 5 a 20 clientes activos. Producción mensual de 50 a 200 piezas. El stack actual es Canva + Notion + Drive + WhatsApp. El cuello de botella no es el talento — es la coordinación.

#### Card 2 — Freelancers senior

- **Título:** Freelancers senior
- **Texto:**
  > Una agencia unipersonal. 4 a 8 clientes manejados solo. Mismo flujo que la agencia chica, diferente escala. Manny es el equipo que no tenés.

#### Card 3 — Equipos in-house

- **Título:** Equipos in-house
- **Texto:**
  > Una sola marca: la propia. Sin propuestas, sin múltiples clientes. El brief de tu marca cargado una vez funciona como contexto para todo lo que producís — sin explicar el negocio cada vez que cambia un proveedor.

### 4.6 — Lo que Manny NO es

**H2:**

> Lo que Manny no es.

**Subtítulo:**

> Para que sepas si te sirve.

**Lista (formato visual: cada ítem con un ❌ y el texto al lado, o como bullets sobrios):**

- **No es una herramienta de diseño.** El diseño lo hace tu equipo. Manny toma ese trabajo creativo y lo escala.
- **No es un gestor de redes sociales.** No publicamos en redes. Producimos las piezas que tu agencia publica.
- **No es un CRM.** No gestionamos el vínculo comercial con el cliente más allá del contexto necesario para producir bien.
- **No es un gestor de proyectos.** No reemplaza Notion ni ClickUp para la gestión interna.
- **No es para campañas pagas.** Foco en contenido orgánico y producción de piezas.
- **No es para todo el mundo.** Si no tenés un problema de escala en la producción, todavía no lo necesitás.

### 4.7 — CTA final

**H2:**

> Empezá hoy. El onboarding es una tarde.

**Sub:**

> Sin tarjeta. Sin compromiso. Un brief, un template, un cliente — de ahí en más todo se suma.

**CTA primary:** "Empezar gratis" → `https://app.manny.tools/login`

### 4.8 — Footer

- **Logo "Manny"** + **tagline corto:** *"El pipeline de producción para equipos creativos."*
- **Links sociales:** LinkedIn, Instagram (placeholders por ahora — pasarme las URLs cuando estén).
- **Copyright:** © 2026 Manny. Hecho en Argentina.
- **Sin links a /pricing, /blog, /about** (no existen todavía).

---

## 5 · Voz y tono — reglas críticas

> Resumen de los docs `MANNY_BRAND_VOICE.md` (interno) y `04_VOZ_Y_TONO_EXTERNO.md` (canales). Para landing aplican estas:

### Cómo suena Manny en la landing

- **Punchy, específico, orientado al beneficio.** Headers son claims, no descripciones.
- **Voseo argentino siempre.** Imperativo voseante: "elegí", "creá", "mirá", "escribí".
- **Oraciones cortas.** Si tiene coma, probablemente se puede partir en dos.
- **Voz activa.** "Manny ordena la información" no "La información es ordenada por Manny".
- **Sin jerga técnica.** Pero sí los términos del rubro: brief, pieza, lote, template, campaña, formato.
- **Números concretos** mejor que adjetivos: "de 3 días a 4 horas" mejor que "3x más rápido".

### Frases prohibidas (no usar nunca)


| ❌                                        | Por qué                                              |
| ---------------------------------------- | ---------------------------------------------------- |
| "Potenciado por AI"                      | La AI es el motor, no el producto. Nunca como claim. |
| "Plataforma todo en uno"                 | Genérico, devaluado, lo dice todo el mundo.          |
| "Solución integral"                      | Corporativo, dice nada.                              |
| "Transformá tu agencia"                  | Promesa vacía.                                       |
| "El futuro de las agencias"              | Hype que genera desconfianza.                        |
| "Innovador" / "Disruptivo"               | Desgastado hasta ser contraproducente.               |
| "Fácil de usar"                          | Condescendiente para una audiencia profesional.      |
| "Para agencias de todos los tamaños"     | Diluye el mensaje. Decimos 2-8 personas.             |
| "Agencia de marketing"                   | Demasiado amplio. Decimos "agencia creativa".        |
| "Estimado usuario" / "Te invitamos a..." | Corporativo. Manny tutea.                            |


### Cómo hablar de la AI

- La AI es invisible. **El sujeto es siempre Manny**, no "la AI".
- ✅ "Manny genera el copy con el contexto del brief de cada cliente."
- ❌ "Nuestra AI de última generación..."
- Si hay que mencionarla por dato: "Manny usa inteligencia artificial para escalar la producción." Como dato, no como selling point.

### Glosario de términos preferidos


| Preferido          | Evitar                            |
| ------------------ | --------------------------------- |
| Pieza              | Post, publicación                 |
| Cliente            | Cuenta, empresa                   |
| Brief / Brief vivo | Documento de marca, brand book    |
| Lote / batch       | Tanda, paquete                    |
| Template           | Plantilla                         |
| Campaña            | Estrategia, plan                  |
| Propuesta          | Cotización, presupuesto           |
| Calendario         | Grilla, parrilla, planning        |
| Aprobación         | Validación, sign-off              |
| Formato            | Tamaño, dimensión                 |
| Generar            | Crear (cuando se refiere a la AI) |


### Puntuación

- Títulos y headings NO llevan punto final.
- Botones NO llevan punto final.
- Oraciones dentro de párrafos SÍ llevan punto final.
- Signos de exclamación con moderación. Uno está bien, dos es mucho.
- Estilo LatAm moderno: signos de interrogación y exclamación solo al final (sin ¿¡ al inicio).

---

## 6 · Design tokens (copiar a `src/styles/tokens.css`)

> Los mismos tokens que usa la app. Light mode default. Dark mode opcional (si lo querés, copiamelo del repo de la app — no es prioridad para landing).

```css
/* ==========================================================================
   Manny Design System — Design Tokens (Light Mode)
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: 400;
  line-height: var(--leading-body);
  color: var(--foreground);
  background-color: var(--background);
}

:root {
  /* --- Colors: Core ---------------------------------------------------- */
  --background: #FFFFFF;
  --foreground: #19171D;
  --card: #FFFFFF;
  --card-foreground: #19171D;

  /* --- Colors: Primary (Manny Blue) ------------------------------------ */
  --primary: #4427FF;
  --primary-foreground: #FFFFFF;
  --primary-hover: #3318E0;
  --primary-active: #2A13B8;
  --primary-light: #F4F4FF;

  /* --- Colors: Secondary ----------------------------------------------- */
  --secondary: #EFEFEC;
  --secondary-foreground: #19171D;
  --secondary-hover: #DADAD7;

  /* --- Colors: Muted / Accent ----------------------------------------- */
  --muted: #EFEFEC;
  --muted-foreground: #848484;
  --accent: #F4F4FF;
  --accent-foreground: #4427FF;

  /* --- Borders / Inputs ----------------------------------------------- */
  --border: #DADAD7;
  --input: #DADAD7;
  --ring: #4427FF;
  --radius: 8px;

  /* --- Neutrals (warm-tinted, never #000) ----------------------------- */
  --neutral-950: #19171D;   /* el "negro" de Manny */
  --neutral-800: #4A4A4A;
  --neutral-600: #848484;
  --neutral-500: #A8A8A8;
  --neutral-300: #DADAD7;
  --neutral-200: #EFEFEC;
  --neutral-50:  #FFFFFF;

  /* --- Decorative Colors (1 acento por vista) ------------------------- */
  --decor-yellow: #FFF5A3;
  --decor-yellow-foreground: #6B5C00;
  --decor-green:  #C8F2C7;
  --decor-green-foreground:  #1A5C18;
  --decor-blue:   #B4E4FF;
  --decor-blue-foreground:   #0A4A7A;
  --decor-pink:   #FFBFE9;
  --decor-pink-foreground:   #8B1A5C;

  /* --- Semantic Colors ------------------------------------------------- */
  --success: #D1FAE5;
  --success-foreground: #059669;
  --warning: #FEF3C7;
  --warning-foreground: #D97706;
  --error: #FEE2E2;
  --error-foreground: #DC2626;
  --info: #D4EEF8;
  --info-foreground: #2B7A9E;

  /* --- Shadows (warm-tinted) ------------------------------------------ */
  --shadow-sm: 0 1px 2px rgba(25, 23, 29, 0.06);
  --shadow-md: 0 2px 8px rgba(25, 23, 29, 0.08);
  --shadow-lg: 0 8px 24px rgba(25, 23, 29, 0.12);
  --shadow-xl: 0 16px 48px rgba(25, 23, 29, 0.16);

  /* --- Typography ------------------------------------------------------ */
  --font-display: "Inter", sans-serif;
  --font-body: "Inter", sans-serif;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  --text-h1: clamp(40px, 5vw + 1rem, 76px);
  --text-h2: clamp(32px, 3vw + 1rem, 47px);
  --text-h3: clamp(24px, 2vw + 0.5rem, 29px);
  --text-h4: clamp(20px, 1.5vw + 0.5rem, 22px);
  --text-h5: clamp(18px, 1vw + 0.5rem, 20px);
  --text-body: clamp(16px, 0.5vw + 0.5rem, 18px);
  --text-body-small: 15px;
  --text-micro: 13px;          /* MÍNIMO ABSOLUTO — nunca por debajo */

  --leading-h1: 1.05;
  --leading-h2: 1.1;
  --leading-h3: 1.2;
  --leading-h4: 1.3;
  --leading-body: 1.6;
  --leading-body-small: 1.5;
  --leading-micro: 1.4;

  --tracking-h1: -0.03em;
  --tracking-h2: -0.02em;
  --tracking-h3: -0.01em;

  /* --- Spacing (base 4px) --------------------------------------------- */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-30: 120px;

  /* --- Motion ---------------------------------------------------------- */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);

  /* --- Layout ---------------------------------------------------------- */
  --max-width: 1200px;
  --content-max-width: 720px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Reglas visuales (no negociables)

- **Tipografía:** Inter, una sola familia. Bold (700) para headings, Medium (500) para labels/CTAs, Regular (400) para body.
- **Color primary:** `#4427FF` (Manny Blue). NO usar otros azules.
- **Negro real (#000) prohibido.** Usar `--neutral-950` (#19171D, ligeramente cálido).
- **Border radius:** 8px default, 12px en cards/modales, 999px en pills/badges.
- **Mínimo absoluto de tipografía:** 13px. NUNCA `text-xs` (12px) ni `text-[10/11px]`.
- **Un solo color decorativo por vista** — los pilares pueden alternar, pero no los mezcles dentro del mismo bloque.
- **Spacing en múltiplos de 4** — siempre desde la escala `--space-`*.

### Tailwind config

Configurar `tailwind.config.ts` para mapear las CSS variables:

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
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
        sans: 'var(--font-body)',
        display: 'var(--font-display)',
      },
      maxWidth: {
        content: 'var(--max-width)',
      },
    },
  },
} satisfies Config;
```

---

## 7 · Links externos y datos del producto


| Link                           | URL                             |
| ------------------------------ | ------------------------------- |
| Signup / login (CTA principal) | `https://app.manny.tools/login` |
| App (canónica)                 | `https://app.manny.tools`       |
| LinkedIn                       | *(placeholder — Juan completa)* |
| Instagram                      | *(placeholder — Juan completa)* |


**Meta tags / SEO:**

- `<title>`: "Manny — El pipeline de producción para equipos creativos"
- `<meta description>`: "Propuesta, brief, calendario y producción de piezas. En un solo flujo, con el contexto de cada cliente viajando de principio a fin. Pensado para agencias creativas, estudios y equipos in-house."
- `<meta og:image>`: `/og-image.png` (1200×630, generar con el headline H1).
- `<html lang="es-AR">`.

---

## 8 · Lo que NO hay que incluir en V1

Para que el agente no se vaya por las ramas:

- ❌ Pricing (no hay aún)
- ❌ Testimonios (no hay piloto todavía)
- ❌ Blog / case studies
- ❌ Páginas adicionales (about, contacto, terms, privacy) — agregar cuando hagan falta
- ❌ Form de waitlist (CTA va directo a `app.manny.tools/login`)
- ❌ Animaciones pesadas / parallax / scroll-triggered complicado
- ❌ Chat widget, popup de cookies, exit-intent, etc.
- ❌ Dark mode (opcional, no priority)
- ❌ Internacionalización (V1 solo español)

---

## 9 · Checklist de QA antes de deploy

- Lighthouse Mobile: Performance ≥ 95, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Todos los textos respetan voseo (búsqueda de `tú`, `tienes`, `puedes` debe dar 0).
- El CTA primary linkea correctamente a `https://app.manny.tools/login`.
- Mobile (≤ 375px): jerarquía legible, sin overflows, sin scroll horizontal.
- Tipografía: ningún elemento por debajo de 13px.
- Lighthouse-friendly: imágenes con `width`/`height`, fuentes con `font-display: swap`.
- Meta tags + OG image correctos (probar con `https://www.opengraph.xyz/`).
- El sitio no tiene 0 menciones de "AI", "potenciado por", "todo en uno", "innovador", "transformá tu agencia".

---

## 10 · Si el agente tiene dudas

Mensajes que quedan abiertos a criterio del agente (preguntá si dudás):

- Tratamiento visual del hero (mockup vs ilustración vs animación CSS).
- Layout exacto de los 4 pilares (grid 2×2, fila horizontal, alternados con imagen).
- Si conviene una sección extra de "Cómo funciona" en 3 pasos antes del CTA final, o si los pilares ya cubren eso.
- Footer: ¿formato minimalista de 1 línea o de 3 columnas?

Para todo lo demás (copy, voz, tokens, links): seguir el brief al pie. No improvisar.