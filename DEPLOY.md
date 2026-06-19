# Dentana Pro — deploy na Cloudflare Pages

## Šta je u projektu

| Fajl / folder | Namena |
|---------------|--------|
| `index.html`, `style.css`, `script.js` | Glavni sajt |
| `img/` | WebP slike (optimizovane, ~51% manje od originala) |
| `fonts/`, `fonts.css` | Self-hosted fontovi (bez Google Fonts) |
| `functions/api/booking.js` | API za formu zakazivanja (Resend) |
| `_headers`, `_redirects` | Cloudflare Pages konfiguracija |
| `robots.txt`, `sitemap.xml` | SEO |
| `favicon.svg`, `favicon.ico`, `og-image.jpg` | Favicon i OG slika |
| `tools/` | Skripte za optimizaciju (`npm run build`) |

## 1. Push na GitHub

```bash
git init
git add index.html style.css script.js fonts.css fonts/ img/ functions/ _headers _redirects robots.txt sitemap.xml favicon.* og-image.jpg apple-touch-icon.png .gitignore DEPLOY.md
git commit -m "Dentana Pro — Cloudflare Pages deploy paket"
git remote add origin https://github.com/TVOJ-USER/SAJT-DENTANA.git
git push -u origin main
```

## 2. Cloudflare Pages

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Izaberi repozitorijum
3. Build settings:
   - **Framework preset:** None
   - **Build command:** (prazno)
   - **Build output directory:** `/`
4. **Save and Deploy**

## 3. Resend (forma za zakazivanje)

1. Registracija na [resend.com](https://resend.com)
2. **Domains** → dodaj `dentana.rs` → podesi DNS zapise (SPF/DKIM) koje Resend da
3. **API Keys** → kreiraj ključ
4. U Cloudflare Pages → **Settings** → **Environment variables**:
   - `RESEND_API_KEY` = tvoj ključ
   - `BOOKING_TO` = `info@dentana.rs`
   - `BOOKING_FROM` = `Dentana Pro <noreply@dentana.rs>` (posle verifikacije domena)
5. Za test pre verifikacije domena koristi default `onboarding@resend.dev`

## 4. Custom domen

1. Pages/Workers projekat → **Custom domains** → dodaj `dentana.rs` i `www.dentana.rs`
2. U Cloudflare dashboard podesi **Redirect Rules** ili primary domain da `www` ide na `dentana.rs` (Wrangler `_redirects` podržava samo relativne putanje)

## 5. DNS (VAŽNO — email ostaje na starom serveru)

Kad prebaciš nameservere na Cloudflare:

| Zapis | Vrednost | Napomena |
|-------|----------|----------|
| `@` / `dentana.rs` | Cloudflare Pages (automatski) | Sajt |
| `www` | Cloudflare Pages | Redirect na apex |
| `mail` | `A` → `176.9.113.163` | **Ostavi** — email server |
| `MX` | `mail.dentana.rs` | **Ostavi** — email |
| SPF TXT | postojeći zapis | Proveri posle Resend DKIM |

**Ne briši** MX i A zapis za `mail` dok koristiš email na tom serveru.

## 6. SSL i performanse (Cloudflare dashboard)

- **SSL/TLS** → Full (strict)
- **Always Use HTTPS** → ON
- **Speed** → Auto Minify (HTML, CSS, JS) → ON
- **Brotli** → ON
- **HSTS** → uključi posle testiranja (već u `_headers`)

## 7. Ponovna optimizacija slika

Ako zameniš slike u `img/`:

```bash
cd tools
npm install
npm run build
```

Skripta kreira WebP, `og-image.jpg`, favicon i ažurira `fonts.css`.

## 8. Provera posle deploya

- [ ] https://dentana.rs/ učitava sajt
- [ ] https://www.dentana.rs/ preusmerava na apex
- [ ] Forma šalje email na info@dentana.rs
- [ ] Email (info@dentana.rs) i dalje radi
- [ ] OG slika: https://dentana.rs/og-image.jpg
- [ ] Google Search Console — pošalji novi sitemap

## Lokalni preview (opciono)

```bash
npx wrangler pages dev .
```

Postavi `RESEND_API_KEY` u `.dev.vars` za test forme lokalno.
