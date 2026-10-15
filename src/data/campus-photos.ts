import fachadaCasaPrincipalImg from "@/assets/images/campus/fachada-casa-principal.webp";
import vistaPanoramicaImg from "@/assets/images/campus/vista-panoramica.webp";
import salaoEstudoBiblicoImg from "@/assets/images/campus/salao-estudo-biblico.webp";
import refeitorioImg from "@/assets/images/campus/refeitorio.webp";
import bibliotecaImg from "@/assets/images/campus/biblioteca.webp";
import salaPastoralImg from "@/assets/images/campus/sala-pastoral.webp";
import salaDeConvivenciaImg from "@/assets/images/campus/sala-de-convivencia.webp";
import varandaCorredorImg from "@/assets/images/campus/varanda-corredor.webp";
import varandaPatioImg from "@/assets/images/campus/varanda-patio.webp";
import varandaLateralImg from "@/assets/images/campus/varanda-lateral.webp";
import casaComCruzImg from "@/assets/images/campus/casa-com-cruz.webp";
import gramadoPalmeirasImg from "@/assets/images/campus/gramado-palmeiras.webp";
import pomarMangueirasImg from "@/assets/images/campus/pomar-mangueiras.webp";

/**
 * Fotografias reais da sede em Águas Lindas de Goiás – GO (fontes em src/assets/images/campus/).
 * O Astro gera AVIF/WebP em vários tamanhos no build; para trocar uma foto, substitua o arquivo mantendo o nome.
 */
export interface CampusPhoto {
  id: string;
  src: ImageMetadata;
  alt: string;
  title: string;
  desc: string;
}

export const campusPhotos: CampusPhoto[] = [
  {
    id: "fachada",
    src: fachadaCasaPrincipalImg,
    alt: "Casa principal do campus com telhado de cerâmica, varanda ampla, árvores e palmeiras sob céu azul",
    title: "Casa Principal",
    desc: "Sede do programa residencial, cercada por área verde e muros que preservam a privacidade dos participantes.",
  },
  {
    id: "vista-panoramica",
    src: vistaPanoramicaImg,
    alt: "Vista panorâmica do terreno do campus com gramado aparado, palmeiras e as construções ao fundo",
    title: "Refúgio em Meio à Natureza",
    desc: "Ambiente silencioso e sereno, propício ao recolhimento e à oração, a cerca de 50 km de Brasília.",
  },
  {
    id: "salao-estudo",
    src: salaoEstudoBiblicoImg,
    alt: "Homens sentados em círculo durante estudo bíblico no salão principal, com uma grande cruz de madeira na parede",
    title: "Salão de Estudo Bíblico",
    desc: "Exposição sistemática das Escrituras, louvor e partilha em grupo durante a semana.",
  },
  {
    id: "refeitorio",
    src: refeitorioImg,
    alt: "Participantes, equipe e família visitante almoçando juntos em uma longa mesa de madeira no refeitório",
    title: "Refeitório Comunitário",
    desc: "Refeições completas compartilhadas à mesa, fortalecendo a comunhão e a vida em família.",
  },
  {
    id: "biblioteca",
    src: bibliotecaImg,
    alt: "Estante de madeira com livros cristãos em uma sala iluminada pela luz natural da janela",
    title: "Biblioteca",
    desc: "Acervo de literatura cristã para estudo pessoal, leitura devocional e preparo das lições.",
  },
  {
    id: "sala-pastoral",
    src: salaPastoralImg,
    alt: "Sala da equipe pastoral com mesas de trabalho, livros e acesso à área externa",
    title: "Sala Pastoral",
    desc: "Espaço da equipe para acompanhamento individual, planejamento e aconselhamento.",
  },
  {
    id: "convivencia",
    src: salaDeConvivenciaImg,
    alt: "Sala de convivência com sofás, banco de madeira e uma coroa de espinhos decorativa na parede",
    title: "Sala de Convivência",
    desc: "Ambiente de descanso e conversa fraterna entre os participantes.",
  },
  {
    id: "varanda-corredor",
    src: varandaCorredorImg,
    alt: "Corredor coberto com telhado de madeira e portas em arco que dão acesso às salas do campus",
    title: "Corredor das Salas",
    desc: "Acesso coberto às salas de estudo, aconselhamento e alojamentos.",
  },
  {
    id: "varanda-patio",
    src: varandaPatioImg,
    alt: "Varanda com pilares brancos voltada para o pátio interno e a van do ministério estacionada",
    title: "Varanda e Pátio",
    desc: "Área coberta que integra as construções ao pátio interno do campus.",
  },
  {
    id: "varanda-lateral",
    src: varandaLateralImg,
    alt: "Varanda lateral da casa principal com piso cerâmico, porta em arco e vista para o terreno",
    title: "Varanda Lateral",
    desc: "Espaço arejado para leitura, momentos de oração e conversas pastorais.",
  },
  {
    id: "casa-cruz",
    src: casaComCruzImg,
    alt: "Construção anexa com uma cruz de madeira na fachada, cercada por gramado e árvores",
    title: "Casa Anexa",
    desc: "Construção de apoio em meio ao gramado, com a cruz de Cristo em destaque na fachada.",
  },
  {
    id: "gramado",
    src: gramadoPalmeirasImg,
    alt: "Gramado extenso do campus com palmeiras, árvores frondosas e céu com nuvens",
    title: "Gramado e Palmeiras",
    desc: "Área verde ampla para caminhadas, trabalho manual e atividades ao ar livre.",
  },
  {
    id: "pomar",
    src: pomarMangueirasImg,
    alt: "Terreno aberto do campus com mangueiras e árvores ao longo do muro",
    title: "Pomar e Labor",
    desc: "Rotina equilibrada de trabalho manual, cuidado do terreno e descanso.",
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
