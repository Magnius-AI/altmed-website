import { clinic } from "./site-content";

export function buildClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: clinic.name,
    url: clinic.canonicalUrl,
    logo: `${clinic.canonicalUrl}/assets/img/logo.png`,
    telephone: clinic.phone,
    email: clinic.email,
    description:
      "Walk-in clinic in Manassas VA offering urgent care, DOT physicals, medical weight loss, occupational health, and telehealth services.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "8551 Rixlew Lane Suite 140",
      addressLocality: "Manassas",
      addressRegion: "VA",
      postalCode: "20109",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.coordinates.latitude,
      longitude: clinic.coordinates.longitude
    },
    image: `${clinic.canonicalUrl}/assets/img/homepage/clinic-front-view.jpg`,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Insurance",
    hasMap: clinic.mapUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00"
      }
    ],
    areaServed: [
      "Manassas, VA",
      "Manassas Park, VA",
      "Gainesville, VA",
      "Haymarket, VA",
      "Woodbridge, VA",
      "Prince William County, VA"
    ],
    availableLanguage: clinic.languages,
    medicalSpecialty: [
      "Urgent Care",
      "Primary Care",
      "Occupational Medicine",
      "Addiction Medicine",
      "Preventive Medicine",
      "Weight Management"
    ],
    sameAs: [
      "https://www.facebook.com/p/Altmed-Medical-Center-100050878933887/"
    ],
    employee: {
      "@type": "Physician",
      name: "Gerald K. Lee",
      worksFor: {
        "@type": "MedicalClinic",
        name: clinic.name
      },
      medicalSpecialty: [
        "Primary Care",
        "Urgent Care",
        "Occupational Medicine",
        "Addiction Medicine",
        "Weight Management"
      ]
    }
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item
    }))
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: clinic.name,
    url: clinic.canonicalUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${clinic.canonicalUrl}/health-blogs?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function buildServiceSchema(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalSpecialty",
    name: input.name,
    url: input.url,
    description: input.description,
    provider: {
      "@type": "MedicalBusiness",
      name: clinic.name,
      url: clinic.canonicalUrl
    }
  };
}

export function buildFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      }
    }))
  };
}
