// frontend/src/lib/sanity/queries.ts (§4.3, §13.3)
// Queries GROQ otimizadas: uma query por página, nunca por componente

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    title,
    description,
    heroHeadline,
    heroSubtitle,
    contactEmail,
    contactPhone,
    address,
    heroBackgroundImage {
      asset->{ url },
      alt,
      decorative
    }
  }
`;

export const NAVIGATION_QUERY = `
  *[_type == "navigation"][0] {
    headerLinks[] {
      label,
      href,
      isExternal
    },
    ctaButton {
      label,
      href
    }
  }
`;

export const PROGRAMS_LIST_QUERY = `
  *[_type == "program"] | order(name asc) {
    name,
    "slug": slug.current,
    headline,
    summary,
    format,
    duration,
    featuredImage {
      asset->{ url },
      alt
    }
  }
`;

export const PROGRAM_BY_SLUG_QUERY = `
  *[_type == "program" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    headline,
    summary,
    format,
    duration,
    featuredImage {
      asset->{ url },
      alt
    },
    processSteps[] {
      stepNumber,
      title,
      description
    },
    detailedContent,
    seo
  }
`;

export const FAQS_QUERY = `
  *[_type == "faq"] | order(order asc) {
    question,
    answer,
    category,
    order
  }
`;

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && publicationConsent == true] | order(publishedAt desc) {
    shortQuote,
    displayName,
    location,
    persona,
    "relatedProgram": relatedProgram->name
  }
`;
