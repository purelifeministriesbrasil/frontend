import { siteConfig } from "@/lib/site-config";

/** Programas exibidos na Home e em /programas/ (mesma fonte para as duas páginas). */
export interface Program {
  id: "residencial" | "online" | "esposas";
  badge: string;
  badgeVariant: "blue" | "dark";
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  leaderName?: string;
  ctaText: string;
  ctaHref: string;
  ctaExternal?: boolean;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

const { residentialProgram, onlineProgram } = siteConfig;

export const programs: Program[] = [
  {
    id: "residencial",
    badge: "Imersão Presencial",
    badgeVariant: "blue",
    title: "Programa Residencial",
    subtitle: `${residentialProgram.durationMonths} meses · Águas Lindas – GO · Inscrição de ${residentialProgram.registrationFeeFormatted} somente após aprovação`,
    description:
      "Imersão integral de 9 meses em nosso campus em Águas Lindas – GO para homens que buscam libertação de pecados sexuais de controle. Combina aconselhamento bíblico individual intensivo, estudo sistemático das Escrituras, oração, labor e responsabilidade mútua sob supervisão pastoral contínua.",
    features: [
      "9 meses de dedicação exclusiva no campus",
      "Hospedagem, alimentação e livros inclusos",
      "Aconselhamento bíblico pastoral semanal",
      "Integração ativa à comunhão da igreja local",
    ],
    imageSrc: "/images/residential.webp",
    imageAlt: "Estante de madeira com livros cristãos na biblioteca do campus residencial",
    leaderName: "Pr. Paulo Gouvêa",
    ctaText: "Iniciar triagem",
    ctaHref: "/triagem/",
    secondaryCtaText: "Ver detalhes",
    secondaryCtaHref: "/programas/residencial/",
  },
  {
    id: "online",
    badge: "Ao Vivo Online",
    badgeVariant: "dark",
    title: onlineProgram.name,
    subtitle: "Sessões semanais · Todo o Brasil",
    description:
      "Programa de renovação da mente conduzido ao vivo por conselheiros certificados, indicado para homens que buscam transformação mantendo a rotina de trabalho e família. A inscrição é feita diretamente na plataforma Hotmart.",
    features: [
      "Sessões ao vivo semanais",
      "Conselheiros certificados",
      "Estudo no seu ritmo, de casa",
      "Recursos digitais e áudios",
    ],
    imageSrc: "/images/online.webp",
    imageAlt: "Aconselhamento bíblico online com conselheiro",
    leaderName: "Pr. Filipe Bentle",
    ctaText: "Inscrever-se na Hotmart",
    ctaHref: onlineProgram.enrollmentUrl,
    ctaExternal: true,
  },
  {
    id: "esposas",
    badge: "Cuidado para Mulheres",
    badgeVariant: "blue",
    title: "Apoio para Esposas",
    subtitle: "Acompanhamento online · Todo o Brasil",
    description:
      "Acompanhamento pastoral dedicado a esposas e mulheres feridas pelo pecado sexual do cônjuge, conduzido por conselheiras que compreendem as dores e os desafios do contexto conjugal e familiar.",
    features: [
      "Conselheiras dedicadas",
      "Atendimento confidencial",
      "Encontros online",
      "Esperança para o casamento",
    ],
    imageSrc: "/images/purelife/campus-sala-de-convivencia.webp",
    imageAlt: "Sala de convivência tranquila com sofás e uma coroa de espinhos decorativa na parede",
    ctaText: "Pedir acompanhamento",
    ctaHref: "/triagem/",
  },
];
