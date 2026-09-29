/**
 * Configurações institucionais do site Pure Life Ministries Brasil.
 * Centraliza contatos, links de mídias e parâmetros configuráveis.
 */
export const siteConfig = {
  name: "Pure Life Ministries Brasil",
  tagline: "Liderando Cristãos à Pureza desde 1986",
  origin: "https://purelifebrasil.org",
  canonicalOrigin: "https://purelifebrasil.org",

  contact: {
    email: "contato@purelifebrasil.org",
    phone: "",
    // Número do WhatsApp oficial para pedidos de livros (preencher quando a cliente enviar)
    // Formato com código do país: "5561999999999"
    whatsapp: "",
    location: "Águas Lindas de Goiás – GO, Brasil (aproximadamente 50 km de Brasília)",
  },

  social: {
    youtube: "https://www.youtube.com/@purelifeministriesbrasil",
    instagram: "https://www.instagram.com/purelifebrasil",
  },

  residentialProgram: {
    durationMonths: 9,
    registrationFeeFormatted: "R$ 500,00",
    monthlyFeeFormatted: "R$ 1.200,00",
    location: "Campus Residencial em Águas Lindas de Goiás – GO",
  },

  donation: {
    // Chave PIX institucional manual (CNPJ/E-mail/Aleatória) para contingência
    manualPixKey: "",
    manualPixType: "CNPJ",
    bankName: "Banco do Brasil",
    accountHolder: "Pure Life Ministries Brasil",
  },
};

/**
 * Retorna o link de solicitação de livro via WhatsApp ou fallback para a página de contato.
 */
export function getWhatsAppOrderUrl(bookTitle: string, customNumber?: string): string {
  const number = customNumber || siteConfig.contact.whatsapp;
  const message = encodeURIComponent(
    `Olá! Gostaria de solicitar o livro "${bookTitle}" da Editora Pure Life Ministries Brasil.`
  );

  if (number && number.trim().length >= 10) {
    const cleanNumber = number.replace(/\D/g, "");
    return `https://wa.me/${cleanNumber}?text=${message}`;
  }

  // Fallback quando o WhatsApp ainda não foi preenchido pela cliente
  return `/contato/?assunto=Editora&livro=${encodeURIComponent(bookTitle)}`;
}
