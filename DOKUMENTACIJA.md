# Dentana Pro — tehnička dokumentacija sajta

**Domen:** [dentana.rs](https://dentana.rs) · **Repo:** [github.com/Servoteh/dentana](https://github.com/Servoteh/dentana) (grana `main`)
**Hosting:** Cloudflare Workers (static assets + serverless API)
**Jezici:** srpski (primarni) + engleski
**Status:** ✅ ZAVRŠENO i LIVE · Poslednje ažuriranje: **25. jun 2026.**

Ovaj dokument opisuje kompletan tehnički ustroj sajta: infrastrukturu, domen i DNS, hosting i deploy, email, strukturu, SEO, sadržaj, performanse, bezbednost i način održavanja.

---

## 1. Pregled

Dentana Pro je dvojezičan (SR/EN) sajt stomatološke ordinacije, izgrađen kao **statički sajt + jedna serverless funkcija** (forma za zakazivanje). Hostuje se na **Cloudflare Workers** platformi, sa automatskim deploy-em na svaki `git push` na granu `main`.

| Komponenta | Tehnologija |
|---|---|
| Frontend | Statički HTML + CSS + vanilla JS (bez frameworka) |
| Hosting | Cloudflare Workers (Static Assets) |
| Serverless API | Cloudflare Pages Function `/api/booking` |
| Slanje mejlova | Resend API |
| Fontovi | Self-hosted (Inter + Cormorant Garamond, woff2) |
| Slike | WebP (63 slike, ~51% manje od JPG) |
| Verzionисање / CI | GitHub → auto-deploy na Cloudflare |

---

## 2. Infrastruktura (Cloudflare)

### 2.1 Cloudflare Workers — hosting

Sajt servira **Worker** po imenu `dentana`. Konfiguracija je u [`wrangler.jsonc`](wrangler.jsonc):

```jsonc
{
  "name": "dentana",
  "main": "worker.js",
  "compatibility_date": "2026-06-19",
  "compatibility_flags": ["nodejs_compat"],
  "vars": {
    "BOOKING_TO": "dentanapro@gmail.com",
    "BOOKING_FROM": "Dentana Pro <noreply@servoteh.com>"
  },
  "assets": { "directory": ".", "exclude": [ ".git/**", "worker.js", "functions/**", "tools/**", "img/*.jpg", "site/**", ... ] }
}
```

- **`worker.js`** je ulazna tačka: ako je putanja `/api/booking` → prosleđuje serverless funkciji; sve ostalo → servira statički fajl (`env.ASSETS.fetch`).
- **`assets.directory: "."`** znači da se ceo root repozitorijuma servira kao statika, uz `exclude` listu (worker.js, functions/, tools/, izvorni JPG-ovi, stari folderi…).

```js
// worker.js (suština)
if (pathname === '/api/booking') return booking.onRequestPost(context);
return env.ASSETS.fetch(request);
```

### 2.2 Domen i DNS

| Zapis | Vrednost | Proxy | Svrha |
|---|---|---|---|
| Nameserveri | `amalia.ns.cloudflare.com`, `max.ns.cloudflare.com` | — | Zona na Cloudflare-u |
| `dentana.rs` (apex) | Worker **Custom Domain** | ☁️ Proxied | Glavni sajt (Worker) |
| `www.dentana.rs` | CNAME → `dentana.rs` | ☁️ Proxied | + Redirect Rule (vidi 2.3) |
| `mail` A | `176.9.113.163` (VPS) | DNS only | Mejl server (nije diran) |
| MX | `mail.dentana.rs` | — | Prijem mejlova |

> Apex (`dentana.rs`) je vezan **direktno na Worker** kao Custom Domain. Web više **ne ide** na stari nginx VPS (`176.9.113.163`) — na VPS-u ostaje samo mejl (MX).

### 2.3 `www` → apex redirect (Redirect Rule)

`www.dentana.rs` se **301 preusmerava** na `dentana.rs` preko Cloudflare **Redirect Rule** (Rules → Redirect Rules):

- **Tip:** Wildcard pattern
- **Request URL:** `https://www.dentana.rs/*`
- **Target:** `https://dentana.rs/${1}` · **Status:** `301` · Preserve query string ✅

Redirect se izvršava **na Cloudflare ivici** (pre origin poziva), pa rešava i raniji `522` (Worker je vezan samo na apex hostname; `www` nije imao origin). Rezultat: `www.dentana.rs/bilo-šta` → `301` → `dentana.rs/bilo-šta` → `200`.

### 2.4 SSL / sigurnosni headeri

- SSL: HTTPS svuda (preporuka: **Full (strict)** + Always Use HTTPS u dashboardu).
- Sigurnosni i cache headeri se postavljaju kroz [`_headers`](_headers):

```
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

/index.html   Cache-Control: public, max-age=0, must-revalidate
/style.css    Cache-Control: public, max-age=604800
/script.js    Cache-Control: public, max-age=604800
/fonts/*      Cache-Control: public, max-age=31536000, immutable
/img/*        Cache-Control: public, max-age=31536000, immutable
```

> Napomena o kešu: `style.css`/`script.js` se keširaju 7 dana; posle izmene ponekad je potreban **Ctrl+F5** da browser povuče novu verziju.

---

## 3. Deploy (CI/CD)

```
Lokalna izmena  →  git commit  →  git push (main)  →  Cloudflare auto-deploy  →  LIVE
```

- Repo: **GitHub `Servoteh/dentana`**, grana `main`.
- Svaki push na `main` automatski deployuje Worker (statika + funkcija).
- Ručni deploy (ako zatreba): `npx wrangler deploy`.
- Lokalni razvoj: `npx wrangler dev`.

---

## 4. Forma za zakazivanje i email

### 4.1 Tok

```
Forma na sajtu  →  POST /api/booking  →  Cloudflare funkcija  →  Resend API  →  email u inbox
```

- Funkcija: [`functions/api/booking.js`](functions/api/booking.js)
- Frontend poziv: `fetch('/api/booking', { method:'POST', body: JSON(...) })` u [`script.js`](script.js)

### 4.2 Email konfiguracija

| Parametar | Vrednost | Gde je definisano |
|---|---|---|
| **Šalje (from)** | `Dentana Pro <noreply@servoteh.com>` | `wrangler.jsonc` → `BOOKING_FROM` |
| **Prima (to)** | `dentanapro@gmail.com` | `wrangler.jsonc` → `BOOKING_TO` |
| **reply_to** | email pacijenta (iz forme) | dinamički |
| **API ključ** | `RESEND_API_KEY` | Cloudflare **Secrets** (nije u kodu) |
| Domen pošiljaoca | `servoteh.com` (verifikovan u Resend-u) | Resend |

- **Javna kontakt adresa** na celom sajtu je `dentanapro@gmail.com` (mailto, FAQ „pošaljite snimak", schema). Adresa `info@dentana.rs` se **više ne koristi** (nije stizala).
- Mejl prijave nosi i red **„Jezik upita: SR/EN"** — ako je upit sa engleske verzije, u subject-u stoji `(EN)` i napomena „odgovoriti na engleskom".

### 4.3 Zaštita forme

- **Honeypot** polje (`website`) — botovi ga popune, ljudski korisnici ne vide.
- **Cloudflare Turnstile** — server-side verifikacija je već pripremljena u `booking.js`; aktivira se automatski **čim se postavi `TURNSTILE_SECRET`** u Secrets i doda widget u HTML (trenutno neaktivno).
- Validacija na frontendu: obavezno ime + telefon, format email-a, **checkbox saglasnosti** (ZZPL).

---

## 5. Struktura sajta i stranice

### 5.1 Ključni fajlovi

```
index.html              ← SR početna
style.css               ← jedan CSS za ceo sajt
script.js               ← jedan JS (meni, slajderi, lightbox, forma, …)
fonts.css + fonts/      ← self-hosted fontovi
_headers                ← security + cache
_redirects              ← 301 sa starih URL-ova
sitemap.xml, robots.txt ← SEO
favicon.*, apple-touch-icon.png, og-image.jpg
img/                    ← 63 WebP slike (+ logo SVG)
worker.js               ← Cloudflare Worker entry
wrangler.jsonc          ← Cloudflare konfiguracija
functions/api/booking.js← serverless forma → Resend
usluge/<usluga>/        ← 8 SR stranica usluga
en/                     ← EN početna + stranice
tools/gen/              ← generator stranica usluga (build helper, ne deployuje se)
```

### 5.2 Sve stranice (19 URL-ova u sitemap-u)

**Srpski (9):**
- `/` — početna
- `/usluge/implanti/`
- `/usluge/pregledi-i-lecenje-zuba/`
- `/usluge/oralna-hirurgija/`
- `/usluge/ortodoncija/`
- `/usluge/protetika/`
- `/usluge/parodontologija/`
- `/usluge/decja-stomatologija/`
- `/usluge/estetika-lica/`

**Engleski (10):**
- `/en/` — početna
- `/en/services/dental-implants/`
- `/en/services/general-dentistry/`
- `/en/services/oral-surgery/`
- `/en/services/orthodontics/`
- `/en/services/prosthetics/`
- `/en/services/periodontics/` (meni: „Gum Treatment")
- `/en/services/pediatric-dentistry/`
- `/en/services/facial-aesthetics/`
- `/en/dentist-in-belgrade-english-speaking/` — landing za strane/expat pacijente

### 5.3 Sekcije početne strane

Hero · Usluge (6 kartica) · O nama · Tim (4 doktorke) · Dečja stomatologija · Estetika lica (slajder) · Naši radovi (pre/posle galerija) · Naša ordinacija (galerija) · **Utisci pacijenata (5,0 / 47 Google)** · Česta pitanja (FAQ) · Zakazivanje + Kontakt + mapa.

---

## 6. Dvojezičnost (SR / EN)

- **Prebacivač jezika EN ⇄ SR** u headeru i mobilnom meniju — vodi na **tačan parnjak** svake stranice.
- **`hreflang`** tagovi na svim uparenim stranicama:
  ```html
  <link rel="alternate" hreflang="sr-RS" href="…SR…">
  <link rel="alternate" hreflang="en" href="…EN…">
  <link rel="alternate" hreflang="x-default" href="…SR…">
  ```
- EN slugovi su na engleskom (`/en/services/dental-implants/`) zbog SEO-a.
- Booking forma na EN ima engleske poruke; `script.js` bira jezik prema `<html lang>`.
- US engleski, native-polished tekst.

---

## 7. SEO

| Element | Detalj |
|---|---|
| **JSON-LD** | `Dentist` (adresa, geo, radno vreme, telefon, jezici, sameAs), `WebSite`, `BreadcrumbList`, `FAQPage`, `MedicalProcedure`/`MedicalWebPage` po stranama |
| **sitemap.xml** | 19 URL-ova (SR + EN + expat), poslat u Google Search Console |
| **robots.txt** | dozvoljen Google; Cloudflare „Managed robots" blokira AI-botove |
| **`_redirects`** | 21 stari `.html` URL (iz 2017) → 301 na nove stranice usluga / sekcije |
| **canonical** | svaka strana ima svoj canonical |
| **OG / Twitter** | naslov, opis, `og-image.jpg` (1200×630) |
| **`sameAs`** | Instagram (`instagram.com/dentana_pro`) |
| **Recenzije** | vidljivo 5,0 / 47 + 6 utisaka. **Bez `aggregateRating` markup-a** — Google ne priznaje „self-serving" rejting za LocalBusiness; zvezdice dolaze sa Google Business profila |

---

## 8. Sadržaj — ključne politike (da budu tačne)

- **Prvi pregled:** plaća se (po ceni pregleda) — uključuje dijagnozu, plan i okvirnu procenu.
- **RTG:** deo snimaka u ordinaciji, za druge se pacijent upućuje; postojeći snimak može unapred na WhatsApp/email.
- **Hitni slučajevi:** isti ili sledeći dan, u okviru radnog vremena.
- **Plaćanje:**
  - **Implanti i protetika** — po **fazama terapije** (plaća se kako rad napreduje).
  - **Ortodoncija** — može **na rate**.
- **Ortodoncija:** fiksni i mobilni aparat; fiksni najčešće **18–24 meseca**.
- **Radno vreme:** pon–pet 11:00–19:00; vikend ne radi.
- **Tim:** dr Ana Jaraković (osnivač), dr Zorica Popović Ignjatović, dr Tijana Aćimović (parodontologija/oralna hirurgija/implanti), dr Jasmina Milišić (ortodoncija).

---

## 9. Konverzija

- **Mikro-CTA trake** između sekcija (Zakažite konsultaciju / prvi pregled / WhatsApp+snimak).
- **Sticky mobilna traka** na dnu (📞 Pozovi · 💬 WhatsApp) — prati skrol na telefonu.
- **Plutajuće WhatsApp dugme** na desktopu.
- CTA dugmad na svakoj stranici usluge (sadržaj + ispod FAQ-a).

---

## 10. Performanse i pristupačnost

**Performanse**
- 63 **WebP** slike (~51% manje od JPG); `preload` hero slike sa `fetchpriority="high"`; `loading="lazy"` na ostalom.
- **Self-hosted fontovi** (woff2) — nema render-blocking poziva ka Google Fonts.
- Slajderi se **pauziraju van ekrana** (IntersectionObserver) i poštuju `prefers-reduced-motion`.

**Pristupačnost (a11y)**
- Hamburger `aria-expanded`/`aria-controls`; meni se zatvara na `Esc`.
- Focus management u lightbox galerijama; dekorativne emoji ikone `aria-hidden`.
- Nativni checkbox (vidljiva kvačica).

**Bezbednost**
- `_headers`: HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy.

---

## 11. Build proces (stranice usluga)

16 stranica usluga (8 SR + 8 EN) se generišu iz jednog šablona, da bi header/footer/navigacija/schema bili **identični** svuda. Generator je u **[`tools/gen/`](tools/gen/)** (ne deployuje se):

```
tools/gen/
  gen-site.cjs       ← generator (šablon + hreflang + prebacivač + footer)
  usluge-data.cjs    ← SR sadržaj (naslovi, tekst, FAQ, slike)
  en-data.cjs        ← EN sadržaj
```

**Regeneracija nakon izmene sadržaja stranica usluga:**
```bash
node tools/gen/gen-site.cjs "<putanja do repo root-a>"
```
→ prepiše `usluge/*/index.html` i `en/services/*/index.html`.

> Početne strane (`index.html`, `en/index.html`) i expat strana se uređuju **direktno** (nisu generisane).

**Optimizacija slika (WebP):** u `tools/` (koristi `sharp`):
```bash
cd tools && npm install && npm run build
```

---

## 12. Env varijable i tajne

| Naziv | Vrednost / izvor | Gde |
|---|---|---|
| `RESEND_API_KEY` | Resend API ključ | Cloudflare **Secrets** |
| `BOOKING_TO` | `dentanapro@gmail.com` | `wrangler.jsonc` |
| `BOOKING_FROM` | `Dentana Pro <noreply@servoteh.com>` | `wrangler.jsonc` |
| `TURNSTILE_SECRET` | (opciono, za anti-spam) | Cloudflare Secrets — još nije postavljeno |

---

## 13. Trenutni status

✅ **Sve gotovo i live:**
- Sajt na Cloudflare Workers; `dentana.rs` i `www.dentana.rs` (301 → apex) rade.
- Dvojezičan (SR + EN) + expat landing; hreflang i prebacivač jezika.
- 19 stranica, JSON-LD schema, sitemap u Search Console.
- Forma → Resend → `dentanapro@gmail.com`; kontakt adresa svuda gmail.
- Recenzije 5,0/47, FAQ sa direktnim odgovorima, tačne politike plaćanja.
- Konverzija (CTA trake, sticky mobilna traka), performanse, a11y, bezbednost.

---

## 14. Preostalo / opciono (kad bude vremena)

- [ ] **Google Business link** — zameniti privremeni Maps-pretraga link na dugmetu „Pogledajte recenzije" (SR i EN).
- [ ] **Tačne geo koordinate** za Republičku 1a (sad zaokružene 44.768, 20.413) u JSON-LD.
- [ ] **Facebook** — ako postoji zvanična stranica, dodati u `sameAs`.
- [ ] **Plausible analitika** — otvoriti nalog i otkomentarisati skriptu u `<head>` (već pripremljeno).
- [ ] **Turnstile** — napraviti widget + `TURNSTILE_SECRET` u Secrets (kod već čeka).
- [ ] **SSL Full (strict)** + Always HTTPS — potvrditi u Cloudflare dashboardu.
- [ ] **Stari VPS web** — ugasiti (mejl ostaje); web ionako ide na Cloudflare.
- [ ] **FR (francuska) verzija** — ista struktura kao EN, ako/kad zatreba.

---

## 15. Korisne komande i provere

```bash
# Lokalni razvoj
npx wrangler dev

# Ručni deploy
npx wrangler deploy

# Regeneracija stranica usluga
node tools/gen/gen-site.cjs "."

# Optimizacija slika u WebP
cd tools && npm run build

# Provera da sajt ide preko Cloudflare-a (ne preko starog VPS-a)
curl -sI https://dentana.rs/ | grep -i "server\|cf-ray"

# Provera www redirecta
curl -sI https://www.dentana.rs/ | grep -i "location"
```

**Tipično rešenje za „ne vidim izmenu":** browser keš → `Ctrl + F5` (ili Incognito).

---

## 16. Tehnički podaci

| | |
|---|---|
| Domen | dentana.rs (apex), www → 301 |
| Adresa | Republička 1a, 11030 Beograd (Sunčana Padina, Banovo brdo / Žarkovo) |
| Telefon | +381 63 349 128 · +381 11 236-0421 |
| Email (kontakt) | dentanapro@gmail.com |
| Instagram | instagram.com/dentana_pro |
| Hosting | Cloudflare Workers (`dentana`) |
| Mejl server | mail.dentana.rs → 176.9.113.163 (VPS) |
| Slanje forme | Resend (servoteh.com) |
| GitHub | Servoteh/dentana (`main`) |
| Cloudflare NS | amalia.ns.cloudflare.com, max.ns.cloudflare.com |

---

*Povezani dokumenti: [STATUS.md](STATUS.md) · [PLAN.md](PLAN.md) · [DEPLOY.md](DEPLOY.md) · [README.md](README.md)*
