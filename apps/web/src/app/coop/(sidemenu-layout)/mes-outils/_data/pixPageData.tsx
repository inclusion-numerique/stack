import { OutilPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/outilPageData'

export default {
  title: 'Pix',
  description:
    'Proposez des parcours de montée en compétences et des tests Pix adaptés à vos bénéficiaires et suivez leur progression.',
  website: 'https://pix.fr',
  logo: '/images/services/pix.svg',
  illustration: '/images/illustrations/mes-outils/pix.webp',
  illustrationWidth: 50,
  features: [
    {
      title:
        'Pour tous les niveaux, sur tous les sujets de la médiation numérique',
      description:
        'De débutant à confirmé, les exercices proposés s’adaptent au niveau de chacun réponse après réponse, pour une expérience personnalisée.',
      icon: 'ri-star-line',
    },
    {
      title: 'Ludique et motivant',
      description:
        'Motivez vos publics à progresser avec des défis ludiques et inspirés de situations réelles d’utilisation dans un environnement bienveillant.',
      icon: 'ri-lightbulb-line',
    },
    {
      title: 'Suivre la progression de vos publics',
      description:
        'Suivez leurs progressions, analysez leurs résultats et accédez à des tutoriels recommandés en fonction de leurs résultats pour alimenter vos séquences pédagogiques.',
      icon: 'ri-line-chart-line',
    },
  ],
  access: {
    how: 'Votre structure doit déposer une demande d’accès à Pix Orga.',
    icon: 'ri-home-smile-2-line',
    info: {
      label: 'Demander l’accès',
      link: 'https://pix.fr/abc-pix-cnfs',
    },
    title: 'Ma structure a déjà accès à Pix',
    description:
      'Si votre structure a déjà un accès, vous pouvez vous connecter avec votre identifiant Pix :',
    callToAction: {
      label: 'Se connecter',
      link: 'https://orga.pix.fr/connexion',
    },
  },
} satisfies OutilPageData
