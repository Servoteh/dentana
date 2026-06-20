# Dentana Pro — status projekta

Poslednje ažuriranje: **20. jun 2026.**

Repozitorijum: [github.com/Servoteh/dentana](https://github.com/Servoteh/dentana)

> ✅ **Status: ZAVRŠENO i LIVE.** Migracija + kompletan razvoj (SR sajt, stranice po uslugama, recenzije, FAQ, EN verzija + expat strana) su gotovi i potvrđeni u produkciji. Sajt ostaje u ovom stabilnom stanju; preostale stavke su opcione (vidi „Preostalo" i [PLAN.md](PLAN.md)).

---

## Migracija — ZAVRŠENA ✅

Sajt je prebačen sa nginx VPS-a (`176.9.113.163`) na **Cloudflare Workers**. Izgled je identičan prethodnoj live verziji.

| Komponenta | Status |
|------------|--------|
| Sajt `dentana.rs` | ✅ Cloudflare Workers |
| DNS Cloudflare | ✅ Active |
| Forma za termin | ✅ Radi — Resend |
| Slanje emaila | ✅ `noreply@servoteh.com` → `info@dentana.rs` |
| Primanje emaila `info@` | ✅ MX → VPS (nije dirano) |
| `www.dentana.rs` | ✅ Radi (DNS propagiran) |
| Engleska verzija `/en/` | ✅ Live (dvojezičan sajt) |

---

## Razvoj sajta — ZAVRŠENO ✅ (20. jun 2026.)

Nakon migracije, urađen ceo paket unapređenja (detalji u [PLAN.md](PLAN.md)):

- **SEO/sadržaj:** FAQ sa direktnim odgovorima + `FAQPage` schema; obogaćen `Dentist` JSON-LD; `_redirects` (stari 2017 URL-ovi → prave stranice usluga)
- **8 stranica po uslugama** `/usluge/<usluga>/` (jedinstven SEO, breadcrumb, schema)
- **Utisci pacijenata** — sekcija sa 5,0 / 47 Google recenzija + 6 realnih utisaka
- **Forma** — validacija, inline greške, checkbox saglasnosti (ZZPL), jezik upita u mejlu
- **a11y + performanse** — aria, focus management, `prefers-reduced-motion`, pauza slajdera
- **Konverzija** — mikro-CTA trake, sticky mobilna traka (Pozovi/WhatsApp), popravljen dropdown
- **Engleska (EN) verzija** — `/en/` + 8 EN stranica usluga + expat landing strana (`/en/dentist-in-belgrade-english-speaking/`), prebacivač jezika EN⇄SR, `hreflang`, native-polished copy
- **Instagram** u footeru + `sameAs`; sitemap **19 URL-ova**

> Build stranica usluga (SR/EN): generator skripte u scratchpad-u
> (`gen-site.js` + `usluge-data.js` + `en-data.js`) — izlaz su statički `.html` fajlovi u repo-u.

---

## Šta je urađeno

### Sajt i optimizacija

- [x] Kompletan sajt sa live `dentana.rs` + slike iz zip/foldera
- [x] **63 WebP slike** (~51% manje od JPG) — isti vizuelni izgled
- [x] Self-hosted fontovi (`fonts/`, `fonts.css`) — Inter + Cormorant, weight 300–700
- [x] Favicon, `apple-touch-icon.png`, `og-image.jpg` (1200×630)
- [x] Lazy loading, preload hero slike
- [x] SEO: `canonical`, JSON-LD (`Dentist`), `sitemap.xml`, `robots.txt`

### Cloudflare Workers

- [x] GitHub: **Servoteh/dentana**, grana `main`
- [x] `wrangler.jsonc` + `worker.js` (statika + `/api/booking`)
- [x] `_headers` (security, cache)
- [x] Deploy: `npx wrangler deploy`
- [x] Custom domain: `dentana.rs`
- [x] Custom domain / CNAME: `www.dentana.rs` (propagacija u toku)

### Forma i email

- [x] `functions/api/booking.js` — Resend API
- [x] `script.js` — `fetch('/api/booking')` (ne mailto)
- [x] Honeypot, poruke uspeha/greške
- [x] `RESEND_API_KEY` u Cloudflare Secrets
- [x] `BOOKING_FROM` = `Dentana Pro <noreply@servoteh.com>` (wrangler.jsonc)
- [x] `BOOKING_TO` = `info@dentana.rs` (wrangler.jsonc)
- [x] Domen **servoteh.com** verifikovan u Resend-u
- [x] Test slanja — **radi**

### DNS

- [x] Nameserveri → Cloudflare (`amalia.ns.cloudflare.com`, `max.ns.cloudflare.com`)
- [x] Zone status: **Active**
- [x] `mail` A → `176.9.113.163` (DNS only — email)
- [x] MX → `mail.dentana.rs`

---

## Git commit-i (historija)

| Commit | Opis |
|--------|------|
| `c9e0007` | Cloudflare paket — WebP, SEO, booking API |
| `f115034` | Fix deploy — wrangler.jsonc, worker.js |
| `b18a53d` | STATUS.md + DEPLOY.md |
| `d6e036a` | Jasnije Resend poruke greške |
| `4bc6d35` | BOOKING_FROM/TO u wrangler.jsonc |
| `cb355c2` | Slanje sa servoteh.com |
| `625bf5c` | Resend servoteh.com dokumentacija |

---

## Preostalo (sitnice)

- [x] `www.dentana.rs` — radi
- [x] Google Search Console + sitemap
- [ ] SSL Full (strict) + Always HTTPS — proveriti u dashboardu
- [ ] Obrisati DNS zapise `ftp`, `m` ako se ne koriste
- [ ] Posle 1–2 nedelje: ugasiti **web** na starom VPS-u (mail ostaje)
- [ ] Sitnice iz [PLAN.md](PLAN.md): Google Business link, tačne geo koordinate, Facebook, Plausible, Turnstile

---

## Razvoj sajta — ZAVRŠENO

Faza unapređenja sadržaja/izgleda + dvojezičnost (EN) su **gotovi i live** — vidi „Razvoj sajta — ZAVRŠENO" gore i [PLAN.md](PLAN.md). Preostalo su samo sitnice koje traže naloge/podatke (gore).

### Kako radimo izmene

1. Edit fajlova lokalno (`index.html`, `style.css`, `script.js`)
2. `git commit` + `git push` → automatski Cloudflare deploy
3. Slike: `cd tools && npm run build` pre commita ako dodaješ JPG

---

## Env varijable (Worker)

| Varijabla | Vrednost | Gde |
|-----------|----------|-----|
| `RESEND_API_KEY` | Resend API ključ | Cloudflare Secrets |
| `BOOKING_TO` | `info@dentana.rs` | `wrangler.jsonc` |
| `BOOKING_FROM` | `Dentana Pro <noreply@servoteh.com>` | `wrangler.jsonc` |

---

## Korisne komande

```powershell
# Provera Cloudflare
curl.exe -sI https://dentana.rs/ | findstr cf-ray
nslookup www.dentana.rs 1.1.1.1

# Lokalni razvoj
cd tools && npm install && npm run build
npx wrangler dev
```

---

## Tehnički podaci

| | |
|---|---|
| Domen | dentana.rs |
| Email ordinacije | info@dentana.rs |
| Mail server | mail.dentana.rs → 176.9.113.163 (VPS) |
| Web hosting (novi) | Cloudflare Workers |
| Email slanje (forma) | Resend / servoteh.com |
| GitHub | Servoteh/dentana |
| Cloudflare NS | amalia.ns.cloudflare.com, max.ns.cloudflare.com |
