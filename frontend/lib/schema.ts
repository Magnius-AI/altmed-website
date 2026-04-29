import { clinic } from "./site-content";

export function buildClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "MedicalOrganization", "LocalBusiness"],
    name: clinic.name,
    url: clinic.canonicalUrl,
    telephone: clinic.phone,
    email: clinic.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address,
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
    image: `${clinic.canonicalUrl}/legacy-assets/homepage/clinic-front-view.jpg`,
    priceRange: "$$",
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
      "Gainesville, VA",
      "Haymarket, VA",
      "Bristow, VA",
      "Woodbridge, VA",
      "Centreville, VA",
      "Dale City, VA",
      "Prince William County, VA",
      "Northern Virginia"
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
    ]
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
    "@type": "Service",
    name: input.name,
    description: input.description,
    areaServed: {
      "@type": "City",
      name: "Manassas"
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: input.url,
      servicePhone: clinic.phone
    },
    provider: {
      "@type": "MedicalClinic",
      name: clinic.name,
      url: clinic.canonicalUrl,
      telephone: clinic.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: clinic.address,
        addressLocality: "Manassas",
        addressRegion: "VA",
        postalCode: "20109",
        addressCountry: "US"
      }
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
