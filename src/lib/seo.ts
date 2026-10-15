import { siteConfig } from "@/lib/site-config";

export function buildOrganizationJsonLd() {
  const { address } = siteConfig.contact;
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": siteConfig.name,
    "url": siteConfig.canonicalOrigin,
    "logo": `${siteConfig.canonicalOrigin}/favicon.svg`,
    "email": siteConfig.contact.email,
    "telephone": `+${siteConfig.contact.whatsapp.number}`,
    "sameAs": [siteConfig.social.youtube, siteConfig.social.instagram],
    "description": "Ministério bíblico dedicado à santidade, aconselhamento confidencial e restauração de vidas contra o pecado sexual desde 1986.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${address.street} - ${address.neighborhood}`,
      "addressLocality": address.city,
      "addressRegion": address.region,
      "postalCode": address.postalCode,
      "addressCountry": "BR"
    }
  };
}
