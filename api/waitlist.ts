import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const RESEND_API = process.env.RESEND_API!;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const resend = new Resend(RESEND_API);

// Buzón interno para avisos de pedidos de demo. Toma la dirección del
// FROM ("Manny <hola@manny.tools>") salvo que se defina una explícita.
const TEAM_INBOX =
  process.env.WAITLIST_NOTIFY_EMAIL ||
  RESEND_FROM_EMAIL.match(/<(.+)>/)?.[1] ||
  RESEND_FROM_EMAIL;

type Intent = 'waitlist' | 'demo';

function confirmationEmail(intent: Intent): { subject: string; html: string; text: string } {
  if (intent === 'demo') {
    const subject = 'Coordinemos una demo de Manny';

    const text = `¡Hola!

Gracias por querer ver Manny en vivo. Te escribimos en los próximos días para coordinar día y horario.

Si preferís, respondé este mail con tu disponibilidad y lo armamos directo. Lo leemos nosotros.

Hablamos pronto,
El equipo de Manny

manny.tools`;

    const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${subject}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#FFFFFF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#19171D;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFFFF;">
      <tr>
        <td align="center" style="padding:48px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" style="max-width:520px;width:100%;">
            <tr>
              <td style="padding-bottom:32px;">
                <img src="https://manny.tools/apple-touch-icon.png" width="40" height="40" alt="Manny" style="display:block;width:40px;height:40px;border:0;outline:none;text-decoration:none;" />
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:24px;">
                <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:36px;line-height:1.1;font-weight:500;color:#19171D;letter-spacing:-0.02em;">
                  Hablemos <span style="color:#4427FF;font-style:italic;">en vivo</span>.
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:16px;font-size:16px;line-height:1.55;color:#19171D;">
                Gracias por querer ver Manny en vivo. Te escribimos en los próximos días para coordinar día y horario.
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:32px;font-size:16px;line-height:1.55;color:#19171D;">
                Si preferís, respondé este mail con tu disponibilidad y lo armamos directo. Lo leemos nosotros.
              </td>
            </tr>
            <tr>
              <td style="padding-top:32px;border-top:1px solid #DADAD7;font-size:14px;line-height:1.5;color:#848484;">
                Hablamos pronto,<br />
                El equipo de Manny<br />
                <a href="https://manny.tools" style="color:#4427FF;text-decoration:none;">manny.tools</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    return { subject, html, text };
  }

  const subject = 'Ya estás en la lista de Manny';

  const text = `¡Hola!

Te avisamos en cuanto te toque entrar a Manny. Mientras tanto seguimos terminando los últimos detalles.

Si querés contarnos en qué agencia trabajás o qué te trajo acá, respondé este mail. Lo leemos nosotros.

Hablamos pronto,
El equipo de Manny

manny.tools`;

  const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${subject}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#FFFFFF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#19171D;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFFFF;">
      <tr>
        <td align="center" style="padding:48px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" style="max-width:520px;width:100%;">
            <tr>
              <td style="padding-bottom:32px;">
                <img src="https://manny.tools/apple-touch-icon.png" width="40" height="40" alt="Manny" style="display:block;width:40px;height:40px;border:0;outline:none;text-decoration:none;" />
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:24px;">
                <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:36px;line-height:1.1;font-weight:500;color:#19171D;letter-spacing:-0.02em;">
                  Ya estás en <span style="color:#4427FF;font-style:italic;">la lista</span>.
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:16px;font-size:16px;line-height:1.55;color:#19171D;">
                Te avisamos en cuanto te toque entrar a Manny. Mientras tanto seguimos terminando los últimos detalles.
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:32px;font-size:16px;line-height:1.55;color:#19171D;">
                Si querés contarnos en qué agencia trabajás o qué te trajo acá, respondé este mail. Lo leemos nosotros.
              </td>
            </tr>
            <tr>
              <td style="padding-top:32px;border-top:1px solid #DADAD7;font-size:14px;line-height:1.5;color:#848484;">
                Hablamos pronto,<br />
                El equipo de Manny<br />
                <a href="https://manny.tools" style="color:#4427FF;text-decoration:none;">manny.tools</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (req.body ?? {}) as { email?: unknown; source?: unknown; intent?: unknown };
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const intent: Intent = body.intent === 'demo' ? 'demo' : 'waitlist';
  const rawSource = typeof body.source === 'string' ? body.source : 'landing';
  // El intent viaja dentro de source para no tocar el schema de la tabla.
  const source = `${intent === 'demo' ? 'demo+' : ''}${rawSource}`.slice(0, 64);

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  const userAgent = (req.headers['user-agent'] ?? '').toString().slice(0, 512);

  // Aviso interno cuando alguien pide demo: es el dato que queremos ver
  // llegar. Se manda aunque el email ya estuviera en la lista.
  const notifyTeamOfDemo = async () => {
    if (intent !== 'demo') return;
    try {
      await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: TEAM_INBOX,
        subject: `Pedido de demo en vivo: ${email}`,
        text: `${email} pidió una demo en vivo desde la landing.\n\nsource: ${source}\nuser-agent: ${userAgent}`,
      });
    } catch (err) {
      console.error('[waitlist] demo notification failed', err);
    }
  };

  const { error: insertError } = await supabase
    .from('waitlist')
    .insert({ email, source, user_agent: userAgent });

  if (insertError) {
    if (insertError.code === '23505') {
      await notifyTeamOfDemo();
      return res.status(200).json({ ok: true, alreadySignedUp: true });
    }
    console.error('[waitlist] supabase insert error', insertError);
    return res.status(500).json({ error: 'storage_error' });
  }

  await notifyTeamOfDemo();

  try {
    await resend.contacts.create({ email, unsubscribed: false });
  } catch (err) {
    console.error('[waitlist] resend contact create failed', err);
  }

  try {
    const { subject, html, text } = confirmationEmail(intent);
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: email,
      subject,
      html,
      text,
    });
  } catch (err) {
    console.error('[waitlist] resend email send failed', err);
  }

  return res.status(200).json({ ok: true });
}
