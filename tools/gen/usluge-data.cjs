'use strict';

// Zajednički direktni odgovori (na osnovu stvarnih informacija ordinacije):
// - prvi pregled se PLAĆA (po ceni pregleda)
// - RTG: deo snimaka u ordinaciji, za druge upućujemo; postojeći snimak može unapred
// - hitni slučajevi: isti/sledeći dan po mogućstvu
// - plaćanje većih radova: prati faze terapije (ne formalne rate)
// - okvirna cena: nakon pregleda i plana terapije

const FAQ_PRVI_PREGLED = { q: 'Da li se prvi pregled plaća?', a: 'Da, prvi pregled se naplaćuje po ceni pregleda. Na njemu dobijate dijagnozu, plan terapije i okvirnu procenu troškova, pa znate šta vas očekuje pre nego što bilo šta započnemo.' };
const FAQ_RTG = { q: 'Radite li snimanje (RTG) ili me šaljete na snimak?', a: 'Zavisi od slučaja — pojedine snimke radimo u ordinaciji, a za određene vas uputimo na snimanje. Ako već imate snimak, pošaljite nam ga unapred na WhatsApp (+381 63 349 128) ili email dentanapro@gmail.com pa se pripremimo za pregled.' };
const FAQ_HITNI = { q: 'Primate li hitne slučajeve (bol, otok, ispala plomba)?', a: 'Trudimo se da hitne slučajeve primimo isti ili sledeći dan, u okviru radnog vremena (pon–pet, 11–19h). Najbolje je da nas odmah pozovete na +381 63 349 128 ili pišete na WhatsApp.' };
const FAQ_CENA_FAZE = { q: 'Koliko košta i mogu li veći rad da platim u više delova?', a: 'Cena zavisi od konkretnog stanja i obima rada, pa okvirnu procenu dobijate odmah nakon pregleda i plana terapije. Plaćanje se vrši po fazama terapije — plaćate kako rad napreduje.' };

module.exports = [
  // ─── IMPLANTI ───
  {
    slug: '/usluge/implanti/',
    title: 'Dentalni implanti Beograd | Dentana Pro',
    description: 'Dentalni implanti u Beogradu — Dentana Pro. Trajna nadoknada izgubljenih zuba titanijumskim implantima, uz pažljivo planiranje, oseointegraciju i prirodan protetski rad. Zakažite pregled.',
    breadcrumb: 'Implanti',
    eyebrow: 'Oralna hirurgija · Implantologija',
    h1: 'Dentalni <em>implanti</em> u Beogradu',
    intro: 'Dentalni implanti su trajno rešenje za nadoknadu jednog, više ili svih izgubljenih zuba. Implant zamenjuje koren zuba, ne dira susedne zdrave zube i sprečava povlačenje kosti na mestu gde zub nedostaje.',
    schemaName: 'Ugradnja dentalnih implanata',
    schemaExtra: { alternateName: 'Dentalni implanti', procedureType: 'https://schema.org/SurgicalProcedure', bodyLocation: 'Vilica' },
    images: [
      { src: '/img/img_36.webp', alt: 'Ugradnja dentalnih implanata — Dentana Pro' },
      { src: '/img/img_37.webp', alt: 'Oralna hirurgija i implantologija — Dentana Pro' },
      { src: '/img/img_38.webp', alt: 'Implantologija — Dentana Pro' },
      { src: '/img/img_39.webp', alt: 'Implanti — Dentana Pro' },
      { src: '/img/img_40.webp', alt: 'Implanti — Dentana Pro' },
    ],
    body: `          <h2>Šta su dentalni implanti</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Implant je veštački koren zuba od biokompatibilnog titanijuma, koji se ugrađuje u vilicu na mesto izgubljenog zuba. Tokom zarastanja srasta sa kosti (<strong>oseointegracija</strong>) i postaje stabilan oslonac za krunicu, most ili protezu.</p>
          <p style="font-size:0.95rem;margin-top:14px;">Za razliku od mosta, implant ne zahteva brušenje susednih zuba; za razliku od pokretne proteze, drži se čvrsto i po osećaju je najbliži prirodnom zubu.</p>
          <h2 style="margin-top:34px;">Prednosti implanata</h2>
          <ul class="hirurgija-list" style="margin-top:14px;">
            <li>trajna i stabilna nadoknada izgubljenih zuba</li>
            <li>očuvanje zdravih susednih zuba (nema brušenja)</li>
            <li>sprečavanje gubitka kosti na mestu izgubljenog zuba</li>
            <li>prirodan izgled i funkcija pri žvakanju i govoru</li>
            <li>rešenje za pojedinačni zub, više zuba ili potpunu bezubost</li>
          </ul>
          <div class="hirurgija-sub">
            <h3>Tok terapije — korak po korak</h3>
            <div class="process-steps">
              <div class="process-step"><span class="process-num">1</span><div><strong>Pregled i planiranje</strong><p>Klinički pregled, snimak i procena kosti, pa jasan plan terapije sa okvirnom cenom.</p></div></div>
              <div class="process-step"><span class="process-num">2</span><div><strong>Ugradnja implanta</strong><p>Jedan termin, pod lokalnom anestezijom — bezbolno.</p></div></div>
              <div class="process-step"><span class="process-num">3</span><div><strong>Zarastanje (oseointegracija)</strong><p>Implant srasta sa kosti, najčešće nekoliko meseci.</p></div></div>
              <div class="process-step"><span class="process-num">4</span><div><strong>Protetski rad</strong><p>Izrada krunice, mosta ili proteze — vraćaju se funkcija i izgled.</p></div></div>
            </div>
          </div>
          <p style="font-size:0.92rem;margin-top:24px;">Implantologiju u Dentana Pro obavlja <strong>dr Tijana Aćimović</strong>, specijalista parodontalne hirurgije.</p>`,
    faqHeading: 'Implanti — <em>pitanja i odgovori</em>',
    faqCta: 'Zakažite pregled za implante',
    faqs: [
      { q: 'Da li ugradnja implanta boli?', a: 'Ne. Ugradnja se radi pod lokalnom anestezijom i bezbolna je. Posle zahvata moguća je blaga osetljivost ili otok koji se povlače za nekoliko dana uz uobičajene lekove protiv bolova.' },
      { q: 'Koliko dolazaka treba i koliko traje sve?', a: 'Sama ugradnja je obično jedan termin. Zatim sledi zarastanje (najčešće nekoliko meseci), pa izrada protetskog rada u još par poseta. Tačan plan i broj dolazaka dobijate na pregledu.' },
      { q: 'Šta ako nemam dovoljno kosti?', a: 'I tada je implant najčešće moguć — uz pripremne procedure kao što su podizanje sinusa ili augmentacija kosti. Procenu radimo na osnovu pregleda i snimka.' },
      FAQ_CENA_FAZE,
      FAQ_RTG,
    ],
  },

  // ─── PREGLEDI I LEČENJE ZUBA ───
  {
    slug: '/usluge/pregledi-i-lecenje-zuba/',
    title: 'Lečenje zuba i bele plombe Beograd | Dentana Pro',
    description: 'Pregledi i lečenje zuba u Beogradu — Dentana Pro. Redovne kontrole, lečenje karijesa i estetske bele plombe, endodontska terapija (lečenje kanala korena). Zakažite pregled.',
    breadcrumb: 'Pregledi i lečenje zuba',
    eyebrow: 'Konzervativna stomatologija i endodoncija',
    h1: 'Pregledi i <em>lečenje zuba</em>',
    intro: 'Što se karijes ranije otkrije, to je lečenje jednostavnije, jeftinije i bezbolnije. Zato su redovni pregledi najisplativiji deo brige o zubima.',
    schemaExtra: { procedureType: 'https://schema.org/TherapeuticProcedure' },
    images: [
      { src: '/img/img_31.webp', alt: 'Pregledi i lečenje zuba — Dentana Pro' },
      { src: '/img/img_32.webp', alt: 'Lečenje karijesa — Dentana Pro' },
      { src: '/img/img_33.webp', alt: 'Bele plombe — Dentana Pro' },
      { src: '/img/img_34.webp', alt: 'Endodoncija — Dentana Pro' },
      { src: '/img/img_35.webp', alt: 'Pregled zuba — Dentana Pro' },
    ],
    body: `          <h2>Redovni pregledi i prevencija</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Kontrolni pregled na 6–12 meseci omogućava da se karijes uoči dok je mali, kada je rešenje brzo i jednostavno. Uz pregled dobijate i konkretne savete za higijenu kod kuće.</p>
          <h2 style="margin-top:34px;">Lečenje karijesa i bele plombe</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Karijes lečimo belim (kompozitnim) plombama čija se boja prilagođava zubu, tako da ispun bude neprimetan i dugotrajan. Manji karijes je najčešće jedan dolazak.</p>
          <h2 style="margin-top:34px;">Endodoncija — lečenje kanala korena</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Kada karijes zahvati zubni živac, potrebno je lečenje kanala korena. Pravovremeno lečenje saniraju bol i infekciju i najčešće čuva zub. Obično je u pitanju 1–2 dolaska, zavisno od zuba.</p>`,
    faqHeading: 'Lečenje zuba — <em>pitanja i odgovori</em>',
    faqCta: 'Zakažite pregled',
    faqs: [
      { q: 'Da li lečenje zuba i plombe bole?', a: 'Ne. Terapija se radi pod lokalnom anestezijom, pa je zahvat bezbolan. Ako se plašite, recite nam — radimo bez žurbe i sve objasnimo unapred.' },
      { q: 'Koliko dolazaka treba za plombu ili lečenje kanala?', a: 'Manja plomba je najčešće jedan dolazak. Lečenje kanala korena obično traje 1–2 posete, u zavisnosti od zuba i stanja.' },
      FAQ_PRVI_PREGLED,
      FAQ_HITNI,
      FAQ_RTG,
    ],
  },

  // ─── ORALNA HIRURGIJA ───
  {
    slug: '/usluge/oralna-hirurgija/',
    title: 'Oralna hirurgija i vađenje umnjaka Beograd | Dentana Pro',
    description: 'Oralna hirurgija u Beogradu — Dentana Pro. Vađenje zuba i umnjaka, apikotomije, frenektomije, podizanje sinusa i ugradnja implantata, uz pažljivo planiranje i vođen oporavak.',
    breadcrumb: 'Oralna hirurgija',
    eyebrow: 'Usluge · Oralna hirurgija',
    h1: 'Oralna <em>hirurgija</em>',
    intro: 'Od jednostavnog vađenja do umnjaka i implantata — oralnohirurške zahvate radimo planski, sa jasnim dogovorom o toku zahvata i oporavku.',
    schemaExtra: { procedureType: 'https://schema.org/SurgicalProcedure' },
    images: [
      { src: '/img/img_36.webp', alt: 'Oralna hirurgija — Dentana Pro' },
      { src: '/img/img_37.webp', alt: 'Oralnohirurški zahvat — Dentana Pro' },
      { src: '/img/img_38.webp', alt: 'Oralna hirurgija — Dentana Pro' },
      { src: '/img/img_39.webp', alt: 'Oralna hirurgija — Dentana Pro' },
      { src: '/img/img_40.webp', alt: 'Oralna hirurgija — Dentana Pro' },
    ],
    body: `          <p style="font-weight:500;color:var(--text);margin-bottom:4px;">Usluge oralne hirurgije obuhvataju:</p>
          <ul class="hirurgija-list">
            <li>vađenje zuba, od jednostavnih do komplikovanih ekstrakcija</li>
            <li>hirurško vađenje impaktiranih i poluimpaktiranih umnjaka</li>
            <li>apikotomije (resekcije korena zuba)</li>
            <li>frenektomije usne i jezika</li>
            <li>podizanje sinusa i zatvaranje oroantralnih komunikacija</li>
            <li>vestibuloplastiku i preprotetske zahvate</li>
            <li>ugradnju implantata</li>
          </ul>
          <h2 style="margin-top:34px;">Vađenje umnjaka</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Impaktirani umnjaci umeju da izazovu bol, otok i pritisak na susedne zube. Vađenje planiramo na osnovu snimka, pod lokalnom anestezijom, uz jasna uputstva za oporavak.</p>
          <div class="hirurgija-sub">
            <h3>Implanti</h3>
            <p style="font-size:0.92rem;">Ugradnja implantata je deo naše oralnohirurške prakse.</p>
            <p style="margin-top:12px;"><a href="/usluge/implanti/" class="service-more-link">Saznajte više o dentalnim implantima →</a></p>
          </div>
          <p style="font-size:0.92rem;margin-top:24px;">Zahvate obavlja <strong>dr Tijana Aćimović</strong>, specijalista parodontalne hirurgije.</p>`,
    faqHeading: 'Oralna hirurgija — <em>pitanja i odgovori</em>',
    faqCta: 'Zakažite pregled',
    faqs: [
      { q: 'Da li vađenje zuba boli?', a: 'Ne. Zahvat se radi pod lokalnom anestezijom i bezbolan je. Posle vađenja dobijate jasna uputstva i, po potrebi, terapiju za miran oporavak.' },
      { q: 'Koliko traje oporavak posle vađenja umnjaka?', a: 'Najčešće nekoliko dana. Eventualni otok i osetljivost se povlače uz pravilnu negu i lekove koje preporučimo.' },
      FAQ_HITNI,
      FAQ_RTG,
    ],
  },

  // ─── ORTODONCIJA ───
  {
    slug: '/usluge/ortodoncija/',
    title: 'Ortodoncija i fiksne proteze Beograd | Dentana Pro',
    description: 'Ortodoncija u Beogradu — Dentana Pro. Ispravljanje nepravilnog položaja zuba i vilica fiksnim i mobilnim aparatima, za decu i odrasle. Vodi specijalista ortodoncije.',
    breadcrumb: 'Ortodoncija',
    eyebrow: 'Usluge · Ortodoncija',
    h1: '<em>Ortodoncija</em>',
    intro: 'Krivi zubi nisu samo estetsko pitanje — otežavaju čišćenje i opterećuju zagrižaj. Ortodontska terapija to ispravlja, kod dece i kod odraslih.',
    images: [
      { src: '/img/img_41.webp', alt: 'Ortodoncija — Dentana Pro' },
      { src: '/img/img_42.webp', alt: 'Ortodontski aparat — Dentana Pro' },
    ],
    body: `          <h2>Zašto ortodontska terapija</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Pravilno poređani zubi lakše se čiste, ravnomernije opterećuju i duže ostaju zdravi. Cilj terapije je i lep osmeh i ispravan zagrižaj.</p>
          <h2 style="margin-top:34px;">Deca i odrasli</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Kod dece se koriste mobilni aparati i vežbe koje usmeravaju rast vilica, a kod stalnih zuba najčešće fiksni aparati. Za aparat nije kasno ni u odraslom dobu — ne postoji strogo starosno ograničenje.</p>
          <p style="font-size:0.92rem;margin-top:24px;">Ortodontske terapije vodi <strong>dr Jasmina Milišić</strong>, specijalista ortodoncije.</p>`,
    faqHeading: 'Ortodoncija — <em>pitanja i odgovori</em>',
    faqCta: 'Zakažite ortodontski pregled',
    faqs: [
      { q: 'Koliko traje terapija fiksnim aparatom?', a: 'Kod fiksnih aparata terapija najčešće traje od 18 do 24 meseca, u zavisnosti od složenosti slučaja. Pored fiksnih, koristimo i mobilne (pokretne) aparate, posebno kod dece — tačnu procenu i izbor aparata dajemo nakon pregleda i snimka.' },
      { q: 'Da li je kasno za aparat u odraslom dobu?', a: 'Nije. Ortodontska terapija uspešno se radi i kod odraslih; postoje i estetske verzije fiksnih aparata.' },
      { q: 'Da li nošenje aparata boli?', a: 'Nakon postavljanja i pojedinih kontrola moguć je blag pritisak prvih dana, koji brzo prolazi. To je znak da se zubi pomeraju u pravilan položaj.' },
      { q: 'Koliko često su kontrole?', a: 'Kod fiksnih aparata kontrole su obično na nekoliko nedelja. Termine usklađujemo sa vašim rasporedom.' },
      { q: 'Može li ortodontska terapija na rate?', a: 'Da, ortodontsku terapiju je moguće plaćati na rate. Okvirnu cenu i način plaćanja dogovaramo nakon pregleda i plana terapije.' },
    ],
  },

  // ─── PROTETIKA ───
  {
    slug: '/usluge/protetika/',
    title: 'Zubna protetika: krunice, mostovi, proteze Beograd | Dentana Pro',
    description: 'Stomatološka protetika u Beogradu — Dentana Pro. Metalokeramičke i bezmetalne krunice i mostovi, parcijalne i totalne proteze, kombinovani radovi. Prirodan i dugotrajan rezultat.',
    breadcrumb: 'Protetika',
    eyebrow: 'Usluge · Protetika',
    h1: '<em>Protetika</em>',
    intro: 'Krunice, mostovi i proteze vraćaju zube koji nedostaju ili su jako oštećeni — i funkciju (žvakanje, govor) i izgled osmeha.',
    images: [
      { src: '/img/img_43.webp', alt: 'Protetika — Dentana Pro' },
      { src: '/img/img_44.webp', alt: 'Krunice i mostovi — Dentana Pro' },
      { src: '/img/img_45.webp', alt: 'Protetski rad — Dentana Pro' },
      { src: '/img/img_46.webp', alt: 'Protetika — Dentana Pro' },
      { src: '/img/img_47.webp', alt: 'Protetika — Dentana Pro' },
    ],
    body: `          <div class="hirurgija-sub" style="margin-top:0;padding-top:0;border-top:none;">
            <h3>Krunice i mostovi</h3>
            <p style="font-size:0.92rem;margin-top:10px;">Fiksne nadoknade za oštećene ili nedostajuće zube. Radimo metalokeramičke i bezmetalne (cirkon) krunice i mostove, uz pažljiv izbor boje i oblika za prirodan izgled.</p>
          </div>
          <div class="hirurgija-sub">
            <h3>Proteze</h3>
            <p style="font-size:0.92rem;margin-top:10px;">Pokretne nadoknade kod nedostatka većeg broja zuba — parcijalne (kada postoje prirodni zubi) ili totalne (kod potpune bezubosti). Vraćaju žvakanje, govor i potporu licu.</p>
          </div>
          <div class="hirurgija-sub">
            <h3>Kombinovani radovi</h3>
            <p style="font-size:0.92rem;margin-top:10px;">Spajaju fiksni i pokretni deo kod parcijalne bezubosti, za bolju stabilnost i komfor u nošenju.</p>
          </div>
          <p style="font-size:0.92rem;margin-top:24px;">Protetske radove vode <strong>dr Ana Jaraković</strong> i <strong>dr Zorica Popović Ignjatović</strong>.</p>`,
    faqHeading: 'Protetika — <em>pitanja i odgovori</em>',
    faqCta: 'Zakažite pregled',
    faqs: [
      { q: 'Koliko dolazaka treba za krunicu ili most?', a: 'Najčešće nekoliko poseta — od pripreme i otiska do probe i postavljanja gotovog rada. Tačan broj zavisi od obima i dajemo ga na pregledu.' },
      { q: 'Da li priprema zuba boli?', a: 'Ne. Brušenje i priprema rade se pod lokalnom anestezijom, pa je bezbolno.' },
      { q: 'Bezmetalne (cirkon) ili metalokeramičke krunice?', a: 'Bezmetalne (cirkon) izgledaju izrazito prirodno jer nemaju metalnu osnovu; metalokeramičke su izdržljive i proverene. Izbor zavisi od položaja zuba i estetskih želja, a savetujemo vas na pregledu.' },
      FAQ_CENA_FAZE,
    ],
  },

  // ─── PARODONTOLOGIJA ───
  {
    slug: '/usluge/parodontologija/',
    title: 'Lečenje desni i parodontoze Beograd | Dentana Pro',
    description: 'Parodontologija u Beogradu — Dentana Pro. Lečenje gingivitisa i parodontalnih oboljenja, krvarenja i povlačenja desni, uklanjanje kamenca. Individualan plan terapije.',
    breadcrumb: 'Parodontologija',
    eyebrow: 'Usluge · Parodontologija',
    h1: '<em>Parodontologija</em>',
    intro: 'Desni koje krvare nisu „normalna stvar" — to je rani znak upale. Što se ranije reaguje, terapija je jednostavnija, a zubi se lakše čuvaju.',
    images: [
      { src: '/img/img_50.webp', alt: 'Parodontologija — Dentana Pro' },
      { src: '/img/img_51.webp', alt: 'Lečenje desni — Dentana Pro' },
      { src: '/img/img_52.webp', alt: 'Parodontologija — Dentana Pro' },
      { src: '/img/img_53.webp', alt: 'Parodontologija — Dentana Pro' },
    ],
    body: `          <h2>Znaci bolesti desni</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Krvarenje pri pranju zuba, otok i crvenilo, osetljivost, povlačenje desni i neprijatan zadah najčešći su znaci gingivitisa ili parodontopatije.</p>
          <h2 style="margin-top:34px;">Dijagnostika i terapija</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Na pregledu procenjujemo stanje desni, kamenac i dubinu džepova, pa pravimo plan. Terapija ide od uklanjanja naslaga do, kod uznapredovalih stanja, hirurškog lečenja.</p>
          <h2 style="margin-top:34px;">Cilj lečenja</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Kod ranih stanja desni se često potpuno oporave. Kod uznapredovalih, cilj je zaustaviti napredovanje bolesti i sačuvati zube što duže.</p>`,
    faqHeading: 'Parodontologija — <em>pitanja i odgovori</em>',
    faqCta: 'Zakažite pregled desni',
    faqs: [
      { q: 'Desni mi krvare pri pranju zuba — da li je to ozbiljno?', a: 'Krvarenje je čest rani znak upale i ne treba ga ignorisati. Uz pravovremeni pregled i terapiju stanje se najčešće značajno popravlja.' },
      { q: 'Da li uklanjanje kamenca boli?', a: 'Uglavnom je bezbolno; kod osetljivijih pacijenata ili dubljeg čišćenja koristimo lokalnu anesteziju.' },
      { q: 'Može li se povlačenje desni lečiti?', a: 'U zavisnosti od uzroka i stepena, recesije se zbrinjavaju konzervativno ili hirurški. Procenu radimo na pregledu.' },
      FAQ_HITNI,
    ],
  },

  // ─── DEČJA STOMATOLOGIJA ───
  {
    slug: '/usluge/decja-stomatologija/',
    title: 'Dečji stomatolog Beograd | Dentana Pro',
    description: 'Dečja stomatologija u Beogradu — Dentana Pro. Nežan i strpljiv pristup najmlađima, posebno deci koja se plaše zubara. Prevencija i izgradnja poverenja od ranog uzrasta.',
    breadcrumb: 'Dečja stomatologija',
    eyebrow: 'Nežan pristup za naše najmlađe',
    h1: 'Dečja <em>stomatologija</em>',
    intro: 'Cilj prvog dolaska nije „rešiti sve odmah", nego da dete stekne poverenje. Kada je prvo iskustvo dobro, svaki sledeći put je lakši.',
    schemaType: 'MedicalWebPage',
    schemaName: 'Dečja stomatologija',
    schemaExtra: { about: { '@type': 'MedicalSpecialty', name: 'PediatricDentistry' } },
    images: [
      { src: '/img/img_08.webp', alt: 'Dečja stomatologija — Dentana Pro' },
      { src: '/img/img_59.webp', alt: 'Dečja stomatologija — Dentana Pro' },
      { src: '/img/img_61.webp', alt: 'Edukacija deteta o oralnoj higijeni — Dentana Pro' },
    ],
    body: `          <h2>Pristup deci</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Detetu pristupamo postepeno i bez žurbe, objašnjavamo svaki korak na način koji razume i ne forsiramo. Tako ordinaciju doživljava kao sigurno mesto, a ne kao stres.</p>
          <h2 style="margin-top:34px;">Prevencija kod dece</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Najbolja zaštita su redovne kontrole, pravilna higijena i, kada je indikovano, zaštitne mere. Roditeljima dajemo jasne savete za negu zuba kod kuće.</p>`,
    faqHeading: 'Dečja stomatologija — <em>pitanja i odgovori</em>',
    faqCta: 'Zakažite pregled za dete',
    faqs: [
      { q: 'Moje dete se plaši zubara — kako to rešavate?', a: 'Strpljivo i bez prisile. Prvi susret je kratak i opušten, da se dete navikne na ordinaciju i ekipu pre bilo kakve terapije. Tempo prilagođavamo detetu.' },
      { q: 'Od kog uzrasta da dovedem dete na pregled?', a: 'Preporučujemo prve, kratke kontrolne posete od ranog uzrasta — pre nego što se pojavi problem, da dete stekne poverenje.' },
      { q: 'Da li treba lečiti mlečne zube?', a: 'Da. Mlečni zubi su važni za žvakanje, govor i pravilan razvoj stalnih zuba, pa se i oni leče i čuvaju.' },
      { q: 'Da li lečenje boli?', a: 'Radimo nežno i, kada je potrebno, pod lokalnom anestezijom, tako da je dete mirno i bez bola.' },
    ],
  },

  // ─── ESTETIKA LICA ───
  {
    slug: '/usluge/estetika-lica/',
    title: 'Estetika lica: botoks i hijaluronski fileri Beograd | Dentana Pro',
    description: 'Estetika lica u Beogradu — Dentana Pro. Botoks, hijaluronski fileri, mezoterapija i biorevitalizacija, uz prirodan rezultat usklađen s crtama lica. Kao nadgradnja stomatološke nege.',
    breadcrumb: 'Estetika lica',
    eyebrow: 'Dopunska usluga',
    h1: 'Estetika <em>lica</em>',
    intro: 'Uz osmeh, harmonizujemo i izgled lica — botoksom, hijaluronskim filerima i tretmanima za kvalitet kože. Cilj je prirodan rezultat, bez „preterivanja".',
    schemaName: 'Estetski tretmani lica',
    schemaExtra: { procedureType: 'https://schema.org/NoninvasiveProcedure' },
    images: [
      { src: '/img/img_09.webp', alt: 'Estetika lica — Dentana Pro' },
      { src: '/img/img_10.webp', alt: 'Botoks tretman — Dentana Pro' },
      { src: '/img/img_11.webp', alt: 'Hijaluronski fileri — Dentana Pro' },
      { src: '/img/img_12.webp', alt: 'Mezoterapija i biorevitalizacija — Dentana Pro' },
      { src: '/img/img_13.webp', alt: 'Tretman usana — Dentana Pro' },
    ],
    body: `          <h2>Aplikacija botoksa</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Opušta mimične bore (čelo, glabela, oko očiju) za glatkiji izgled, bez gubitka prirodne ekspresije.</p>
          <h2 style="margin-top:34px;">Hijaluronski fileri</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Volumen i kontura — usne, jagodice, definisanje donje trećine lica. Doziramo umereno, za prirodan rezultat usklađen s vašim crtama.</p>
          <h2 style="margin-top:34px;">Mezoterapija i biorevitalizacija</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Duboka hidratacija i kvalitet kože (Profhilo, Karisma, Jalupro) za sjaj i čvrstinu.</p>`,
    faqHeading: 'Estetika lica — <em>pitanja i odgovori</em>',
    faqCta: 'Zakažite konsultaciju',
    faqs: [
      { q: 'Da li tretmani bole i koliko traje oporavak?', a: 'Koriste se vrlo tanke igle, pa je nelagodnost minimalna. Moguće je blago crvenilo ili otok na mestu uboda, koji se brzo povlači — najčešće se istog dana vraćate svakodnevnim aktivnostima.' },
      { q: 'Koliko traje efekat botoksa i filera?', a: 'Efekat je privremen i individualan — najčešće nekoliko meseci. Konkretna očekivanja i plan dogovaramo na konsultaciji.' },
      { q: 'Da li je rezultat prirodan?', a: 'To nam je cilj. Doziramo umereno i prilagođavamo crtama lica, tako da izgledate odmornije, a ne „urađeno".' },
      { q: 'Mogu li da kombinujem estetiku lica sa stomatologijom?', a: 'Da — upravo to i nudimo: estetiku lica kao nadgradnju osmeha, za skladan celokupan izgled.' },
    ],
  },
];
