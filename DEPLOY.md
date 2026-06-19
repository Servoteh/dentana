# Dentana Pro — deploy uputstvo

Repozitorijum: **https://github.com/Servoteh/dentana**

Detaljan status i checklist: **[STATUS.md](./STATUS.md)**

---

## Arhitektura

Sajt se deploy-uje kao **Cloudflare Worker** sa statičkim assetima:

- `worker.js` — servira fajlove + `/api/booking`
- `wrangler.jsonc` — konfiguracija
- Deploy komanda: `npx wrangler deploy`

> **Napomena:** `_redirects` ne sme sadržati apsolutne URL-ove (`https://...`). Preusmeravanje `www` → apex podesi u Cloudflare **Redirect Rules**.

---

## Struktura projekta

| Fajl / folder | Namena |
|---------------|--------|
| `index.html`, `style.css`, `script.js` | Glavni sajt |
| `img/` | WebP slike + SVG logotipi |
| `fonts/`, `fonts.css` | Self-hosted fontovi |
| `worker.js` | Worker router |
| `wrangler.jsonc` | Cloudflare konfiguracija |
| `functions/api/booking.js` | Resend API za formu |
| `_headers` | Security + cache headers |
| `robots.txt`, `sitemap.xml` | SEO |
| `tools/` | `npm run build` — optimizacija slika/fontova |

---

## GitHub → Cloudflare (trenutni setup)

1. Repo: **Servoteh/dentana**, grana `main`
2. Cloudflare Workers → projekat **dentana**
3. Build/deploy komanda: `npx wrangler deploy`
4. Custom domains: `dentana.rs`, `www.dentana.rs`

---

## Resend (forma)

1. [resend.com](https://resend.com) → API key
2. Workers → **dentana** → **Settings** → **Variables**:

| Varijabla | Vrednost |
|-----------|----------|
| `RESEND_API_KEY` | API ključ *(Cloudflare Secrets — ručno)* |
| `BOOKING_TO` | `info@dentana.rs` *(u wrangler.jsonc)* |
| `BOOKING_FROM` | `Dentana Pro <noreply@dentana.rs>` *(u wrangler.jsonc)* |

> `RESEND_API_KEY` ostaje Secret u Cloudflare dashboardu. `BOOKING_*` se deploy-uju iz `wrangler.jsonc` pri svakom push-u.

3. Pre verifikacije domena koristi se fallback `onboarding@resend.dev`

---

## DNS (email ostaje na VPS-u)

| Zapis | Vrednost | Proxy |
|-------|----------|-------|
| `@`, `www` | Worker custom domain | Proxied |
| `mail` A | `176.9.113.163` | **DNS only** |
| MX | `mail.dentana.rs` (5) | DNS only |
| TXT | SPF (+ Resend kad verifikuješ) | — |

**Ne briši** MX i A za `mail`.

---

## SSL i performanse

- **SSL/TLS** → Full (strict)
- **Always Use HTTPS** → ON
- **Auto Minify** → HTML, CSS, JS
- **Brotli** → ON

---

## Ponovna optimizacija slika

```bash
cd tools
npm install
npm run build
git add img/ fonts.css og-image.jpg favicon.*
git commit -m "Re-optimize assets"
git push
```

---

## Lokalni preview

```bash
npx wrangler dev
```

Kreiraj `.dev.vars`:

```
RESEND_API_KEY=re_...
BOOKING_TO=info@dentana.rs
```

---

## Provera posle deploya

```powershell
curl.exe -sI https://dentana.rs/ | findstr cf-ray
curl.exe -s https://dentana.rs/script.js | findstr api/booking
```

- `cf-ray` → Cloudflare aktivan
- `/api/booking` u script.js → nova forma (ne mailto)
