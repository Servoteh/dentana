function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function resendErrorMessage(status, bodyText, from, to) {
  var msg = '';
  try {
    var parsed = JSON.parse(bodyText);
    msg = String(parsed.message || parsed.error || '').toLowerCase();
  } catch (e) {
    msg = String(bodyText || '').toLowerCase();
  }

  if (status === 401) {
    return 'Email servis nije ispravno podešen (RESEND_API_KEY). Kontaktirajte ordinaciju telefonom.';
  }

  if (status === 403) {
    if (from.indexOf('resend.dev') !== -1) {
      return 'Test email može stići samo na Resend nalog dok se domen dentana.rs ne verifikuje. Pozovite nas ili pišite na WhatsApp.';
    }
    return 'Domen za slanje emaila nije verifikovan u Resend-u (dentana.rs). Pozovite nas ili pišite na WhatsApp.';
  }

  if (status === 422 || msg.indexOf('from') !== -1 || msg.indexOf('domain') !== -1) {
    return 'Adresa pošiljaoca nije verifikovana. Proverite Resend domen dentana.rs. Pozovite nas ili pišite na WhatsApp.';
  }

  if (status === 429) {
    return 'Previše zahteva u kratkom vremenu. Pokušajte ponovo za nekoliko minuta ili nas pozovite.';
  }

  console.error('Resend error:', status, bodyText, { from: from, to: to });
  return 'Slanje emaila nije uspelo. Pozovite +381 63 349 128 ili pišite na WhatsApp.';
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Neispravan zahtev.' }, 400);
  }

  if (body.website) {
    return json({ ok: true });
  }

  const ime = String(body.ime || '').trim();
  const telefon = String(body.telefon || '').trim();
  const email = String(body.email || '').trim();
  const usluga = String(body.usluga || '').trim();
  const datum = String(body.datum || '').trim();
  const napomena = String(body.napomena || '').trim();

  if (!ime || !telefon) {
    return json({ error: 'Ime i telefon su obavezni.' }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return json({
      error: 'Email servis nije konfigurisan (RESEND_API_KEY). Kontaktirajte ordinaciju telefonom.',
    }, 503);
  }

  const to = env.BOOKING_TO || 'info@dentana.rs';
  const from = env.BOOKING_FROM || 'Dentana Pro <onboarding@resend.dev>';
  const subject = 'Zakazivanje termina — Dentana Pro';
  const text = [
    'Novi zahtev za termin sa sajta dentana.rs',
    '',
    `Ime i prezime: ${ime}`,
    `Telefon: ${telefon}`,
    `Email: ${email || 'Nije naveden'}`,
    `Usluga: ${usluga || 'Nije navedena'}`,
    `Željeni datum: ${datum || 'Nije naveden'}`,
    `Napomena: ${napomena || '/'}`,
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      reply_to: email || undefined,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return json({
      error: resendErrorMessage(res.status, errText, from, to),
    }, 502);
  }

  return json({ ok: true });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
