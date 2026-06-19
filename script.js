'use strict';

// ─────────────────────────────────────────────
// Dentana Pro — script.js
// Verzija: v40 | April 2026
// Sve event handlere vežemo ovde — nema inline
// onclick/onload atributa u HTML-u.
// ─────────────────────────────────────────────


// ─── Header: scroll state ───
(function () {
  var header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  var navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', function (e) {
      e.preventDefault();
      header.style.transition = 'none';
      header.classList.remove('scrolled');
      window.scrollTo({ top: 0, behavior: 'auto' });
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          header.style.transition = '';
        });
      });
    });
  }
}());


// ─── Mobilni meni ───
(function () {
  var menu      = document.getElementById('mobileMenu');
  var hamburger = document.getElementById('hamburgerBtn');
  var uslugeBtn = document.getElementById('mobUslugeBtn');
  var uslugeSub = document.getElementById('mobUslugeSub');
  if (!menu) return;

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
  }

  if (uslugeBtn && uslugeSub) {
    uslugeBtn.addEventListener('click', function () {
      uslugeBtn.classList.toggle('open');
      uslugeSub.classList.toggle('open');
    });
  }

  document.querySelectorAll('.mob-close-link').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
    });
  });
}());


// ─── Reveal animacija na scroll ───
(function () {
  document.body.classList.add('js-ready');
  var revealEls = document.querySelectorAll('.reveal');

  function activateReveal(el, delay) {
    setTimeout(function () { el.classList.add('visible'); }, delay || 0);
  }

  function checkInitialReveal() {
    revealEls.forEach(function (el, i) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        activateReveal(el, i * 60);
      }
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        activateReveal(entry.target, 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  revealEls.forEach(function (el) {
    if (!el.classList.contains('visible')) observer.observe(el);
  });

  checkInitialReveal();
  setTimeout(checkInitialReveal, 200);
  window.addEventListener('load', checkInitialReveal);
}());


// ─── Slike: greška / placeholder ───
(function () {
  document.querySelectorAll(
    '.about-image img, .team-photo img, .estetika-visual img, .gallery-item img'
  ).forEach(function (img) {
    img.addEventListener('load', function () {
      var ph = img.nextElementSibling;
      if (ph) ph.style.display = 'none';
    });
    img.addEventListener('error', function () {
      img.style.display = 'none';
    });
  });
}());


// ─── Booking forma → Cloudflare Pages Function (/api/booking) ───
(function () {
  var form = document.getElementById('booking-form');
  if (!form) return;

  var statusEl = document.getElementById('booking-status');
  var defaultNote = statusEl ? statusEl.textContent : '';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var ime      = document.getElementById('ime').value.trim();
    var telefon  = document.getElementById('telefon').value.trim();
    var email    = document.getElementById('email').value.trim();
    var usluga   = document.getElementById('usluga').value;
    var datum    = document.getElementById('datum').value;
    var napomena = document.getElementById('napomena').value.trim();
    var website  = document.getElementById('website').value.trim();
    var btn      = form.querySelector('button[type="submit"]');

    if (!ime || !telefon) {
      alert('Molimo unesite ime i broj telefona.');
      return;
    }

    if (btn) btn.disabled = true;
    if (statusEl) {
      statusEl.textContent = 'Slanje zahteva...';
      statusEl.className = 'booking-note';
    }

    fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ime: ime,
        telefon: telefon,
        email: email,
        usluga: usluga,
        datum: datum,
        napomena: napomena,
        website: website
      })
    })
      .then(function (r) {
        return r.json().then(function (data) {
          return { ok: r.ok, data: data };
        });
      })
      .then(function (res) {
        if (btn) btn.disabled = false;
        if (res.ok) {
          form.reset();
          if (statusEl) {
            statusEl.textContent = 'Hvala! Primili smo zahtev — javićemo vam se uskoro radi potvrde termina.';
            statusEl.className = 'booking-note booking-note--success';
          }
        } else if (statusEl) {
          statusEl.textContent = (res.data && res.data.error) || 'Greška pri slanju. Pokušajte telefonom ili WhatsApp.';
          statusEl.className = 'booking-note booking-note--error';
        }
      })
      .catch(function () {
        if (btn) btn.disabled = false;
        if (statusEl) {
          statusEl.textContent = 'Greška pri slanju. Pozovite +381 63 349 128 ili pišite na WhatsApp.';
          statusEl.className = 'booking-note booking-note--error';
        }
      });
  });

  form.addEventListener('input', function () {
    if (statusEl && statusEl.className.indexOf('booking-note--') > -1) {
      statusEl.textContent = defaultNote;
      statusEl.className = 'booking-note';
    }
  });
}());


// ─── Galerija — lightbox ───
(function () {
  var overlay = document.getElementById('lb-overlay');
  if (!overlay) return;

  var lbImg   = document.getElementById('lb-img');
  var lbCap   = document.getElementById('lb-caption');
  var lbCtr   = document.getElementById('lb-counter');
  var items   = document.querySelectorAll('.gallery-item[data-lb-index]');
  var current = 0;
  var total   = items.length;
  var srcs = [], alts = [], labels = [];

  items.forEach(function (el, i) {
    var im = el.querySelector('img');
    var lb = el.querySelector('.gallery-label');
    srcs.push(im ? im.src : '');
    alts.push(im ? im.alt : '');
    labels.push(lb ? lb.textContent.trim() : '');
    el.addEventListener('click', function () { lbOpen(i); });
  });

  function lbShow() {
    lbImg.style.opacity = '0';
    lbImg.src           = srcs[current];
    lbImg.alt           = alts[current];
    lbCap.textContent   = labels[current];
    lbCtr.textContent   = (current + 1) + ' / ' + total;
    lbImg.onload = function () { lbImg.style.opacity = '1'; };
    if (lbImg.complete) lbImg.style.opacity = '1';
  }

  function lbOpen(idx) {
    current = idx;
    lbShow();
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';
  }

  function lbClose() {
    overlay.classList.remove('lb-open');
    document.body.style.overflow = '';
  }

  function lbPrev() { current = (current - 1 + total) % total; lbShow(); }
  function lbNext() { current = (current + 1) % total; lbShow(); }

  document.getElementById('lb-prev').addEventListener('click', function (e) {
    e.stopPropagation(); lbPrev();
  });
  document.getElementById('lb-next').addEventListener('click', function (e) {
    e.stopPropagation(); lbNext();
  });
  document.getElementById('lb-close').addEventListener('click', lbClose);
  overlay.addEventListener('click', function (e) {
    var wrap = document.getElementById('lb-img-wrap');
    if (e.target === overlay || e.target === wrap) lbClose();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('lb-open')) return;
    if (e.key === 'ArrowLeft')  lbPrev();
    else if (e.key === 'ArrowRight') lbNext();
    else if (e.key === 'Escape')     lbClose();
  });

  var touchStartX = 0;
  overlay.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  overlay.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? lbNext() : lbPrev(); }
  }, { passive: true });
}());


// ─── Nasi radovi — thumbnails + lightbox ───
(function () {
  var thumbEls = document.querySelectorAll('.radovi-thumb');
  var mainImg  = document.getElementById('radovi-main');
  var curEl    = document.getElementById('radovi-cur');
  var labelEl  = document.getElementById('radovi-label');
  if (!mainImg || !thumbEls.length) return;

  var labels = [
    'Bezmetalne cirkon keramicke krune',
    'Bezmetalne cirkon keramicke krune',
    'Metalokeramicke krune — pre/posle',
    'Resavanje recesija na zubima',
    'Ortodontska terapija progenije',
    'Bezmetalne cirkon keramicke krune',
    'Ortodontska terapija progenije',
    'Metalokeramicki mostovi',
    'Kompozitne fasete i zatvaranje dijasteme',
    'Gingivektomija',
    'Resavanje recesija na zubima'
  ];

  var srcs    = [];
  var current = 0;
  var total   = thumbEls.length;
  thumbEls.forEach(function (t) { srcs.push(t.src); });

  function setActive(idx) {
    current = (idx + total) % total;
    mainImg.style.opacity     = '0.6';
    mainImg.src               = srcs[current];
    mainImg.dataset.radoviIdx = current;
    if (curEl)   curEl.textContent   = current + 1;
    if (labelEl) labelEl.textContent = labels[current] || '';
    mainImg.onload = function () { mainImg.style.opacity = '1'; };
    if (mainImg.complete) mainImg.style.opacity = '1';
    thumbEls.forEach(function (t, i) {
      t.classList.toggle('active', i === current);
    });
    var active = thumbEls[current];
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  thumbEls.forEach(function (t, i) {
    t.addEventListener('click', function () { setActive(i); });
  });

  var rPrev = document.getElementById('radovi-prev');
  var rNext = document.getElementById('radovi-next');
  if (rPrev) rPrev.addEventListener('click', function () { setActive(current - 1); });
  if (rNext) rNext.addEventListener('click', function () { setActive(current + 1); });

  mainImg.addEventListener('click', function () {
    var overlay = document.getElementById('lb-overlay');
    if (!overlay) return;
    var lbImg  = document.getElementById('lb-img');
    var lbCap  = document.getElementById('lb-caption');
    var lbCtr  = document.getElementById('lb-counter');
    var lbCur  = current;

    function showRadovi(i) {
      lbImg.style.opacity  = '0';
      lbImg.src            = srcs[i];
      lbImg.alt            = labels[i] || ('Rad ' + (i + 1));
      lbCap.textContent    = labels[i] || ('Rad ' + (i + 1));
      lbCtr.textContent    = (i + 1) + ' / ' + total;
      lbImg.onload = function () { lbImg.style.opacity = '1'; };
      if (lbImg.complete) lbImg.style.opacity = '1';
    }

    function lbClose() {
      overlay.classList.remove('lb-open');
      document.body.style.overflow = '';
      document.getElementById('lb-prev').onclick = null;
      document.getElementById('lb-next').onclick = null;
      document.getElementById('lb-close').onclick = null;
    }

    showRadovi(lbCur);
    overlay.classList.add('lb-open');
    document.body.style.overflow = 'hidden';

    document.getElementById('lb-prev').onclick = function (e) {
      e.stopPropagation();
      lbCur = (lbCur - 1 + total) % total;
      showRadovi(lbCur);
    };
    document.getElementById('lb-next').onclick = function (e) {
      e.stopPropagation();
      lbCur = (lbCur + 1) % total;
      showRadovi(lbCur);
    };
    document.getElementById('lb-close').onclick = lbClose;
    overlay.onclick = function (e) { if (e.target === overlay) lbClose(); };
  });

  document.addEventListener('keydown', function (e) {
    var overlay = document.getElementById('lb-overlay');
    if (overlay && overlay.classList.contains('lb-open')) return;
    if (e.key === 'ArrowLeft')  setActive(current - 1);
    else if (e.key === 'ArrowRight') setActive(current + 1);
  });

  var mainWrap = document.querySelector('.radovi-featured-wrap');
  if (mainWrap) {
    var touchStart = 0;
    mainWrap.addEventListener('touchstart', function (e) {
      touchStart = e.changedTouches[0].clientX;
    }, { passive: true });
    mainWrap.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStart;
      if (Math.abs(dx) > 40) { dx < 0 ? setActive(current + 1) : setActive(current - 1); }
    }, { passive: true });
  }
}());


// ─── Hirurgija slideri — factory ───
// Jedna funkcija za sve sekcije umesto 5x copy-paste blokova.
function initHirurgijaSlider(sliderId, dotsId, prevId, nextId) {
  var slider = document.getElementById(sliderId);
  if (!slider) return;

  var slides   = slider.querySelectorAll('.hirurgija-slide');
  var dotsWrap = document.getElementById(dotsId);
  var dots     = dotsWrap ? dotsWrap.querySelectorAll('.hirurgija-dot') : [];
  var total    = slides.length;
  var cur      = 0;
  var timer;

  function goTo(idx) {
    slides[cur].classList.remove('active');
    if (dots[cur]) dots[cur].classList.remove('active');
    cur = ((idx % total) + total) % total;
    slides[cur].classList.add('active');
    if (dots[cur]) dots[cur].classList.add('active');
  }

  function startAuto() { timer = setInterval(function () { goTo(cur + 1); }, 4500); }
  function stopAuto()  { clearInterval(timer); }

  var prevBtn = document.getElementById(prevId);
  var nextBtn = document.getElementById(nextId);
  if (prevBtn) prevBtn.addEventListener('click', function () { stopAuto(); goTo(cur - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { stopAuto(); goTo(cur + 1); startAuto(); });

  Array.prototype.forEach.call(dots, function (d, i) {
    d.addEventListener('click', function () { stopAuto(); goTo(i); startAuto(); });
  });

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  var tx = 0;
  slider.addEventListener('touchstart', function (e) {
    tx = e.changedTouches[0].clientX;
  }, { passive: true });
  slider.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) { stopAuto(); dx < 0 ? goTo(cur + 1) : goTo(cur - 1); startAuto(); }
  }, { passive: true });

  startAuto();
}

initHirurgijaSlider('pregledSlider',         'pregledDots',         'pregledPrev',         'pregledNext');
initHirurgijaSlider('hirurgijaSlider',       'hirurgijaDots',       'hirurgijaPrev',       'hirurgijaNext');
initHirurgijaSlider('ortodoncijaSlider',     'ortodoncijaDots',     'ortodoncijaPrev',     'ortodoncijaNext');
initHirurgijaSlider('protetikaSlider',       'protetikaDots',       'protetikaPrev',       'protetikaNext');
initHirurgijaSlider('parodontologijaSlider', 'parodontologijaDots', 'parodontologijaPrev', 'parodontologijaNext');


// ─── Estetika slider + lightbox ───
// Ispravka: originalni kod je imao sintaksnu gresku — dvostruki apostrofi
// oko putanja slika (''img/img_X.jpg''). Sada citamo src direktno iz DOM-a.
(function () {
  var slider = document.getElementById('esthetikaSlider');
  if (!slider) return;

  var slideEls = slider.querySelectorAll('.estetika-slide');
  var dotsWrap = document.getElementById('esDots');
  var dotEls   = dotsWrap ? dotsWrap.querySelectorAll('.estetika-dot') : [];
  var esN      = slideEls.length;
  var esCur    = 0;
  var esTimer;
  var esTx     = 0;

  // Citamo src/alt/label iz DOM-a — izvor istine je HTML
  var esSrcs = [], esAlts = [], esLabels = [];
  slideEls.forEach(function (el) {
    var img   = el.querySelector('img');
    var label = el.querySelector('.estetika-slide-label');
    esSrcs.push(img   ? img.src              : '');
    esAlts.push(img   ? img.alt              : '');
    esLabels.push(label ? label.textContent.trim() : '');
  });

  function esGoTo(idx) {
    slideEls[esCur].classList.remove('estetika-slide-active');
    if (dotEls[esCur]) dotEls[esCur].classList.remove('estetika-dot-active');
    esCur = ((idx % esN) + esN) % esN;
    slideEls[esCur].classList.add('estetika-slide-active');
    if (dotEls[esCur]) dotEls[esCur].classList.add('estetika-dot-active');
  }

  function esStartAuto() { esTimer = setInterval(function () { esGoTo(esCur + 1); }, 5000); }
  function esStopAuto()  { clearInterval(esTimer); }

  var esPrevBtn = document.getElementById('esPrev');
  var esNextBtn = document.getElementById('esNext');
  if (esPrevBtn) esPrevBtn.addEventListener('click', function (e) {
    e.stopPropagation(); esStopAuto(); esGoTo(esCur - 1); esStartAuto();
  });
  if (esNextBtn) esNextBtn.addEventListener('click', function (e) {
    e.stopPropagation(); esStopAuto(); esGoTo(esCur + 1); esStartAuto();
  });

  Array.prototype.forEach.call(dotEls, function (d, i) {
    d.addEventListener('click', function (e) {
      e.stopPropagation(); esStopAuto(); esGoTo(i); esStartAuto();
    });
  });

  slider.addEventListener('touchstart', function (e) {
    esTx = e.changedTouches[0].clientX;
  }, { passive: true });
  slider.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - esTx;
    if (Math.abs(dx) > 40) { esStopAuto(); dx < 0 ? esGoTo(esCur + 1) : esGoTo(esCur - 1); esStartAuto(); }
  }, { passive: true });

  slider.addEventListener('mouseenter', esStopAuto);
  slider.addEventListener('mouseleave', esStartAuto);

  esStartAuto();

  // Lightbox
  var lb    = document.getElementById('es-lb');
  if (!lb) return;
  var lbImg = document.getElementById('es-lb-img');
  var lbCap = document.getElementById('es-lb-caption');
  var lbCtr = document.getElementById('es-lb-counter');
  var lbCur = 0;

  function esLbOpen(idx) {
    lbCur             = ((idx % esN) + esN) % esN;
    lbImg.src         = esSrcs[lbCur];
    lbImg.alt         = esAlts[lbCur];
    lbCap.textContent = esLabels[lbCur];
    lbCtr.textContent = (lbCur + 1) + ' / ' + esN;
    lb.classList.add('es-lb-open');
    document.body.style.overflow = 'hidden';
  }

  function esLbClose() {
    lb.classList.remove('es-lb-open');
    document.body.style.overflow = '';
  }

  Array.prototype.forEach.call(slideEls, function (el, i) {
    el.addEventListener('click', function () { esLbOpen(i); });
  });

  document.getElementById('es-lb-close').addEventListener('click', esLbClose);
  document.getElementById('es-lb-prev').addEventListener('click', function () { esLbOpen(lbCur - 1); });
  document.getElementById('es-lb-next').addEventListener('click', function () { esLbOpen(lbCur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) esLbClose(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('es-lb-open')) return;
    if (e.key === 'Escape')      esLbClose();
    if (e.key === 'ArrowLeft')   esLbOpen(lbCur - 1);
    if (e.key === 'ArrowRight')  esLbOpen(lbCur + 1);
  });
}());
