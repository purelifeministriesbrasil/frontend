/** Linha do tempo do ministério exibida em /sobre/ (fonte: site anterior da PLM Brasil). */
export interface TimelineEvent {
  date: string;
  title: string;
  desc?: string;
  /** Marcos da PLM no Brasil recebem destaque visual. */
  brazil?: boolean;
}

export const timeline: TimelineEvent[] = [
  { date: "Abril 1986", title: "Pure Life Ministries é fundada como um grupo de apoio em Sacramento, Califórnia." },
  {
    date: "Junho 1986",
    title: "O 700 Club filma o testemunho de Steve e Kathy Gallagher.",
    desc: "A primeira de várias aparições na rede CBN.",
  },
  {
    date: "Dezembro 1986",
    title: "Steve Gallagher escreve a versão original de \"No Altar da Idolatria Sexual\".",
    desc: "O livro se torna a obra principal do ministério, com cerca de 200 mil cópias em circulação no mundo.",
  },
  { date: "Janeiro 1988", title: "Steve Gallagher compartilha seu testemunho no Oprah Winfrey Show." },
  { date: "Janeiro 1989", title: "Pure Life Ministries muda-se para o Kentucky." },
  { date: "Janeiro 1990", title: "O Programa Residencial é lançado com 6 moradores." },
  { date: "Maio 1991", title: "Steve Gallagher participa de uma série especial em três partes no programa Focus on the Family." },
  {
    date: "Agosto 1991",
    title: "Começa o programa Vencedores em Casa.",
    desc: "Mais uma opção para quem não podia ingressar no Programa Residencial.",
  },
  { date: "Dezembro 1991", title: "A PLM adquire instalações de 45 acres no norte do Kentucky." },
  {
    date: "Junho 1993",
    title: "Steve Gallagher escreve \"The Walk of Repentance\".",
    desc: "O estudo bíblico se torna a lição de casa fundamental dos programas de aconselhamento.",
  },
  {
    date: "Agosto 1998",
    title: "Kathy Gallagher escreve \"When His Secret Sin Breaks Your Heart\".",
    desc: "O livro ajudou milhares de esposas feridas a atravessar a provação do pecado sexual do marido.",
  },
  { date: "Abril 2000", title: "Realizada a primeira Conferência Anual da Pure Life Ministries." },
  {
    date: "Maio 2001",
    title: "A primeira conferência A Call To Purity é realizada em Reading, Pensilvânia.",
    desc: "Desde então, milhares de pessoas foram desafiadas a se render totalmente a Deus.",
  },
  { date: "Fevereiro 2002", title: "O Programa Residencial passa a atender 40 homens." },
  { date: "Fevereiro 2004", title: "Um novo dormitório amplia o Programa Residencial para 55 homens." },
  { date: "Janeiro 2010", title: "A inauguração do anexo amplia o Programa Residencial para 75 homens." },
  { date: "2019", title: "Pure Life Ministries chega ao Brasil, na cidade de Cuiabá.", brazil: true },
  {
    date: "2021",
    title: "O ministério é transferido para Brazlândia, no Distrito Federal, e inicia seu programa residencial.",
    brazil: true,
  },
  {
    date: "2023",
    title: "A PLM Brasil muda-se para uma chácara em Águas Lindas de Goiás.",
    desc: "O Programa Residencial é ampliado para 10 alunos.",
    brazil: true,
  },
];
