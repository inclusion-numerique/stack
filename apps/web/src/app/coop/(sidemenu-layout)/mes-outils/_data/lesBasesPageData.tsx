import { OutilPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/outilPageData'

export default {
  title: 'Les Bases du numérique d’intérêt général',
  description:
    'La plateforme collaborative de partage de ressources & communs numériques à l’échelle nationale.',
  website: 'https://lesbases.anct.gouv.fr',
  logo: '/images/services/les-bases.svg',
  illustration: '/images/illustrations/mes-outils/les-bases.svg',
  features: [
    {
      title: 'Faire de la veille',
      description:
        "Inspirez-vous des ressources produites par une communauté au service du numérique d'intérêt général.",
      icon: 'ri-search-line',
    },
    {
      title: 'Produire & diffuser des ressources',
      description:
        'Présentez, valorisez & publiez vos ressources afin qu’elles soient diffusées auprès d’un large public.',
      icon: 'ri-file-text-line',
    },
    {
      title: 'Contribuer à une communauté',
      description:
        'Collaborez & contribuez à la création et l’amélioration de ressources, localement ou à l’échelle nationale.',
      icon: 'ri-team-line',
    },
  ],
  access: {
    how: 'Accédez à ce service grâce à votre identifiant unique ProConnect.',
    illustration: '/images/services/pro-connect.svg',
    info: {
      label: 'En savoir plus sur Pro Connect',
      link: '',
    },
    callToAction: {
      label: 'Se connecter',
      link: 'https://lesbases.anct.gouv.fr/connexion',
    },
  },
} satisfies OutilPageData
