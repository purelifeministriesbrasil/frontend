/**
 * Viagem / Conferência Pure Life Ministries EUA 2027 (fonte: landing page oficial do ministério).
 * Para mudar um lote, preço ou data, edite somente este arquivo.
 */
export const usaTrip = {
  title: "Conferência Pure Life Ministries EUA 2027",
  tagline: "Uma jornada de fé e renovação",
  destination: "Cincinnati, Ohio & Kentucky – EUA",
  travelDates: "20 a 30 de abril de 2027",
  conferenceDates: "23 e 24 de abril de 2027",
  seats: 30,
  /** Pagamento seguro na plataforma da SEBI (parcelado em até 10x). */
  paymentUrl: "https://aluno.sebi.com.br/pagamento/150-viagem-pure-life-eua-parcelado",

  included: [
    { title: "Passagem aérea", desc: "Voos de ida e volta saindo do Brasil inclusos no pacote." },
    { title: "Hospedagem", desc: "Acomodação em comunidade acolhedora em Cincinnati, Ohio." },
    { title: "Traslado completo", desc: "Transporte terrestre durante todos os eventos da programação." },
    {
      title: "Ingressos para visitação",
      desc: "Conferência PLM EUA, Museu da Força Aérea Americana, Ark Encounter e Creation Museum.",
    },
    { title: "Dois estados", desc: "Atividades em Kentucky e Ohio, explorando o melhor de cada região." },
    { title: "Apenas 30 vagas", desc: "Grupo exclusivo e limitado para uma experiência mais transformadora." },
  ],

  highlights: [
    {
      title: "Ark Encounter",
      desc: "A reconstrução em tamanho real da Arca de Noé, uma maravilha da engenharia moderna e um testemunho de fé.",
    },
    {
      title: "Conferência Pure Life",
      desc: "Dois dias intensos de conferência, com palestrantes internacionais e momentos de adoração, focados em santidade e restauração.",
    },
    { title: "Creation Museum", desc: "Onde a Bíblia ganha vida através de exposições imersivas." },
  ],

  schedule: [
    { date: "20 abr", title: "Chegada e recepção", desc: "Chegada em Cincinnati, Ohio. Recepção e acomodação na comunidade." },
    {
      date: "23–24 abr",
      title: "Conferência Pure Life Ministries EUA",
      desc: "Sessões, workshops espirituais e momentos de adoração na sede do ministério.",
    },
    {
      date: "A definir",
      title: "Visitas culturais",
      desc: "Ark Encounter, Creation Museum e Museu da Força Aérea Americana.",
    },
    { date: "30 abr", title: "Retorno ao Brasil", desc: "Viagem de volta com memórias e experiências transformadoras." },
  ],

  lots: [
    { name: "Primeiro lote", price: "R$ 9.500,00", note: "Lote encerrado em 31/08/2026.", closed: true },
    { name: "Segundo lote", price: "R$ 11.000,00", note: "Válido até 31/10/2026 ou enquanto durarem as vagas.", closed: false, featured: true },
    { name: "Terceiro lote", price: "R$ 12.500,00", note: "Válido até 30/11/2026.", closed: false },
    { name: "Quarto lote", price: "R$ 14.000,00", note: "Sujeito à disponibilidade de vagas.", closed: false },
  ],
  installments: "Em até 10x sem juros nos principais cartões",

  notes: [
    {
      title: "Visto americano",
      desc: "É obrigatório possuir visto B1/B2 válido para o embarque. A responsabilidade pelo documento é do viajante.",
    },
    {
      title: "Alimentação",
      desc: "A alimentação não está inclusa no pacote, o que dá liberdade de escolha gastronômica local.",
    },
    {
      title: "Crianças até 2 anos",
      desc: "Para famílias com bebês, fazemos orçamentos personalizados pelo WhatsApp.",
    },
    {
      title: "Vagas limitadas",
      desc: "Pelo caráter exclusivo da hospedagem, o grupo é limitado a 30 participantes.",
    },
  ],

  faq: [
    {
      q: "Preciso de visto?",
      a: "Sim. É obrigatório possuir um visto americano de turista (B1/B2) válido. A obtenção do visto é responsabilidade do participante.",
    },
    {
      q: "O que está incluso no transporte?",
      a: "Passagens aéreas de ida e volta saindo do Brasil e todo o transporte terrestre nos EUA para as atividades oficiais, incluindo traslados aeroporto–hospedagem e visitas aos museus.",
    },
    {
      q: "Como funciona o parcelamento?",
      a: "O investimento pode ser parcelado em até 10 vezes sem juros no cartão de crédito. Outras formas de pagamento podem ser combinadas com a equipe pelo WhatsApp.",
    },
  ],
};
