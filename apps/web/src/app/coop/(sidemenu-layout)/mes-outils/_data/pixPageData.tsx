import { OutilPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/outilPageData'
import PixOutilAccess from '@app/web/app/coop/(sidemenu-layout)/mes-outils/_components/PixOutilAccess'

export default {
  title: 'Pix Orga',
  description:
    'Proposez des parcours de montée en compétences et des tests Pix adaptés à vos bénéficiaires et suivez leur progression.',
  website: 'https://pix.fr/mediation-numerique',
  logo: '/images/services/pix-orga.svg',
  illustration: '/images/illustrations/mes-outils/pix.webp',
  illustrationWidth: 100,
  features: [
    {
      title:
        'Pour tous les niveaux, sur tous les sujets de la médiation numérique',
      description:
        'Des parcours qui s’adaptent au niveau de chacun, réponse après réponse, grâce à un algorithme adaptatif.',
      icon: 'ri-star-line',
    },
    {
      title: 'Ludique et motivant',
      description:
        'Avec des mises en situations inspirées du réel dans un environnement bienveillant qui valorise chaque pas.',
      icon: 'ri-lightbulb-line',
    },
    {
      title: 'Jouables en 5 à 30 minutes',
      description:
        'Des parcours thématiques à intégrer dans un accompagnement ou une animation, ou à jouer en autonomie.',
      icon: 'ri-timer-line',
    },
    {
      title: 'Accessibles à tous',
      description:
        'Avec des tests accessibles sans compte et sur smartphone, et des énoncés en FALC.',
      icon: 'ri-line-chart-line',
    },
  ],
  accessComponent: <PixOutilAccess />,
} satisfies OutilPageData
