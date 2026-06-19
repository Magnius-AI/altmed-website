import { getConfiguredSiteOrigin } from "./site-url";

export const clinic = {
  name: "Altmed Medical Center",
  tagline: "Primary care, urgent care, occupational health, weight loss, and telehealth in Manassas, VA.",
  phone: "(703) 361-4357",
  email: "info@altmedfirst.com",
  address: "8551 Rixlew Lane Suite 140, Manassas, VA 20109",
  canonicalUrl: getConfiguredSiteOrigin(),
  bookingUrl: "/appointment",
  hours: "Mon-Fri: 9:00 AM-5:00 PM",
  coordinates: {
    latitude: 38.771256819960136,
    longitude: -77.50167231304229
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
  "Manassas Park",
  "Sudley",
  "Gainesville",
  "Haymarket",
  "Centreville",
  "Bristow",
  "Woodbridge",
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

export const aiAssets = {
  primaryCareConsultation: "/images/ai-generated/primary-care-consultation.jpg",
  occupationalHealthExam: "/images/ai-generated/occupational-health-exam.jpg",
  medicalWeightLossConsult: "/images/ai-generated/medical-weight-loss-consult.jpg",
  functionalMedicineConsult: "/images/ai-generated/functional-medicine-consult.jpg",
  addictionSupportConsult: "/images/ai-generated/addiction-support-consult.jpg",
  employerComplianceReview: "/images/ai-generated/employer-compliance-review.jpg",
  providerFallback: "/images/ai-generated/provider-generic-clinical-tools.jpg"
} as const;

export const publicRoutes = {
  home: "/",
  about: "/about",
  services: "/services",
  plans: "/plans",
  departments: "/services",
  appointment: "/appointment",
  blog: "/health-blogs",
  faq: "/faq",
  contact: "/contact",
  announcements: "/updates",
  providers: "/providers",
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
  { from: "/altmed-blogs", to: "/health-blogs", reason: "Legacy blog archive alias from Search Console" },
  { from: "/current-news", to: "/health-blogs", reason: "Legacy news archive now consolidates into health blogs" },
  { from: "/about-us", to: "/about", reason: "Canonical about page is the shorter indexed route requested for launch" },
  { from: "/contact-us", to: "/contact", reason: "Canonical contact page is the shorter indexed route requested for launch" },
  { from: "/book", to: "/appointment", reason: "Appointment route preserved from old public site" },
  { from: "/announcements", to: "/updates", reason: "Legacy site used updates/news naming" },
  { from: "/services/primary-care", to: "/services/primary-care-manassas-va", reason: "Local-service slug carries the Search Console impressions" },
  { from: "/services/urgent-care", to: "/services/urgent-care-manassas-va", reason: "Local-service slug carries the Search Console impressions" },
  { from: "/services/addiction", to: "/services/suboxone-treatment-manassas", reason: "Google indexes the newer addiction/Suboxone page slug" },
  { from: "/services/occupational-health/dot-physical", to: "/services/dot-physical-manassas-va", reason: "Google indexes the newer DOT physical landing page" },
  { from: "/services/occupational-health/drug-and-alcohol-test", to: "/services/occupational-health/drug-alcohol-testing-manassas", reason: "Google indexes the newer drug testing slug" },
  { from: "/services/occupational-health/breath-alcohol-testing", to: "/services/occupational-health/drug-alcohol-testing-manassas", reason: "Common legacy breath alcohol wording should not 404" },
  { from: "/services/occupational-health/x-ray-service", to: "/services/occupational-health/xray-service", reason: "Hyphenated legacy x-ray service slug should preserve indexed/backlink traffic" },
  { from: "/services/occupational-health/vaccinations", to: "/services/occupational-health/vaccinations-immunizations-manassas-va", reason: "Google indexes the expanded vaccination slug" },
  { from: "/services/occupational-health/workers-compensation", to: "/services/occupational-health/workers-compensation-injury-care-manassas", reason: "Google indexes the workers comp landing page" },
  { from: "/services/third-party-administration-service", to: "/services/third-party-administrator-service-manassas", reason: "Canonical TPA service page uses administrator wording" },
  { from: "/services/occupational-health/pre-employment-physical", to: "/services/pre-employment-physical-drug-test-manassas", reason: "New local pre-employment physical page targets zero-click GSC queries" },
  { from: "/services/weight-management/semaglutide-weight-loss-manassas", to: "/services/semaglutide-weight-loss-manassas", reason: "Dedicated GLP-1 page targets semaglutide and tirzepatide queries" },
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
    image: aiAssets.primaryCareConsultation,
    shortDescription: "Walk-in care for sudden health needs."
  },
  {
    slug: "primary-care-manassas-va",
    title: "Primary Care",
    description: "Family and preventive care, chronic condition management, physicals, and routine medical visits.",
    image: aiAssets.primaryCareConsultation,
    shortDescription: "General checkups and long-term care."
  },
  {
    slug: "occupational-health-clinic-manassas",
    title: "Occupational Health",
    description: "Employer-based screenings, injury follow-up, DOT support, and workforce health services.",
    image: aiAssets.occupationalHealthExam,
    shortDescription: "Workplace and employer health services."
  },
  {
    slug: "dot-physical-manassas-va",
    title: "DOT Physicals",
    description: "FMCSA-compliant CDL exams with same-day availability for drivers and fleet operators.",
    image: aiAssets.occupationalHealthExam,
    shortDescription: "CDL and FMCSA medical exams."
  },
  {
    slug: "occupational-health/drug-alcohol-testing-manassas",
    title: "Drug & Alcohol Testing",
    description: "Pre-employment, random, post-accident, and DOT-compliant testing for employers and individuals.",
    image: aiAssets.employerComplianceReview,
    shortDescription: "Drug screens and alcohol testing."
  },
  {
    slug: "pre-employment-physical-drug-test-manassas",
    title: "Pre-Employment Physicals",
    description: "Same-day job physicals, drug tests, and employer screening support for new-hire onboarding.",
    image: aiAssets.occupationalHealthExam,
    shortDescription: "New-hire physicals and drug tests."
  },
  {
    slug: "occupational-health/workers-compensation-injury-care-manassas",
    title: "Workers' Compensation",
    description: "Same-day injury evaluation, return-to-work planning, and workers' comp documentation support.",
    image: aiAssets.occupationalHealthExam,
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
    image: aiAssets.medicalWeightLossConsult,
    shortDescription: "B-12, semaglutide, and coached programs."
  },
  {
    slug: "semaglutide-weight-loss-manassas",
    title: "Semaglutide & GLP-1 Weight Loss",
    description: "Semaglutide, tirzepatide, Ozempic, Wegovy, and GLP-1 weight-loss consultations in Manassas.",
    image: aiAssets.medicalWeightLossConsult,
    shortDescription: "GLP-1 medication consultations."
  },
  {
    slug: "functional-medicine-manassas",
    title: "Functional Medicine",
    description: "Root-cause evaluation for chronic symptoms, lifestyle factors, and personalized health planning.",
    image: aiAssets.functionalMedicineConsult,
    shortDescription: "Holistic root-cause care."
  },
  {
    slug: "suboxone-treatment-manassas",
    title: "Addiction Management",
    description: "Compassionate addiction treatment and Suboxone support in a judgment-free setting.",
    image: aiAssets.addictionSupportConsult,
    shortDescription: "Confidential recovery support."
  },
  {
    slug: "third-party-administrator-service-manassas",
    title: "TPA Services",
    description: "Third-party administrator support for DOT compliance, random pools, reporting, and employer drug-testing programs.",
    image: aiAssets.employerComplianceReview,
    shortDescription: "Employer compliance and program administration."
  },
  {
    slug: "mro-services-manassas",
    title: "MRO Services",
    description: "Medical Review Officer services for DOT and workplace drug-testing program review.",
    image: aiAssets.employerComplianceReview,
    shortDescription: "Medical review officer support."
  },
  {
    slug: "corporate-wellness-programs-manassas",
    title: "Corporate Wellness & Health Fairs",
    description: "Onsite screenings, wellness campaigns, and employer-focused health fair support.",
    image: aiAssets.employerComplianceReview,
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
      "<h1>Urgent Care in Manassas, VA — Walk In Today, No Appointment Needed</h1><p>Walk in for fast, same-day urgent care for infections, injuries, flu symptoms, strep throat, UTIs, ear infections, rashes, minor burns, sprains, and everyday medical problems that should not wait.</p>",
    bodyContent:
      "<h2>Walk-in urgent care without the emergency-room wait</h2><p>Altmed Medical Center gives Manassas patients a practical place to go when a health problem needs attention today but does not belong in the emergency room. Walk-ins are welcome for many non-life-threatening concerns, and scheduled visits are available when you want a planned arrival time.</p><h2>Conditions treated at our Manassas urgent care clinic</h2><ul><li>Flu, fever, cough, sore throat, strep throat, sinus symptoms, ear infections, and respiratory infections</li><li>UTI symptoms, pink eye, rashes, allergic reactions, skin infections, and minor burns</li><li>Sprains, strains, minor cuts, bruises, mild sports injuries, and work-related minor injuries</li><li>COVID testing guidance, medication refills when clinically appropriate, and same-day medical evaluation</li></ul><h2>Urgent care vs ER in Manassas</h2><p>Urgent care is best for problems that need prompt medical attention but are not immediately life-threatening. The ER is the right place for chest pain, stroke symptoms, severe shortness of breath, major trauma, uncontrolled bleeding, severe allergic reaction, or loss of consciousness. For more guidance, read our article on <a href='/health-blogs/urgent-care-vs-er-in-manassas-va-whats-the-difference-and-when-to-choose'>urgent care vs the emergency room in Manassas</a>.</p><h2>Flu treatment and flu vaccines in Manassas</h2><p>Patients searching for flu treatment in Manassas and flu vaccine options can start at Altmed. We evaluate flu-like symptoms, discuss testing and treatment options, and provide vaccine guidance based on age, risk factors, supply, and timing. Families can also ask about routine and pediatric vaccines through our <a href='/services/occupational-health/vaccinations-immunizations-manassas-va'>vaccinations and immunizations page</a>.</p><h2>How the walk-in process works</h2><p>Bring a photo ID, insurance card if available, medication list, and any relevant medical history. Our team checks you in, reviews symptoms, completes the medical evaluation, and explains treatment or follow-up. Wait times vary by day, but the goal is clear same-day care without the cost or delay of an ER visit for minor illness or injury.</p><h2>After-hours and 24-hour urgent care searches</h2><p>Altmed is not a 24-hour urgent care center. If you are searching for 24 hour urgent care in Manassas because symptoms are severe or worsening after hours, use the nearest emergency department or call 911 for emergencies. During clinic hours, Altmed is built for efficient walk-in care and same-day appointments.</p><p>Helpful next steps: <a href='/appointment'>book a visit</a>, ask about <a href='/telehealth-manassas'>telehealth</a>, or <a href='/contact'>contact the clinic</a> before coming in.</p>",
    metaTitle: "Urgent Care Manassas VA | Walk-In Clinic Open Now | Altmed Medical Center",
    metaDescription: "Walk-in urgent care in Manassas VA with no appointment needed. Treat infections, injuries, flu, strep, and more. Shorter waits than the ER. Board-certified providers. Call (703) 361-4357.",
    metaKeywords: "urgent care Manassas VA, walk in clinic Manassas VA, flu treatment in Manassas, flu vaccine in Manassas, urgent care near me",
    featuredImage: aiAssets.primaryCareConsultation
  },
  "primary-care-manassas-va": {
    name: "Primary Care",
    heroContent:
      "<h1>Primary Care in Manassas, VA — Your Neighborhood Doctor, When You Need Them</h1><p>Trusted primary care, preventive visits, medication management, chronic-condition support, and same-day access from a local Manassas medical team accepting new patients.</p>",
    bodyContent:
      "<h2>Primary care that connects prevention, urgent needs, and follow-up</h2><p>Altmed Medical Center is a neighborhood primary care clinic for adults and families in Manassas, Manassas Park, Gainesville, Haymarket, Woodbridge, and Prince William County. Patients use Altmed for annual physicals, routine checkups, chronic disease management, lab follow-up, vaccines, and same-day visits when a regular appointment cannot wait.</p><h2>Conditions managed by primary care</h2><ul><li>Hypertension, high cholesterol, diabetes, prediabetes, thyroid concerns, and hormone disorders</li><li>Asthma, COPD, allergies, recurring infections, arthritis, joint pain, and digestive concerns</li><li>Anxiety, depression, sleep concerns, fatigue, weight-related health risks, and preventive screening needs</li><li>Medication refills, medication side effect reviews, specialist coordination, and lab monitoring</li></ul><h2>Primary care services included</h2><ul><li>Annual physicals, wellness exams, work or school physicals, and preventive screenings</li><li>Blood pressure management, diabetes follow-up, cholesterol checks, and routine blood work coordination</li><li>Well-woman exams, flu shots, routine vaccines, health counseling, and smoking-cessation conversations</li><li>Same-day appointments and walk-in availability for common urgent concerns when appropriate</li></ul><h2>Medication management in Manassas</h2><p>Patients searching for Manassas medication management often need more than a refill. Altmed reviews what you take, why you take it, whether it is working, and whether lab monitoring or safer alternatives are needed. This is especially important for blood pressure medication, diabetes medication, thyroid medication, asthma inhalers, cholesterol medication, weight-loss medication, and mental-health prescriptions.</p><h2>Hormone disorders and metabolic concerns</h2><p>Hormone disorders can affect weight, mood, energy, sleep, blood sugar, menstrual symptoms, and day-to-day function. Altmed can start the primary care evaluation, order appropriate lab work, and connect patients with <a href='/services/functional-medicine-manassas'>functional medicine</a> or specialty follow-up when deeper review is needed.</p><h2>Atendemos pacientes que hablan espanol</h2><p>Si busca clinicas en Manassas VA o una clinica familiar en Manassas, llame a Altmed Medical Center. Nuestro equipo puede ayudar con citas, atencion primaria, cuidado urgente, formularios y preguntas generales en espanol cuando hay personal disponible.</p><p>Helpful next steps: <a href='/appointment'>schedule primary care</a>, learn about <a href='/telehealth-manassas'>virtual visits</a>, or read why <a href='/health-blogs/your-health-starts-here-why-you-need-a-primary-care-physician-in-manassas-va'>primary care matters in Manassas</a>.</p>",
    metaTitle: "Primary Care Doctor Manassas VA | Walk-In & Same-Day | Altmed Medical Center",
    metaDescription: "Primary care in Manassas VA with same-day appointments and walk-in availability. Annual physicals, chronic disease management, preventive care, and medication management. (703) 361-4357.",
    metaKeywords: "primary care doctor Manassas VA, medication management Manassas, hormone disorders Manassas, clinicas en Manassas VA",
    featuredImage: aiAssets.primaryCareConsultation
  },
  "occupational-health-clinic-manassas": {
    name: "Occupational Health",
    heroContent:
      "<h1>Occupational Health Services in Manassas, VA — For Employers & Workers</h1><p>Workplace injury care, DOT exams, drug testing, pre-employment physicals, employer accounts, and compliance-minded workforce services for businesses across Prince William County.</p>",
    bodyContent:
      "<h2>A local occupational health clinic built for employers</h2><p>Altmed Medical Center helps employers, HR teams, fleet operators, contractors, schools, and safety-sensitive workers manage the medical side of hiring, injuries, testing, and compliance. The goal is simple: fast visits, clear paperwork, and a local team that understands employer workflows.</p><h2>Employer services overview</h2><ul><li><a href='/services/dot-physical-manassas-va'>DOT physicals</a> and commercial driver medical exams</li><li><a href='/services/occupational-health/drug-alcohol-testing-manassas'>DOT and non-DOT drug and alcohol testing</a>, including random, pre-employment, post-accident, and return-to-duty workflows</li><li><a href='/services/occupational-health/workers-compensation-injury-care-manassas'>Workers comp injury care</a>, occupational injury evaluation, and return-to-work planning</li><li><a href='/services/pre-employment-physical-drug-test-manassas'>Pre-employment physicals and drug tests</a> for new hires</li><li><a href='/services/occupational-health/vaccinations-immunizations-manassas-va'>Vaccinations and immunizations</a>, flu shots, and workplace vaccine support</li><li><a href='/services/occupational-health/lab-testing-manassas'>Lab testing</a>, breath alcohol testing, vision screening, hearing screening, and related occupational exams</li><li><a href='/services/third-party-administrator-service-manassas'>Third-party administrator services</a>, random pool support, and <a href='/services/mro-services-manassas'>MRO services</a></li></ul><h2>Occupational injury clinic in Manassas</h2><p>When an employee is injured, delays create confusion for the worker, the employer, and the insurance carrier. Altmed evaluates many non-emergency workplace injuries, documents work status, and helps plan safe return to work. For severe trauma, chest pain, stroke symptoms, uncontrolled bleeding, or emergencies, use the ER or call 911.</p><h2>Workers comp urgent care and return-to-work support</h2><p>Employers searching for workers comp urgent care need timely access and paperwork that can be used by supervisors, carriers, and claims teams. Altmed helps with initial assessment, progress notes, restrictions, follow-up, and practical communication so a case does not stall after the first visit.</p><h2>How to set up an employer account</h2><p>Call <a href='tel:+17033614357'>(703) 361-4357</a> or <a href='/contact'>contact Altmed</a> to discuss services, billing preferences, authorization forms, testing protocols, and recurring needs. Employers can send workers with the <a href='/forms/Company%20Authorization%20Form%20New.pdf'>Company Authorization Form</a> when a visit is tied to a workplace requirement.</p><h2>Employer perspective</h2><p>HR managers use Altmed because one local clinic can coordinate testing, physicals, injury care, and follow-up documentation. That consistency matters when a team is hiring quickly, responding to an injury, or maintaining a DOT-compliant program.</p>",
    metaTitle: "Occupational Health Clinic Manassas VA | Worker Injury & DOT Services | Altmed",
    metaDescription: "Occupational health services in Manassas VA for employers and employees. Work injury treatment, DOT physicals, drug testing, pre-employment physicals, and return-to-work evaluations. (703) 361-4357.",
    metaKeywords: "occupational health clinic Manassas VA, occupational injury clinic, workers comp urgent care, DOT services Manassas, employer drug testing",
    featuredImage: aiAssets.occupationalHealthExam
  },
  "dot-physical-manassas-va": {
    name: "DOT Physicals",
    heroContent:
      "<h1>DOT Physical Exams in Manassas, VA — FMCSA Certified, Same-Day Available</h1><p>Fast, affordable CDL medical exams with FMCSA-certified medical examiners, same-day availability, walk-in convenience, and practical support for drivers across Manassas and Northern Virginia.</p>",
    bodyContent:
      "<h2>Affordable DOT physical pricing in Manassas</h2><p>Drivers searching for a $50 DOT physical near me want clear pricing and a fast visit. Altmed keeps DOT physical pricing visible and straightforward; call <a href='tel:+17033614357'>(703) 361-4357</a> to confirm the current DOT exam price, available same-day times, and whether any employer paperwork changes your visit needs.</p><h2>What your DOT physical includes</h2><ul><li>FMCSA medical history review and general physical exam</li><li>Vision and hearing screening</li><li>Blood pressure, pulse, and urinalysis screening</li><li>Medication and chronic-condition review focused on safe commercial driving</li><li>Medical certificate documentation when you qualify</li></ul><h2>What to bring to your DOT physical</h2><p>Bring your CDL or photo ID, current medication list, glasses or contacts, hearing aids if used, and any condition-specific records. Drivers can also download the <a href='/forms/DOCUMENTS%20TO%20BRING%20IN%20FOR%20YOUR%20UPCOMING%20DOT%20PHYSICAL.pdf'>documents to bring for your DOT physical PDF</a> before coming in.</p><h2>DOT medical clearance forms</h2><p>If you have a cardiac history, high blood pressure, sleep apnea, diabetes, vision concerns, or a return-to-duty issue, the examiner may request supporting documentation. These indexed PDFs are preserved on the new site for drivers and treating clinicians:</p><ul><li><a href='/forms/medical_clearance/Cardiac%20DOT%20Clearance%20Form%20.pdf'>Cardiac DOT Clearance Form</a></li><li><a href='/forms/medical_clearance/Hypertension%20DOT%20Clearance%20Form.pdf'>Hypertension DOT Clearance Form</a></li><li><a href='/forms/medical_clearance/Obstructive%20Sleep%20Apnea%20DOT%20Clearance%20Form.pdf'>Obstructive Sleep Apnea DOT Clearance Form</a></li><li><a href='/forms/medical_clearance/Non-Insulin-Treated%20Diabetes%20DOT%20Clearance%20Form.pdf'>Non-Insulin-Treated Diabetes DOT Clearance Form</a></li><li><a href='/forms/medical_clearance/Insulin-Treated%20Diabetes%20Mellitus%20Assessment%20Form%20MCSA-5870.pdf'>Insulin-Treated Diabetes Mellitus Assessment Form MCSA-5870</a></li><li><a href='/forms/medical_clearance/Vision%20Evaluation%20Report%20Form%20MCSA-5871_0.pdf'>Vision Evaluation Report Form MCSA-5871</a></li><li><a href='/forms/medical_clearance/Return%20to%20Duty%20_%20Work%20DOT%20Clearance%20Form.pdf'>Return to Duty / Work DOT Clearance Form</a></li><li><a href='/forms/medical_clearance/Medical%20DOT%20Clearance%20Form.pdf'>Medical DOT Clearance Form</a></li></ul><h2>Cardiac, hypertension, and sleep apnea clearance</h2><p>Cardiac clearance, hypertension clearance, and sleep apnea clearance are common reasons a driver needs additional paperwork. The examiner reviews the condition, medications, stability, and supporting documentation before determining certification length. Drivers using CPAP should bring compliance information when available.</p><h2>FMCSA-certified examiner information</h2><p>Altmed performs DOT exams through FMCSA-certified medical examiners. If your employer requires the examiner's National Registry details, call before your appointment so the team can provide the current verification information.</p><h2>Helpful DOT links</h2><p>Employers and drivers may also need <a href='/services/occupational-health/drug-alcohol-testing-manassas'>DOT drug and alcohol testing</a>, the <a href='/services/occupational-health-clinic-manassas'>occupational health overview</a>, or a scheduled exam through <a href='/appointment?service=dot-physical'>DOT physical appointments</a>. For more detail, read our <a href='/health-blogs/dot-physical-exams-in-manassas-va-a-complete-guide-for-employers-and-commercial-drivers'>DOT physical guide for commercial drivers</a>.</p>",
    metaTitle: "DOT Physical Exam Manassas VA | $50 CDL Medical Exam | Altmed Medical Center",
    metaDescription: "Get your DOT/CDL physical exam in Manassas VA — FMCSA-certified medical examiners, same-day appointments, and results on the spot. Affordable pricing. Call (703) 361-4357.",
    metaKeywords: "$50 dot physical near me, DOT physical exam Manassas VA, CDL medical exam, FMCSA medical examiner, DOT clearance forms",
    featuredImage: aiAssets.occupationalHealthExam
  },
  "occupational-health/drug-alcohol-testing-manassas": {
    name: "Drug and Alcohol Testing",
    heroContent:
      "<h1>Drug & Alcohol Testing in Manassas, VA — DOT & Non-DOT</h1><p>Pre-employment, random, post-accident, return-to-duty, DOT, and non-DOT drug and alcohol testing for employers, workers, and individuals in Manassas.</p>",
    bodyContent:
      "<h2>Drug testing near me in Manassas</h2><p>Altmed provides local drug testing for job candidates, employees, DOT-regulated drivers, schools, legal requirements, and individuals who need documented results. Walk-ins may be available, and employer-authorized visits can be handled with the correct paperwork.</p><h2>Alcohol testing near me</h2><p>Breath alcohol testing is used for DOT and non-DOT programs, post-accident situations, reasonable suspicion, and workplace policies. Professional handling matters because alcohol results can affect employment, compliance, and return-to-duty decisions.</p><h2>DOT testing near me</h2><p>DOT drug and alcohol testing requires the correct chain-of-custody process, collection standards, and result routing. Altmed supports pre-employment, random, post-accident, reasonable-cause, return-to-duty, and follow-up testing workflows for regulated employers and drivers.</p><h2>Types of tests available</h2><ul><li>Urine drug screens, including common 5-panel and 10-panel options</li><li>Breath alcohol testing for workplace and DOT programs</li><li>Hair follicle testing when requested or required</li><li>Oral fluid testing when appropriate for the program</li><li>Rapid screens and lab-based testing depending on documentation needs</li></ul><h2>Employer portal and account support</h2><p>Employers can contact Altmed to discuss account setup, authorization forms, result routing, random testing pools, TPA support, and <a href='/services/mro-services-manassas'>MRO services</a>. For broader services, see the <a href='/services/occupational-health-clinic-manassas'>occupational health clinic overview</a>.</p><p>Helpful resources: <a href='/forms/Company%20Authorization%20Form%20New.pdf'>Company Authorization Form</a>, <a href='/services/dot-physical-manassas-va'>DOT physical exams</a>, and <a href='/appointment'>appointment scheduling</a>.</p>",
    metaTitle: "Drug & Alcohol Testing Manassas VA | DOT & Non-DOT | Altmed Medical Center",
    metaDescription: "Pre-employment, random, and post-accident drug and alcohol testing in Manassas VA. DOT-compliant, fast results, employer accounts available. Walk-in welcome. (703) 361-4357.",
    metaKeywords: "drug testing near me Manassas, alcohol testing near me, DOT testing near me, drug and alcohol testing Manassas VA",
    featuredImage: aiAssets.employerComplianceReview
  },
  "occupational-health/workers-compensation-injury-care-manassas": {
    name: "Workers' Compensation",
    heroContent:
      "<h1>Workers Compensation Injury Care in Manassas, VA — Work Injury Clinic</h1><p>Same-day workplace injury evaluation, workers comp urgent care, insurer-ready documentation, and return-to-work planning from a clinic that understands employer workflows.</p>",
    bodyContent:
      "<h2>Workers comp urgent care for non-emergency injuries</h2><p>When an employee gets hurt, prompt evaluation protects the worker and helps the employer understand restrictions, follow-up, and next steps. Altmed evaluates many non-emergency work injuries, including strains, sprains, minor cuts, burns, lifting injuries, repetitive-use concerns, and job-related pain.</p><h2>How to file a claim and what to bring</h2><p>Employees should bring a photo ID, employer contact information, claim details if available, and any required authorization paperwork. Employers can use the <a href='/forms/Company%20Authorization%20Form%20New.pdf'>Company Authorization Form</a> to clarify what services are approved. If a claim number already exists, bring it to the visit.</p><h2>How Altmed works with employers and insurers</h2><ul><li>Initial injury evaluation and treatment recommendations</li><li>Work-status notes, restrictions, and return-to-work documentation</li><li>Follow-up visits to monitor recovery and update restrictions</li><li>Coordination with employer and insurer workflows when documentation is needed</li></ul><h2>When to use the ER</h2><p>Use the emergency room or call 911 for major trauma, uncontrolled bleeding, chest pain, stroke symptoms, severe shortness of breath, loss of consciousness, or a serious injury that cannot safely wait for clinic care.</p><p>Employers can also pair workers comp visits with <a href='/services/occupational-health/drug-alcohol-testing-manassas'>post-accident drug and alcohol testing</a> and broader <a href='/services/occupational-health-clinic-manassas'>occupational health services</a>.</p>",
    metaTitle: "Workers Compensation Injury Care Manassas VA | Work Injury Clinic | Altmed",
    metaDescription: "Workers compensation injury care in Manassas VA with same-day work injury evaluation, documentation, employer communication, and return-to-work support.",
    metaKeywords: "workers compensation Manassas, work injury clinic, occupational injury care, return to work evaluation",
    featuredImage: legacyAssets.heroClinic
  },
  "occupational-health/vaccinations-immunizations-manassas-va": {
    name: "Vaccinations & Immunizations",
    heroContent:
      "<h1>Vaccinations & Immunizations in Manassas, VA — Flu Shots & Travel Vaccines</h1><p>Walk-in flu shots, routine immunizations, COVID booster guidance, travel vaccine conversations, and occupational vaccines for families, students, and employers.</p>",
    bodyContent:
      "<h2>Vaccines offered at Altmed</h2><p>Vaccine availability can change by season and supply, so calling ahead is helpful. Altmed commonly supports flu shots, routine adult and pediatric immunization updates, Tdap, MMR, varicella, Hepatitis A, Hepatitis B, pneumococcal vaccine conversations, COVID booster guidance, and selected travel vaccine planning when appropriate.</p><h2>Flu shots in Manassas</h2><p>Seasonal influenza vaccines help protect families, schools, workplaces, older adults, and patients with chronic conditions. Patients can also use <a href='/services/urgent-care-manassas-va'>urgent care</a> if flu symptoms have already started and they need evaluation or treatment guidance.</p><h2>Occupational vaccine requirements</h2><p>Employers may require vaccines or titers for healthcare workers, school roles, public-facing positions, travel-related work, or safety-sensitive jobs. Altmed supports employer vaccine documentation and can pair immunization visits with <a href='/services/occupational-health/lab-testing-manassas'>lab testing</a>, physicals, or other occupational health services.</p><h2>Travel vaccine information</h2><p>Travel needs depend on destination, itinerary, age, health history, and timing. Bring your itinerary and vaccine records if you are preparing for travel so the provider can help identify practical next steps.</p><h2>What to bring</h2><p>Bring a photo ID, insurance card if available, prior immunization records, school or employer forms, and any deadline information. Download the <a href='/forms/rptVaccineAdministrationForm_blank.pdf'>vaccine administration form</a> when requested.</p>",
    metaTitle: "Vaccinations & Immunizations Manassas VA | Flu Shots & Travel Vaccines | Altmed",
    metaDescription: "Get flu shots, travel vaccines, COVID boosters, Hepatitis B, and occupational immunizations in Manassas VA. Walk-in available. No appointment needed. Call (703) 361-4357.",
    metaKeywords: "vaccinations Manassas VA, immunizations Manassas, flu shots Manassas, travel vaccines Manassas, pediatric vaccines Manassas",
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
    featuredImage: aiAssets.occupationalHealthExam
  },
  "pre-employment-physical-drug-test-manassas": {
    name: "Pre-Employment Physical & Drug Test",
    heroContent:
      "<h1>Pre-Employment Physical & Drug Test in Manassas, VA — Same-Day</h1><p>Same-day pre-employment physicals, drug tests, job-readiness screening, and employer account support for Manassas businesses and job candidates.</p>",
    bodyContent:
      "<h2>Pre-employment physicals for faster onboarding</h2><p>Altmed helps employers and job candidates complete required medical screening without unnecessary delays. A pre-employment physical can support safer hiring for physically demanding, safety-sensitive, healthcare, school, transportation, construction, and public-facing roles.</p><h2>What may be included</h2><ul><li>Vital signs, medical history review, and general physical exam</li><li>Vision screening, hearing screening, musculoskeletal review, and job-specific paperwork</li><li>Drug testing, alcohol testing, urinalysis, lab work, TB testing, or vaccine documentation when required</li><li>Clear completion forms for the employer when the candidate meets the stated requirements</li></ul><h2>Pre-employment drug testing</h2><p>Drug testing may be ordered by the employer as part of the same visit. Altmed supports urine drug screens, lab-based confirmation workflows, DOT and non-DOT testing, and employer-specific collection requirements through the <a href='/services/occupational-health/drug-alcohol-testing-manassas'>drug and alcohol testing program</a>.</p><h2>How employers set up accounts</h2><p>Employers can call <a href='tel:+17033614357'>(703) 361-4357</a> or <a href='/contact'>contact Altmed</a> to set up authorization forms, billing preferences, required exam elements, result routing, and recurring new-hire workflows. Candidates should bring photo ID, employer paperwork, medication information, and any required assistive devices such as glasses or hearing aids.</p><h2>Turnaround times</h2><p>Many physical exam components can be completed the same day. Drug-test turnaround depends on whether the employer requires a rapid screen, lab processing, confirmation, or MRO review.</p>",
    metaTitle: "Pre-Employment Physical & Drug Test Manassas VA | Same-Day | Altmed",
    metaDescription: "Same-day pre-employment physicals and drug tests in Manassas VA for employers and job candidates. Fast paperwork, drug screening, and account setup.",
    metaKeywords: "pre employment physical Manassas VA, pre employment drug test Manassas, same day job physical, employer physicals Manassas",
    featuredImage: aiAssets.occupationalHealthExam
  },
  "occupational-health/lab-testing-manassas": {
    name: "Lab Testing",
    heroContent:
      "<h1>Lab Testing in Manassas, VA — Blood Work & Occupational Health Tests</h1><p>Walk-in lab work, blood testing, urinalysis, occupational health testing, drug screening, and routine diagnostic support for patients and employers.</p>",
    bodyContent:
      "<h2>Full list of common lab services</h2><p>Altmed supports routine and problem-focused lab testing tied to primary care, urgent care, occupational medicine, and employer requirements. Available tests may include CBC, metabolic panels, lipid testing, A1C, thyroid labs, urinalysis, pregnancy testing, infectious disease testing, STD screening, hormone-related testing, titers, drug screening, and employer-directed occupational tests.</p><h2>Blood work and routine health monitoring</h2><p>Patients use lab testing to monitor diabetes, cholesterol, thyroid concerns, liver and kidney function, medication safety, fatigue, hormone disorders, and preventive care needs. Results are interpreted in the context of your visit rather than as isolated numbers.</p><h2>Occupational health lab testing</h2><p>Employers may need lab testing for pre-employment physicals, compliance programs, vaccine/titer documentation, and post-accident workflows. Altmed can connect lab testing with <a href='/services/pre-employment-physical-drug-test-manassas'>pre-employment physicals</a>, <a href='/services/occupational-health/drug-alcohol-testing-manassas'>drug testing</a>, and <a href='/services/occupational-health-clinic-manassas'>occupational health services</a>.</p><h2>Turnaround times and ordering</h2><p>Some screening results may be available quickly, while lab-based blood work or specialized testing can take longer. Bring provider orders, employer paperwork, and photo ID. If you are unsure whether an order is needed, call before visiting.</p>",
    metaTitle: "Lab Testing Manassas VA | Blood Work & Occupational Health Tests | Altmed",
    metaDescription: "Lab testing in Manassas VA for blood work, urinalysis, drug screening, occupational health tests, and routine diagnostics at Altmed Medical Center.",
    metaKeywords: "lab testing Manassas, blood work Manassas, drug screening, urinalysis, lab tests near me",
    featuredImage: aiAssets.occupationalHealthExam
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
    featuredImage: aiAssets.employerComplianceReview
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
      "<h1>Medical Weight Loss Programs in Manassas, VA — Physician-Supervised, Real Results</h1><p>Physician-supervised weight loss with semaglutide, tirzepatide, B-12 injections, phentermine conversations, metabolic review, nutrition support, and structured follow-up.</p>",
    bodyContent:
      "<h2>Physician-supervised weight loss in Manassas</h2><p>Altmed Medical Center helps patients who want more than a generic diet plan or an online prescription. The program starts with medical history, weight history, metabolic risk review, medication safety screening, goals, nutrition, activity, and follow-up planning.</p><h2>Semaglutide and GLP-1 weight loss</h2><p>Patients searching for semaglutide Manassas, Ozempic Manassas, Wegovy injections Manassas, and GLP-1 programs often want to understand whether medication is appropriate. Semaglutide is a GLP-1 medication class that can reduce appetite and support weight loss for qualified patients under medical supervision. Brand-name medications such as Ozempic and Wegovy have different FDA indications and insurance rules, so the right conversation starts with your health history.</p><h2>Tirzepatide and Mounjaro conversations</h2><p>Tirzepatide is another injectable medication class patients may ask about when comparing semaglutide vs tirzepatide or Mounjaro-style options. Altmed discusses benefits, risks, contraindications, expected follow-up, and realistic goals rather than treating injections as a quick fix.</p><h2>B-12 injections for weight loss support</h2><p>B-12 injections may be used as part of a broader wellness or weight-loss plan for selected patients. They are not a substitute for nutrition, activity, or medication review, but they can fit into a supervised program when the provider feels they are appropriate.</p><h2>Phentermine and appetite-control medication</h2><p>Patients searching for phentermine weight loss in Northern Virginia should be medically evaluated before using stimulant-style appetite medication. Blood pressure, heart history, current prescriptions, anxiety, sleep, and other risks matter. Altmed can discuss whether phentermine or a different plan is safer for your situation.</p><h2>Am I a candidate?</h2><ul><li>You have a BMI in a range where medical weight-loss treatment may be appropriate</li><li>You have weight-related health risks such as high blood pressure, prediabetes, diabetes, sleep apnea, or high cholesterol</li><li>You want provider monitoring instead of a one-time online order</li><li>You are ready for follow-up visits, nutrition changes, and long-term planning</li></ul><h2>Pricing and insurance transparency</h2><p>Coverage varies by medication, diagnosis, insurance plan, and pharmacy benefit. Altmed explains visit costs, self-pay options, and prescription considerations before treatment begins. Call <a href='tel:+17033614357'>(703) 361-4357</a> for current program pricing.</p><h2>What follow-up can include</h2><p>Medical weight-loss care usually works best with regular check-ins, nutrition review, medication-safety monitoring, and realistic adjustments when progress is slower or faster than expected. Individual results vary, and the best plan is personalized to the patient's health history and goals.</p><p>Helpful next steps: compare options on the <a href='/services/semaglutide-weight-loss-manassas'>semaglutide and GLP-1 page</a>, read the <a href='/health-blogs/semaglutide-glp-1-weight-loss-treatment-in-manassas-va'>semaglutide guide</a>, book an <a href='/appointment?service=medical-visit'>appointment</a>, or ask whether a <a href='/telehealth-manassas'>telehealth weight-loss consultation</a> is appropriate.</p>",
    metaTitle: "Medical Weight Loss Manassas VA | Semaglutide & GLP-1 Programs | Altmed",
    metaDescription: "Physician-supervised weight loss in Manassas VA. Semaglutide (Ozempic/Wegovy), tirzepatide, B-12 injections, and personalized plans. Real results with medical support. Call (703) 361-4357.",
    metaKeywords: "medical weight loss Manassas VA, semaglutide Manassas, Ozempic Manassas, Wegovy injections Manassas, tirzepatide Manassas, phentermine Northern Virginia",
    featuredImage: aiAssets.medicalWeightLossConsult
  },
  "semaglutide-weight-loss-manassas": {
    name: "Semaglutide & GLP-1 Weight Loss",
    heroContent:
      "<h1>Semaglutide Weight Loss in Manassas, VA — GLP-1 Programs</h1><p>Physician-supervised semaglutide, tirzepatide, Ozempic, Wegovy, and GLP-1 weight-loss consultations for qualified patients in Manassas.</p>",
    bodyContent:
      "<h2>What is semaglutide?</h2><p>Semaglutide is part of the GLP-1 medication class. For qualified patients, GLP-1 medications can help reduce appetite, improve fullness, and support weight loss when combined with nutrition changes, activity planning, and medical monitoring. Patients often ask about Ozempic, Wegovy, semaglutide, tirzepatide, and GLP-1 options in Manassas; the safest first step is a provider visit.</p><h2>How GLP-1 weight-loss treatment works</h2><p>Altmed starts with a medical history, medication review, weight history, goals, lab considerations, and contraindication screening. If treatment is appropriate, follow-up visits monitor progress, side effects, appetite changes, dose questions, and long-term sustainability.</p><h2>Semaglutide vs tirzepatide</h2><p>Tirzepatide is a different medication class that patients may know from Mounjaro or Zepbound conversations. The right option depends on history, goals, insurance, safety factors, and provider judgment. Altmed explains differences without pressuring patients into a one-size-fits-all injection plan.</p><h2>Who may qualify?</h2><ul><li>Adults with BMI and weight-related risk factors that make medical weight-loss treatment appropriate</li><li>Patients who want physician supervision rather than an online-only prescription</li><li>People ready for follow-up visits, nutrition changes, and long-term monitoring</li><li>Patients without contraindications that would make GLP-1 treatment unsafe</li></ul><h2>Cost and what to expect</h2><p>Costs vary by visit type, insurance coverage, medication access, pharmacy benefit, and self-pay needs. Call Altmed for current pricing and scheduling. Patients can also review the broader <a href='/services/medical-weight-loss-manassas'>medical weight loss program</a>, read the <a href='/health-blogs/semaglutide-glp-1-weight-loss-treatment-in-manassas-va'>semaglutide GLP-1 guide</a>, or <a href='/appointment?service=medical-visit'>book an appointment</a>.</p>",
    metaTitle: "Semaglutide Weight Loss Manassas VA | Ozempic, Wegovy & GLP-1 | Altmed",
    metaDescription: "Semaglutide and GLP-1 weight loss in Manassas VA. Ask Altmed about Ozempic, Wegovy, tirzepatide, costs, candidacy, and physician monitoring.",
    metaKeywords: "semaglutide Manassas, Ozempic Manassas, Wegovy injections Manassas, tirzepatide Manassas, GLP-1 Manassas",
    featuredImage: aiAssets.medicalWeightLossConsult
  },
  "functional-medicine-manassas": {
    name: "Functional Medicine",
    heroContent:
      "<h1>Functional Medicine Doctor in Manassas, VA — Root Cause Care</h1><p>Root-cause care for persistent symptoms, hormone disorders, lifestyle patterns, and long-term wellness concerns that deserve a deeper look.</p>",
    bodyContent:
      "<h2>Functional medicine doctor near me</h2><p>Patients searching for a functional medicine doctor near me often want more time to talk through patterns that do not fit neatly into a quick urgent-care visit. Altmed looks at symptoms, lifestyle, nutrition, sleep, stress, lab trends, and conventional medical concerns together.</p><h2>How functional medicine differs from conventional medicine</h2><p>Conventional medicine is essential for diagnosis, acute care, medication management, and disease monitoring. Functional medicine adds a deeper conversation about root causes and contributing factors. At Altmed, the two approaches are meant to work together, not compete.</p><h2>Conditions patients often discuss</h2><ul><li>Chronic fatigue, brain fog, poor sleep, and low energy</li><li>Digestive symptoms, bloating, constipation, reflux, food reactions, and gut-health concerns</li><li>Hormone disorders in Manassas, thyroid symptoms, unexplained weight changes, and metabolic concerns</li><li>Inflammation, stress-related symptoms, chronic pain patterns, and wellness planning</li></ul><h2>Hormone disorders in Manassas</h2><p>Hormone-related symptoms can overlap with primary care, weight management, thyroid disease, sleep problems, and mood concerns. Altmed can start with a practical review, order appropriate labs, and connect care back to <a href='/services/primary-care-manassas-va'>primary care</a> when ongoing medical management is needed.</p><h2>What to expect</h2><p>Your first visit may include an extended health history, symptom timeline, medication and supplement review, nutrition conversation, lab planning, and a step-by-step care plan. Treatment can include lifestyle changes, conventional medication when appropriate, targeted supplementation, lab follow-up, or specialty referral.</p>",
    metaTitle: "Functional Medicine Doctor Manassas VA | Root Cause Care | Altmed Medical Center",
    metaDescription: "Functional medicine doctor in Manassas VA for root-cause care, hormone disorders, fatigue, gut symptoms, metabolic concerns, and personalized wellness planning.",
    metaKeywords: "functional medicine doctor Manassas VA, functional medicine doctor near me, hormone disorders Manassas, root cause care Manassas",
    featuredImage: aiAssets.functionalMedicineConsult
  },
  "suboxone-treatment-manassas": {
    name: "Suboxone Treatment",
    heroContent:
      "<h1>Suboxone & Addiction Treatment in Manassas, VA — Compassionate, Confidential Care</h1><p>Confidential Suboxone and buprenorphine treatment, addiction medicine support, and follow-up planning for patients seeking help with opioid use disorder.</p>",
    bodyContent:
      "<h2>Suboxone treatment near me in Manassas</h2><p>Altmed provides confidential addiction medicine visits for patients seeking help with opioid use disorder. The first step is a private evaluation, a discussion of symptoms and history, and a care plan that may include medication-assisted treatment when clinically appropriate.</p><h2>What is Suboxone or buprenorphine?</h2><p>Suboxone is a medication that contains buprenorphine and naloxone. Buprenorphine can reduce cravings and withdrawal symptoms for many patients with opioid use disorder. Treatment decisions must be individualized by a qualified provider and paired with follow-up support.</p><h2>What is Vivitrol?</h2><p>Vivitrol is an injectable form of naltrexone used in some addiction-treatment plans. It is different from Suboxone and may be considered for selected patients depending on opioid-free timing, history, goals, and provider evaluation.</p><h2>Treatment process</h2><ul><li>Private first appointment and medical history review</li><li>Discussion of MAT, Suboxone, buprenorphine, Vivitrol, counseling, and recovery supports</li><li>Medication planning when appropriate and safe</li><li>Follow-up visits for stability, dose review, relapse prevention, and long-term recovery goals</li></ul><h2>Confidential and respectful care</h2><p>People often delay treatment because they are worried about stigma. Altmed aims to make the first step clear, private, and non-judgmental. Call the clinic directly for sensitive questions rather than relying only on website information.</p><p>Existing patients can ask about telehealth follow-up when appropriate. New patients can complete the <a href='https://form.jotform.com/230454861250148'>Suboxone new-patient Jotform</a>, and returning patients can complete the <a href='https://form.jotform.com/230443970780054'>Suboxone follow-up Jotform</a> before a visit.</p>",
    metaTitle: "Suboxone Treatment Manassas VA | Addiction Medicine | Altmed Medical Center",
    metaDescription: "Suboxone and buprenorphine treatment for opioid addiction in Manassas VA. Confidential, compassionate care from board-certified providers. Same-day evaluations available. (703) 361-4357.",
    metaKeywords: "Suboxone treatment Manassas, addiction management, opioid recovery, suboxone doctor",
    featuredImage: aiAssets.addictionSupportConsult
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
    featuredImage: aiAssets.employerComplianceReview
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
    featuredImage: aiAssets.employerComplianceReview
  },
  "corporate-wellness-programs-manassas": {
    name: "Corporate Wellness Programs",
    heroContent: "<h1>Corporate Wellness Programs in Manassas</h1><p>Onsite health fairs, screenings, and wellness planning for local employers.</p>",
    bodyContent:
      "<h2>Bring wellness into the workplace in a practical way</h2><p>The scraped corporate wellness content framed these programs as a way for employers to support health, morale, and retention without relying only on generic HR materials. Altmed helps businesses create local wellness support that employees will actually use.</p><h2>What we offer</h2><ul><li>Health fairs, blood pressure and BMI screenings, and preventive check-in events</li><li>Flu shot clinics and seasonal health campaigns</li><li>Nutrition, stress-management, and wellness education sessions</li><li>One-time events or longer-term support tied to broader occupational services</li></ul><h2>Why employers use this service</h2><p>Wellness programs can support absenteeism reduction, employee engagement, and a stronger workplace culture. They also fit naturally alongside Altmed’s occupational health, employer testing, and preventive care services.</p>",
    metaTitle: "Corporate Wellness Programs in Manassas | Onsite Health Fairs",
    metaDescription: "Corporate wellness programs and onsite health fairs in Manassas, VA for employers, schools, and HR teams.",
    metaKeywords: "corporate wellness programs Manassas, health fairs, employer wellness, onsite screenings",
    featuredImage: aiAssets.employerComplianceReview
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
        image: aiAssets.primaryCareConsultation
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
        image: aiAssets.primaryCareConsultation
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
        image: aiAssets.occupationalHealthExam
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
        image: aiAssets.employerComplianceReview
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
        image: aiAssets.occupationalHealthExam
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
        image: aiAssets.occupationalHealthExam
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
        image: aiAssets.employerComplianceReview
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
        image: aiAssets.employerComplianceReview
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
        image: aiAssets.occupationalHealthExam
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
        image: aiAssets.occupationalHealthExam
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
        image: aiAssets.occupationalHealthExam
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
        image: aiAssets.occupationalHealthExam
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
        image: aiAssets.employerComplianceReview
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
        image: aiAssets.employerComplianceReview
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
        image: aiAssets.medicalWeightLossConsult
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
        image: aiAssets.medicalWeightLossConsult
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
        image: aiAssets.functionalMedicineConsult
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
        image: aiAssets.addictionSupportConsult
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
        image: aiAssets.addictionSupportConsult
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
        image: aiAssets.employerComplianceReview
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
        image: aiAssets.employerComplianceReview
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
        image: aiAssets.employerComplianceReview
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
        image: aiAssets.employerComplianceReview
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
        image: aiAssets.employerComplianceReview
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
        image: aiAssets.employerComplianceReview
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
    },
    {
      question: "Do you see children for urgent care?",
      answer:
        "Altmed sees families for many common urgent care needs. Severe symptoms, trouble breathing, major injury, or emergencies should go to the ER or 911."
    },
    {
      question: "Do I need insurance for urgent care?",
      answer:
        "Insurance is helpful but not always required. Bring your insurance card if you have one, and call ahead for current self-pay options."
    },
    {
      question: "How long is the urgent care wait?",
      answer:
        "Wait times vary by day and season. Walk-ins are welcome, and booking ahead can help the team prepare for your visit."
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
    },
    {
      question: "Do I need insurance for primary care?",
      answer:
        "Insurance is helpful, and Altmed accepts many major plans. Self-pay options may be available, so call the clinic with coverage or cost questions."
    },
    {
      question: "Can I walk in without an appointment?",
      answer:
        "Walk-ins are welcome for many same-day concerns. Scheduled appointments are recommended for annual physicals, medication management, and longer chronic-care visits."
    },
    {
      question: "Do you manage chronic conditions?",
      answer:
        "Yes. Altmed helps with hypertension, diabetes, thyroid concerns, asthma, COPD, cholesterol, medication management, and preventive follow-up."
    },
    {
      question: "Do you offer same-day appointments?",
      answer:
        "Same-day appointments may be available depending on provider schedule and visit type. Call or book online for current openings."
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
    },
    {
      question: "What disqualifies you from a DOT physical?",
      answer:
        "Certain uncontrolled medical conditions, unsafe medication effects, vision or hearing issues, high blood pressure, untreated sleep apnea, and missing clearance paperwork can delay or limit certification. The examiner reviews each case individually under FMCSA standards."
    },
    {
      question: "How often do I need a DOT physical?",
      answer:
        "Many qualified drivers receive certification for up to 24 months, but some medical conditions require shorter certification or follow-up documentation."
    },
    {
      question: "Do you accept FMCSA medical examiner cards?",
      answer:
        "Altmed performs DOT exams through FMCSA-certified medical examiners. Bring any employer forms or prior medical examiner card information to your visit."
    },
    {
      question: "How much does a DOT physical cost at Altmed?",
      answer:
        "DOT physical pricing can change by promotion, employer requirements, and add-on services. Call (703) 361-4357 to confirm the current DOT exam price."
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
    },
    {
      question: "Does insurance cover weight loss medication?",
      answer:
        "Coverage varies by plan, diagnosis, medication, and pharmacy benefit. Altmed can discuss visit costs and help you understand what to ask your insurer."
    },
    {
      question: "How fast will I lose weight on semaglutide?",
      answer:
        "Results vary. Some patients notice appetite changes early, but safe weight loss depends on medication fit, nutrition, activity, dose adjustments, and follow-up."
    },
    {
      question: "What is the difference between Ozempic and Wegovy?",
      answer:
        "Both are semaglutide brand names, but they have different FDA indications, dosing paths, and coverage rules. A provider can explain what applies to your situation."
    },
    {
      question: "Do I need a prescription?",
      answer:
        "Yes. GLP-1 medications and other weight-loss prescriptions require a medical evaluation and provider oversight."
    }
  ],
  "semaglutide-weight-loss-manassas": [
    {
      question: "Who qualifies for semaglutide weight loss?",
      answer:
        "Qualification depends on BMI, health history, weight-related risks, contraindications, medications, and provider evaluation."
    },
    {
      question: "Is tirzepatide the same as semaglutide?",
      answer:
        "No. They are different medication classes with different mechanisms and brand names. The best option depends on your medical history and goals."
    },
    {
      question: "Can I do GLP-1 visits by telehealth?",
      answer:
        "Some follow-up conversations may be appropriate by telehealth, but initial evaluation, labs, vitals, and safety checks may require in-person care."
    }
  ],
  "pre-employment-physical-drug-test-manassas": [
    {
      question: "Can I get a pre-employment physical and drug test the same day?",
      answer:
        "Often yes. Same-day completion depends on the employer requirements, collection type, paperwork, and whether lab confirmation is needed."
    },
    {
      question: "What should I bring to a pre-employment physical?",
      answer:
        "Bring photo ID, employer paperwork, medication information, glasses or hearing aids if used, and any job-specific instructions."
    },
    {
      question: "Can employers set up recurring new-hire screening?",
      answer:
        "Yes. Employers can contact Altmed to define exam components, authorization forms, billing preferences, and result routing."
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
  "primary-care": "primary-care-manassas-va",
  "urgent-care": "urgent-care-manassas-va",
  "occupational-health": "occupational-health-clinic-manassas",
  "occupational-health/pre-employment-physical": "pre-employment-physical-drug-test-manassas",
  "occupational-health/dot-physical": "dot-physical-manassas-va",
  "occupational-health/drug-and-alcohol-test": "occupational-health/drug-alcohol-testing-manassas",
  "occupational-health/lab-tests": "occupational-health/lab-testing-manassas",
  "occupational-health/breadth-alcohol-testing": "occupational-health/drug-alcohol-testing-manassas",
  "occupational-health/breath-alcohol-testing": "occupational-health/drug-alcohol-testing-manassas",
  "occupational-health/x-ray-service": "occupational-health/xray-service",
  "occupational-health/vaccinations": "occupational-health/vaccinations-immunizations-manassas-va",
  "occupational-health/workers-compensation": "occupational-health/workers-compensation-injury-care-manassas",
  "third-party-administration-service": "third-party-administrator-service-manassas",
  "medical-review-officer": "mro-services-manassas",
  "corporate-wellness-and-health-fairs": "corporate-wellness-programs-manassas",
  weight_management: "medical-weight-loss-manassas",
  "weight-management/semaglutide-weight-loss-manassas": "semaglutide-weight-loss-manassas",
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

export const homepageTestimonials = [] as const;

export const featuredDoctors = [
  {
    name: "Dr. Gerald K. Lee, M.D., Ph.D.",
    specialty: "Medical Director",
    experience: "20+ years",
    cta: "Schedule with Dr. Lee",
    image: aiAssets.providerFallback
  },
  {
    name: "Garima Pokhrel, FNP-C, MSN",
    specialty: "Medical Provider",
    experience: "Primary & Occupational Care",
    cta: "Schedule with Garima",
    image: aiAssets.providerFallback
  },
  {
    name: "Madhu Panthi",
    specialty: "Medical Provider Assistant",
    experience: "Patient Support & Clinical Coordination",
    cta: "Meet Our Team",
    image: aiAssets.providerFallback
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

export const formsSections = [
  {
    title: "Occupational Health Forms",
    description:
      "Employer, hiring, and workplace-health forms frequently requested by HR teams, drivers, and safety-sensitive employees.",
    items: [
      {
        title: "Medical Exam Form (Police Officer and Fire Fighters)",
        description: "Virginia initial-hire medical standards examination form for public-safety roles.",
        href: "/forms/Medical%20Exam%20Form%202018%20forms.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "New Patient Registration (English)",
        description: "Online new-patient registration form for general clinic visits.",
        href: "https://form.jotform.com/240354059307049",
        actionLabel: "Complete Online"
      }
    ]
  },
  {
    title: "Medical Clearance Forms",
    description:
      "DOT and medical-clearance paperwork used when drivers need supporting records from specialists or treating clinicians.",
    items: [
      {
        title: "391.41 CMV Driver Medication Form MCSA-5895",
        description: "FMCSA driver medication form for DOT medical exam follow-up.",
        href: "/forms/medical_clearance/MCSA-5895%20Form%204-10-2020%20508.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "Non-Insulin-Treated Diabetes DOT Clearance Form",
        description: "DOT clearance form for non-insulin-treated diabetes medical review.",
        href: "/forms/medical_clearance/Non-Insulin-Treated%20Diabetes%20DOT%20Clearance%20Form.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "Vision Evaluation Report Form MCSA-5871",
        description: "FMCSA vision evaluation report used when a driver needs additional vision documentation.",
        href: "/forms/medical_clearance/Vision%20Evaluation%20Report%20Form%20MCSA-5871_0.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "Insulin-Treated Diabetes Mellitus Assessment Form MCSA-5870",
        description: "FMCSA insulin-treated diabetes mellitus assessment form MCSA-5870.",
        href: "/forms/medical_clearance/Insulin-Treated%20Diabetes%20Mellitus%20Assessment%20Form%20MCSA-5870.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "Return to Duty / Work DOT Clearance Form",
        description: "Return-to-duty and work-status clearance form for DOT physical follow-up.",
        href: "/forms/medical_clearance/Return%20to%20Duty%20_%20Work%20DOT%20Clearance%20Form.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "Hypertension DOT Clearance Form",
        description: "High-traffic DOT hypertension clearance form for blood pressure follow-up.",
        href: "/forms/medical_clearance/Hypertension%20DOT%20Clearance%20Form.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "Cardiac DOT Clearance Form",
        description: "Supporting cardiac clearance form for DOT medical exam follow-up.",
        href: "/forms/medical_clearance/Cardiac%20DOT%20Clearance%20Form%20.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "Obstructive Sleep Apnea DOT Clearance Form",
        description: "DOT sleep apnea clearance form for CPAP and sleep-study documentation.",
        href: "/forms/medical_clearance/Obstructive%20Sleep%20Apnea%20DOT%20Clearance%20Form.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "Medical DOT Clearance Form",
        description: "General medical clearance form for drivers who need supporting DOT documentation.",
        href: "/forms/medical_clearance/Medical%20DOT%20Clearance%20Form.pdf",
        actionLabel: "Download PDF"
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
        description: "Online intake packet for new Suboxone and addiction-treatment patients.",
        href: "https://form.jotform.com/230454861250148",
        actionLabel: "Complete Online"
      },
      {
        title: "Suboxone Follow Up",
        description: "Online follow-up form for returning Suboxone and addiction-treatment patients.",
        href: "https://form.jotform.com/230443970780054",
        actionLabel: "Complete Online"
      }
    ]
  },
  {
    title: "Weight Loss Forms",
    description: "Medical weight-loss intake paperwork for specialty visits.",
    items: [
      {
        title: "New Patient Weight Loss Intake Form",
        description: "Online intake form for new medical weight-loss patients.",
        href: "https://form.jotform.com/232264741654053",
        actionLabel: "Complete Online"
      }
    ]
  },
  {
    title: "Wellness Forms",
    description: "Wellness, hormone, IV therapy, and follow-up paperwork for specialty visits.",
    items: [
      {
        title: "IV Nutritional Therapy (Patient Registration & Informed Consent)",
        description: "Online IV nutritional therapy registration and informed consent form.",
        href: "https://form.jotform.com/240225387175053",
        actionLabel: "Complete Online"
      },
      {
        title: "Testosterone Therapy (Patient Registration & Informed Consent)",
        description: "Online testosterone therapy registration and informed consent form.",
        href: "https://form.jotform.com/240244624960454",
        actionLabel: "Complete Online"
      },
      {
        title: "Pain Management Follow Up Evaluation",
        description: "Online follow-up evaluation form for pain management patients.",
        href: "https://form.jotform.com/233404638270049",
        actionLabel: "Complete Online"
      }
    ]
  },
  {
    title: "Medical Release Forms",
    description:
      "Release and authorization forms for patients, employers, and authorized representatives.",
    items: [
      {
        title: "Company Authorization Form",
        description: "Authorization form used for employer-requested examination, treatment, testing, or injury services.",
        href: "/forms/Company%20Authorization%20Form%20New.pdf",
        actionLabel: "Download PDF"
      },
      {
        title: "Medical Records Request Form",
        description: "Request access to medical records or release support from Altmed.",
        href: "/patient-forms/medical-record-request-form",
        actionLabel: "Open Form"
      }
    ]
  }
] as const;

export const preservedPdfDownloads = [
  {
    title: "Documents to Bring for Your DOT Physical",
    description: "Driver checklist for reducing DOT physical delays.",
    href: "/forms/DOCUMENTS%20TO%20BRING%20IN%20FOR%20YOUR%20UPCOMING%20DOT%20PHYSICAL.pdf"
  },
  {
    title: "The FMCSA DOT Medical Exam Standard",
    description: "Preserved FMCSA medical exam standard reference PDF.",
    href: "/forms/The%20FMCS%20DOT%20Medical%20Exam%20Standard.pdf"
  },
  {
    title: "Audiogram Form",
    description: "Hearing-screening documentation form for occupational or driver exams.",
    href: "/forms/Audiogram%20form.pdf"
  },
  {
    title: "Vision Titmus Results Form",
    description: "Vision screening results form preserved from the legacy site.",
    href: "/forms/VisionTitmusResultsForm_blank.pdf"
  },
  {
    title: "Vision Snellen Results Form",
    description: "Snellen vision screening results form.",
    href: "/forms/VisionSnellenResultsForm_blank.pdf"
  },
  {
    title: "Vision Ishihara Results Form",
    description: "Ishihara color-vision screening results form.",
    href: "/forms/VisionIshiharaResultsForm_blank.pdf"
  },
  {
    title: "Lift Test Results Form",
    description: "Lift test results documentation for employer-requested evaluations.",
    href: "/forms/LiftTestResultsForm_blank.pdf"
  },
  {
    title: "Vaccine Administration Form",
    description: "Vaccine administration record used for immunization visits.",
    href: "/forms/rptVaccineAdministrationForm_blank.pdf"
  },
  {
    title: "New Patient Registration PDF",
    description: "Legacy downloadable new-patient registration packet.",
    href: "/forms/New%20Patient%20Registration.pdf"
  },
  {
    title: "New Suboxone Intake Forms PDF",
    description: "Legacy downloadable intake packet for new Suboxone patients.",
    href: "/forms/New%20Suboxone%20Intake%20forms.pdf"
  },
  {
    title: "Suboxone Follow Up PDF",
    description: "Legacy downloadable follow-up packet for returning Suboxone patients.",
    href: "/forms/suboxone%20follow%20up.pdf"
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
    label: "About",
    href: "/about",
    children: [
      {
        id: "about-team",
        label: "Our Team",
        href: "/about#team",
        description: "Meet Altmed's clinical leadership."
      },
      {
        id: "about-mission",
        label: "Our Mission",
        href: "/about#mission",
        description: "See the clinic's care philosophy."
      },
      {
        id: "about-providers",
        label: "Providers",
        href: "/providers",
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
    label: "Updates",
    href: "/updates"
  },
  {
    id: "contact",
    label: "Contact Us",
    href: "/contact"
  }
];

export const adminNav: AdminNavGroup[] = [
  {
    label: "Dashboard",
    items: [{ href: "/admin/dashboard", label: "Dashboard Overview" }]
  },
  {
    label: "Enrollments",
    items: [
      { href: "/admin/treatment-plans", label: "Treatment Plans" },
      { href: "/admin/treatment-plans/enrollments", label: "Enrollments" },
      { href: "/admin/treatment-plans/cash-inflow", label: "Cash Inflow" },
      { href: "/admin/treatment-plans/payments", label: "Payments" }
    ]
  },
  {
    label: "Content",
    items: [
      { href: "/admin/blog", label: "Blog Posts" },
      { href: "/admin/blog/categories", label: "Categories" },
      { href: "/admin/blog/tags", label: "Tags" },
      { href: "/admin/faq", label: "FAQs" },
      { href: "/admin/google-reviews", label: "Google Reviews" },
      { href: "/admin/announcements", label: "Notices & Updates" }
    ]
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/contact-submissions", label: "Contact Inbox" },
      { href: "/admin/providers", label: "Providers & Schedule" },
      { href: "/admin/site-settings", label: "Settings" }
    ]
  }
];
