# Dentana Pro — status projekta

Poslednje ažuriranje: **19. jun 2026.**

Repozitorijum: [github.com/Servoteh/dentana](https://github.com/Servoteh/dentana)

---

## Šta je urađeno

### Sajt i optimizacija

- [x] Kompletan sajt preuzet sa live `dentana.rs` + slike iz zip/foldera
- [x] **63 WebP slike** (~51% manje od JPG) — isti vizuelni izgled
- [x] Self-hosted fontovi (`fonts/`, `fonts.css`) — Inter + Cormorant, weight 300–700
- [x] Favicon, `apple-touch-icon.png`, `og-image.jpg` (1200×630)
- [x] Lazy loading slika, preload hero slike
- [x] SEO: `canonical`, JSON-LD (`Dentist`), novi `sitemap.xml`, `robots.txt`
- [x] Izgled sajta **identičan** live verziji (CSS nepromenjen osim poruka forme)

### Cloudflare Workers deploy

- [x] GitHub repo: **Servoteh/dentana**, grana `main`
- [x] `wrangler.jsonc` — static assets + exclude (`.git`, `tools`, izvorne slike)
- [x] `worker.js` — servira statiku + ruta `/api/booking`
- [x] `_headers` — security headers, cache
- [x] `_redirects` — ispraznjen (Wrangler ne dozvoljava apsolutne URL-ove)
- [x] Deploy komanda: `npx wrangler deploy`
- [x] Ispravljen deploy error (`Invalid _redirects configuration`)

### Forma za zakazivanje

- [x] `functions/api/booking.js` — Resend API
- [x] `script.js` — `fetch('/api/booking')` umesto `mailto:`
- [x] Honeypot polje protiv spama
- [x] Poruke uspeha/greške u formi

### DNS i domen

- [x] Domen `dentana.rs` dodat u Cloudflare — status **Active**
- [x] Nameserveri prebačeni na Cloudflare (`amalia.ns.cloudflare.com`, `max.ns.cloudflare.com`)
- [x] Worker custom domains dodati: `dentana.rs`, `www.dentana.rs`
- [x] Stari A zapisi za `@` i `www` obrisani (pre dodavanja Worker domena)
- [x] Resend API ključ podešen u Cloudflare Workers env

### Git commit-i

| Commit | Opis |
|--------|------|
| `c9e0007` | Cloudflare Pages paket — WebP, SEO, booking API |
| `f115034` | Fix deploy — wrangler.jsonc, worker.js, _redirects |

---

## Trenutno stanje (u toku)

### DNS propagacija

- Cloudflare dashboard: **Active** ✅
- Cloudflare DNS (1.1.1.1): vidi Cloudflare NS ✅
- Google DNS (8.8.8.8): još kešira stari `ns10.normasoft.net` ⏳
- Sajt sa interneta (nginx): još ide na **stari server** `176.9.113.163` ⏳

**Simptom:** forma i dalje otvara **mailto** (stari `script.js` na nginx-u).

**Kad propagacija završi:** forma koristi `/api/booking` + Resend, bez otvaranja mail app-a.

Provera:

```powershell
nslookup -type=NS dentana.rs 8.8.8.8
curl.exe -sI https://dentana.rs/ | findstr cf-ray
```

Kad vidiš `cf-ray` — sajt ide preko Cloudflare-a.

---

## Šta još treba uraditi

### Odmah posle propagacije

- [ ] Otvoriti https://dentana.rs u incognito — potvrditi novi sajt (`cf-ray` u headers)
- [ ] Testirati formu (ime + telefon) — poruka uspeha + email na `info@dentana.rs`
- [ ] Poslati test email **na** `info@dentana.rs` — proveriti da MX/email radi
- [ ] Cloudflare → **SSL/TLS** → Full (strict)
- [ ] Cloudflare → **Always Use HTTPS** → ON
- [ ] Redirect Rule: `www.dentana.rs` → `https://dentana.rs` (301)

### Resend

- [ ] Verifikovati domen `dentana.rs` u Resend dashboardu (DKIM/CNAME u Cloudflare DNS)
- [ ] Ažurirati SPF TXT — spojiti postojeći mail SPF + Resend `include:`
- [ ] Postaviti `BOOKING_FROM` = `Dentana Pro <noreply@dentana.rs>` (posle verifikacije)

### DNS — provera zapisa u Cloudflare

| Zapis | Treba da bude |
|-------|----------------|
| `@` / `dentana.rs` | Worker custom domain (proxied) |
| `www` | Worker custom domain (proxied) |
| `mail` A | `176.9.113.163` — **DNS only (sivi oblak)** |
| MX | `mail.dentana.rs` prio 5 — DNS only |
| TXT SPF | postojeći + Resend kad verifikuješ |

- [ ] Potvrditi da je **A `mail`** sivi oblak (ne proxied)
- [ ] Obrisati nepotrebne zapise `ftp`, `m` ako se ne koriste

### SEO

- [ ] Google Search Console — dodati `dentana.rs`
- [ ] Poslati sitemap: `https://dentana.rs/sitemap.xml`

### Kasnije (1–2 nedelje)

- [ ] Potvrditi da sve radi 7+ dana
- [ ] Ugasiti **web** deo starog VPS-a (`176.9.113.163`)
- [ ] **Ne gasiti** mail na VPS-u dok email ostaje tamo

---

## Struktura repozitorijuma (deploy)

```
dentana/
├── index.html, style.css, script.js
├── fonts.css, fonts/
├── img/              (*.webp, *.svg)
├── worker.js         (router: statika + /api/booking)
├── wrangler.jsonc
├── functions/api/booking.js
├── _headers, _redirects
├── favicon.*, og-image.jpg, apple-touch-icon.png
├── robots.txt, sitemap.xml
├── tools/            (npm run build — optimizacija slika/fontova)
├── DEPLOY.md         (tehničko uputstvo)
└── STATUS.md         (ovaj fajl)
```

---

## Cloudflare env varijable (Worker)

| Varijabla | Vrednost | Status |
|-----------|----------|--------|
| `RESEND_API_KEY` | Resend API ključ | ✅ u Cloudflare Secrets (ručno) |
| `BOOKING_TO` | `info@dentana.rs` | ✅ u `wrangler.jsonc` |
| `BOOKING_FROM` | `Dentana Pro <noreply@dentana.rs>` | ✅ u `wrangler.jsonc` |

---

## Korisne komande

```powershell
# DNS propagacija
nslookup -type=NS dentana.rs 8.8.8.8
curl.exe -sI https://dentana.rs/ | findstr cf-ray

# Osveži lokalni DNS keš
ipconfig /flushdns

# Ponovna optimizacija slika
cd tools && npm install && npm run build

# Lokalni preview
npx wrangler dev
```

---

## Kontakti / tehnički podaci

| | |
|---|---|
| Domen | dentana.rs |
| Email | info@dentana.rs |
| Mail server | mail.dentana.rs → 176.9.113.163 |
| Stari web server | 176.9.113.163 (nginx, Hetzner) |
| Novi hosting | Cloudflare Workers |
| GitHub | Servoteh/dentana |
