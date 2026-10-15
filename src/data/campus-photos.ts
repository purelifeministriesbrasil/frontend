/**
 * Fotografias reais da sede em Águas Lindas de Goiás – GO (arquivos em public/images/purelife/).
 * Para trocar uma foto, substitua o .webp mantendo o nome e ajuste width/height se a proporção mudar.
 */
export interface CampusPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  desc: string;
  width: number;
  height: number;
}

export const campusPhotos: CampusPhoto[] = [
  {
    id: "fachada",
    src: "/images/purelife/campus-fachada-casa-principal.webp",
    alt: "Casa principal do campus com telhado de cerâmica, varanda ampla, árvores e palmeiras sob céu azul",
    title: "Casa Principal",
    desc: "Sede do programa residencial, cercada por área verde e muros que preservam a privacidade dos participantes.",
    width: 1200,
    height: 675,
  },
  {
    id: "vista-panoramica",
    src: "/images/purelife/campus-vista-panoramica.webp",
    alt: "Vista panorâmica do terreno do campus com gramado aparado, palmeiras e as construções ao fundo",
    title: "Refúgio em Meio à Natureza",
    desc: "Ambiente silencioso e sereno, propício ao recolhimento e à oração, a cerca de 50 km de Brasília.",
    width: 1200,
    height: 900,
  },
  {
    id: "salao-estudo",
    src: "/images/purelife/campus-salao-estudo-biblico.webp",
    alt: "Homens sentados em círculo durante estudo bíblico no salão principal, com uma grande cruz de madeira na parede",
    title: "Salão de Estudo Bíblico",
    desc: "Exposição sistemática das Escrituras, louvor e partilha em grupo durante a semana.",
    width: 1200,
    height: 900,
  },
  {
    id: "refeitorio",
    src: "/images/purelife/campus-refeitorio.webp",
    alt: "Participantes, equipe e família visitante almoçando juntos em uma longa mesa de madeira no refeitório",
    title: "Refeitório Comunitário",
    desc: "Refeições completas compartilhadas à mesa, fortalecendo a comunhão e a vida em família.",
    width: 1200,
    height: 900,
  },
  {
    id: "biblioteca",
    src: "/images/purelife/campus-biblioteca.webp",
    alt: "Estante de madeira com livros cristãos em uma sala iluminada pela luz natural da janela",
    title: "Biblioteca",
    desc: "Acervo de literatura cristã para estudo pessoal, leitura devocional e preparo das lições.",
    width: 900,
    height: 1200,
  },
  {
    id: "sala-pastoral",
    src: "/images/purelife/campus-sala-pastoral.webp",
    alt: "Sala da equipe pastoral com mesas de trabalho, livros e acesso à área externa",
    title: "Sala Pastoral",
    desc: "Espaço da equipe para acompanhamento individual, planejamento e aconselhamento.",
    width: 900,
    height: 1200,
  },
  {
    id: "convivencia",
    src: "/images/purelife/campus-sala-de-convivencia.webp",
    alt: "Sala de convivência com sofás, banco de madeira e uma coroa de espinhos decorativa na parede",
    title: "Sala de Convivência",
    desc: "Ambiente de descanso e conversa fraterna entre os participantes.",
    width: 900,
    height: 1200,
  },
  {
    id: "varanda-corredor",
    src: "/images/purelife/campus-varanda-corredor.webp",
    alt: "Corredor coberto com telhado de madeira e portas em arco que dão acesso às salas do campus",
    title: "Corredor das Salas",
    desc: "Acesso coberto às salas de estudo, aconselhamento e alojamentos.",
    width: 900,
    height: 1200,
  },
  {
    id: "varanda-patio",
    src: "/images/purelife/campus-varanda-patio.webp",
    alt: "Varanda com pilares brancos voltada para o pátio interno e a van do ministério estacionada",
    title: "Varanda e Pátio",
    desc: "Área coberta que integra as construções ao pátio interno do campus.",
    width: 900,
    height: 1200,
  },
  {
    id: "varanda-lateral",
    src: "/images/purelife/campus-varanda-lateral.webp",
    alt: "Varanda lateral da casa principal com piso cerâmico, porta em arco e vista para o terreno",
    title: "Varanda Lateral",
    desc: "Espaço arejado para leitura, momentos de oração e conversas pastorais.",
    width: 900,
    height: 1200,
  },
  {
    id: "casa-cruz",
    src: "/images/purelife/campus-casa-com-cruz.webp",
    alt: "Construção anexa com uma cruz de madeira na fachada, cercada por gramado e árvores",
    title: "Casa Anexa",
    desc: "Construção de apoio em meio ao gramado, com a cruz de Cristo em destaque na fachada.",
    width: 900,
    height: 1200,
  },
  {
    id: "gramado",
    src: "/images/purelife/campus-gramado-palmeiras.webp",
    alt: "Gramado extenso do campus com palmeiras, árvores frondosas e céu com nuvens",
    title: "Gramado e Palmeiras",
    desc: "Área verde ampla para caminhadas, trabalho manual e atividades ao ar livre.",
    width: 1200,
    height: 900,
  },
  {
    id: "pomar",
    src: "/images/purelife/campus-pomar-mangueiras.webp",
    alt: "Terreno aberto do campus com mangueiras e árvores ao longo do muro",
    title: "Pomar e Labor",
    desc: "Rotina equilibrada de trabalho manual, cuidado do terreno e descanso.",
    width: 900,
    height: 1200,
  },
];

/** Seleciona fotos pela ordem dos ids informados (ids desconhecidos geram erro no build). */
export function pickCampusPhotos(ids: string[]): CampusPhoto[] {
  return ids.map((id) => {
    const photo = campusPhotos.find((item) => item.id === id);
    if (!photo) throw new Error(`Foto do campus inexistente: ${id}`);
    return photo;
  });
}
