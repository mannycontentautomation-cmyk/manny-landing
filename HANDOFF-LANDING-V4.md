# Handoff — Landing v4 (branch `landing-v4`)

> **Para:** Juan
> **De:** Lion (con asistencia de Claude)
> **Repo:** `manny-landing`, branch `landing-v4` (parte de `landing-v3` y la supera)
> **Acción requerida:** revisar la preview de Vercel y mergear `landing-v4` a `main` cuando la apruebes. `main` no fue tocada.
> **Reemplaza a:** `landing-v3`. Si vas a mergear, mergeá **v4**, no v3.
> **Acción en `manny-platform`:** ninguna.

---

## Resumen ejecutivo

Rediseño visual completo de la landing, hecho pantalla por pantalla a partir de una referencia que le gustó a Lion (NordLayer). La v4 mantiene toda la infraestructura de la v3 (waitlist Supabase + Resend, SEO/GEO, tokens, voz) y cambia la piel y la estructura: un arco oscuro editorial arriba (hero partido, reframe con la plataforma en grande, fila de dolores) y una sección clara de onboarding en tres pasos, cerrando con el principio de confianza y el footer. Se podó todo lo que quedaba redundante de la v3.

---

## La página, de arriba a abajo

1. **Nav** (oscuro, sticky): marca + descriptor + par de CTAs que espejan el hero: "Pedí una demo" (contorno) y "Sumate a la lista" (lleno).
2. **Hero** (oscuro, partido): titular en tres golpes imperativos ("Ordená cada cuenta. / Coordiná cada entrega. / *Ganá tiempo para la creatividad.*"), cuatro bullets de beneficio, doble CTA (lista / demo), microcopy de riesgo, y a la derecha el mapa de cuentas con dos tarjetas narrativas flotando (aprobación de Valeria, pedido a Marcos).
3. **El desafío** (oscuro): el reframe como H2 ("El cuello de botella no es la creatividad. Es la coordinación.") + la plataforma en grande con marco de ventana y cuatro satélites de UI orbitando (panel Equipo, "+ Nueva campaña", notificación de aprobación, vista del cliente).
4. **Dolores** (oscuro): cuatro dolores de coordinación en columnas con íconos de línea, cada uno pivoteando a la resolución.
5. **Cómo arrancás** (claro): onboarding en tres pasos con laptops wireframe y mini-tarjetas (perfil, calendario, compartir), rematando con el CTA de demo.
6. **Principio** (claro, centrado): "Las decisiones son de tu equipo. Manny las ordena."
7. **Footer** (oscuro): formulario con dos botones de intención + footer con LinkedIn.

---

## Qué necesito de vos

### P0 — Revisar la preview y mergear

El push de `landing-v4` genera la preview URL automática de Vercel. Recorrela en desktop y mobile. Si te cierra, merge de **`landing-v4`** a `main` → deploya a manny.tools.

### P0 — Habilitar Web Analytics (post-merge, 2 min)

Dashboard de Vercel → proyecto manny-landing → Analytics → Enable. El snippet ya está en el código (solo prod).

### P0 — Buzón para los pedidos de demo

La v4 suma la opción de **pedir una demo en vivo** además de la lista de espera. Cuando alguien pide demo:
- recibe un mail de confirmación distinto ("Coordinemos una demo de Manny"),
- y llega un **aviso interno** a un buzón del equipo con su email (incluso si ya estaba en la lista).

El buzón interno sale de la env var `WAITLIST_NOTIFY_EMAIL`; si no está, usa la dirección de `RESEND_FROM_EMAIL` (`hola@manny.tools`). **Definí a qué dirección querés que lleguen esos avisos** y seteala en Vercel (Production + Preview). Los mails solo se pueden probar de verdad en un deploy (las keys de Resend viven en Vercel).

### P1 — Docs de comunicación

El copy de la v4 se apartó bastante del doc `12_LANDING_COPY_V3.md` (nuevo hero de tres golpes, dolores, onboarding). Cuando esto esté deployado, conviene que actualicemos ese doc para que refleje lo vivo. Lo hago yo en la próxima sesión; avisame cuando mergees.

---

## Notas técnicas

- **Componentes sin usar en el repo** (quedaron de la v3, ya no se importan): `Highlight`, `VistaCentral`, `ContextoOmnicanal`, `RelacionCliente`, `Disenador`. No entran en el build. Se pueden borrar cuando la v4 quede firme; los dejé por las dudas.
- **Sin librerías de animación.** La v4 quitó las coreografías de la v3 (mockups animados) y la mascota con globo. Todo estático, foco en composición.
- **QA de voz en cero**: voseo, sin raya, sin frases prohibidas, mínimo 13px, sin "lote", "pipeline" solo en un comentario de código. `npx tsc --noEmit` y `npm run build` pasan.
- El `CLAUDE.md` del repo está actualizado con la estructura v4, componente por componente.

---

## Verificación local

```bash
npm install
npm run build
npm run dev            # http://localhost:4321

grep -rEn '\b(tú|tienes|puedes|haces|debes)\b' src/ --include='*.astro'
grep -rn "—" src/ --include='*.astro' public/llms.txt
grep -rEn 'font-size:\s*1[012]px' src/ --include='*.astro' --include='*.css'
```
