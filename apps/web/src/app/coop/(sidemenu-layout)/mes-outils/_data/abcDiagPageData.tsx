import { OutilPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/outilPageData'

export default {
  title: 'ABC Diag',
  description:
    'Diagnostiquez en 10 questions la maîtrise de compétences numériques de base.',
  website: 'https://aidantsconnect.beta.gouv.fr',
  logo: '/images/services/abc-diag.svg',
  illustration: '/images/illustrations/mes-outils/abc-diag.svg',
  illustrationWidth: 100,
  features: [
    {
      title: 'Un accès direct et sans compte',
      description:
        'Testez les compétences de vos bénéficiaires sans compte en leur partageant directement le lien ou en le lançant depuis votre ordinateur.',
      icon: 'ri-line-chart-line',
    },
    {
      title: '10 questions',
      description:
        'Faites le point sur des compétences numériques essentielles.',
      icon: 'ri-star-line',
    },
    {
      title: 'Réalisable en 5 à 15 minutes',
      description:
        'Le test peut être réalisé rapidement, mais il n’est pas chronométré : ils peuvent prendre leur temps.',
      icon: 'ri-lightbulb-line',
    },
  ],
  access: {
    how: "Partagez le lien à vos bénéficiaires pour qu'ils réalisent leurs diagnostics :",
    info: {
      label: 'Partager un lien',
      link: 'https://pix.fr/abc-diag',
      share: true,
    },
    description: 'Lancez le diagnostic directement sur votre ordinateur :',
    callToAction: {
      label: 'Lancer ABC Diag',
      link: 'https://pix.fr/abc-diag',
    },
  },
} satisfies OutilPageData
