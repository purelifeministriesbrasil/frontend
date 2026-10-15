/**
 * Configurações institucionais do site Pure Life Ministries Brasil.
 * Fonte única de contatos, links externos e parâmetros de negócio exibidos no site.
 */

/** Monta um link `wa.me` a partir de um número com DDI (apenas dígitos) e mensagem opcional. */
export function whatsappUrl(number: string, message?: string): string {
  const digits = number.replace(/\D/g, "");
  return message ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : `https://wa.me/${digits}`;
}

const pastoralWhatsApp = "5561995661936";
const courseWhatsApp = "556291191098";

export const siteConfig = {
  name: "Pure Life Ministries Brasil",
  descriptor: "Escola de Aconselhamento Bíblico Cristão",
  tagline: "Liderando Cristãos à Pureza desde 1986",
  origin: "https://purelifeministriesbrasil.org",
  canonicalOrigin: "https://purelifeministriesbrasil.org",

  /** Base da API (Cloudflare Worker). Vazio = mesma origem (rota do Worker no domínio do site). */
  apiBaseUrl: (import.meta.env.PUBLIC_API_URL ?? "").trim().replace(/\/+$/, ""),
  /** Site key pública do Turnstile (não é segredo; a secret fica só no Worker). */
  turnstileSiteKey: (import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? "").trim(),
  /** Versão vigente da Política de Privacidade registrada nos consentimentos. */
  privacyPolicyVersion: "2026-09-19",

  /** Apresentação institucional oficial (Home e página Sobre). */
  aboutParagraphs: [
    "Pure Life Ministries Brasil é um programa residencial de aconselhamento bíblico dedicado à restauração de homens e famílias que enfrentam pecados de controle e vícios comportamentais.",
    "Fundada sobre a convicção de que a Bíblia é suficiente para cada desafio da alma humana, nossa metodologia combina exposição sistemática das Escrituras, aconselhamento individual, responsabilidade comunitária e disciplina espiritual intensiva.",
    "Somos afiliados à Pure Life Ministries Internacional (EUA) e adaptamos com fidelidade o modelo comprovado por mais de quatro décadas de transformação ao contexto cultural e eclesial brasileiro.",
  ],

  contact: {
    /** E-mail oficial geral e pastoral (também recebe os alertas de triagem e contato no backend). */
    email: "purelifeministriesbrasil1986@gmail.com",
    /** WhatsApp geral, triagem e atendimento pastoral. */
    whatsapp: {
      number: pastoralWhatsApp,
      display: "(61) 99566-1936",
      url: whatsappUrl(pastoralWhatsApp),
    },
    /** WhatsApp da livraria/editora (mesmo número do atendimento geral). */
    bookstoreWhatsapp: {
      number: pastoralWhatsApp,
      display: "(61) 99566-1936",
      url: whatsappUrl(pastoralWhatsApp),
    },
    /** WhatsApp exclusivo da Pós-Graduação. */
    courseWhatsapp: {
      number: courseWhatsApp,
      display: "+55 62 9119-1098",
      url: whatsappUrl(courseWhatsApp),
    },
    address: {
      street: "Rua 27, quadra 1, lote 05",
      neighborhood: "Setor Colonial Parque II - Padre Lúcio",
      city: "Águas Lindas de Goiás",
      region: "GO",
      postalCode: "72910-990",
      full: "Rua 27, quadra 1, lote 05 - Setor Colonial Parque II - Padre Lúcio, Águas Lindas de Goiás - GO, CEP 72910-990",
    },
    location: "Águas Lindas de Goiás – GO, Brasil (aproximadamente 50 km de Brasília)",
  },

  social: {
    youtube: "https://www.youtube.com/@purelifebrasil",
    instagram: "https://www.instagram.com/purelifebrasil",
  },

  media: {
    featuredVideo: {
      youtubeId: "fyu96zTFWgs",
      url: "https://youtu.be/fyu96zTFWgs",
      title: "Quando o pecado do seu marido despedaça o seu coração | Railca Gouvea",
    },
    pastConferences: {
      youtubeId: "Li1O8kZlfQU",
      url: "https://www.youtube.com/watch?v=Li1O8kZlfQU&list=PLCIZvG7Xy4Fg",
    },
  },

  onlineProgram: {
    name: "Online Vida Pura",
    enrollmentUrl: "https://go.hotmart.com/S98617390X",
  },

  course: {
    title: "Pós-Graduação em Aconselhamento Bíblico e Distúrbios da Sexualidade",
    durationLabel: "6 Meses",
    modalityLabel: "100% Online",
  },

  residentialProgram: {
    durationMonths: 9,
    registrationFeeFormatted: "R$ 500,00",
    monthlyFeeFormatted: "R$ 1.200,00",
    location: "Campus Residencial em Águas Lindas de Goiás – GO",
    /** Regra de negócio: a triagem é gratuita; a taxa só é cobrada após entrevista e aprovação. */
    feeNotice:
      "O envio da triagem online é gratuito e confidencial. A taxa de inscrição de R$ 500,00 é paga somente após a entrevista e a aprovação pastoral — não há nenhuma cobrança no preenchimento da triagem.",
  },

  donation: {
    /**
     * Liga o formulário de PIX dinâmico (QR Code gerado pela API). Enquanto o gateway estiver
     * em validação o padrão é `false` e o site mostra a chave PIX institucional (CNPJ).
     */
    pixGatewayEnabled: (import.meta.env.PUBLIC_ENABLE_PIX_GATEWAY ?? "").trim().toLowerCase() === "true",
    manualPixKey: "97.548.932/0001-05",
    manualPixType: "CNPJ",
    accountHolder: "Pure Life Ministries Brasil",
  },
};

/** Link de pedido de livro pelo WhatsApp da livraria, com o título já preenchido. */
export function getWhatsAppOrderUrl(bookTitle: string): string {
  return whatsappUrl(
    siteConfig.contact.bookstoreWhatsapp.number,
    `Olá! Gostaria de solicitar o livro "${bookTitle}" da Editora Pure Life Ministries Brasil.`
  );
}
