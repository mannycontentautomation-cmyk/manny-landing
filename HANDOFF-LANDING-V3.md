# Handoff — Landing v3 (branch `landing-v3`)

> **Para:** Juan
> **De:** Lion (con asistencia de Claude)
> **Repo:** `manny-landing`, branch `landing-v3` (5 commits sobre `main`)
> **Acción requerida:** revisar la preview de Vercel y mergear a `main` cuando la apruebes. `main` y la landing viva NO fueron tocadas.
> **Acción en `manny-platform`:** ninguna.

---

## Resumen ejecutivo

Reconstruimos la landing sobre el copy v3 (`manny-docs/Docs/Comunicacion/12_LANDING_COPY_V3.md`): posicionamiento torre de control, bloques de beneficio con encabezado-promesa, y el esqueleto de "proceso en 4 tiempos" (HowItWorks) eliminado a propósito. Después la pasamos por una revisión de un especialista en landings SaaS B2B y aplicamos su paquete completo de dinamismo bajo un principio rector: **animar el producto, no la página**. Los mockups ahora demuestran lo que el texto afirma. Todo el detalle técnico y las reglas nuevas quedaron en el `CLAUDE.md` del repo, que está actualizado y es la fuente de verdad.

---

## Los commits de la branch

| Commit | Qué trae |
|---|---|
| `01d0f5b` | Estructura v3 completa: Nav con descriptor + chip de estado, Hero con subhead nuevo, reframe solo y en grande, bloques de beneficio (VistaCentral, ContextoOmnicanal, RelacionCliente, Disenador, Principio), 3 mockups HTML del producto basados en el wireframe de etapa 1, SEO/GEO sincronizado (llms.txt reescrito, JSON-LD, metas) |
| `da07eb4` | Nav sticky (el chip de conversión acompaña toda la página), coreografía de aprobación en RelacionCliente (trigger híbrido: click en "Aprobar" o automática a los 6s en viewport, cierra con el registro "lunes 13 · 14:32"), chip de Vinoteca Peralta rotando el ciclo de vida de una cuenta, cortes de copy de la review |
| `496605e` | Franja de chips de estado bajo el CTA del hero (el del medio respira), checklist secuencial del pedido a diseño, mascota asomándose sobre el bloque oscuro, Vercel Web Analytics + atribución de CTA en el `source` del form |
| `9e1d4e5` | Globo de diálogo de la mascota al llegar al fondo de la página |
| `7484556` | Ajuste de composición del globo + copy final ("¡No veo la hora de poder ayudarte!") |

---

## Qué necesito de vos

### P0 — Revisar la preview y mergear

El push de esta branch genera la preview URL automática de Vercel. Recorrela entera (desktop y mobile) y prestale atención a: los timings de la coreografía de aprobación (probá clickear "Aprobar" y también dejá que arranque sola), el loop del chip de Vinoteca, y la mascota con su globo al fondo. Si te cierra, merge a `main` y eso deploya a manny.tools.

### P0 — Habilitar Web Analytics (post-merge, 2 minutos)

Dashboard de Vercel → proyecto manny-landing → Analytics → Enable. El snippet ya está en el código (solo build de producción); sin el toggle, 404ea silencioso y no pasa nada malo, pero no medimos. Con esto activo, los submits de la waitlist llegan a Supabase con `source` diferenciado (`cta-waitlist:hero`, `:nav` o `:direct`) para saber qué CTA convierte.

### P1 — Al mergear, el doc de copy pasa a ser registro de lo vivo

`manny-docs/Docs/Comunicacion/12_LANDING_COPY_V3.md` tiene un ⚠️ de "NO está en producción" en el encabezado. Cuando mergees, hay que quitarlo (lo puedo hacer yo en la próxima sesión, avisame cuando esté deployado). Tené en cuenta dos desvíos deliberados del doc, ya documentados en el CLAUDE.md del repo: el lead del hero no lleva "Así de fácil:" (el doc de voz v4 ya lo citaba sin esa frase) y el lead de la sección de aprobación quedó "Tu cliente mira, comenta y aprueba." (el "en cualquier momento, desde cualquier lugar" vendía comodidad cuando el valor definido es trazabilidad; el registro con día y hora de la animación cuenta esa historia ahora).

---

## Decisiones que conviene que conozcas

- **La review externa** (consultor SaaS B2B) midió ~190 palabras de body en toda la página (vs 500-900 de una landing SaaS típica): el problema nunca fue el largo del texto sino que los mockups estaban muertos. De ahí el paquete de animaciones.
- **Reglas nuevas en el CLAUDE.md del repo** que valen para cualquier edición futura: animar el producto y no la página (el reframe y el principio quedan quietos a propósito), un solo script de animación en `BaseLayout.astro` (IntersectionObserver, contrato `.armed`/`.in-view`/`.played`), y ojo con el reduced-motion global: convierte loops infinitos en estrobo, cada animación en loop lleva su propio opt-out.
- **Sin JS los mockups quedan estáticos completos** (los estados finales visibles). Lighthouse no se toca: todo es transform/opacity con anchos reservados.
- **Los mockups son HTML/CSS a mano** (no screenshots) basados en el wireframe de etapa 1: cuando el producto real exista, se reemplazan por capturas sin tocar estructura.
- **El cierre no promete nada a cambio del mail** (ni cupo ni acceso prioritario): está atado a la decisión founding que tenemos pendiente vos y yo (3 meses gratis vs 50% × 6). Cuando la cerremos, es un cambio de copy chico en el CTAFooter.

---

## Verificación local (si preferís correrla vos)

```bash
npm install
npm run build          # estático, ~500ms
npm run dev            # http://localhost:4321

# QA de voz (todos deben devolver vacío)
grep -rEn '\b(tú|tienes|puedes|haces|debes)\b' src/ --include='*.astro'
grep -rn "—" src/ --include='*.astro' public/llms.txt
grep -rEn 'font-size:\s*1[012]px' src/ --include='*.astro' --include='*.css'
```

Cualquier duda de implementación, el `CLAUDE.md` del repo tiene el detalle completo por componente.
