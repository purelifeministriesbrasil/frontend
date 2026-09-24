export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Pure Life Ministries Brasil",
    "url": "https://purelifebrasil.org",
    "logo": "https://purelifebrasil.org/favicon.svg",
    "sameAs": [
      "https://www.youtube.com/@purelifeministriesbrasil",
      "https://www.instagram.com/purelifebrasil"
    ],
    "description": "Ministério bíblico dedicado à santidade, aconselhamento confidencial e restauração de vidas contra o pecado sexual desde 1986.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Águas Lindas de Goiás",
      "addressRegion": "GO",
      "addressCountry": "BR"
    }
  };
}
