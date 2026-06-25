'use strict';
// Engleska (US) verzija — isti redosled kao usluge-data.js (za hreflang uparivanje po indeksu)

const FAQ_FIRST_VISIT = { q: 'Is the first exam charged?', a: 'Yes, the first exam is charged at the standard exam fee. It includes a diagnosis, a treatment plan, and a cost estimate — so you know what to expect before we begin anything.' };
const FAQ_XRAY = { q: 'Do you take X-rays, or will I be referred for imaging?', a: 'It depends on the case — we take some X-rays in the office and refer you elsewhere for others. If you already have an X-ray, send it to us in advance via WhatsApp (+381 63 349 128) or email (dentanapro@gmail.com) so we can prepare for your visit.' };
const FAQ_EMERGENCY = { q: 'Do you accept emergencies (pain, swelling, a lost filling)?', a: 'We do our best to see emergencies the same or the next day, within working hours (Mon–Fri, 11:00–19:00). The best thing is to call us right away at +381 63 349 128 or message us on WhatsApp.' };
const FAQ_PRICE_PHASES = { q: 'How much does it cost, and can I pay for more extensive treatment in stages?', a: 'The cost depends on your specific condition and the scope of treatment, so you receive an estimate right after the exam and treatment plan. Payments are made in stages as treatment progresses.' };

module.exports = [
  // ─── DENTAL IMPLANTS ───
  {
    slug: '/en/services/dental-implants/',
    title: 'Dental Implants in Belgrade | Dentana Pro',
    description: 'Dental implants in Belgrade — Dentana Pro. A permanent replacement for missing teeth with titanium implants, careful planning, osseointegration and a natural-looking restoration. Book an appointment.',
    breadcrumb: 'Dental Implants',
    eyebrow: 'Oral Surgery · Implantology',
    h1: 'Dental <em>Implants</em> in Belgrade',
    intro: 'Dental implants are a permanent solution for replacing one, several, or all missing teeth. An implant replaces the tooth root, does not affect the neighboring healthy teeth, and prevents bone loss where the tooth is missing.',
    schemaName: 'Dental implant placement',
    schemaExtra: { alternateName: 'Dental implants', procedureType: 'https://schema.org/SurgicalProcedure', bodyLocation: 'Jaw' },
    images: [
      { src: '/img/img_36.webp', alt: 'Dental implant placement — Dentana Pro' },
      { src: '/img/img_37.webp', alt: 'Oral surgery and implantology — Dentana Pro' },
      { src: '/img/img_38.webp', alt: 'Implantology — Dentana Pro' },
      { src: '/img/img_39.webp', alt: 'Dental implants — Dentana Pro' },
      { src: '/img/img_40.webp', alt: 'Dental implants — Dentana Pro' },
    ],
    body: `          <h2>What are dental implants</h2>
          <p style="font-size:0.95rem;margin-top:12px;">An implant is an artificial tooth root made of biocompatible titanium, placed into the jaw where a tooth is missing. During healing it fuses with the bone (<strong>osseointegration</strong>) and becomes a stable support for a crown, bridge, or denture.</p>
          <p style="font-size:0.95rem;margin-top:14px;">Unlike a bridge, an implant does not require grinding down the adjacent teeth; unlike a removable denture, it stays firmly in place and feels closest to a natural tooth.</p>
          <h2 style="margin-top:34px;">Benefits of implants</h2>
          <ul class="hirurgija-list" style="margin-top:14px;">
            <li>a permanent, stable replacement for missing teeth</li>
            <li>preserves the healthy neighboring teeth (no grinding)</li>
            <li>prevents bone loss at the site of the missing tooth</li>
            <li>natural look and function when chewing and speaking</li>
            <li>a solution for a single tooth, several teeth, or when all teeth are missing</li>
          </ul>
          <div class="hirurgija-sub">
            <h3>Treatment step by step</h3>
            <div class="process-steps">
              <div class="process-step"><span class="process-num">1</span><div><strong>Exam and planning</strong><p>Clinical exam, X-ray and bone assessment, then a clear treatment plan with an estimate.</p></div></div>
              <div class="process-step"><span class="process-num">2</span><div><strong>Implant placement</strong><p>A single appointment, under local anesthesia — painless.</p></div></div>
              <div class="process-step"><span class="process-num">3</span><div><strong>Healing (osseointegration)</strong><p>The implant fuses with the bone, usually over a few months.</p></div></div>
              <div class="process-step"><span class="process-num">4</span><div><strong>The restoration</strong><p>A crown, bridge, or denture is made — restoring function and appearance.</p></div></div>
            </div>
          </div>
          <p style="font-size:0.92rem;margin-top:24px;">Implantology at Dentana Pro is performed by <strong>Dr Tijana Aćimović</strong>, a specialist in periodontal surgery.</p>`,
    faqHeading: 'Implants — <em>questions and answers</em>',
    faqCta: 'Book an implant consultation',
    faqs: [
      { q: 'Does implant placement hurt?', a: 'No. Placement is done under local anesthesia and is painless. After the procedure there may be mild tenderness or swelling that subsides within a few days with the usual pain relief.' },
      { q: 'How many visits are needed and how long does it all take?', a: 'The placement itself is usually a single appointment. Healing follows (most often a few months), then the restoration over a couple more visits. You receive the exact plan and number of visits at your exam.' },
      { q: 'What if I don’t have enough bone?', a: 'An implant is most often still possible — with preparatory procedures such as a sinus lift or bone augmentation. We assess this based on the exam and an X-ray.' },
      FAQ_PRICE_PHASES,
      FAQ_XRAY,
    ],
  },

  // ─── GENERAL DENTISTRY ───
  {
    slug: '/en/services/general-dentistry/',
    title: 'Dental Fillings & Tooth Treatment Belgrade | Dentana Pro',
    description: 'General dentistry in Belgrade — Dentana Pro. Regular check-ups, treatment of cavities and tooth-colored fillings, and root canal therapy (endodontics). Book an appointment.',
    breadcrumb: 'General Dentistry',
    eyebrow: 'Conservative dentistry and endodontics',
    h1: 'Check-ups & <em>Tooth Treatment</em>',
    intro: 'The earlier a cavity is found, the simpler, cheaper and more painless the treatment. That is why regular check-ups are the most cost-effective part of caring for your teeth.',
    schemaExtra: { procedureType: 'https://schema.org/TherapeuticProcedure' },
    images: [
      { src: '/img/img_31.webp', alt: 'Dental check-ups and treatment — Dentana Pro' },
      { src: '/img/img_32.webp', alt: 'Cavity treatment — Dentana Pro' },
      { src: '/img/img_33.webp', alt: 'Tooth-colored fillings — Dentana Pro' },
      { src: '/img/img_34.webp', alt: 'Endodontics — Dentana Pro' },
      { src: '/img/img_35.webp', alt: 'Dental exam — Dentana Pro' },
    ],
    body: `          <h2>Regular check-ups and prevention</h2>
          <p style="font-size:0.95rem;margin-top:12px;">A check-up every 6–12 months lets us catch a cavity while it is small, when the fix is quick and simple. With each exam you also get concrete advice for home care.</p>
          <h2 style="margin-top:34px;">Cavity treatment and tooth-colored fillings</h2>
          <p style="font-size:0.95rem;margin-top:12px;">We treat cavities with white (composite) fillings color-matched to the tooth, so the filling is invisible and long-lasting. A small cavity is most often a single visit.</p>
          <h2 style="margin-top:34px;">Endodontics — root canal therapy</h2>
          <p style="font-size:0.95rem;margin-top:12px;">When a cavity reaches the tooth nerve, root canal therapy is needed. Timely treatment relieves the pain and infection and most often saves the tooth. It usually takes 1–2 visits, depending on the tooth.</p>`,
    faqHeading: 'Tooth treatment — <em>questions and answers</em>',
    faqCta: 'Book an appointment',
    faqs: [
      { q: 'Does treating teeth and getting fillings hurt?', a: 'No. Treatment is done under local anesthesia, so the procedure is painless. If you are anxious, just tell us — we work without rushing and explain everything beforehand.' },
      { q: 'How many visits are needed for a filling or a root canal?', a: 'A small filling is most often a single visit. Root canal therapy usually takes 1–2 visits, depending on the tooth and its condition.' },
      FAQ_FIRST_VISIT,
      FAQ_EMERGENCY,
      FAQ_XRAY,
    ],
  },

  // ─── ORAL SURGERY ───
  {
    slug: '/en/services/oral-surgery/',
    title: 'Oral Surgery & Wisdom Tooth Removal Belgrade | Dentana Pro',
    description: 'Oral surgery in Belgrade — Dentana Pro. Tooth and wisdom-tooth extractions, apicoectomies, frenectomies, sinus lift and implant placement, with careful planning and guided recovery.',
    breadcrumb: 'Oral Surgery',
    eyebrow: 'Services · Oral Surgery',
    h1: 'Oral <em>Surgery</em>',
    intro: 'From a simple extraction to wisdom teeth and implants — we perform oral surgery in a planned way, with a clear agreement on the procedure and the recovery.',
    schemaExtra: { procedureType: 'https://schema.org/SurgicalProcedure' },
    images: [
      { src: '/img/img_36.webp', alt: 'Oral surgery — Dentana Pro' },
      { src: '/img/img_37.webp', alt: 'Oral surgery procedure — Dentana Pro' },
      { src: '/img/img_38.webp', alt: 'Oral surgery — Dentana Pro' },
      { src: '/img/img_39.webp', alt: 'Oral surgery — Dentana Pro' },
      { src: '/img/img_40.webp', alt: 'Oral surgery — Dentana Pro' },
    ],
    body: `          <p style="font-weight:500;color:var(--text);margin-bottom:4px;">Our oral surgery services include:</p>
          <ul class="hirurgija-list">
            <li>tooth extractions, from simple to complex</li>
            <li>surgical removal of impacted and partially impacted wisdom teeth</li>
            <li>apicoectomies (root-tip resection)</li>
            <li>lip and tongue frenectomies</li>
            <li>sinus lift and closure of oroantral communications</li>
            <li>vestibuloplasty and pre-prosthetic procedures</li>
            <li>implant placement</li>
          </ul>
          <h2 style="margin-top:34px;">Wisdom tooth removal</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Impacted wisdom teeth can cause pain, swelling and pressure on the neighboring teeth. We plan the removal based on an X-ray, under local anesthesia, with clear aftercare instructions.</p>
          <div class="hirurgija-sub">
            <h3>Implants</h3>
            <p style="font-size:0.92rem;">Implant placement is part of our oral surgery practice.</p>
            <p style="margin-top:12px;"><a href="/en/services/dental-implants/" class="service-more-link">Learn more about dental implants →</a></p>
          </div>
          <p style="font-size:0.92rem;margin-top:24px;">Procedures are performed by <strong>Dr Tijana Aćimović</strong>, a specialist in periodontal surgery.</p>`,
    faqHeading: 'Oral surgery — <em>questions and answers</em>',
    faqCta: 'Book an appointment',
    faqs: [
      { q: 'Does a tooth extraction hurt?', a: 'No. The procedure is done under local anesthesia and is painless. After the extraction you receive clear instructions and, if needed, medication for a calm recovery.' },
      { q: 'How long is the recovery after wisdom tooth removal?', a: 'Most often a few days. Any swelling and tenderness subside with proper care and the medication we recommend.' },
      FAQ_EMERGENCY,
      FAQ_XRAY,
    ],
  },

  // ─── ORTHODONTICS ───
  {
    slug: '/en/services/orthodontics/',
    title: 'Orthodontics & Braces in Belgrade | Dentana Pro',
    description: 'Orthodontics in Belgrade — Dentana Pro. Correcting misaligned teeth and jaws with fixed and removable appliances, for children and adults. Led by an orthodontics specialist.',
    breadcrumb: 'Orthodontics',
    eyebrow: 'Services · Orthodontics',
    h1: '<em>Orthodontics</em>',
    intro: 'Crooked teeth are not just a cosmetic issue — they are harder to clean and put strain on the bite. Orthodontic treatment corrects this, for children and adults alike.',
    images: [
      { src: '/img/img_41.webp', alt: 'Orthodontics — Dentana Pro' },
      { src: '/img/img_42.webp', alt: 'Orthodontic appliance — Dentana Pro' },
    ],
    body: `          <h2>Why orthodontic treatment</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Properly aligned teeth are easier to clean, wear more evenly and stay healthy longer. The goal of treatment is both a beautiful smile and a correct bite.</p>
          <h2 style="margin-top:34px;">Children and adults</h2>
          <p style="font-size:0.95rem;margin-top:12px;">In children we use removable appliances and exercises that guide jaw growth, while for permanent teeth we most often use fixed braces. It is never too late for braces in adulthood — there is no strict age limit.</p>
          <p style="font-size:0.92rem;margin-top:24px;">Orthodontic treatment is led by <strong>Dr Jasmina Milišić</strong>, an orthodontics specialist.</p>`,
    faqHeading: 'Orthodontics — <em>questions and answers</em>',
    faqCta: 'Book an orthodontic exam',
    faqs: [
      { q: 'How long does treatment with fixed braces take?', a: 'With fixed braces, treatment most often takes 18 to 24 months, depending on the complexity of the case. Alongside fixed braces we also use removable appliances, especially for children — we give the exact estimate and appliance choice after the exam and an X-ray.' },
      { q: 'Is it too late for braces as an adult?', a: 'No. Orthodontic treatment works well for adults too; there are also aesthetic versions of fixed braces.' },
      { q: 'Do braces hurt?', a: 'After placement and certain adjustments there may be mild pressure for the first few days, which passes quickly. It is a sign the teeth are moving into the correct position.' },
      { q: 'How often are check-ups?', a: 'With fixed braces, check-ups are usually every few weeks. We schedule them around your availability.' },
      { q: 'Can orthodontic treatment be paid in installments?', a: 'Yes, orthodontic treatment can be paid in installments. We agree on the estimate and payment options after the exam and treatment plan.' },
    ],
  },

  // ─── PROSTHETICS ───
  {
    slug: '/en/services/prosthetics/',
    title: 'Dental Prosthetics: Crowns, Bridges, Dentures Belgrade | Dentana Pro',
    description: 'Dental prosthetics in Belgrade — Dentana Pro. Metal-ceramic and all-ceramic crowns and bridges, partial and full dentures, combined work. A natural, long-lasting result.',
    breadcrumb: 'Prosthetics',
    eyebrow: 'Services · Prosthetics',
    h1: '<em>Prosthetics</em>',
    intro: 'Crowns, bridges and dentures restore teeth that are missing or badly damaged — bringing back both function (chewing, speech) and the look of your smile.',
    images: [
      { src: '/img/img_43.webp', alt: 'Dental prosthetics — Dentana Pro' },
      { src: '/img/img_44.webp', alt: 'Crowns and bridges — Dentana Pro' },
      { src: '/img/img_45.webp', alt: 'Prosthetic work — Dentana Pro' },
      { src: '/img/img_46.webp', alt: 'Dental prosthetics — Dentana Pro' },
      { src: '/img/img_47.webp', alt: 'Dental prosthetics — Dentana Pro' },
    ],
    body: `          <div class="hirurgija-sub" style="margin-top:0;padding-top:0;border-top:none;">
            <h3>Crowns and bridges</h3>
            <p style="font-size:0.92rem;margin-top:10px;">Fixed restorations for damaged or missing teeth. We make metal-ceramic and all-ceramic (zirconia) crowns and bridges, with careful color and shape selection for a natural look.</p>
          </div>
          <div class="hirurgija-sub">
            <h3>Dentures</h3>
            <p style="font-size:0.92rem;margin-top:10px;">Removable restorations when many teeth are missing — partial (when some natural teeth remain) or full (when all teeth are missing). They restore chewing, speech and support for the face.</p>
          </div>
          <div class="hirurgija-sub">
            <h3>Combined work</h3>
            <p style="font-size:0.92rem;margin-top:10px;">Combines fixed and removable parts in partial edentulism, for better stability and comfort.</p>
          </div>
          <p style="font-size:0.92rem;margin-top:24px;">Prosthetic treatment is led by <strong>Dr Ana Jaraković</strong> and <strong>Dr Zorica Popović Ignjatović</strong>.</p>`,
    faqHeading: 'Prosthetics — <em>questions and answers</em>',
    faqCta: 'Book an appointment',
    faqs: [
      { q: 'How many visits are needed for a crown or a bridge?', a: 'Most often several visits — from preparation and the impression to the try-in and fitting of the finished work. The exact number depends on the scope and we tell you at the exam.' },
      { q: 'Does preparing the tooth hurt?', a: 'No. Grinding and preparation are done under local anesthesia, so it is painless.' },
      { q: 'All-ceramic (zirconia) or metal-ceramic crowns?', a: 'All-ceramic (zirconia) crowns look highly natural because they have no metal base; metal-ceramic crowns are durable and proven. The choice depends on the tooth position and your aesthetic wishes, and we advise you at the exam.' },
      FAQ_PRICE_PHASES,
    ],
  },

  // ─── PERIODONTICS ───
  {
    slug: '/en/services/periodontics/',
    title: 'Gum Treatment & Periodontitis Belgrade | Dentana Pro',
    description: 'Periodontics in Belgrade — Dentana Pro. Treatment of gingivitis and periodontal disease, bleeding and receding gums, and tartar removal. An individual treatment plan.',
    breadcrumb: 'Gum Treatment',
    eyebrow: 'Services · Periodontics',
    h1: 'Gum Treatment &amp; <em>Periodontics</em>',
    intro: 'Bleeding gums are not “normal” — they are an early sign of inflammation. The sooner you act, the simpler the treatment and the easier it is to save the teeth.',
    images: [
      { src: '/img/img_50.webp', alt: 'Periodontics — Dentana Pro' },
      { src: '/img/img_51.webp', alt: 'Gum treatment — Dentana Pro' },
      { src: '/img/img_52.webp', alt: 'Periodontics — Dentana Pro' },
      { src: '/img/img_53.webp', alt: 'Periodontics — Dentana Pro' },
    ],
    body: `          <h2>Signs of gum disease</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Bleeding when brushing, swelling and redness, sensitivity, receding gums and bad breath are the most common signs of gingivitis or periodontitis.</p>
          <h2 style="margin-top:34px;">Diagnosis and treatment</h2>
          <p style="font-size:0.95rem;margin-top:12px;">At the exam we assess the gums, tartar and pocket depth, then make a plan. Treatment ranges from removing deposits to, in advanced cases, surgical therapy.</p>
          <h2 style="margin-top:34px;">The goal of treatment</h2>
          <p style="font-size:0.95rem;margin-top:12px;">In early stages the gums often recover fully. In advanced cases the goal is to stop the disease from progressing and keep the teeth for as long as possible.</p>`,
    faqHeading: 'Periodontics — <em>questions and answers</em>',
    faqCta: 'Book a gum exam',
    faqs: [
      { q: 'My gums bleed when I brush — is that serious?', a: 'Bleeding is a common early sign of inflammation and should not be ignored. With a timely exam and treatment, the condition usually improves significantly.' },
      { q: 'Does tartar removal hurt?', a: 'It is mostly painless; for more sensitive patients or deeper cleaning we use local anesthesia.' },
      { q: 'Can receding gums be treated?', a: 'Depending on the cause and extent, recession can be addressed conservatively or surgically. We assess it at the exam.' },
      FAQ_EMERGENCY,
    ],
  },

  // ─── PEDIATRIC DENTISTRY ───
  {
    slug: '/en/services/pediatric-dentistry/',
    title: 'Children’s Dentist in Belgrade | Dentana Pro',
    description: 'Pediatric dentistry in Belgrade — Dentana Pro. A gentle, patient approach for the youngest, especially children who are afraid of the dentist. Prevention and building trust from an early age.',
    breadcrumb: 'Pediatric Dentistry',
    eyebrow: 'A gentle approach for our youngest',
    h1: 'Pediatric <em>Dentistry</em>',
    intro: 'The goal of the first visit is not to “fix everything at once,” but for the child to build trust. When the first experience is good, every next visit is easier.',
    schemaType: 'MedicalWebPage',
    schemaName: 'Pediatric dentistry',
    schemaExtra: { about: { '@type': 'MedicalSpecialty', name: 'PediatricDentistry' } },
    images: [
      { src: '/img/img_08.webp', alt: 'Pediatric dentistry — Dentana Pro' },
      { src: '/img/img_59.webp', alt: 'Pediatric dentistry — Dentana Pro' },
      { src: '/img/img_61.webp', alt: 'Teaching a child about oral hygiene — Dentana Pro' },
    ],
    body: `          <h2>Our approach with children</h2>
          <p style="font-size:0.95rem;margin-top:12px;">We approach the child gradually and without pressure, explaining each step in a way they understand and never forcing anything. That way the office becomes a safe place rather than a source of stress.</p>
          <h2 style="margin-top:34px;">Prevention for children</h2>
          <p style="font-size:0.95rem;margin-top:12px;">The best protection is regular check-ups, proper hygiene and, when indicated, protective measures. We give parents clear advice for caring for the teeth at home.</p>`,
    faqHeading: 'Pediatric dentistry — <em>questions and answers</em>',
    faqCta: 'Book a visit for your child',
    faqs: [
      { q: 'My child is afraid of the dentist — how do you handle that?', a: 'Patiently and without force. The first visit is short and relaxed, so the child gets used to the office and the team before any treatment. We adapt the pace to the child.' },
      { q: 'At what age should I bring my child for a check-up?', a: 'We recommend the first short check-up visits from an early age — before a problem appears, so the child builds trust.' },
      { q: 'Do baby teeth need to be treated?', a: 'Yes. Baby teeth matter for chewing, speech and the proper development of the permanent teeth, so they are treated and preserved.' },
      { q: 'Does treatment hurt?', a: 'We work gently and, when needed, under local anesthesia, so the child stays calm and pain-free.' },
    ],
  },

  // ─── FACIAL AESTHETICS ───
  {
    slug: '/en/services/facial-aesthetics/',
    title: 'Facial Aesthetics: Botox & Dermal Fillers Belgrade | Dentana Pro',
    description: 'Facial aesthetics in Belgrade — Dentana Pro. Botox, hyaluronic dermal fillers, mesotherapy and biorevitalization, for a natural result in harmony with your features. As an addition to dental care.',
    breadcrumb: 'Facial Aesthetics',
    eyebrow: 'Additional service',
    h1: 'Facial <em>Aesthetics</em>',
    intro: 'Alongside your smile, we harmonize the look of your face — with botox, hyaluronic fillers and skin-quality treatments. The goal is a natural result, without overdoing it.',
    schemaName: 'Facial aesthetic treatments',
    schemaExtra: { procedureType: 'https://schema.org/NoninvasiveProcedure' },
    images: [
      { src: '/img/img_09.webp', alt: 'Facial aesthetics — Dentana Pro' },
      { src: '/img/img_10.webp', alt: 'Botox treatment — Dentana Pro' },
      { src: '/img/img_11.webp', alt: 'Hyaluronic fillers — Dentana Pro' },
      { src: '/img/img_12.webp', alt: 'Mesotherapy and biorevitalization — Dentana Pro' },
      { src: '/img/img_13.webp', alt: 'Lip treatment — Dentana Pro' },
    ],
    body: `          <h2>Botox</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Relaxes expression lines (forehead, glabella, around the eyes) for a smoother look, without losing natural expression.</p>
          <h2 style="margin-top:34px;">Hyaluronic fillers</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Volume and contour — lips, cheekbones, definition of the lower third of the face. We dose moderately, for a natural result in harmony with your features.</p>
          <h2 style="margin-top:34px;">Mesotherapy and biorevitalization</h2>
          <p style="font-size:0.95rem;margin-top:12px;">Deep hydration and skin quality (Profhilo, Karisma, Jalupro) for glow and firmness.</p>`,
    faqHeading: 'Facial aesthetics — <em>questions and answers</em>',
    faqCta: 'Book a consultation',
    faqs: [
      { q: 'Do the treatments hurt, and what is the recovery like?', a: 'Very fine needles are used, so discomfort is minimal. Slight redness or swelling at the injection site is possible and subsides quickly — most people return to their daily activities the same day.' },
      { q: 'How long do botox and fillers last?', a: 'The effect is temporary and individual — most often a few months. We discuss specific expectations and a plan at the consultation.' },
      { q: 'Will the result look natural?', a: 'That is our goal. We dose moderately and adapt to your facial features, so you look more rested rather than “done.”' },
      { q: 'Can I combine facial aesthetics with dental treatment?', a: 'Yes — that is exactly what we offer: facial aesthetics as an addition to your smile, for a harmonious overall look.' },
    ],
  },
];
