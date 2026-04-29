export const clinic = {
  name: "Altmed Medical Center",
  tagline: "Primary care, urgent care, occupational health, weight loss, and telehealth in Manassas, VA.",
  phone: "(703) 361-4357",
  email: "info@altmedfirst.com",
  address: "8551 Rixlew Lane Suite 140, Manassas, VA 20109",
  canonicalUrl: "https://altmedfirst.com",
  bookingUrl: "/appointment",
  hours: "Mon-Fri: 9:00 AM-5:00 PM",
  coordinates: {
    latitude: 38.7711537,
    longitude: -77.5023036
  },
  mapUrl: "https://maps.google.com/?q=8551+Rixlew+Lane+Suite+140+Manassas+VA+20109",
  languages: ["English", "Spanish"]
} as const;

export const seoPriorityKeywords = [
  "walk in clinic Manassas VA",
  "urgent care Manassas VA",
  "primary care Manassas VA",
  "dot physical manassas va",
  "drug and alcohol testing Manassas",
  "medical weight loss Manassas",
  "functional medicine Manassas",
  "suboxone treatment Manassas"
] as const;

export const clinicCoverageAreas = [
  "Manassas",
  "Sudley",
  "Gainesville",
  "Haymarket",
  "Centreville",
  "Bristow",
  "Prince William County"
] as const;

export const clinicHighlights = [
  "Board-certified medical providers",
  "Same-day and walk-in urgent care access",
  "Comprehensive weight loss and occupational health programs",
  "Telehealth and in-clinic appointments available"
] as const;

export const legacyAssets = {
  logo: "/legacy-assets/altmed-logo.png",
  heroClinic: "/legacy-assets/homepage/clinic-front-view.jpg",
  heroDoctor: "/legacy-assets/homepage/top.jpg",
  heroBackdrop: "/legacy-assets/homepage/hero-bg.jpg",
  aboutPhoto: "/legacy-assets/about.jpg",
  aboutTeam: "/legacy-assets/about-team.jpg",
  doctorsOverview: "/legacy-assets/doctors/doctors-4.jpg",
  doctorOne: "/legacy-assets/doctors/doc-1.png",
  doctorTwo: "/legacy-assets/doctors/doc-2.jpg",
  doctorThree: "/legacy-assets/doctors/doctors-1.jpg",
  doctorFour: "/legacy-assets/doctors/doctors-2.jpg",
  doctorFive: "/legacy-assets/doctors/doctors-3.jpg",
  departmentOne: "/legacy-assets/departments/departments-1.jpg",
  departmentTwo: "/legacy-assets/departments/departments-2.jpg",
  departmentThree: "/legacy-assets/departments/departments-3.jpg",
  departmentFour: "/legacy-assets/departments/departments-4.jpg",
  departmentFive: "/legacy-assets/departments/departments-5.jpg",
  gallery: [
    "/legacy-assets/gallery/gallery-1.jpg",
    "/legacy-assets/gallery/gallery-2.jpg",
    "/legacy-assets/gallery/gallery-3.jpg"
  ],
  clinicalMask: "/legacy-assets/gallery/gallery-5.jpg",
  clinicianProcedure: "/legacy-assets/gallery/gallery-6.jpg",
  imagingScanner: "/legacy-assets/gallery/gallery-7.jpg",
  surgicalTeam: "/legacy-assets/gallery/gallery-8.jpg",
  testimonialPhoto: "/legacy-assets/testimonials/testimonial-1.jpg"
} as const;

export const publicRoutes = {
  home: "/",
  about: "/about-us",
  services: "/services",
  plans: "/plans",
  departments: "/services",
  appointment: "/appointment",
  blog: "/health-blogs",
  faq: "/faq",
  contact: "/contact-us",
  announcements: "/updates",
  providers: "/about-us",
  forms: "/patient-forms",
  privacy: "/privacy-policy",
  tpaAgreement: "/tpa-service-agreement",
  telehealth: "/telehealth-manassas",
  telehealthConsent: "/telehealth-consent-forms",
  telehealthMinorConsent: "/telehealth-consent-forms-minor",
  blogPost: (slug: string) => `/health-blogs/${slug}`,
  service: (slug: string) => `/services/${slug}`
} as const;

export const reconstructedLegacyRoutes = [
  { from: "/blog", to: "/health-blogs", reason: "Google already indexes the health-blogs archive path" },
  { from: "/blogs", to: "/health-blogs", reason: "Backlink-safe alias for legacy blog usage" },
  { from: "/book", to: "/appointment", reason: "Appointment route preserved from old public site" },
  { from: "/announcements", to: "/updates", reason: "Legacy site used updates/news naming" },
  { from: "/services/addiction", to: "/services/suboxone-treatment-manassas", reason: "Google indexes the newer addiction/Suboxone page slug" },
  { from: "/services/occupational-health/dot-physical", to: "/services/dot-physical-manassas-va", reason: "Google indexes the newer DOT physical landing page" },
  { from: "/services/occupational-health/drug-and-alcohol-test", to: "/services/occupational-health/drug-alcohol-testing-manassas", reason: "Google indexes the newer drug testing slug" },
  { from: "/services/occupational-health/vaccinations", to: "/services/occupational-health/vaccinations-immunizations-manassas-va", reason: "Google indexes the expanded vaccination slug" },
  { from: "/services/occupational-health/workers-compensation", to: "/services/occupational-health/workers-compensation-injury-care-manassas", reason: "Google indexes the workers comp landing page" },
  { from: "/services/third-party-administration-service", to: "/tpa-service-agreement", reason: "Agreement page remains important for employer traffic" },
  { from: "/services/medical-review-officer", to: "/services/mro-services-manassas", reason: "Google indexes the dedicated MRO services page" },
  { from: "/services/corporate-wellness-and-health-fairs", to: "/services/corporate-wellness-programs-manassas", reason: "Google indexes the newer corporate wellness slug" },
  { from: "/services/weight_management", to: "/services/medical-weight-loss-manassas", reason: "Google indexes the newer weight loss page" },
  { from: "/services/functional-medicine", to: "/services/functional-medicine-manassas", reason: "Google indexes the newer functional medicine page" },
  { from: "/telehealth", to: "/telehealth-manassas", reason: "Google indexes the telehealth landing page" }
] as const;

export function buildBookingUrl(medium: string, campaign: string) {
  const params = new URLSearchParams({
    utm_source: "website",
    utm_medium: medium,
    utm_campaign: campaign
  });

  return `${clinic.bookingUrl}?${params.toString()}`;
}

export const serviceCards = [
  {
    slug: "urgent-care-manassas-va",
    title: "Urgent Care",
    description: "Walk-in urgent care for minor illness, infections, injuries, and same-day care in Manassas.",
    image: legacyAssets.heroClinic,
    shortDescription: "Walk-in care for sudden health needs."
  },
  {
    slug: "primary-care-manassas-va",
    title: "Primary Care",
    description: "Family and preventive care, chronic condition management, physicals, and routine medical visits.",
    image: legacyAssets.departmentThree,
    shortDescription: "General checkups and long-term care."
  },
  {
    slug: "occupational-health-clinic-manassas",
    title: "Occupational Health",
    description: "Employer-based screenings, injury follow-up, DOT support, and workforce health services.",
    image: legacyAssets.heroBackdrop,
    shortDescription: "Workplace and employer health services."
  },
  {
    slug: "dot-physical-manassas-va",
    title: "DOT Physicals",
    description: "FMCSA-compliant CDL exams with same-day availability for drivers and fleet operators.",
    image: legacyAssets.departmentFive,
    shortDescription: "CDL and FMCSA medical exams."
  },
  {
    slug: "occupational-health/drug-alcohol-testing-manassas",
    title: "Drug & Alcohol Testing",
    description: "Pre-employment, random, post-accident, and DOT-compliant testing for employers and individuals.",
    image: legacyAssets.heroDoctor,
    shortDescription: "Drug screens and alcohol testing."
  },
  {
    slug: "occupational-health/workers-compensation-injury-care-manassas",
    title: "Workers' Compensation",
    description: "Same-day injury evaluation, return-to-work planning, and workers' comp documentation support.",
    image: legacyAssets.heroClinic,
    shortDescription: "Work injury evaluation and follow-up."
  },
  {
    slug: "occupational-health/vaccinations-immunizations-manassas-va",
    title: "Vaccinations & Immunizations",
    description: "Walk-in flu shots and routine immunizations for families, students, and workplace programs.",
    image: legacyAssets.clinicalMask,
    shortDescription: "Flu shots and essential vaccines."
  },
  {
    slug: "medical-weight-loss-manassas",
    title: "Medical Weight Loss",
    description: "Physician-guided weight loss plans with medications, injections, nutrition support, and monitoring.",
    image: legacyAssets.doctorsOverview,
    shortDescription: "B-12, semaglutide, and coached programs."
  },
  {
    slug: "functional-medicine-manassas",
    title: "Functional Medicine",
    description: "Root-cause evaluation for chronic symptoms, lifestyle factors, and personalized health planning.",
    image: legacyAssets.doctorThree,
    shortDescription: "Holistic root-cause care."
  },
  {
    slug: "suboxone-treatment-manassas",
    title: "Addiction Management",
    description: "Compassionate addiction treatment and Suboxone support in a judgment-free setting.",
    image: legacyAssets.heroDoctor,
    shortDescription: "Confidential recovery support."
  },
  {
    slug: "third-party-administrator-service-manassas",
    title: "TPA Services",
    description: "Third-party administrator support for DOT compliance, random pools, reporting, and employer drug-testing programs.",
    image: legacyAssets.doctorOne,
    shortDescription: "Employer compliance and program administration."
  },
  {
    slug: "mro-services-manassas",
    title: "MRO Services",
    description: "Medical Review Officer services for DOT and workplace drug-testing program review.",
    image: legacyAssets.doctorFour,
    shortDescription: "Medical review officer support."
  },
  {
    slug: "corporate-wellness-programs-manassas",
    title: "Corporate Wellness & Health Fairs",
    description: "Onsite screenings, wellness campaigns, and employer-focused health fair support.",
    image: legacyAssets.heroBackdrop,
    shortDescription: "Workplace wellness programs."
  }
] as const;

export const servicePageFallbackContent: Record<
  string,
  {
    name: string;
    heroContent: string;
    bodyContent: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    featuredImage: string;
  }
> = {
  "urgent-care-manassas-va": {
    name: "Urgent Care",
    heroContent:
      "<h1>Urgent Care in Manassas, VA</h1><p>Walk in for fast, same-day care for non-life-threatening illness, minor injuries, infections, rashes, and everyday problems that should not wait.</p>",
    bodyContent:
      "<h2>Same-day care without the emergency-room wait</h2><p>The legacy urgent care page focused on one clear promise: convenient local care for common medical problems that need attention today. We kept that message, but made the visit path easier to understand for patients searching from Manassas, Sudley, Gainesville, Bristow, and nearby communities.</p><h2>What we commonly treat</h2><ul><li>Flu, colds, fever, sore throat, ear pain, sinus symptoms, and other infections</li><li>Sprains, strains, minor burns, cuts, rashes, allergic reactions, and mild sports injuries</li><li>UTI symptoms, pink eye, minor abdominal discomfort, and other everyday urgent concerns</li><li>School, sports, and work-related physicals when same-day convenience matters</li></ul><h2>Why patients choose Altmed for urgent care</h2><p>Patients often want something more personal than a large chain clinic. Altmed combines walk-in access with on-site lab support, practical follow-up planning, and a wider care network that also includes <a href='/services/primary-care-manassas-va'>primary care</a> and occupational services.</p><h2>When urgent care is not the right setting</h2><p>Call 911 or go to the nearest emergency room for chest pain, stroke symptoms, severe shortness of breath, uncontrolled bleeding, loss of consciousness, or major trauma.</p>",
    metaTitle: "Urgent Care Manassas VA | Walk-In Clinic & Same-Day Care | Altmed",
    metaDescription: "Walk-in urgent care in Manassas, VA with same-day treatment for minor illness and injury. Skip the ER wait and get care fast at Altmed Medical Center.",
    metaKeywords: "urgent care Manassas VA, walk in clinic Manassas, same day care, urgent care near me",
    featuredImage: legacyAssets.heroClinic
  },
  "primary-care-manassas-va": {
    name: "Primary Care",
    heroContent:
      "<h1>Primary Care in Manassas, VA</h1><p>Trusted family medicine, preventive care, and chronic-condition support from a local team accepting new patients.</p>",
    bodyContent:
      "<h2>Family medicine built around prevention and continuity</h2><p>The scraped primary care page repeatedly emphasized relationship-based care for everyone from children to older adults. We preserved that direction here: patients can use Altmed for routine checkups, ongoing health planning, and help making sense of recurring concerns over time.</p><h2>Primary care services include</h2><ul><li>Annual physicals, wellness exams, and preventive screenings</li><li>Immunizations, routine lab coordination, and age-appropriate follow-up care</li><li>Chronic disease support for blood pressure, diabetes, asthma, thyroid concerns, and similar conditions</li><li>Women&apos;s health, men&apos;s health, pediatric visits, and everyday illness care</li><li>Mental health check-ins and practical coordination when specialty referral is needed</li></ul><h2>A more holistic approach when appropriate</h2><p>The legacy content also highlighted nutrition, lifestyle, and whole-person health discussions. That remains part of the experience here, especially for patients who want care that feels both evidence-based and attentive to habits, stress, and long-term health goals.</p><h2>Accepting new patients in Manassas</h2><p>If you are looking for a primary care doctor close to home, Altmed is designed to make that first visit feel easier, whether you are new to the area, changing providers, or finally setting up a regular medical home.</p>",
    metaTitle: "Primary Care Manassas VA | Comprehensive Healthcare | Altmed Medical Center",
    metaDescription: "Looking for primary care in Manassas, VA? Altmed Medical Center offers family medicine, wellness exams, chronic care, and preventive screenings.",
    metaKeywords: "primary care Manassas VA, family doctor Manassas, physical exams, preventive care",
    featuredImage: legacyAssets.departmentThree
  },
  "occupational-health-clinic-manassas": {
    name: "Occupational Health",
    heroContent:
      "<h1>Occupational Health Services in Manassas</h1><p>Workplace injury care, DOT exams, employer testing, and compliance-minded workforce services for businesses across Prince William County.</p>",
    bodyContent:
      "<h2>A local occupational health clinic built for speed and documentation</h2><p>The archived occupational-health page made two things clear: employers need fast medical response when injuries happen, and they need a dependable clinic partner for testing, compliance, and prevention even when nothing urgent is happening. This page now presents both sides more clearly.</p><h2>Core employer services</h2><ul><li><a href='/services/dot-physical-manassas-va'>DOT physicals</a> and commercial driver medical support</li><li><a href='/services/occupational-health/drug-alcohol-testing-manassas'>Drug and alcohol testing</a> for pre-employment, random, post-accident, and return-to-duty workflows</li><li><a href='/services/occupational-health/workers-compensation-injury-care-manassas'>Workers&apos; compensation injury care</a> with return-to-work communication</li><li>Breath alcohol testing, vision and hearing screening, respiratory evaluation, and related occupational exams</li><li><a href='/services/occupational-health/lab-testing-manassas'>Lab testing</a>, immunizations, and wellness support for employer programs</li></ul><h2>Why businesses choose Altmed</h2><p>Local companies need a clinic that understands hiring timelines, safety-sensitive roles, and the paperwork that keeps a workforce moving. Altmed supports small businesses, fleet operators, contractors, and other employers who want faster service and a more responsive local partner.</p><h2>Getting started</h2><p>If your company needs a single clinic for injury response, testing, and ongoing occupational health coordination, contact Altmed to discuss account setup, scheduling, and business-specific program needs.</p>",
    metaTitle: "Occupational Health Clinic Manassas | Workplace Injury & Drug Testing Services",
    metaDescription: "Occupational health clinic in Manassas, VA for injury care, physicals, DOT services, drug testing, breath alcohol testing, and employer wellness programs.",
    metaKeywords: "occupational health clinic Manassas, employer testing, workplace injury care, DOT physicals",
    featuredImage: legacyAssets.heroBackdrop
  },
  "dot-physical-manassas-va": {
    name: "DOT Physicals",
    heroContent:
      "<h1>DOT Physical Exams in Manassas, VA</h1><p>Fast, affordable CDL medical exams with FMCSA-aligned documentation, walk-in convenience, and practical support for drivers across Manassas and Northern Virginia.</p>",
    bodyContent:
      "<h2>Why drivers choose Altmed for a DOT physical</h2><p>The legacy DOT page focused on the same things most drivers care about: speed, predictable pricing, a certified provider, and paperwork done correctly the first time. We continue to support individual CDL drivers as well as employers who need a dependable local clinic for medical certification.</p><ul><li>FMCSA-aligned exam process with same-day documentation when you qualify</li><li>Walk-in friendly scheduling for drivers coming from Manassas, Gainesville, Bristow, Centreville, and nearby areas</li><li>Clear guidance if additional medical records or specialist clearance is needed</li></ul><h2>What is included in the exam</h2><ul><li>Medical history review and general physical exam</li><li>Vision and hearing screening</li><li>Blood pressure, pulse, and urinalysis for medical screening</li><li>Discussion of medications, chronic conditions, and related safety requirements</li></ul><h2>What to bring</h2><ul><li>Your CDL or photo ID</li><li>A current medication list</li><li>Glasses, contacts, or hearing aids if you use them</li><li>Any medical paperwork tied to diabetes, blood pressure, sleep apnea, cardiac history, or other clearance-related concerns</li></ul><h2>Walk-in convenience for busy schedules</h2><p>The archived page also emphasized flexible scheduling for drivers trying to fit an exam between shifts or routes. Altmed remains a practical local option for fast, straightforward DOT exams without unnecessary runaround.</p>",
    metaTitle: "DOT Physical in Manassas, VA | Walk-In CDL Exams Near You",
    metaDescription: "Need a DOT physical in Manassas, VA? Altmed provides FMCSA-compliant CDL exams with same-day options for commercial drivers.",
    metaKeywords: "DOT physical Manassas VA, CDL physical, FMCSA exam, medical card exam",
    featuredImage: legacyAssets.departmentFive
  },
  "occupational-health/drug-alcohol-testing-manassas": {
    name: "Drug and Alcohol Testing",
    heroContent:
      "<h1>Drug and Alcohol Testing in Manassas, VA</h1><p>Walk-in and employer-ready testing with DOT support, chain-of-custody procedures, and confidential handling for workplace, school, legal, and individual needs.</p>",
    bodyContent:
      "<h2>Why people in Manassas need drug and alcohol testing</h2><p>The scraped page made clear that this service is not just for large employers. It supports DOT-regulated workers, pre-employment candidates, school or legal requirements, probation-related monitoring, and employers who want safer workplaces with clear testing workflows.</p><h2>Testing services we offer</h2><ul><li>5-panel and 10-panel urine drug screens in rapid or lab-based formats</li><li>DOT and non-DOT testing for pre-employment, random, post-accident, and return-to-duty needs</li><li><a href='/services/occupational-health/breath-alcohol-test-manassas'>Breath alcohol testing</a> for regulated and workplace programs</li><li>Hair and oral-fluid options when requested or required</li><li>MRO coordination and lab confirmation workflows when a program requires formal review</li></ul><h2>What to expect at your visit</h2><p>Altmed keeps the process simple: check in with your paperwork, confirm the required test type, complete the collection under the right protocol, and receive either rapid results or lab processing based on the program. Confidentiality and documentation standards matter, especially for workplace testing.</p><h2>Built for employers and walk-ins</h2><p>This page remains especially relevant for HR teams, fleet managers, job candidates, and businesses that need consistent local support rather than a one-off collection site.</p>",
    metaTitle: "Drug and Alcohol Testing in Manassas, VA | Walk-In & DOT Testing",
    metaDescription: "Altmed offers drug and alcohol testing in Manassas, VA including pre-employment, random, post-accident, breath alcohol, and DOT-compliant programs.",
    metaKeywords: "drug and alcohol testing Manassas, DOT testing, breath alcohol testing, pre employment drug test",
    featuredImage: legacyAssets.heroDoctor
  },
  "occupational-health/workers-compensation-injury-care-manassas": {
    name: "Workers' Compensation",
    heroContent:
      "<h1>Workers' Compensation Injury Care in Manassas</h1><p>Same-day workplace injury evaluation, insurer-ready documentation, and return-to-work planning from a clinic that understands workers’ comp workflows.</p>",
    bodyContent:
      "<h2>Workers’ compensation care that starts with proper evaluation</h2><p>The legacy workers’ comp page emphasized that choosing the right medical provider shapes the entire recovery process. Altmed helps injured workers get assessed quickly, treated appropriately, and documented correctly for employers and carriers.</p><h2>What injuries may be covered</h2><ul><li>Immediate workplace accidents such as falls, strains, cuts, burns, or lifting injuries</li><li>Job-related injuries that happen while traveling or performing work off site</li><li>Repetitive-use or over-time injuries that develop through job demands</li><li>Approved follow-up care, testing, medications, and rehabilitation tied to the claim</li></ul><h2>What Altmed provides</h2><ul><li>Initial injury reports and progress notes</li><li>Work-capacity and return-to-work evaluations</li><li>Communication that supports insurance and employer documentation needs</li><li>Practical follow-up planning so treatment does not stall after the first visit</li></ul><h2>Why this matters</h2><p>Workers’ compensation cases often become harder when the medical side is poorly documented or delayed. Altmed aims to make the process clearer for the injured worker, the employer, and the insurance carrier.</p>",
    metaTitle: "Workers' Compensation for Injury Care | Medical Clinic | Same-Day Appointments",
    metaDescription: "Workers' compensation injury care in Manassas with same-day evaluation, documentation, and return-to-work support.",
    metaKeywords: "workers compensation Manassas, work injury clinic, occupational injury care, return to work evaluation",
    featuredImage: legacyAssets.heroClinic
  },
  "occupational-health/vaccinations-immunizations-manassas-va": {
    name: "Vaccinations & Immunizations",
    heroContent:
      "<h1>Vaccinations & Immunizations in Manassas</h1><p>Walk-in flu shots and routine immunizations for families, students, travelers, and workplace health programs in one convenient local clinic.</p>",
    bodyContent:
      "<h2>Why vaccines matter</h2><p>The archived vaccine page framed immunizations as one of the simplest ways to protect families, schools, and the broader community. That remains true whether you need a seasonal flu shot, a school-required vaccine, or a preventive travel discussion.</p><h2>Common vaccines offered</h2><ul><li>Influenza and seasonal flu shots</li><li>Tdap and school-entry vaccines</li><li>Hepatitis A and B</li><li>MMR, varicella, polio, and routine pediatric or adult immunization updates</li><li>Pneumococcal vaccines and selected travel-related immunizations when appropriate</li></ul><h2>How it works</h2><p>Walk in or schedule ahead, bring a photo ID and insurance card if available, and bring old vaccine records if you have them. Most vaccine visits are quick, and our team can help clarify what may be required for school, work, or travel.</p><h2>Who uses this service</h2><p>Families, students, healthcare workers, employers, and adults trying to stay current on preventive care all use this page. Altmed also supports occupational and employer vaccine needs as part of broader workplace health services.</p>",
    metaTitle: "Vaccinations & Immunizations Manassas VA | Walk-In Flu Shots",
    metaDescription: "Walk-in vaccinations and immunizations in Manassas, VA including flu shots and routine preventive vaccines at Altmed Medical Center.",
    metaKeywords: "vaccinations Manassas, flu shots Manassas, immunizations, vaccines near me",
    featuredImage: legacyAssets.clinicalMask
  },
  "occupational-health/pre-employment-physical": {
    name: "Pre-Employment Physicals",
    heroContent:
      "<h1>Pre-Employment Physicals in Manassas, VA</h1><p>Job-ready physical exams, screening, and workplace-focused medical testing for safety-sensitive and physically demanding roles.</p>",
    bodyContent:
      "<h2>What is a pre-employment physical?</h2><p>The legacy pre-employment page explained this service as a practical way for employers to confirm that candidates can safely handle the demands of a role. That is especially important in jobs with physical strain, driving responsibilities, public safety demands, or workplace safety requirements.</p><h2>What may be included</h2><ul><li>Basic vital signs such as blood pressure, pulse, and temperature</li><li>General physical exam covering heart, lungs, abdomen, skin, and musculoskeletal function</li><li>Vision, hearing, TB testing, and related occupational screening when needed</li><li>Drug and alcohol testing when required by the employer or role</li><li>Related lab work or paperwork tied to the position</li></ul><h2>How to prepare</h2><p>Bring employer paperwork, photo ID, current medication information, and any assistive devices such as glasses or hearing aids. If the employer has listed specific required tests, bringing that documentation helps us complete the visit efficiently.</p><h2>Why employers use this service</h2><p>These exams help support safer hiring, clearer job matching, and a healthier workplace culture. Altmed also supports businesses that need more than a one-time physical, including broader occupational health coordination.</p>",
    metaTitle: "Pre Employment Physical & Drug Test | Manassas, VA",
    metaDescription: "Pre-employment physicals and drug testing in Manassas, VA for employers and job candidates, including vision, hearing, vitals, and workplace screening.",
    metaKeywords: "pre employment physical Manassas, pre employment drug screening, occupational physical, job physical exam",
    featuredImage: legacyAssets.departmentThree
  },
  "occupational-health/lab-testing-manassas": {
    name: "Lab Testing",
    heroContent:
      "<h1>Lab Testing Services in Manassas, VA</h1><p>Walk-in lab work, blood testing, drug screening, and routine diagnostic support for patients, employers, and occupational health programs.</p>",
    bodyContent:
      "<h2>Why lab testing matters</h2><p>The scraped lab page positioned testing as one of the fastest ways to move from uncertainty to action. Patients use it for routine health checks, STD screening, workplace testing, hormone review, and many everyday diagnostic needs without the hassle of bouncing between separate locations.</p><h2>Types of lab tests offered</h2><ul><li>Blood panels such as CBC, metabolic panels, and lipid testing</li><li>Urinalysis and workplace drug screening</li><li>Hormone-related testing such as thyroid and testosterone support</li><li>Infectious disease and STD screening when appropriate</li><li>Occupational and employer testing tied to hiring or compliance workflows</li></ul><h2>Who comes to Altmed for lab work</h2><p>Families, students, teachers, commercial drivers, employers, and adults following up on routine or chronic-care needs all use this service. On-site coordination helps keep care more connected than sending every test out to a separate standalone location.</p><h2>What to bring</h2><p>Bring a photo ID, any provider or employer paperwork, and avoid overhydrating before a drug screen. Result timing varies by the type of test, with some results available quickly and others requiring formal lab processing.</p>",
    metaTitle: "Lab Testing in Manassas | Blood Work & Drug Screening",
    metaDescription: "On-site lab testing in Manassas, VA for blood work, urinalysis, drug screening, and clinical diagnostics at Altmed Medical Center.",
    metaKeywords: "lab testing Manassas, blood work Manassas, drug screening, urinalysis, lab tests near me",
    featuredImage: legacyAssets.heroDoctor
  },
  "occupational-health/breath-alcohol-test-manassas": {
    name: "Breath Alcohol Testing",
    heroContent:
      "<h1>Breath Alcohol Testing in Manassas, Virginia</h1><p>Fast, compliant breath alcohol testing for DOT programs, employers, post-accident evaluations, and other safety-sensitive screening needs.</p>",
    bodyContent:
      "<h2>What is a breath alcohol test?</h2><p>The older page described this test as a way to measure alcohol in exhaled air and estimate blood alcohol concentration. In occupational settings, it is used because it is fast, non-invasive, and useful for regulated programs that need immediate results.</p><h2>Why it is used</h2><ul><li>DOT and safety-sensitive compliance programs</li><li>Post-accident or reasonable-cause screening</li><li>Pre-employment, random, and employer-directed testing workflows</li><li>Court-ordered or policy-driven situations where formal collection standards matter</li></ul><h2>Accuracy and real-world factors</h2><p>The archived BAT page also noted that timing, recent alcohol exposure, some mouth products, smoking, and device calibration can affect readings. That is why professional testing standards matter more than consumer devices when results carry workplace or legal weight.</p><h2>What to expect</h2><p>The test itself is quick and painless. If there is any issue with the reading or program requirements call for additional confirmation, follow-up blood or urine testing may still be necessary.</p>",
    metaTitle: "Breath Alcohol Test Manassas | DOT & Workplace Testing – Altmed",
    metaDescription: "Breath alcohol testing in Manassas, VA for DOT compliance, workplace testing, post-accident evaluation, and employer programs.",
    metaKeywords: "breath alcohol test Manassas, BAT testing, DOT alcohol test, workplace alcohol screening",
    featuredImage: legacyAssets.heroBackdrop
  },
  "occupational-health/xray-service": {
    name: "X-Ray Services",
    heroContent: "<h1>X-Ray Services for Occupational Injury Care</h1><p>Diagnostic imaging support for work injuries and urgent musculoskeletal evaluations in Manassas.</p>",
    bodyContent:
      "<h2>Imaging Support When Injuries Need More Than Observation</h2><p>For workplace injuries and urgent musculoskeletal problems, timely imaging helps us move faster from evaluation to treatment planning. X-ray support is part of the broader occupational and urgent care workflow Altmed preserves from the legacy site.</p><h2>When X-Rays Help</h2><ul><li>Suspected sprains, strains, and fractures</li><li>Workplace accidents requiring documentation</li><li>Return-to-work planning after injury</li><li>Provider-directed follow-up for persistent pain</li></ul>",
    metaTitle: "X-Ray Service | Occupational Injury Care | Altmed Medical Center",
    metaDescription: "X-ray support for work injuries and urgent musculoskeletal evaluations in Manassas, VA through Altmed Medical Center.",
    metaKeywords: "x ray Manassas, occupational injury imaging, workplace injury xray, urgent care xray",
    featuredImage: legacyAssets.imagingScanner
  },
  "medical-weight-loss-manassas": {
    name: "Medical Weight Loss",
    heroContent:
      "<h1>Medical Weight Loss in Manassas, VA</h1><p>Physician-guided weight-loss care with semaglutide conversations, metabolic review, nutrition support, and structured follow-up.</p>",
    bodyContent:
      "<h2>A program built around more than a prescription</h2><p>The scraped weight-loss pages repeatedly stressed physician-led planning, body-composition review, and a broader approach than one-size-fits-all online medication services. We kept that structure while tightening the copy and removing overstated claims.</p><h2>What the program may include</h2><ul><li>Medical evaluation and discussion of weight history, habits, and related health concerns</li><li>Nutrition and activity planning tailored to real schedules and long-term goals</li><li>Semaglutide or other medication conversations when clinically appropriate</li><li>B-12 and lipotropic support as part of a broader, supervised plan</li><li>Regular follow-up to monitor progress, side effects, and strategy changes over time</li></ul><h2>Who the program is for</h2><p>Patients often come to Altmed after trying diet-only plans, short-term programs, or generic online weight-loss offers. This service is designed for people who want clearer guidance, more accountability, and physician involvement in the process.</p><h2>Important note</h2><p>Treatment decisions are individualized. The right plan depends on your history, symptoms, goals, and whether a medication-based approach makes sense for you.</p>",
    metaTitle: "Personalized Medical Weight Loss & Injections | Altmed Manassas, VA",
    metaDescription: "Medical weight loss in Manassas, VA with physician-guided plans, semaglutide options, B-12 injections, lipotropics, and lifestyle coaching.",
    metaKeywords: "medical weight loss Manassas, B12 injections, semaglutide Manassas, weight management clinic",
    featuredImage: legacyAssets.doctorsOverview
  },
  "functional-medicine-manassas": {
    name: "Functional Medicine",
    heroContent:
      "<h1>Functional Medicine in Manassas, VA</h1><p>Root-cause care for persistent symptoms, lifestyle patterns, and long-term wellness concerns that deserve a deeper look.</p>",
    bodyContent:
      "<h2>What functional medicine means at Altmed</h2><p>The archived functional-medicine content centered on a simple idea: instead of stopping at symptom management, look more carefully at why the pattern may be happening. This page keeps that message, but frames it in clearer, more grounded language.</p><h2>Patients often explore this service for</h2><ul><li>Chronic fatigue, low energy, or brain fog</li><li>Gut symptoms, food reactions, bloating, or constipation</li><li>Hormonal concerns, unexplained weight changes, and stress-related health patterns</li><li>Persistent issues that have not improved with a quick-treatment model alone</li></ul><h2>What your first visit may involve</h2><p>Expect a more detailed conversation about symptoms, routines, stress, sleep, nutrition, and past medical history. Depending on the situation, the plan may include targeted lab review, lifestyle changes, conventional medical treatment, supplements, or other evidence-informed next steps.</p><h2>How this fits with other care</h2><p>Functional medicine at Altmed is meant to complement, not replace, sound medical evaluation. It works best when patients want a more personalized and thorough conversation about chronic patterns that deserve more context.</p>",
    metaTitle: "Functional Medicine Manassas | Root-Cause Care – Altmed Medical Center",
    metaDescription: "Functional medicine in Manassas, VA focused on identifying root causes and building personalized wellness plans.",
    metaKeywords: "functional medicine Manassas, root cause care, chronic illness support, holistic medicine",
    featuredImage: legacyAssets.doctorThree
  },
  "suboxone-treatment-manassas": {
    name: "Suboxone Treatment",
    heroContent:
      "<h1>Suboxone Treatment in Manassas</h1><p>Confidential, compassionate addiction care with evidence-based support for recovery and follow-up planning.</p>",
    bodyContent:
      "<h2>Respectful care for people who need help now</h2><p>The legacy Suboxone page had a strong local, human tone. We preserved the urgency and compassion while removing language that could feel overly sensational. Altmed offers confidential addiction care for people seeking support with opioid use disorder and recovery planning.</p><h2>What patients can expect</h2><ul><li>Private consultations with a respectful, non-judgmental approach</li><li>Discussion of medication-assisted treatment, including Suboxone, when clinically appropriate</li><li>Same-day access when scheduling allows and telehealth follow-up for eligible established patients</li><li>Ongoing check-ins designed to support safety, stability, and long-term recovery goals</li></ul><h2>What to do next</h2><p>If you or a loved one is looking for help, call Altmed for a private consultation. Medication questions and treatment planning should be handled directly with the clinical team rather than through general website guidance.</p>",
    metaTitle: "Suboxone Treatment in Manassas | Suboxone Doctor at Altmed",
    metaDescription: "Confidential Suboxone treatment and addiction management in Manassas, VA with compassionate, evidence-based care.",
    metaKeywords: "Suboxone treatment Manassas, addiction management, opioid recovery, suboxone doctor",
    featuredImage: legacyAssets.heroDoctor
  },
  "third-party-administrator-service-manassas": {
    name: "TPA Services",
    heroContent:
      "<h1>TPA Services in Manassas</h1><p>Third-party administrator support for employer drug-testing programs, random pools, and DOT or non-DOT compliance workflows.</p>",
    bodyContent:
      "<h2>Program administration that keeps employers organized</h2><p>The scraped TPA content was aimed squarely at employers that do not want to manage random pools, compliance reminders, documentation, and vendor coordination on their own. This page keeps that operational focus and makes it easier to understand what Altmed can take off your plate.</p><h2>TPA services can include</h2><ul><li>Random testing pool management and selection workflows</li><li>Chain-of-custody coordination and result tracking</li><li>MRO coordination for reviewed results</li><li>DOT and non-DOT testing program administration</li><li>Annual MIS support, policy guidance, and supervisor resource coordination</li></ul><h2>Who this helps most</h2><p>Fleets, transportation companies, construction teams, logistics groups, and other safety-sensitive employers often need a more structured partner than a one-off testing clinic. Altmed supports those longer-term program needs with a local point of contact.</p>",
    metaTitle: "TPA Services in Manassas | Employer Drug Testing & Compliance",
    metaDescription: "Third-party administrator services in Manassas, VA for employer drug testing, DOT compliance, random pools, and occupational health program support.",
    metaKeywords: "TPA services Manassas, third party administrator service, employer drug testing, DOT compliance",
    featuredImage: legacyAssets.doctorOne
  },
  "mro-services-manassas": {
    name: "MRO Services",
    heroContent:
      "<h1>MRO Services in Manassas, VA</h1><p>Medical Review Officer support for fair, compliant workplace and DOT drug-testing programs.</p>",
    bodyContent:
      "<h2>Review, privacy, and program integrity</h2><p>The legacy MRO page positioned this service as the safeguard that helps keep workplace and DOT testing both fair and compliant. Medical Review Officer support matters when an employer needs more than a raw test result and wants medically informed review built into the process.</p><h2>How MRO support helps</h2><ul><li>Identifies legitimate medical explanations when further review is required</li><li>Supports employer and TPA confidence in regulated testing programs</li><li>Protects privacy while preserving reporting and compliance standards</li><li>Helps connect test collection, lab review, and employer communication into one cleaner workflow</li></ul><h2>Best fit for</h2><p>This service is especially useful for employers already running formal drug-testing programs or building one with Altmed’s broader occupational health and TPA support.</p>",
    metaTitle: "MRO Services Manassas | DOT Drug Test Review",
    metaDescription: "Medical Review Officer services in Manassas for DOT and workplace drug-testing compliance.",
    metaKeywords: "MRO services Manassas, medical review officer, DOT drug test review",
    featuredImage: legacyAssets.doctorFour
  },
  "corporate-wellness-programs-manassas": {
    name: "Corporate Wellness Programs",
    heroContent: "<h1>Corporate Wellness Programs in Manassas</h1><p>Onsite health fairs, screenings, and wellness planning for local employers.</p>",
    bodyContent:
      "<h2>Bring wellness into the workplace in a practical way</h2><p>The scraped corporate wellness content framed these programs as a way for employers to support health, morale, and retention without relying only on generic HR materials. Altmed helps businesses create local wellness support that employees will actually use.</p><h2>What we offer</h2><ul><li>Health fairs, blood pressure and BMI screenings, and preventive check-in events</li><li>Flu shot clinics and seasonal health campaigns</li><li>Nutrition, stress-management, and wellness education sessions</li><li>One-time events or longer-term support tied to broader occupational services</li></ul><h2>Why employers use this service</h2><p>Wellness programs can support absenteeism reduction, employee engagement, and a stronger workplace culture. They also fit naturally alongside Altmed’s occupational health, employer testing, and preventive care services.</p>",
    metaTitle: "Corporate Wellness Programs in Manassas | Onsite Health Fairs",
    metaDescription: "Corporate wellness programs and onsite health fairs in Manassas, VA for employers, schools, and HR teams.",
    metaKeywords: "corporate wellness programs Manassas, health fairs, employer wellness, onsite screenings",
    featuredImage: legacyAssets.heroBackdrop
  }
};

export const serviceExperienceContent: Record<
  string,
  {
    eyebrow: string;
    keyPoints: string[];
    stats: Array<{ value: string; label: string }>;
    featureSections: Array<{
      title: string;
      body: string;
      points: string[];
      image: string;
    }>;
  }
> = {
  "urgent-care-manassas-va": {
    eyebrow: "Walk-In Urgent Care",
    keyPoints: [
      "Same-day care for minor illness, injuries, infections, and sudden symptoms",
      "Board-certified medical leadership with a more personal clinic experience",
      "Helpful for families across Manassas, Sudley, Gainesville, and nearby communities"
    ],
    stats: [
      { value: "Same Day", label: "Walk-in availability" },
      { value: "Mon-Fri", label: "Convenient clinic hours" },
      { value: "Local", label: "Manassas-based care" }
    ],
    featureSections: [
      {
        title: "Fast care for the health issues that should not wait",
        body:
          "When a fever spikes, a throat becomes painful overnight, or a sprain starts swelling before work, you need answers quickly. Altmed is designed to bridge the gap between routine primary care and the emergency room for non-life-threatening concerns.",
        points: [
          "Respiratory illness, sinus symptoms, sore throat, flu-like concerns, and infections",
          "Minor burns, sprains, strains, cuts, rashes, and sports-related injuries",
          "Quick access for patients who need care now rather than next week"
        ],
        image: legacyAssets.heroClinic
      },
      {
        title: "A more personal alternative to big-box urgent care",
        body:
          "Patients choose Altmed because the experience feels practical and attentive. We focus on clear next steps, affordable same-day access, and treatment plans that fit real life rather than rushing people through a generic visit.",
        points: [
          "Clear guidance on what can be treated in urgent care versus what needs the ER",
          "Convenient follow-up planning when a patient also needs primary care support",
          "A local clinic identity that helps build trust with returning patients"
        ],
        image: legacyAssets.heroDoctor
      }
    ]
  },
  "primary-care-manassas-va": {
    eyebrow: "Family Medicine & Prevention",
    keyPoints: [
      "Primary care for preventive visits, routine checkups, and chronic conditions",
      "Accepting families, adults, seniors, and patients seeking a new long-term doctor",
      "Built around continuity, not one-off visits"
    ],
    stats: [
      { value: "All Ages", label: "Family-focused care" },
      { value: "Preventive", label: "Screening and wellness focus" },
      { value: "Ongoing", label: "Chronic disease support" }
    ],
    featureSections: [
      {
        title: "Primary care that feels connected, not fragmented",
        body:
          "A strong primary care relationship helps patients avoid preventable complications, stay on top of screenings, and make sense of multiple health concerns over time. Altmed brings routine care, preventive planning, and follow-up support together in one local clinic.",
        points: [
          "Annual exams, medication review, preventive counseling, and referrals",
          "Support for diabetes, blood pressure, thyroid concerns, and everyday health maintenance",
          "A practical option for new patients who want easier access in Manassas"
        ],
        image: legacyAssets.departmentThree
      },
      {
        title: "Designed for real life in Northern Virginia",
        body:
          "Life is busy, and a good primary care clinic should reduce stress rather than add to it. We pair relationship-based family medicine with same-day access options when patients need to be seen sooner.",
        points: [
          "Helpful for busy parents, working adults, and seniors managing multiple priorities",
          "Personalized discussions around nutrition, preventive health, and long-term goals",
          "Care coordination that connects urgent care visits back into a longer-term plan"
        ],
        image: legacyAssets.aboutPhoto
      }
    ]
  },
  "occupational-health-clinic-manassas": {
    eyebrow: "Employer & Workforce Health",
    keyPoints: [
      "Occupational health support for local employers, regulated workers, and job candidates",
      "Built around compliance, documentation, and efficient return-to-work planning",
      "A strong differentiator for businesses in Manassas and Prince William County"
    ],
    stats: [
      { value: "DOT", label: "Physicals and compliance" },
      { value: "B2B", label: "Employer partnerships" },
      { value: "Rapid", label: "Injury and testing workflows" }
    ],
    featureSections: [
      {
        title: "One clinic for testing, injury care, and workforce readiness",
        body:
          "Occupational medicine works best when employers have a reliable local partner instead of juggling separate vendors for physicals, testing, injury visits, and documentation. Altmed combines those services in one place.",
        points: [
          "Employer-based testing, DOT exams, breath alcohol testing, and lab support",
          "Workers' compensation evaluation and return-to-work communication",
          "Preventive screenings, vaccines, and workforce wellness planning"
        ],
        image: legacyAssets.heroBackdrop
      },
      {
        title: "Built for both urgent issues and ongoing employer programs",
        body:
          "Some businesses need help after an injury happens. Others need a clinic that can support hiring, compliance, annual physicals, and long-term workforce health strategy. Altmed supports both sides of that equation.",
        points: [
          "Useful for transportation, construction, logistics, retail, and office teams",
          "Faster workflows that help reduce delays for employees and supervisors",
          "Straightforward communication with employers about next steps and restrictions"
        ],
        image: legacyAssets.doctorFour
      }
    ]
  },
  "dot-physical-manassas-va": {
    eyebrow: "FMCSA Driver Exams",
    keyPoints: [
      "DOT physicals for CDL drivers and regulated transportation workers",
      "Convenient same-day options and clear guidance on documentation",
      "Structured to help drivers move through the process without confusion"
    ],
    stats: [
      { value: "FMCSA", label: "Compliance-aware workflows" },
      { value: "CDL", label: "Driver-focused exams" },
      { value: "Same Day", label: "Fast scheduling options" }
    ],
    featureSections: [
      {
        title: "What a DOT physical includes",
        body:
          "The goal of a DOT exam is to determine whether a commercial driver is medically qualified to operate safely. That means looking at vision, hearing, blood pressure, urinalysis, medical history, and any condition that may affect safe driving.",
        points: [
          "Vision and hearing review",
          "Blood pressure, pulse, urinalysis, and general physical exam",
          "Medical history review with attention to documentation that may be needed for clearance"
        ],
        image: legacyAssets.departmentThree
      },
      {
        title: "Come prepared and avoid unnecessary delays",
        body:
          "Drivers often save time by arriving with medication lists, corrective lenses, and any supporting paperwork related to ongoing conditions. We focus on a smooth process because we know delays can affect routes, renewals, and work schedules.",
        points: [
          "Bring your CDL or photo ID and any required medical documentation",
          "Have a current medication list available",
          "If you use corrective lenses or hearing devices, bring them to the exam"
        ],
        image: legacyAssets.heroDoctor
      }
    ]
  },
  "occupational-health/drug-alcohol-testing-manassas": {
    eyebrow: "Employer & DOT Testing",
    keyPoints: [
      "Pre-employment, random, post-accident, and return-to-duty testing support",
      "Useful for employers, regulated workers, and individuals with required screening needs",
      "Built around compliance, confidentiality, and clear process handling"
    ],
    stats: [
      { value: "DOT", label: "Compliance-aware workflows" },
      { value: "Rapid", label: "Straightforward collection process" },
      { value: "Confidential", label: "Professional result handling" }
    ],
    featureSections: [
      {
        title: "Testing programs that employers can actually rely on",
        body:
          "Drug and alcohol testing is not just about the collection itself. Employers need a process that is documented correctly, easy to schedule, and consistent with workplace or DOT requirements. That is where a clinic-based occupational partner becomes valuable.",
        points: [
          "Pre-employment, random, post-accident, reasonable-cause, and return-to-duty support",
          "Helps employers keep hiring and compliance workflows moving",
          "Useful for local transportation, logistics, construction, and safety-sensitive roles"
        ],
        image: legacyAssets.heroBackdrop
      },
      {
        title: "Clear handling for both employers and individual patients",
        body:
          "Some people need a one-time test. Others are part of a larger employer program. In both cases, the process should feel organized, respectful, and easy to understand from start to finish.",
        points: [
          "Chain-of-custody awareness and professional collection standards",
          "Urine, oral-fluid, and alcohol-related workflows as needed",
          "A local option for patients who do not want the friction of a distant testing center"
        ],
        image: legacyAssets.departmentThree
      }
    ]
  },
  "occupational-health/workers-compensation-injury-care-manassas": {
    eyebrow: "Work Injury Evaluation",
    keyPoints: [
      "Same-day evaluation support for work-related injuries",
      "Documentation and return-to-work planning that employers and insurers need",
      "Focused on treatment, progress, and practical next steps"
    ],
    stats: [
      { value: "Same Day", label: "New injury access" },
      { value: "RTW", label: "Return-to-work planning" },
      { value: "Claims", label: "Documentation support" }
    ],
    featureSections: [
      {
        title: "Work injury care that balances treatment and paperwork",
        body:
          "Workers' compensation visits are different from ordinary urgent care. Patients need medical treatment, but employers and carriers also need timely documentation, work restrictions, and updates that support the claim process. Altmed is set up to handle both.",
        points: [
          "Immediate injury assessment and documentation",
          "Communication around restrictions, progress, and next steps",
          "Support for getting employees back to work safely rather than prematurely"
        ],
        image: legacyAssets.doctorOne
      },
      {
        title: "A practical local choice for injured workers",
        body:
          "Patients dealing with work injuries often want fast care close to home, without being sent through a fragmented process. Our role is to reduce confusion, help recovery move forward, and keep communication clearer for everyone involved.",
        points: [
          "Useful for acute injuries, repetitive-stress concerns, and follow-up visits",
          "Helps align treatment planning with workplace expectations",
          "Supports both the employee’s recovery and the employer’s operational needs"
        ],
        image: legacyAssets.heroClinic
      }
    ]
  },
  "occupational-health/vaccinations-immunizations-manassas-va": {
    eyebrow: "Walk-In Vaccination Access",
    keyPoints: [
      "Flu shots and routine vaccines for families, students, travelers, and employees",
      "Helpful for school compliance, preventive care, and seasonal protection",
      "Built around convenience for busy local patients"
    ],
    stats: [
      { value: "Walk-In", label: "Flu shot convenience" },
      { value: "Family", label: "School and routine vaccine needs" },
      { value: "Workplace", label: "Employer wellness support" }
    ],
    featureSections: [
      {
        title: "Simple vaccine access for everyday preventive care",
        body:
          "Vaccinations are one of the easiest ways to protect families, schools, and workplaces from preventable illness. Altmed keeps the process simple for patients who need fast access without the friction of a complicated appointment flow.",
        points: [
          "Useful for school requirements, seasonal flu protection, and routine adult updates",
          "Relevant for students, working adults, families, and seniors",
          "Can also support employer wellness and compliance-focused needs"
        ],
        image: legacyAssets.clinicalMask
      },
      {
        title: "Built for local convenience in Manassas",
        body:
          "Patients often choose vaccine services based on convenience as much as clinical need. That means clear guidance, easy clinic access, and a team that can explain what records or coverage details to bring.",
        points: [
          "Appointments preferred, but walk-ins supported when possible",
          "Helpful for school, work, and seasonal health planning",
          "Encourages patients to call ahead for vaccine-specific availability"
        ],
        image: legacyAssets.heroClinic
      }
    ]
  },
  "occupational-health/pre-employment-physical": {
    eyebrow: "Hiring & Readiness Screening",
    keyPoints: [
      "Pre-employment physicals for roles with medical, physical, or safety-sensitive requirements",
      "Supports employers who need reliable screening without unnecessary delays",
      "Useful for both job candidates and workforce onboarding workflows"
    ],
    stats: [
      { value: "Hiring", label: "Job-readiness screening" },
      { value: "Screened", label: "Drug/alcohol options available" },
      { value: "Employer", label: "Paperwork-aware process" }
    ],
    featureSections: [
      {
        title: "A smoother screening process for employers and candidates",
        body:
          "Pre-employment physicals help confirm that a candidate can safely handle the demands of a job. The exact requirements vary by role, but the broader goal is the same: reduce hiring risk while keeping the process efficient.",
        points: [
          "Can include vitals, musculoskeletal review, vision, hearing, and lab-related testing",
          "Useful for physically demanding, regulated, or safety-sensitive positions",
          "Employer paperwork and job-specific requirements can be incorporated into the visit"
        ],
        image: legacyAssets.departmentThree
      },
      {
        title: "Prepared visits lead to fewer delays",
        body:
          "Candidates can often avoid rework by bringing employer forms, ID, medication lists, and any required assistive devices to the exam. We emphasize a clean process because hiring timelines matter to both employers and applicants.",
        points: [
          "Supports a better handoff from recruitment into onboarding",
          "Can be paired with drug screening and related occupational services",
          "Part of the broader employer-services infrastructure at Altmed"
        ],
        image: legacyAssets.heroDoctor
      }
    ]
  },
  "occupational-health/lab-testing-manassas": {
    eyebrow: "Clinical & Occupational Lab Support",
    keyPoints: [
      "On-site lab support for routine medical concerns, occupational medicine, and screening needs",
      "Useful for both individual patients and employer-related workflows",
      "Designed to reduce friction and keep the visit streamlined"
    ],
    stats: [
      { value: "On-Site", label: "Lab convenience" },
      { value: "Clinical", label: "Routine and urgent testing" },
      { value: "Workplace", label: "Screening support" }
    ],
    featureSections: [
      {
        title: "Lab access that supports real clinical decision-making",
        body:
          "Fast access to lab services helps patients and providers move from questions to action more quickly. Whether the concern is routine blood work, urgent-care follow-up, or employer-related screening, having testing tied to the clinic workflow improves clarity.",
        points: [
          "Blood testing, urinalysis, and general clinical support",
          "Drug-screen and occupational-health related lab workflows",
          "Useful for both routine and problem-focused visits"
        ],
        image: legacyAssets.departmentThree
      },
      {
        title: "Practical for patients who want fewer extra stops",
        body:
          "One reason patients appreciate integrated lab support is simple: it reduces friction. Instead of being sent elsewhere for every next step, much of the testing conversation can stay connected to the same clinic visit.",
        points: [
          "Helpful for urgent care, primary care, and occupational follow-up",
          "Supports a more connected patient experience",
          "Makes it easier to move from testing to treatment planning"
        ],
        image: legacyAssets.clinicalMask
      }
    ]
  },
  "occupational-health/breath-alcohol-test-manassas": {
    eyebrow: "Alcohol Screening Support",
    keyPoints: [
      "Breath alcohol testing for DOT, post-accident, and workplace policy needs",
      "Fast, compliant handling for time-sensitive situations",
      "Useful for employers, safety-sensitive workers, and required screenings"
    ],
    stats: [
      { value: "BAT", label: "Breath alcohol workflow" },
      { value: "DOT", label: "Regulated program support" },
      { value: "Fast", label: "Quick test process" }
    ],
    featureSections: [
      {
        title: "A quick test with real compliance implications",
        body:
          "Breath alcohol testing may be simple physically, but it still needs to be handled correctly when the result has workplace or regulatory consequences. Altmed supports that process with a clinic-based setting designed for speed and professionalism.",
        points: [
          "Useful for post-accident, random, and policy-driven testing situations",
          "Relevant for DOT and other safety-sensitive programs",
          "Built to reduce friction when employers need answers promptly"
        ],
        image: legacyAssets.heroBackdrop
      },
      {
        title: "Why employers want a dependable local option",
        body:
          "Time matters in alcohol testing scenarios. A nearby clinic that understands employer workflows can help reduce delays, confusion, and unnecessary downtime when testing is required.",
        points: [
          "Helpful for companies managing transportation, construction, or regulated roles",
          "Supports better coordination with broader occupational services",
          "Can be part of a larger employer testing and compliance relationship"
        ],
        image: legacyAssets.heroDoctor
      }
    ]
  },
  "medical-weight-loss-manassas": {
    eyebrow: "Medical Weight Loss & GLP-1 Support",
    keyPoints: [
      "Physician-supervised plans that combine nutrition, monitoring, and treatment options",
      "GLP-1 and semaglutide conversations handled in a clinical, individualized way",
      "Focused on realistic progress rather than short-term crash plans"
    ],
    stats: [
      { value: "GLP-1", label: "Semaglutide discussions when appropriate" },
      { value: "B-12", label: "Injection support options" },
      { value: "Structured", label: "Ongoing physician monitoring" }
    ],
    featureSections: [
      {
        title: "Weight loss support built around your full health picture",
        body:
          "Sustainable weight loss usually requires more than a generic handout. Altmed approaches metabolic health through medical review, lifestyle coaching, progress tracking, and evidence-based options that can include GLP-1 medications such as semaglutide when clinically appropriate for patients in Manassas and nearby Prince William County communities.",
        points: [
          "Medical evaluation, body-weight trends, and health-history review",
          "Nutrition support and realistic activity planning",
          "Medication conversations handled under physician supervision rather than guesswork"
        ],
        image: legacyAssets.doctorTwo
      },
      {
        title: "A better fit for patients comparing GLP-1 options in Manassas",
        body:
          "Many patients searching for semaglutide or GLP-1 care are not just looking for a prescription. They want guidance, monitoring, and a plan that makes sense for work, family life, appetite changes, and long-term follow-up. That is why we frame this service as physician-supervised medical weight loss, not a quick online order form.",
        points: [
          "Ideal for patients who want medical oversight instead of one-size-fits-all programs",
          "Can be paired with B-12 or lipotropic support as part of a larger plan",
          "Designed to help patients understand next steps before they commit"
        ],
        image: legacyAssets.heroDoctor
      }
    ]
  },
  "functional-medicine-manassas": {
    eyebrow: "Root-Cause, Whole-Patient Care",
    keyPoints: [
      "Longer-form conversations around fatigue, gut health, hormones, and persistent symptoms",
      "A science-based, whole-body lens rather than symptom-only treatment",
      "Designed to complement rather than replace core medical care"
    ],
    stats: [
      { value: "Longer", label: "More detailed visits" },
      { value: "Personalized", label: "Lifestyle-focused planning" },
      { value: "Holistic", label: "Root-cause mindset" }
    ],
    featureSections: [
      {
        title: "When patients want deeper answers",
        body:
          "Functional medicine can be a strong fit for patients dealing with fatigue, digestive issues, hormone concerns, or chronic symptoms that never seem fully explained. The emphasis is on patterns, history, lifestyle, and a broader understanding of what may be driving symptoms.",
        points: [
          "Detailed history-taking and lifestyle review",
          "Discussion of nutrition, sleep, stress, and other health patterns",
          "Care planning that complements ongoing primary or specialty care"
        ],
        image: legacyAssets.doctorThree
      },
      {
        title: "Personalized plans rather than generic advice",
        body:
          "Patients often seek functional medicine because they want to feel heard and want a more individualized strategy. Our goal is to help translate symptoms, history, and testing into a plan that feels specific to the person sitting in front of us.",
        points: [
          "Useful for chronic fatigue, brain fog, digestive discomfort, and metabolic concerns",
          "Health coaching and follow-up can help make recommendations practical",
          "Built for patients who want a thoughtful, prevention-aware conversation"
        ],
        image: legacyAssets.aboutPhoto
      }
    ]
  },
  "suboxone-treatment-manassas": {
    eyebrow: "Confidential Addiction Care",
    keyPoints: [
      "Compassionate, non-judgmental care led by a physician with addiction-medicine expertise",
      "Suboxone treatment and follow-up support for people seeking recovery",
      "In-person and telehealth follow-up options when appropriate"
    ],
    stats: [
      { value: "Confidential", label: "Respectful local care" },
      { value: "MAT", label: "Evidence-based treatment support" },
      { value: "Follow-Up", label: "Ongoing recovery check-ins" }
    ],
    featureSections: [
      {
        title: "A recovery conversation grounded in dignity and practical support",
        body:
          "People looking for Suboxone treatment are often overwhelmed, worried about stigma, and unsure where to start. Altmed approaches addiction care with discretion, compassion, and a clear plan for what happens next.",
        points: [
          "Board-certified addiction-medicine leadership",
          "Medication-assisted treatment support when clinically appropriate",
          "A clinic environment designed to be respectful, local, and accessible"
        ],
        image: legacyAssets.heroDoctor
      },
      {
        title: "Support that fits real life",
        body:
          "Recovery has to work in the context of jobs, transportation, family responsibilities, and follow-up needs. That is why we emphasize clear communication, realistic planning, and continuity rather than a rushed or transactional experience.",
        points: [
          "Useful for patients who need a first step and do not know what to expect",
          "Telehealth follow-up can reduce barriers for some ongoing visits",
          "Focused on stabilizing care and helping patients rebuild momentum"
        ],
        image: legacyAssets.doctorsOverview
      }
    ]
  },
  "third-party-administrator-service-manassas": {
    eyebrow: "Employer Compliance Support",
    keyPoints: [
      "TPA support for DOT and non-DOT employer programs",
      "Helps businesses manage random pools, documentation, and testing workflows",
      "Built for employers who want a dependable local medical partner"
    ],
    stats: [
      { value: "DOT", label: "Program support" },
      { value: "Pools", label: "Random testing coordination" },
      { value: "Local", label: "Manassas-based partner" }
    ],
    featureSections: [
      {
        title: "Take administrative burden off your team",
        body:
          "Many employers do not need another generic vendor. They need someone who can help coordinate testing, documentation, and program requirements without creating more administrative friction. That is the role Altmed’s TPA support is built to fill.",
        points: [
          "Program administration for safety-sensitive and workplace drug-testing needs",
          "Useful for transportation, logistics, construction, and similar employers",
          "Supports a smoother relationship between compliance requirements and day-to-day operations"
        ],
        image: legacyAssets.doctorOne
      },
      {
        title: "Designed to work alongside occupational health and MRO workflows",
        body:
          "Because TPA support, occupational medicine, DOT exams, testing, and MRO review often overlap, employers benefit from working with a clinic that understands how those pieces connect rather than treating them as separate silos.",
        points: [
          "Pairs naturally with drug testing, breath alcohol testing, and DOT physicals",
          "Helpful for employers who want one point of contact where possible",
          "Supports both compliance and employee workflow efficiency"
        ],
        image: legacyAssets.heroBackdrop
      }
    ]
  },
  "mro-services-manassas": {
    eyebrow: "Medical Review Officer Support",
    keyPoints: [
      "MRO review helps protect the integrity and fairness of workplace drug-testing programs",
      "Important for DOT and safety-sensitive employers who need compliant result interpretation",
      "Useful when a positive or unclear test result needs expert medical review"
    ],
    stats: [
      { value: "Review", label: "Result verification" },
      { value: "Privacy", label: "Confidential handling" },
      { value: "Compliance", label: "Employer program support" }
    ],
    featureSections: [
      {
        title: "Why MRO review matters",
        body:
          "A Medical Review Officer helps ensure that drug-testing results are handled accurately, fairly, and in line with program requirements. That matters because some positive results may have legitimate medical explanations that should be reviewed before an employer makes a decision.",
        points: [
          "Supports quality assurance in drug-testing programs",
          "Protects confidentiality while clarifying result interpretation",
          "Useful for DOT, transportation, and other regulated employers"
        ],
        image: legacyAssets.doctorFour
      },
      {
        title: "Part of a broader employer-services system",
        body:
          "MRO support becomes even more useful when it is connected to local collection, TPA support, DOT services, and occupational workflows. Employers benefit when those pieces work together instead of being scattered across multiple vendors.",
        points: [
          "Pairs with TPA administration and workplace testing",
          "Helps businesses keep compliance programs organized",
          "Offers a more complete local solution for employer health operations"
        ],
        image: legacyAssets.doctorOne
      }
    ]
  },
  "corporate-wellness-programs-manassas": {
    eyebrow: "Wellness Programs & Health Fairs",
    keyPoints: [
      "Corporate wellness support for employers, schools, and local organizations",
      "Useful for onsite screenings, preventive education, and health-engagement events",
      "Built to help businesses create a healthier, more resilient workforce culture"
    ],
    stats: [
      { value: "Onsite", label: "Health fair support" },
      { value: "Preventive", label: "Wellness-focused programming" },
      { value: "Custom", label: "Programs tailored to employers" }
    ],
    featureSections: [
      {
        title: "Bring wellness into the workplace in a practical way",
        body:
          "Corporate wellness should not feel like a generic HR checkbox. The most effective programs are useful, relevant, and built around the needs of the people actually showing up to work each day. Altmed helps employers bring screening, education, prevention, and health-fair support into that environment for local teams across Manassas and Prince William County.",
        points: [
          "Health fairs, blood pressure checks, vaccine support, and wellness education",
          "Can include nutrition, stress, burnout, fitness, and preventive-health topics",
          "Useful for one-time events or longer-term wellness planning"
        ],
        image: legacyAssets.heroBackdrop
      },
      {
        title: "A stronger retention and culture story for employers",
        body:
          "Wellness programming is not just about reducing risk. It also signals to employees that their health matters. That can support morale, retention, and a stronger internal culture, especially when the program feels well organized and locally accessible.",
        points: [
          "Useful for employers trying to reduce absenteeism and support workforce health",
          "Can be paired with occupational testing and preventive services",
          "Built for local employers who want a flexible, clinic-based partner"
        ],
        image: legacyAssets.doctorTwo
      }
    ]
  }
};

export const servicePageFaqs: Record<
  string,
  Array<{
    question: string;
    answer: string;
  }>
> = {
  "urgent-care-manassas-va": [
    {
      question: "Do I need an appointment for urgent care in Manassas?",
      answer:
        "No. Walk-ins are welcome for many urgent care visits, although calling ahead or booking online can help reduce waiting when the schedule is busy."
    },
    {
      question: "What conditions can your urgent care clinic treat?",
      answer:
        "Altmed commonly sees fevers, sore throats, colds, flu-like illness, ear and sinus infections, UTIs, rashes, minor burns, sprains, strains, and other non-emergency concerns."
    },
    {
      question: "When should I go to the ER instead of urgent care?",
      answer:
        "Call 911 or go to the nearest emergency room for chest pain, stroke symptoms, severe shortness of breath, uncontrolled bleeding, major trauma, or loss of consciousness."
    }
  ],
  "primary-care-manassas-va": [
    {
      question: "Is Altmed accepting new primary care patients in Manassas?",
      answer:
        "Yes. Altmed accepts new patients for routine primary care, preventive visits, annual physicals, and chronic-condition follow-up."
    },
    {
      question: "What does a primary care visit usually include?",
      answer:
        "A primary care visit may include medical history review, medication discussion, preventive counseling, chronic-condition follow-up, lab or screening recommendations, and next-step planning."
    },
    {
      question: "Can I come here for both urgent issues and long-term care?",
      answer:
        "Yes. One of Altmed’s strengths is combining same-day care with longer-term follow-up so patients do not have to start over with a different clinic after every visit."
    }
  ],
  "occupational-health-clinic-manassas": [
    {
      question: "What does your occupational health clinic help employers with?",
      answer:
        "Altmed supports employers with DOT physicals, drug and alcohol testing, workers' compensation injury care, pre-employment physicals, vaccinations, lab work, and return-to-work documentation."
    },
    {
      question: "Can my company set up an employer account with Altmed?",
      answer:
        "Yes. Employers can contact the clinic to discuss account setup, recurring testing needs, workforce screenings, and broader occupational health support."
    },
    {
      question: "Do you help with workplace injuries?",
      answer:
        "Yes. Altmed provides same-day evaluation for many workplace injuries, along with work-status documentation and follow-up planning."
    }
  ],
  "dot-physical-manassas-va": [
    {
      question: "What should I bring to my DOT physical?",
      answer:
        "Bring a photo ID or CDL, your current medication list, and any medical paperwork related to blood pressure, diabetes, sleep apnea, cardiac history, or other ongoing conditions."
    },
    {
      question: "Do you offer walk-in DOT physicals?",
      answer:
        "Yes. Walk-in access is often available, but scheduling ahead can help drivers get through the process faster."
    },
    {
      question: "How long does a DOT physical take?",
      answer:
        "Most DOT visits are straightforward and move quickly, but timing can vary if additional medical records or specialist clearance are needed."
    }
  ],
  "occupational-health/drug-alcohol-testing-manassas": [
    {
      question: "Do you offer DOT and non-DOT drug testing?",
      answer:
        "Yes. Altmed supports DOT and non-DOT drug-testing workflows for employers, regulated workers, and individuals with required screening needs."
    },
    {
      question: "What types of drug testing are available?",
      answer:
        "Depending on the program, testing may include urine drug screens, rapid or lab-based panels, oral-fluid options, and breath alcohol testing."
    },
    {
      question: "Can employers use Altmed for random and post-accident testing?",
      answer:
        "Yes. Altmed supports pre-employment, random, post-accident, reasonable-cause, and return-to-duty testing programs."
    }
  ],
  "occupational-health/workers-compensation-injury-care-manassas": [
    {
      question: "Can I come to Altmed right after a workplace injury?",
      answer:
        "Yes. Altmed provides same-day evaluation for many work injuries and can help document the visit for the employer and insurance workflow."
    },
    {
      question: "Will I get return-to-work paperwork?",
      answer:
        "Yes. When appropriate, Altmed can provide work-status notes, restrictions, and follow-up documentation to support return-to-work planning."
    },
    {
      question: "What kinds of work injuries do you commonly see?",
      answer:
        "Common visits include strains, sprains, lifting injuries, falls, repetitive-use concerns, cuts, burns, and other non-emergency job-related injuries."
    }
  ],
  "occupational-health/vaccinations-immunizations-manassas-va": [
    {
      question: "Do you offer walk-in flu shots in Manassas?",
      answer:
        "Yes. Walk-in vaccine access may be available depending on supply and schedule, and calling ahead is helpful for vaccine-specific availability."
    },
    {
      question: "Can adults and children both get vaccines here?",
      answer:
        "Altmed supports many routine vaccine needs for adults, students, families, and workplace programs, with guidance based on age and purpose."
    },
    {
      question: "What should I bring for a vaccine visit?",
      answer:
        "Bring a photo ID, insurance card if available, and any prior immunization records that may help confirm what is due."
    }
  ],
  "occupational-health/pre-employment-physical": [
    {
      question: "What is included in a pre-employment physical?",
      answer:
        "The exact exam depends on the job, but it may include vitals, physical examination, vision or hearing screening, paperwork review, and employer-requested testing."
    },
    {
      question: "Can a pre-employment physical include a drug test?",
      answer:
        "Yes. Many employer workflows combine the physical with drug and alcohol testing when required for the role."
    },
    {
      question: "What should I bring to a pre-employment physical?",
      answer:
        "Bring employer paperwork, photo ID, a medication list, and glasses, hearing aids, or other assistive devices if you use them."
    }
  ],
  "occupational-health/lab-testing-manassas": [
    {
      question: "What types of lab testing do you offer?",
      answer:
        "Altmed supports a range of lab services including blood work, urinalysis, occupational screening, drug testing, and provider-directed diagnostic testing."
    },
    {
      question: "Do I need a doctor’s order for lab testing?",
      answer:
        "Some tests may be tied to a clinic visit, occupational form, or provider recommendation. If you are unsure, call ahead and the team can explain what is needed."
    },
    {
      question: "How long do lab results take?",
      answer:
        "Result timing depends on the test. Some screening results are available quickly, while others require formal laboratory processing."
    }
  ],
  "occupational-health/breath-alcohol-test-manassas": [
    {
      question: "What is a breath alcohol test used for?",
      answer:
        "Breath alcohol testing is commonly used for DOT programs, post-accident evaluation, workplace policy enforcement, and other safety-sensitive screening needs."
    },
    {
      question: "How long does a breath alcohol test take?",
      answer:
        "The test itself is usually quick, but total visit time can vary depending on paperwork, employer protocols, and whether additional confirmation is required."
    },
    {
      question: "Can employers send employees for same-day breath alcohol testing?",
      answer:
        "Yes. Altmed supports time-sensitive employer testing workflows and related occupational health coordination."
    }
  ],
  "occupational-health/xray-service": [
    {
      question: "Do I need an x-ray for every injury?",
      answer:
        "Not always. The provider determines whether imaging is appropriate based on the injury, symptoms, exam findings, and workplace documentation needs."
    },
    {
      question: "Is x-ray service useful for work injuries?",
      answer:
        "Yes. X-ray support can help evaluate suspected fractures and other musculoskeletal injuries that affect treatment and return-to-work planning."
    },
    {
      question: "Can urgent injuries be evaluated here first?",
      answer:
        "Yes. Many injuries can be assessed in clinic first, and the provider can decide whether imaging or additional treatment is needed."
    }
  ],
  "medical-weight-loss-manassas": [
    {
      question: "What makes medical weight loss different from a regular diet program?",
      answer:
        "Medical weight loss includes clinical review, physician oversight, progress monitoring, and individualized treatment options rather than a generic one-size-fits-all plan."
    },
    {
      question: "Do you offer semaglutide or GLP-1 weight-loss consultations?",
      answer:
        "Yes. Altmed discusses semaglutide and other medication options when clinically appropriate as part of a broader supervised weight-loss program."
    },
    {
      question: "Will I be monitored throughout the program?",
      answer:
        "Yes. Follow-up visits help track progress, adjust the plan, review side effects, and keep treatment aligned with your goals and health history."
    }
  ],
  "functional-medicine-manassas": [
    {
      question: "What is functional medicine?",
      answer:
        "Functional medicine looks more closely at symptom patterns, lifestyle, nutrition, sleep, stress, and history to better understand what may be contributing to chronic health concerns."
    },
    {
      question: "What kinds of symptoms bring patients to functional medicine?",
      answer:
        "Patients often ask about fatigue, brain fog, digestive issues, hormone concerns, inflammation, unexplained weight changes, and other persistent symptoms."
    },
    {
      question: "Does functional medicine replace primary care?",
      answer:
        "No. At Altmed, functional medicine is meant to complement sound medical care, not replace appropriate urgent care, primary care, or specialist evaluation."
    }
  ],
  "suboxone-treatment-manassas": [
    {
      question: "Is Suboxone treatment confidential?",
      answer:
        "Yes. Altmed provides confidential addiction care and aims to make the first step feel respectful, private, and non-judgmental."
    },
    {
      question: "Do I need to call for addiction-treatment questions?",
      answer:
        "Yes. For treatment planning and medication-specific questions, it is best to contact the clinical team directly for a private consultation."
    },
    {
      question: "Do you offer follow-up support after the first visit?",
      answer:
        "Yes. Ongoing follow-up is part of addiction care, and eligible established patients may also use telehealth for some follow-up visits."
    }
  ],
  "third-party-administrator-service-manassas": [
    {
      question: "What does a TPA do for employer drug-testing programs?",
      answer:
        "A TPA helps manage testing logistics, random pools, documentation, coordination, and program requirements so employers do not have to manage every step internally."
    },
    {
      question: "Can Altmed help with DOT compliance workflows?",
      answer:
        "Yes. Altmed can support DOT and non-DOT program administration alongside occupational health, testing, and related employer services."
    },
    {
      question: "Who typically uses TPA services?",
      answer:
        "TPA services are especially useful for transportation, logistics, construction, and other employers with ongoing compliance and testing needs."
    }
  ],
  "mro-services-manassas": [
    {
      question: "What does an MRO do?",
      answer:
        "A Medical Review Officer reviews workplace drug-testing results to help ensure they are interpreted fairly, accurately, and in line with program requirements."
    },
    {
      question: "Why are MRO services important for employers?",
      answer:
        "MRO review helps protect privacy, verify medical explanations when needed, and strengthen the integrity of regulated or safety-sensitive testing programs."
    },
    {
      question: "Can MRO services work alongside Altmed’s other employer offerings?",
      answer:
        "Yes. MRO services fit naturally with Altmed’s occupational health, TPA, DOT, and workplace-testing support."
    }
  ],
  "corporate-wellness-programs-manassas": [
    {
      question: "What can be included in a corporate wellness program?",
      answer:
        "Programs may include health fairs, screening events, flu shots, preventive education, wellness talks, and planning tailored to the employer’s workforce."
    },
    {
      question: "Do you offer onsite wellness events for employers?",
      answer:
        "Yes. Altmed can discuss onsite or coordinated wellness support for local businesses, schools, and organizations."
    },
    {
      question: "How do wellness programs help employers?",
      answer:
        "Wellness programs can support employee engagement, preventive care, workplace culture, and broader occupational health goals."
    }
  ]
};

export const legacyServiceRedirects: Record<string, string> = {
  addiction: "suboxone-treatment-manassas",
  "occupational-health": "occupational-health-clinic-manassas",
  "occupational-health/dot-physical": "dot-physical-manassas-va",
  "occupational-health/drug-and-alcohol-test": "occupational-health/drug-alcohol-testing-manassas",
  "occupational-health/lab-tests": "occupational-health/lab-testing-manassas",
  "occupational-health/breadth-alcohol-testing": "occupational-health/breath-alcohol-test-manassas",
  "occupational-health/vaccinations": "occupational-health/vaccinations-immunizations-manassas-va",
  "occupational-health/workers-compensation": "occupational-health/workers-compensation-injury-care-manassas",
  "third-party-administration-service": "third-party-administrator-service-manassas",
  "medical-review-officer": "mro-services-manassas",
  "corporate-wellness-and-health-fairs": "corporate-wellness-programs-manassas",
  weight_management: "medical-weight-loss-manassas",
  "functional-medicine": "functional-medicine-manassas"
};

export const supportedServiceSlugs = new Set([
  ...serviceCards.map((service) => service.slug),
  ...Object.keys(servicePageFallbackContent),
  ...Object.keys(legacyServiceRedirects)
]);

export const blogCategories = [
  "All",
  "Urgent Care Tips",
  "Primary Care",
  "Occupational Health",
  "Weight Loss & Nutrition",
  "Functional Medicine",
  "Telehealth",
  "Addiction Management"
];

export const homepageTestimonials = [
  {
    quote:
      "We were in and out quickly, and the provider explained the treatment plan clearly. It felt far more personal than a chain urgent care.",
    name: "Maria",
    location: "Manassas",
    source: "Urgent Care"
  },
  {
    quote:
      "Our team uses Altmed for DOT and workplace services because they make the process simple and responsive.",
    name: "James",
    location: "Prince William County",
    source: "Employer Client"
  },
  {
    quote:
      "The weight management program felt structured, realistic, and medically supervised rather than generic.",
    name: "Tanya",
    location: "Gainesville",
    source: "Weight Loss"
  }
] as const;

export const featuredDoctors = [
  {
    name: "Dr. Gerald K. Lee, M.D., Ph.D.",
    specialty: "Medical Director",
    experience: "20+ years",
    cta: "Schedule with Dr. Lee",
    image: legacyAssets.doctorOne
  },
  {
    name: "Garima Pokhrel, FNP-C, MSN",
    specialty: "Medical Provider",
    experience: "Primary & Occupational Care",
    cta: "Schedule with Garima",
    image: legacyAssets.doctorTwo
  },
  {
    name: "Madhu Panthi",
    specialty: "Medical Provider Assistant",
    experience: "Patient Support & Clinical Coordination",
    cta: "Meet Our Team",
    image: legacyAssets.doctorsOverview
  }
] as const;

export const departments = [
  { name: "Urgent Care", head: "Altmed Clinical Team", description: "Walk-in care for illness, injuries, and time-sensitive health concerns." },
  { name: "Primary Care", head: "Dr. Gerald K. Lee", description: "Preventive medicine, chronic disease follow-up, and routine family care." },
  { name: "Occupational Health", head: "Employer Services Team", description: "DOT physicals, drug testing, workers' compensation, and employer programs." },
  { name: "Weight Management", head: "Dr. Gerald K. Lee", description: "Medical weight loss, injection programs, and nutrition-focused support." },
  { name: "Functional Medicine", head: "Altmed Clinical Team", description: "Root-cause, patient-centered care for chronic symptoms and wellness planning." },
  { name: "Telehealth", head: "Altmed Providers", description: "Virtual urgent care and primary care visits for flexible access." }
] as const;

export const insurancePartners = [
  "DOT / FMCSA Programs",
  "Employer Accounts",
  "Workers' Compensation Carriers",
  "Patient Fusion",
  "Telehealth Consent",
  "Patient Portal"
] as const;

export const faqPreview = [
  {
    question: "Do I need an appointment for urgent care?",
    answer: "No. Walk-ins are welcome for urgent care, while primary care, weight loss, and employer services can also be scheduled ahead for convenience."
  },
  {
    question: "What should I bring to a DOT physical?",
    answer: "Bring your CDL, a list of current medications, and any vision correction or medical documentation related to ongoing conditions."
  },
  {
    question: "Do you offer employer drug-testing programs?",
    answer: "Yes. Altmed supports employer accounts for pre-employment, random, post-accident, return-to-duty, and DOT-compliant testing."
  },
  {
    question: "Can I use telehealth for follow-up visits?",
    answer: "Yes. Telehealth can be a good fit for follow-ups, medication questions, and some routine primary care or urgent care concerns."
  },
  {
    question: "Do you have patient forms online?",
    answer: "Yes. The site includes patient and employer form access, including records requests, registration, occupational forms, and addiction-related intake forms."
  }
] as const;

export const liveFormsLibraryUrl = "https://altmedfirst.com/patient-forms";

export const formsSections = [
  {
    title: "Occupational Health Forms",
    description:
      "Employer, hiring, and workplace-health forms frequently requested by HR teams, drivers, and safety-sensitive employees.",
    items: [
      {
        title: "Medical Exam Form (Police Officer and Fire Fighters)",
        description: "Virginia initial-hire medical standards examination form for public-safety roles.",
        href: "https://altmedfirst.com/forms/Medical%20Exam%20Form%202018%20forms.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "Company Authorization Form",
        description: "Authorization for examination or treatment, including occupational testing and injury services.",
        href: "https://altmedfirst.com/forms/Company%20Authorization%20Form%20New.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "Vision Titmus Results Form",
        description: "Vision results form used in occupational screening workflows.",
        href: "https://altmedfirst.com/forms/VisionTitmusResultsForm_blank.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "New Patient Registration (English)",
        description: "Available on the current live Altmed forms library.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Audiogram Form",
        description: "Available on the current live Altmed forms library.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Lift Test Results",
        description: "Available on the current live Altmed forms library.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "RPT Vaccine Administration Form",
        description: "Available on the current live Altmed forms library.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Vision Ishihara Results Form",
        description: "Available on the current live Altmed forms library.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Vision Snellen Results Form",
        description: "Available on the current live Altmed forms library.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      }
    ]
  },
  {
    title: "Medical Clearance Forms",
    description:
      "DOT and medical-clearance paperwork used when drivers need supporting records from specialists or treating clinicians.",
    items: [
      {
        title: "Cardiac DOT Clearance Form",
        description: "Supporting cardiac clearance form for DOT medical exam follow-up.",
        href: "https://altmedfirst.com/forms/medical_clearance/Cardiac%20DOT%20Clearance%20Form%20.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "391.41 CMV Driver Medication Form MCSA-5895",
        description: "Listed on the live forms library for DOT-related follow-up.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Vision Evaluation Report Form MCSA-5871",
        description: "Listed on the live forms library for DOT-related follow-up.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Return to Duty / Work DOT Clearance Form",
        description: "Listed on the live forms library for DOT-related follow-up.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Medical DOT Clearance Form",
        description: "Listed on the live forms library for DOT-related follow-up.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Non-Insulin-Treated Diabetes DOT Clearance Form",
        description: "Listed on the live forms library for DOT-related follow-up.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Insulin-Treated Diabetes Mellitus Assessment Form MCSA-5870",
        description: "Listed on the live forms library for DOT-related follow-up.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Hypertension DOT Clearance Form",
        description: "Listed on the live forms library for DOT-related follow-up.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Obstructive Sleep Apnea DOT Clearance Form",
        description: "Listed on the live forms library for DOT-related follow-up.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      }
    ]
  },
  {
    title: "Addiction Health Forms",
    description:
      "Confidential intake and follow-up forms used for addiction-treatment visits and medication-assisted care.",
    items: [
      {
        title: "Suboxone Form for New Patient",
        description: "Intake packet for new Suboxone and addiction-treatment patients.",
        href: "https://www.altmedfirst.com/forms/New%20Suboxone%20Intake%20forms.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "Suboxone Follow Up",
        description: "Listed on the live forms library for returning addiction-treatment patients.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      }
    ]
  },
  {
    title: "Weight Loss & Wellness Forms",
    description:
      "Medical weight-loss intake and wellness-consent paperwork surfaced on the live Altmed forms library.",
    items: [
      {
        title: "New Patient Weight Loss Intake Form",
        description: "Listed on the live forms library for physician-guided weight-loss visits.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "IV Nutritional Therapy (Patient Registration & Informed Consent)",
        description: "Listed on the live forms library for wellness-related visits.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Testosterone Therapy (Patient Registration & Informed Consent)",
        description: "Listed on the live forms library for wellness-related visits.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      },
      {
        title: "Pain Management Follow Up Evaluation",
        description: "Listed on the live forms library for wellness-related follow-up.",
        href: liveFormsLibraryUrl,
        actionLabel: "Open Live Library"
      }
    ]
  },
  {
    title: "Telehealth & Medical Release Forms",
    description:
      "Virtual-care consent and records-release options for patients, parents, and authorized representatives.",
    items: [
      {
        title: "Telehealth Consent Form",
        description: "Review the current telehealth-consent route before your virtual visit.",
        href: "/telehealth-consent-forms",
        actionLabel: "Open Form Route"
      },
      {
        title: "Telehealth Consent Form - Minor",
        description: "Use when a parent or guardian is participating in a minor’s telehealth visit.",
        href: "/telehealth-consent-forms-minor",
        actionLabel: "Open Form Route"
      },
      {
        title: "Medical Records Request Form",
        description: "Secure medical-records request workflow preserved on the new site.",
        href: "/patient-forms/medical-record-request-form",
        actionLabel: "Open Request Form"
      }
    ]
  }
] as const;

export type AdminNavItem = {
  href: string;
  label: string;
};

export type AdminNavGroup = {
  label: string;
  items: AdminNavItem[];
};

export type NavigationMenuItem = {
  id: string;
  label: string;
  href: string;
  description?: string;
  children?: NavigationMenuItem[];
};

export const defaultNavigationMenu: NavigationMenuItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/"
  },
  {
    id: "about",
    label: "About Us",
    href: "/about-us",
    children: [
      {
        id: "about-team",
        label: "Our Team",
        href: "/about-us#team",
        description: "Meet Altmed's clinical leadership."
      },
      {
        id: "about-mission",
        label: "Our Mission",
        href: "/about-us#mission",
        description: "See the clinic's care philosophy."
      },
      {
        id: "about-providers",
        label: "Providers",
        href: "/about-us#team",
        description: "Browse provider profiles and specialties."
      }
    ]
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    children: serviceCards.map((service) => ({
      id: `service-${service.slug}`,
      label: service.title,
      href: publicRoutes.service(service.slug),
      description: service.shortDescription
    }))
  },
  {
    id: "forms",
    label: "Patient Forms",
    href: "/patient-forms"
  },
  {
    id: "plans",
    label: "Plans",
    href: "/plans"
  },
  {
    id: "blog",
    label: "Blog",
    href: "/health-blogs"
  },
  {
    id: "faq",
    label: "FAQs",
    href: "/faq"
  },
  {
    id: "announcements",
    label: "Announcements",
    href: "/updates"
  },
  {
    id: "contact",
    label: "Contact Us",
    href: "/contact-us"
  }
];

export const adminNav: AdminNavGroup[] = [
  {
    label: "Home",
    items: [{ href: "/admin/dashboard", label: "Home" }]
  },
  {
    label: "Publishing",
    items: [
      { href: "/admin/blog", label: "Blog Posts" },
      { href: "/admin/blog/categories", label: "Categories" },
      { href: "/admin/blog/tags", label: "Tags" },
      { href: "/admin/faq", label: "FAQs" },
      { href: "/admin/announcements", label: "Announcements" },
      { href: "/admin/providers", label: "Providers" }
    ]
  },
  {
    label: "Configuration",
    items: [
      { href: "/admin/site-settings", label: "Settings" },
      { href: "/admin/seo-settings", label: "SEO" }
    ]
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/treatment-plans", label: "Treatment Plans" },
      { href: "/admin/treatment-plans/cash-inflow", label: "Cash Inflow" },
      { href: "/admin/treatment-plans/enrollments", label: "Enrollments" },
      { href: "/admin/treatment-plans/payments", label: "Payments" },
      { href: "/admin/contact-submissions", label: "Contact Inbox" }
    ]
  }
];
