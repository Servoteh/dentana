# Dentana Pro — status projekta

Poslednje ažuriranje: **20. jun 2026.**

Repozitorijum: [github.com/Servoteh/dentana](https://github.com/Servoteh/dentana)

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
| `www.dentana.rs` | ⏳ DNS propagacija (CNAME / Worker domen dodat) |

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

- [ ] `www.dentana.rs` — sačekati DNS (5 min – 2 h), pa proveriti
- [ ] Redirect Rule: `www.dentana.rs` → `https://dentana.rs` (301) u Cloudflare
- [ ] Google Search Console + sitemap `https://dentana.rs/sitemap.xml`
- [ ] SSL Full (strict) + Always HTTPS — proveriti u dashboardu
- [ ] Obrisati DNS zapise `ftp`, `m` ako se ne koriste
- [ ] Posle 1–2 nedelje: ugasiti **web** na starom VPS-u (mail ostaje)

---

## Plan od sutra — razvoj sajta

Migracija i infrastruktura su gotovi. Sledeća faza je **planiranje i unapređenje sadržaja/izgleda**:

### Teme za razgovor

1. **Sadržaj** — nove sekcije, tekstovi, usluge, tim
2. **Slike** — zamena / dodavanje fotografija (folder `doktorke/`, izvorni JPG u root-u)
3. **SEO** — meta tagovi po uslugama, blog/članci?
4. **Funkcionalnosti** — Turnstile captcha, Google Analytics, online zakazivanje
5. **Performanse** — dalja optimizacija ako treba
6. **Jezik** — sr/en verzija?

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
