# Dentana Pro — sajt

Stomatološka ordinacija Dentana Pro, Beograd — statički sajt na **Cloudflare Workers**.

| | |
|---|---|
| **Live** | [dentana.rs](https://dentana.rs) |
| **Repo** | [github.com/Servoteh/dentana](https://github.com/Servoteh/dentana) |
| **Hosting** | Cloudflare Workers (`npx wrangler deploy`) |
| **Forma** | Resend API → `info@dentana.rs` (From: `noreply@servoteh.com`) |

## Dokumentacija

- **[STATUS.md](./STATUS.md)** — šta je urađeno, trenutno stanje, checklist, plan za sutra
- **[DEPLOY.md](./DEPLOY.md)** — tehničko uputstvo (deploy, DNS, Resend, komande)

## Brzi start (razvoj)

```bash
cd tools && npm install && npm run build   # optimizacija slika/fontova
npx wrangler dev                           # lokalni preview
```

## Struktura

```
index.html, style.css, script.js   — sajt
img/, fonts/                       — asseti
worker.js, wrangler.jsonc          — Cloudflare Worker
functions/api/booking.js           — forma → Resend
_headers, robots.txt, sitemap.xml  — SEO i cache
```
