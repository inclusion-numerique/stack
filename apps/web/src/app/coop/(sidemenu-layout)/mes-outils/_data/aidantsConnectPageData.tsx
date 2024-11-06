import { OutilPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/outilPageData'

export default {
  title: 'Aidants Connect',
  description:
    "Sécuriser l'aidant et la personne accompagnée dans la réalisation de démarches administratives en ligne.",
  website: 'https://aidantsconnect.beta.gouv.fr',
  logo: '/images/services/aidants-connect.svg',
  illustration: '/images/illustrations/mes-outils/aidants-connect.webp',
  illustrationWidth: 70,
  features: [
    {
      title: 'Un outil qui sécurise l’aidant et l’usager',
      description:
        'Le mandat Aidants Connect instaure un cadre légal pour les démarches réalisées pour autrui.',
      icon: 'ri-lock-line',
    },
    {
      title:
        'Conserver les identifiants FranceConnect des usagers en toute sécurité',
      description:
        'À la suite de la création du mandat, l’aidant peut se connecter aux comptes de l’usager sur tous les sites administratifs accessibles via FranceConnect, sans devoir renseigner à nouveau les identifiants et mots de passe de l’usager.',
      icon: 'ri-pass-valid-line',
    },
    {
      title: 'Un outil qui permet la continuité de l’accompagnement',
      description:
        'Le mandat Aidants Connect est conclu entre un usager et une structure habilitée. Tout aidant habilité peut accéder aux mandats conclus dans sa structure. La mutualisation des mandats assure la continuité des accompagnements.',
      icon: 'ri-user-heart-line',
    },
  ],
  access: {
    how: 'Votre structure doit demander l’habilitation à Aidants Connect.',
    icon: 'ri-home-smile-2-line',
    info: {
      label: 'Demander l’habilitation',
      link: 'https://aidantsconnect.beta.gouv.fr/habilitation/demandeur',
    },
    title: 'Ma structure est déjà habilité',
    description:
      'Si votre structure est déjà habilité et que votre compte a été activé, vous pouvez vous connecter via l’authentification sécurisé d’Aidants Connect.',
    callToAction: {
      label: 'Se connecter',
      link: 'https://aidantsconnect.beta.gouv.fr/accounts/login',
    },
  },
} satisfies OutilPageData
