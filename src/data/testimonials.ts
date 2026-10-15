/**
 * Testemunhos exibidos na Home (seção "Um legado de transformações").
 *
 * Fonte atual: testemunhos oficiais publicados em purelifeministriesbrasil.org (site anterior).
 * SUBSTITUIR AQUI pelos novos testemunhos enviados pela diretoria: basta editar, remover ou
 * acrescentar itens nesta lista, sem mexer no componente. Publique somente relatos com
 * autorização por escrito do autor e identifique-o apenas como ele autorizou (ex.: iniciais).
 */
export interface Testimonial {
  /** Nome ou iniciais exatamente como autorizado pelo autor. */
  name: string;
  /** Cidade/estado ou país, quando autorizado. */
  location?: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Cleber S. M.",
    location: "RS - BR",
    text: "Após 12 anos de casamento, finalmente me sinto inteiro no relacionamento com minha esposa e meus filhos. Obrigado, Pure Life Ministries Brasil, vocês foram fundamentais para minha vitória sobre o pecado sexual e para a restauração do meu casamento!",
  },
  {
    name: "James",
    location: "New Richmond, WI",
    text: "Obrigado, Pure Life Ministries! Não sou o mesmo homem com quem minha esposa se casou há dez anos. Pela primeira vez em meu casamento, sei que amo minha esposa.",
  },
  {
    name: "Sue",
    text: "O período no PLM mudou nossas vidas para sempre. Ele nunca antes fez eu me sentir segura, protegida e realmente amada, mas agora sim. É maravilhoso!",
  },
  {
    name: "Jason",
    location: "West Falls, NY",
    text: "O programa não apenas me ajudou a estabelecer um relacionamento real com Jesus, mas também me deu muitas ferramentas para ser capaz de derrotar as tentações sexuais antes que elas me alcancem.",
  },
  {
    name: "Michael",
    location: "Milbank, SD",
    text: "Este programa superou minhas expectativas. Eu encorajaria qualquer pessoa a fazer o curso e exortaria a se concentrarem em seu relacionamento com Deus em primeiro lugar.",
  },
  {
    name: "David",
    location: "Myrtle Beach, SC",
    text: "A Pure Life Ministries tem uma liderança comprovada e madura que sabe como lidar com esse problema. Eles praticam o que pregam e são verdadeiros exemplos de discípulos de Cristo.",
  },
  {
    name: "Bernard",
    location: "Chicago, IL",
    text: "Desafia os participantes a serem verdadeiros discípulos de Jesus. Sem disparates. A pura Palavra – tornando-os homens de Deus, vencedores, fiéis a Deus até o fim.",
  },
  {
    name: "Lee",
    location: "Payne, OH",
    text: "Há uma grande paixão nos sermões que ouvimos. Não se trata apenas de brincar de igreja. Eu penso em onde eu estaria sem a Pure Life, e isso me faz estremecer.",
  },
];
