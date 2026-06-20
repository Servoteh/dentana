# Dentana Pro — plan unapređenja sajta

Kreirano: **20. jun 2026.**
Osnova: analiza produkcijske verzije (`root/`) koja je deployovana na `dentana.rs`.

> Napomena: analiza je rađena na **root** fajlovima (jedina deployovana verzija — `wrangler.jsonc` isključuje `site/**`).

---

## ✅ Urađeno u kodu (20. jun 2026.)

Spremno za `git commit` + push (pregledati lokalno pre deploya):

- **Faza 0:** obrisani stale folderi `site/` i `extracted-final/`
- **Faza 1.2:** FAQ sekcija (`#cesta-pitanja`, native `<details>`) + `FAQPage` JSON-LD
- **Faza 1.1:** šablon sekcije „Utisci pacijenata" (zakomentarisan u `index.html` dok ne stignu prave recenzije)
- **Faza 1.3:** forma — `required`/`autocomplete`, min datum (nema prošlih), inline greške po polju, **checkbox saglasnosti** (ZZPL)
- **Faza 1.4:** obogaćen `Dentist` JSON-LD (addressRegion, medicalSpecialty, areaServed, hasMap, contactPoint, availableLanguage) + `WebSite` schema
- **Faza 2.1:** a11y — hamburger `aria-expanded`/`aria-controls`, `Esc` zatvara meni, focus management u lightbox-ovima, `aria-hidden` na dekorativnim emoji ikonama
- **Faza 2.2:** logo bez `lazy` (iznad preloma), slajderi poštuju `prefers-reduced-motion` i pauziraju se van ekrana (IntersectionObserver)
- **Faza 2.3:** Plausible analitika (zakomentarisana) + Turnstile scaffold (server-side verifikacija u `booking.js`, aktivira se kad postoji `TURNSTILE_SECRET`)
- **Faza 1.5:** 8 zasebnih stranica po uslugama na `/usluge/<usluga>/` (implanti, pregledi-i-lecenje-zuba, oralna-hirurgija, ortodoncija, protetika, parodontologija, decja-stomatologija, estetika-lica) — svaka sa jedinstvenim title/meta/canonical, breadcrumb, proširenim sadržajem, MedicalProcedure/MedicalWebPage + BreadcrumbList + FAQPage schema; navigacija i kartice na početnoj povezane; sitemap proširen (9 URL-ova)
- **Faza 0:** stari URL-ovi (21 iz 2017) → 301 na nove sekcije (`_redirects`)

### ⏳ Ostaje na tvojoj strani (nalozi / sadržaj)

- **Cloudflare dashboard:** `www` → apex 301 redirect, SSL Full (strict), Always HTTPS
- **Google Search Console:** prijava + slanje `sitemap.xml`
- **Recenzije:** prikupiti prave utiske → otkomentarisati sekciju `#utisci` (tek tada `aggregateRating`)
- **Geo koordinate i `sameAs`:** tačan pin za Republičku 1a + linkovi ka Instagram/Facebook/Google Business
- **Plausible:** otvoriti nalog i otkomentarisati skriptu
- **Turnstile:** napraviti widget (site key) + dodati `TURNSTILE_SECRET` u Secrets

---

## Šta je već dobro (ne dirati) ✅

- WebP slike + `preload` hero (`fetchpriority="high"`), lazy loading
- JSON-LD `Dentist` schema (adresa, geo, radno vreme, telefon)
- `canonical`, Open Graph, Twitter Card, `apple-touch-icon`
- Self-hosted fontovi (Inter + Cormorant) — nema render-blocking poziva
- Sigurnosni `_headers` (HSTS, X-Frame-Options, nosniff, Permissions-Policy)
- Booking forma → Resend API, honeypot + poruke o grešci
- Čist `script.js` (slideri kroz jednu fabričku funkciju, nema inline `onclick`)

---

## FAZA 0 — Infrastruktura (brzo, bez rizika)

Zatvoriti pre svega ostalog. Najviše tehničkog duga uz najmanji napor.

- [ ] **`www` → apex 301 redirect** — potvrditi da `www.dentana.rs` radi 301 na `https://dentana.rs` (sprečava duplikat sadržaja)
- [ ] **Google Search Console** — prijaviti domen + poslati `https://dentana.rs/sitemap.xml`
- [ ] **SSL Full (strict)** + **Always Use HTTPS** — proveriti u Cloudflare dashboardu
- [ ] **Očistiti stale foldere** — obrisati ili izmestiti [site/](site/) i [extracted-final/](extracted-final/) (sadrže staru `mailto` formu i sitemap iz 2017; rizik od pogrešnog deploya)
- [ ] Obrisati neiskorišćene DNS zapise (`ftp`, `m`) — iz STATUS.md
- [ ] Posle 1–2 nedelje: ugasiti web na starom VPS-u (mail ostaje)

---

## FAZA 1 — Konverzija i SEO (najveći uticaj na nove pacijente)

Cilj faze: više zakazivanja i bolja vidljivost u pretrazi.

### 1.1 Utisci pacijenata / Google recenzije
- [ ] Sekcija sa 4–6 izdvojenih utisaka ili ugrađene Google recenzije
- [ ] Dodati `aggregateRating` u JSON-LD (potencijalno zvezdice u Google rezultatima)
- **Zašto:** društveni dokaz je presudan za odluku u stomatologiji; trenutno ga nema.

### 1.2 FAQ sekcija
- [ ] Pitanja: rate/plaćanje, trajanje implanta, rad sa decom, hitni slučajevi, prvi pregled…
- [ ] `FAQPage` JSON-LD schema (rich snippets u pretrazi)
- **Zašto:** smanjuje strah pacijenta + jak SEO efekat na long-tail upite.

### 1.3 Dorada booking forme
- [ ] `required` + `autocomplete` atributi na poljima
- [ ] `min` na datum (sad se može izabrati prošli datum)
- [ ] Inline poruke greške po polju (sad postoji samo jedna statusna linija)
- [ ] **Checkbox saglasnosti za obradu podataka** (Zakon o zaštiti podataka o ličnosti — pravno bitno za zdravstvenu ustanovu)
- [ ] Opciono: željeno doba dana (pre/posle podne)

### 1.4 Obogaćivanje JSON-LD i lokalnog SEO-a
- [ ] `sameAs` (Instagram / Facebook / Google Business profil)
- [ ] `hasMap`, `medicalSpecialty`, `addressRegion`
- [ ] Po doktoru `Person` / `Physician` schema
- [ ] Proveriti tačnost geo koordinata (sad zaokružene: 44.768, 20.413) — da pin pada tačno na Republičku 1a

### 1.5 Pojedinačne stranice po uslugama (veći zahvat)
- [ ] Zasebne stranice: implanti, ortodoncija, protetika, estetska stomatologija…
- [ ] Proširiti `sitemap.xml` (trenutno ima samo 1 URL)
- **Zašto:** rangiranje na „implanti Beograd", „ortodoncija Žarkovo", „bele plombe cena". **Obim dogovoriti pre početka.**

---

## FAZA 2 — Pristupačnost, performanse, merenje

### 2.1 Pristupačnost (a11y)
- [ ] Hamburger: `aria-expanded` / `aria-controls` toggle; zatvaranje na `Esc`
- [ ] Lightbox dijalozi: focus trap (prebaciti i vratiti fokus)
- [ ] Dekorativne emoji ikone → `aria-hidden="true"`
- [ ] Proveriti kontrast zlatne na beloj (WCAG AA)

### 2.2 Performanse / animacije
- [ ] Pauzirati slajdere van ekrana (IntersectionObserver) + poštovati `prefers-reduced-motion`
- [ ] `width`/`height` na slikama (sprečava layout shift / CLS)
- [ ] Skinuti `loading="lazy"` sa logotipa u headeru (iznad preloma je)

### 2.3 Merenje i zaštita
- [ ] Analitika (Plausible ili GA4) + praćenje slanja forme i klikova na WhatsApp/telefon
- [ ] Cloudflare Turnstile na formi (besplatan, nevidljiv anti-spam uz postojeći honeypot)

---

## FAZA 3 — Višejezičnost: FR + EN 🇫🇷 🇬🇧

Radi se **na kraju**, kad je srpski sadržaj finalizovan.
Prioritet: **francuski (FR)** — značajan broj pacijenata dolazio je iz Francuske (dental-turizam).
Zatim **engleski (EN)** kao opšti jezik za ostale strane pacijente.

### Pristup
- [ ] Struktura: `dentana.rs/fr/` i `dentana.rs/en/` (zasebne rute/folderi)
- [ ] Prevod celog sadržaja (usluge, tim, FAQ, forma) — prvo FR, pa EN
- [ ] Prebacivač jezika SR ⇄ FR ⇄ EN u headeru
- [ ] `hreflang` tagovi (`sr-RS`, `fr-FR`, `en`, `x-default`) — da Google servira pravu verziju
- [ ] Zaseban `canonical` i unos u `sitemap.xml` po jeziku
- [ ] FR/EN meta opis i OG tagovi
  - FR: „dentiste Belgrade", „implants dentaires Serbie", „tourisme dentaire"
  - EN: „dentist Belgrade", „dental implants Serbia", „dental tourism"
- [ ] Forma i mejl potvrde na FR/EN (Resend `text` šablon po jeziku)

### Razmotriti uz FR/EN
- [ ] Sekcija za strane pacijente: procena troškova, organizacija dolaska/smeštaja, jezik komunikacije
- [ ] Eventualno cenovnik / okvirne cene (strani pacijenti to očekuju pre dolaska)
- [ ] Istaći ko u timu komunicira na FR/EN — jak prodajni argument

---

## Predloženi redosled

1. **FAZA 0** — odmah (infrastruktura, brzo i bez rizika)
2. **FAZA 1.1 + 1.2 + 1.3** — recenzije, FAQ, dorada forme (najviše utiču na zakazivanja)
3. **FAZA 1.4** — SEO obogaćivanje schema
4. **FAZA 2** — a11y, performanse, analitika
5. **FAZA 3 (FR)** — kad je sadržaj na srpskom finalizovan, prevesti i postaviti FR verziju
6. **FAZA 1.5** — pojedinačne stranice po uslugama (najveći zahvat, kad se definiše obim)

---

## Kako radimo izmene (iz STATUS.md)

1. Edit lokalno (`index.html`, `style.css`, `script.js`)
2. `git commit` + `git push` → automatski Cloudflare deploy
3. Slike: `cd tools && npm run build` pre commita ako se dodaju JPG
