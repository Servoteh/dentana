'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = process.argv[2];
const ORIGIN = 'https://dentana.rs';

const SR = require('./usluge-data.cjs');
const EN = require('./en-data.cjs');
const DATA = { sr: SR, en: EN };

const ARROW = '<svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const T = {
  sr: {
    lang: 'sr', ogLocale: 'sr_RS', home: '/', usluge: 'Usluge', servicesAnchor: '/#usluge', allServices: 'Sve usluge',
    nav: [['/#o-nama', 'O nama'], ['/#tim', 'Tim'], ['/#nasi-radovi', 'Naši radovi']],
    kontakt: ['/#kontakt', 'Kontakt'], cta: ['/#zakazivanje', 'Zakažite pregled'],
    bcHome: 'Početna', bcServices: 'Usluge', navAria: 'Glavna navigacija', menuAria: 'Meni',
    prevImg: 'Prethodna slika', nextImg: 'Sledeća slika',
    emLabel: 'Zakazivanje', emText: 'Zakažite pregled telefonom:', callLabel: 'Pozovi',
    sw: 'EN', swAria: 'English', footerCopy: '© 2026 Dentana Pro · Republička 1a, 11030 Beograd · ',
  },
  en: {
    lang: 'en', ogLocale: 'en_US', home: '/en/', usluge: 'Services', servicesAnchor: '/en/#usluge', allServices: 'All services',
    nav: [['/en/#o-nama', 'About'], ['/en/#tim', 'Team'], ['/en/#nasi-radovi', 'Our Work']],
    kontakt: ['/en/#kontakt', 'Contact'], cta: ['/en/#zakazivanje', 'Book an appointment'],
    bcHome: 'Home', bcServices: 'Services', navAria: 'Main navigation', menuAria: 'Menu',
    prevImg: 'Previous image', nextImg: 'Next image',
    emLabel: 'Appointments', emText: 'Book an appointment by phone:', callLabel: 'Call',
    sw: 'SR', swAria: 'Srpski', footerCopy: '© 2026 Dentana Pro · Republička 1a, 11030 Belgrade · ',
  },
};

function header(lang, altUrl) {
  const t = T[lang], data = DATA[lang];
  const dd = data.slice(0, 7).map(s => `          <a href="${s.slug}">${s.breadcrumb}</a>`).join('\n');
  const ddMob = data.slice(0, 7).map(s => `      <a href="${s.slug}" class="mob-close-link">${s.breadcrumb}</a>`).join('\n');
  const est = data[7].slug, estLabel = data[7].breadcrumb;
  return `<div class="mobile-menu" id="mobileMenu">
  <div>
    <button class="mob-usluge-toggle" id="mobUslugeBtn">${t.usluge}${ARROW}</button>
    <div class="mob-usluge-sub" id="mobUslugeSub">
      <a href="${t.servicesAnchor}" class="mob-close-link">${t.allServices}</a>
${ddMob}
    </div>
  </div>
  <a href="${t.nav[0][0]}" class="mob-close-link">${t.nav[0][1]}</a>
  <a href="${t.nav[1][0]}" class="mob-close-link">${t.nav[1][1]}</a>
  <a href="${t.nav[2][0]}" class="mob-close-link">${t.nav[2][1]}</a>
  <a href="${est}" class="mob-close-link">${estLabel}</a>
  <a href="${t.kontakt[0]}" class="mob-close-link">${t.kontakt[1]}</a>
  <a href="${t.cta[0]}" class="mob-close-link">${t.cta[1]}</a>
  <a href="${altUrl}" class="mob-close-link mob-lang">${t.sw}</a>
</div>
<header class="site-header" id="siteHeader">
  <div class="container nav">
    <a href="${t.home}" class="nav-logo" aria-label="Dentana Pro">
      <img src="/img/img_01.svg" alt="Dentana Pro" width="150" height="40">
    </a>
    <ul class="nav-links" aria-label="${t.navAria}">
      <li class="nav-item">
        <a href="${t.servicesAnchor}" class="nav-item-arrow">${t.usluge}${ARROW}</a>
        <div class="nav-dropdown">
${dd}
        </div>
      </li>
      <li><a href="${t.nav[0][0]}">${t.nav[0][1]}</a></li>
      <li><a href="${t.nav[1][0]}">${t.nav[1][1]}</a></li>
      <li><a href="${t.nav[2][0]}">${t.nav[2][1]}</a></li>
      <li><a href="${est}">${estLabel}</a></li>
      <li><a href="${t.kontakt[0]}">${t.kontakt[1]}</a></li>
    </ul>
    <a class="nav-cta" href="${t.cta[0]}">${t.cta[1]}</a>
    <a class="lang-switch" href="${altUrl}" aria-label="${t.swAria}">${t.sw}</a>
    <button class="hamburger" id="hamburgerBtn" aria-label="${t.menuAria}" aria-expanded="false" aria-controls="mobileMenu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;
}

const WA_HREF = 'https://wa.me/38163349128?text=Zdravo%2C%20%C5%BEelim%20da%20zakazem%20pregled%20u%20Dentana%20Pro.';
const WA = `<a href="${WA_HREF}" class="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
</a>`;

function footer(lang) {
  const t = T[lang];
  return `${WA}
<div class="mobile-cta-bar" aria-label="${t.emLabel}">
  <a href="tel:+38163349128" class="mcta mcta-call"><span aria-hidden="true">&#128222;</span> ${t.callLabel}</a>
  <a href="${WA_HREF}" target="_blank" rel="noopener noreferrer" class="mcta mcta-wa"><span aria-hidden="true">&#128172;</span> WhatsApp</a>
</div>
<div class="emergency-strip">
  <div class="container">
    <div class="em-label">${t.emLabel}</div>
    <p>${t.emText}</p>
    <a href="tel:+38163349128">+381 63 349 128</a>
    <span class="footer-sep" aria-hidden="true">|</span>
    <a href="tel:+381112360421">+381 11 236-0421</a>
  </div>
</div>
<footer>
  <div class="container">
    <div class="footer-inner">
      <a href="${t.home}#top" class="footer-logo" aria-label="Dentana Pro"><img src="/img/img_65.svg" alt="Dentana Pro" loading="lazy"></a>
      <div class="footer-copy">${t.footerCopy}<a href="mailto:dentanapro@gmail.com">dentanapro@gmail.com</a> · <a href="https://www.instagram.com/dentana_pro/" target="_blank" rel="noopener noreferrer">Instagram</a></div>
    </div>
  </div>
</footer>
<script src="/script.js" defer></script>
</body>
</html>`;
}

function slider(images, t) {
  const slides = images.map((im, i) => `            <div class="hirurgija-slide${i === 0 ? ' active' : ''}" data-slide="${i}"><img src="${im.src}" alt="${im.alt}" loading="lazy"></div>`).join('\n');
  const dots = images.map((_, i) => `<span class="hirurgija-dot${i === 0 ? ' active' : ''}" data-dot="${i}"></span>`).join('');
  return `        <div class="hirurgija-visual reveal">
          <div class="hirurgija-slider" id="hirurgijaSlider">
${slides}
          </div>
          <div class="hirurgija-controls">
            <button class="hirurgija-btn" id="hirurgijaPrev" aria-label="${t.prevImg}">&#8592;</button>
            <div class="hirurgija-dots" id="hirurgijaDots">${dots}</div>
            <button class="hirurgija-btn" id="hirurgijaNext" aria-label="${t.nextImg}">&#8594;</button>
          </div>
        </div>`;
}

function faqHtml(faqs) {
  return faqs.map(f => `        <details class="faq-item"><summary>${f.q}</summary><div class="faq-answer"><p>${f.a}</p></div></details>`).join('\n');
}
function faqSchema(faqs) {
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }, null, 2);
}
function breadcrumbSchema(t, name, url) {
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: t.bcHome, item: ORIGIN + t.home },
    { '@type': 'ListItem', position: 2, name: t.bcServices, item: ORIGIN + t.servicesAnchor },
    { '@type': 'ListItem', position: 3, name: name, item: url },
  ] }, null, 2);
}

function page(p, lang, srUrl, enUrl) {
  const t = T[lang];
  const selfUrl = lang === 'sr' ? srUrl : enUrl;
  const altUrl = lang === 'sr' ? enUrl : srUrl;
  const waText = lang === 'sr' ? 'Imate pitanje ili snimak pre dolaska?' : 'Have a question or an X-ray before your visit?';
  const waBtn = lang === 'sr' ? '&#128172; Pošaljite na WhatsApp' : '&#128172; Message us on WhatsApp';
  const primary = JSON.stringify(Object.assign({
    '@context': 'https://schema.org', '@type': p.schemaType || 'MedicalProcedure',
    name: p.schemaName || p.breadcrumb, url: selfUrl,
    provider: { '@type': 'Dentist', name: 'Dentana Pro', '@id': ORIGIN + '/#ordinacija', url: ORIGIN + '/', telephone: '+38163349128' },
  }, p.schemaExtra || {}), null, 2);

  return `<!DOCTYPE html>
<html lang="${t.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${p.title}</title>
  <meta name="description" content="${p.description}">
  <link rel="canonical" href="${selfUrl}">
  <link rel="alternate" hreflang="sr-RS" href="${srUrl}">
  <link rel="alternate" hreflang="en" href="${enUrl}">
  <link rel="alternate" hreflang="x-default" href="${srUrl}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${selfUrl}">
  <meta property="og:title" content="${p.title}">
  <meta property="og:description" content="${p.description}">
  <meta property="og:image" content="${ORIGIN}/og-image.jpg">
  <meta property="og:locale" content="${t.ogLocale}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${p.title}">
  <meta name="twitter:description" content="${p.description}">
  <meta name="twitter:image" content="${ORIGIN}/og-image.jpg">
  <link rel="stylesheet" href="/fonts.css">
  <link rel="stylesheet" href="/style.css">
  <script type="application/ld+json">
${primary}
  </script>
  <script type="application/ld+json">
${breadcrumbSchema(t, p.breadcrumb, selfUrl)}
  </script>
  <script type="application/ld+json">
${faqSchema(p.faqs)}
  </script>
</head>
<body>
${header(lang, altUrl)}

<main id="top">
  <section class="section service-page" style="background:var(--bg);">
    <div class="container">
      <nav class="breadcrumb" aria-label="${t.bcServices}">
        <a href="${t.home}">${t.bcHome}</a><span aria-hidden="true">›</span>
        <a href="${t.servicesAnchor}">${t.bcServices}</a><span aria-hidden="true">›</span>
        <span aria-current="page">${p.breadcrumb}</span>
      </nav>
      <div class="section-header-left">
        <div class="eyebrow reveal">${p.eyebrow}</div>
        <h1 class="reveal">${p.h1}</h1>
        <p class="reveal" style="margin-top:14px;font-size:1.05rem;max-width:760px;">${p.intro}</p>
      </div>
      <div class="hirurgija-grid" style="margin-top:40px;">
        <div class="hirurgija-text reveal">
${p.body}
          <a class="btn btn-primary" href="${t.cta[0]}" style="margin-top:30px;">${t.cta[1]}</a>
        </div>
${slider(p.images, t)}
      </div>
    </div>
  </section>
  <div class="cta-band-section">
    <div class="container">
      <div class="cta-band cta-band--wa">
        <span class="cta-band-text">${waText}</span>
        <a class="btn btn-secondary" href="${WA_HREF}" target="_blank" rel="noopener noreferrer">${waBtn}</a>
      </div>
    </div>
  </div>
  <section class="section faq" style="background:var(--surface);">
    <div class="container">
      <div class="section-header-center--mb">
        <div class="eyebrow reveal">${lang === 'sr' ? 'Česta pitanja' : 'FAQ'}</div>
        <h2 class="reveal">${p.faqHeading}</h2>
      </div>
      <div class="faq-list reveal">
${faqHtml(p.faqs)}
      </div>
      <div style="text-align:center;margin-top:36px;"><a class="btn btn-primary" href="${t.cta[0]}">${p.faqCta}</a></div>
    </div>
  </section>
</main>

${footer(lang)}
`;
}

let count = 0;
for (let i = 0; i < SR.length; i++) {
  const srUrl = ORIGIN + SR[i].slug;
  const enUrl = ORIGIN + EN[i].slug;
  for (const lang of ['sr', 'en']) {
    const p = DATA[lang][i];
    const dir = path.join(ROOT, p.slug.replace(/^\/|\/$/g, ''));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), page(p, lang, srUrl, enUrl), 'utf8');
    count++;
  }
  console.log('Par:', SR[i].slug, '<->', EN[i].slug);
}
console.log('Ukupno stranica:', count);
