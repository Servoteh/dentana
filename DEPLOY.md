# Dentana Pro — deploy uputstvo

Repozitorijum: **https://github.com/Servoteh/dentana**

Status i plan: **[STATUS.md](./STATUS.md)**

---

## Arhitektura (jun 2026)

```
Korisnik → dentana.rs (Cloudflare DNS)
         → Cloudflare Worker (dentana)
              ├─ /           → statički fajlovi (HTML, CSS, JS, WebP)
              └─ /api/booking → Resend → info@dentana.rs
```

| Servis | Uloga |
|--------|-------|
| **Cloudflare Workers** | Hosting sajta |
| **Resend** (servoteh.com) | Slanje emaila sa forme |
| **VPS 176.9.113.163** | Samo **primanje** emaila (MX/mail) |

Deploy komanda: `npx wrangler deploy` (Git push → automatski build)

---

## Struktura projekta

| Fajl / folder | Namena |
|---------------|--------|
| `index.html`, `style.css`, `script.js` | Sajt |
| `img/` | WebP + SVG |
| `fonts/`, `fonts.css` | Self-hosted fontovi |
| `worker.js` | Router (statika + API) |
| `wrangler.jsonc` | Konfiguracija + env vars |
| `functions/api/booking.js` | Resend API |
| `_headers` | Security + cache |
| `_redirects` | Prazan — www redirect u Cloudflare Rules |
| `tools/` | `npm run build` — optimizacija |

---

## Env varijable

### U `wrangler.jsonc` (automatski deploy)

```jsonc
"vars": {
  "BOOKING_TO": "info@dentana.rs",
  "BOOKING_FROM": "Dentana Pro <noreply@servoteh.com>"
}
```

### U Cloudflare dashboard (ručno)

Workers → **dentana** → Settings → **Variables and Secrets**:

| Name | Type | Value |
|------|------|-------|
| `RESEND_API_KEY` | Secret | `re_...` |

Posle promene Secrets → **Redeploy**.

---

## Resend

1. Nalog: **Servoteh** na [resend.com](https://resend.com)
2. Domen: **`servoteh.com`** verifikovan (DKIM/SPF u DNS-u servoteh.com)
3. **Ne treba** verifikovati dentana.rs za slanje forme
4. Logovi: Resend → **Logs** → provera Delivered/Bounced

---

## DNS (Cloudflare — dentana.rs)

| Zapis | Vrednost | Proxy |
|-------|----------|-------|
| `@` | Worker custom domain | Proxied |
| `www` | Worker custom domain ili CNAME → `dentana.rs` | Proxied |
| `mail` A | `176.9.113.163` | **DNS only** |
| MX `@` | `mail.dentana.rs` (5) | DNS only |
| TXT | SPF (postojeći, bez Resend dela za dentana.rs) | — |

**www redirect (preporučeno):** Cloudflare → Rules → Redirect Rules → `www.dentana.rs` → `https://dentana.rs` (301)

---

## SSL i performanse

- SSL/TLS → **Full (strict)**
- Always Use HTTPS → **ON**
- Auto Minify → HTML, CSS, JS
- Brotli → ON

---

## Workflow izmene sajta

```bash
# 1. Edituj fajlove lokalno
# 2. Ako menjaš slike:
cd tools && npm run build

# 3. Commit + push
git add .
git commit -m "Opis izmene"
git push origin main
# → Cloudflare automatski deploy-uje
```

---

## Lokalni preview

```bash
npx wrangler dev
```

`.dev.vars` (ne commituj):

```
RESEND_API_KEY=re_...
```

---

## Provera

```powershell
curl.exe -sI https://dentana.rs/ | findstr cf-ray
curl.exe -sI https://www.dentana.rs/ | findstr cf-ray
curl.exe -s https://dentana.rs/script.js | findstr api/booking
```

---

## Poznati problemi i rešenja

| Problem | Rešenje |
|---------|---------|
| Forma otvara mailto | Stari nginx — sačekaj DNS / incognito |
| „Email servis nije konfigurisan" | Dodaj `RESEND_API_KEY` Secret + redeploy |
| „Slanje emaila nije uspelo" | Verifikuj servoteh.com u Resend-u |
| www „non-existent domain" | Dodaj www Worker domen ili CNAME |
| Deploy fail `_redirects` | Samo relativne putanje — www u Redirect Rules |
