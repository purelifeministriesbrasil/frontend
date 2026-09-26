export interface NavItem {
  label: string;
  href: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TestimonialItem {
  name: string;
  location: string;
  program: string;
  text: string;
}

export interface BookItem {
  title: string;
  author: string;
  desc: string;
  color: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

export interface PodcastEpisode {
  title: string;
  time: string;
  type: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Sobre Nós", href: "/#sobre" },
  { label: "Programas", href: "/#programas" },
  { label: "Conferência", href: "/#conferencia" },
  { label: "Editora", href: "/#editora" },
  { label: "Doações", href: "/#doacoes" },
  { label: "Mídias", href: "/#midias" },
  { label: "Testemunhos", href: "/#testemunhos" },
  { label: "Campus", href: "/#campus" },
  { label: "Viagem EUA", href: "/#viagem" },
  { label: "Contato", href: "/#contato" },
  { label: "FAQ", href: "/#faq" },
];

export const FAQS: FaqItem[] = [
  {
    q: "Quem pode participar do Programa Residencial?",
    a: "O Programa Residencial é direcionado a homens cristãos que enfrentam desafios comportamentais, vícios ou padrões de pecado recorrentes e desejam transformação genuína fundamentada nas Escrituras. A admissão é feita após avaliação prévia.",
  },
  {
    q: "Qual é a duração do programa Online Vida Pura?",
    a: "O programa Online Vida Pura tem duração variável conforme o plano escolhido, com sessões semanais ao vivo com conselheiros certificados. Há também acompanhamento específico para esposas.",
  },
  {
    q: "A Pure Life Ministries Brasil é denominacional?",
    a: "Não somos afiliados a uma denominação específica. Nossa base teológica é a tradição Reformada e nossas portas estão abertas a cristãos de diversas igrejas protestantes evangélicas.",
  },
  {
    q: "Como é feita a inscrição no Programa Residencial?",
    a: "O processo inicia com o preenchimento do formulário de avaliação. Após análise pela equipe, o candidato é contatado para uma entrevista. A inscrição definitiva ocorre após aprovação.",
  },
  {
    q: "A Pure Life oferece aconselhamento para mulheres?",
    a: "Sim. O programa Online Vida Pura inclui acompanhamento dedicado para esposas, com conselheiras certificadas que compreendem os desafios específicos vividos por cônjuges.",
  },
  {
    q: "Onde fica o Programa Residencial?",
    a: "O campus residencial está localizado em Águas Lindas de Goiás – GO, a aproximadamente 50 km de Brasília, em ambiente reservado que favorece o recolhimento e a disciplina espiritual.",
  },
  {
    q: "O que é a Viagem PLM aos EUA?",
    a: "É uma viagem organizada pela PLM Brasil ao campus da Pure Life Ministries Internacional em Dry Ridge, Kentucky (EUA). Os participantes conhecem as instalações, assistem a ensinamentos, reúnem-se com a equipe americana e vivenciam de perto o modelo que inspirou o ministério brasileiro.",
  },
  {
    q: "Como posso apoiar financeiramente o ministério?",
    a: "Doações podem ser feitas via transferência bancária, cartão de crédito ou PIX. Cada contribuição sustenta diretamente o atendimento gratuito ou subsidiado a famílias sem recursos.",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Rafael M.",
    location: "Goiânia, GO",
    program: "Programa Residencial",
    text: "Cheguei ao PLM destruído por anos de vício e mentira. Nove meses de aconselhamento bíblico intenso me devolveram à família, à igreja e, acima de tudo, a Cristo. Não há palavras para descrever o que Deus fez aqui.",
  },
  {
    name: "Ana C.",
    location: "São Paulo, SP",
    program: "Online Vida Pura – Esposas",
    text: "Quando meu marido entrou no programa, eu estava prestes a desistir. O acompanhamento para esposas me ensinou a orar, a esperar e a perdoar de maneira bíblica. Nossa família foi restaurada.",
  },
  {
    name: "Marcos T.",
    location: "Belo Horizonte, MG",
    program: "Online Vida Pura",
    text: "A metodologia do Pr. Filipe é sólida teologicamente e humana na aplicação. Aprendi que a pureza não é conquista humana, mas fruto de rendição diária a Cristo. Mudou minha vida.",
  },
  {
    name: "Pastor João F.",
    location: "Curitiba, PR",
    program: "Conferência Anual",
    text: "A Conferência Anual da PLM é o evento mais consistente em aconselhamento bíblico reformado do Brasil. Levo minha equipe pastoral todos os anos. Formação densa, prática e profundamente cristocêntrica.",
  },
];

export const BOOKS: BookItem[] = [
  {
    title: "No Altar da Idolatria Sexual",
    author: "Steve Gallagher",
    desc: "O guia fundacional do ministério sobre santidade sexual segundo as Escrituras.",
    color: "#1C2530",
  },
  {
    title: "Cria em Mim um Coração Puro",
    author: "Kathy Gallagher",
    desc: "Um manual de esperança e fé para esposas que atravessam a dor da traição.",
    color: "#3B4C60",
  },
  {
    title: "O Impacto Pessoal e Social da Pornografia",
    author: "Paulo Adriano Muniz Gouvêa",
    desc: "Análise bíblica e pastoral das consequências do vício pornográfico no indivíduo e na sociedade.",
    color: "#044A82",
  },
  {
    title: "20 Verdades Que Me Ajudaram a Vencer o Vício em Pornografia",
    author: "Steve Gallagher",
    desc: "Testemunho e instrução bíblica prática para homens que buscam libertação genuína.",
    color: "#454A50",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { num: "01", title: "Avaliação", desc: "Formulário inicial e entrevista com nossa equipe de conselheiros para compreender a situação." },
  { num: "02", title: "Inscrição", desc: "Documentação, orientação e preparação para o ingresso no programa." },
  { num: "03", title: "Aconselhamento Bíblico", desc: "Sessões intensivas fundamentadas nas Escrituras com conselheiros certificados." },
  { num: "04", title: "Disciplina Espiritual", desc: "Oração, leitura sistemática da Bíblia, jejum e responsabilidade mútua no dia a dia." },
  { num: "05", title: "Transformação", desc: "Renovação progressiva da mente conforme Romanos 12.2, com evidências práticas de mudança." },
  { num: "06", title: "Formatura", desc: "Conclusão do programa, integração à igreja local e suporte contínuo pós-programa." },
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  { title: "Ensino bíblico para uma vida de pureza", time: "52min", type: "Conferência" },
  { title: "Sexo: Criação de Deus ou do homem? — Pr. Paulo Gouvêa", time: "1h", type: "Participação" },
  { title: "Quando o Pecado do Marido Despedaça o Coração — Railca Gouvêa", time: "1h 35min", type: "Participação" },
  { title: "Há uma Saída — 20 Verdades Contra o Vício Pornográfico", time: "10min", type: "Participação" },
];
