import { OutilPageData } from '@app/web/app/coop/(sidemenu-layout)/mes-outils/outilPageData'
import RdvServicePublicMesOutilsMore from '@app/web/rdv-service-public/RdvServicePublicMesOutilsMore'

export default {
  notice:
    ' Vos données seront partagées entre votre profil sur La Coop de la\n' +
    '          médiation numérique et RDV Service Public afin d’éviter les doubles\n' +
    '          saisies',
  title: 'RDV Service Public',
  description:
    'Un outil de prise de rendez-vous en ligne, simplifiant votre organisation et rappelant aux usagers leurs rendez-vous par SMS.',
  website: 'https://www.rdv-aide-numerique.fr',
  logo: '/images/services/rdv-aide-numerique.svg',
  illustration: '/images/illustrations/mes-outils/rdv-aide-numerique.webp',
  features: [
    {
      title: 'Définir vos plages de disponibilités',
      description:
        'Informez vos apprenants et vos collègues des créneaux disponibles.',
      icon: 'ri-calendar-2-line',
    },
    {
      title: 'Envoyer une notification de rappel',
      description:
        'Vos apprenants recevront un SMS et/ou un e-mail de rappel de RDV. Ils pourront également modifier ou annuler le RDV.',
      icon: 'ri-notification-3-line',
    },
    {
      title: 'Importer vos RDVs sur votre agenda',
      description:
        'Synchronisez RDV Service Public et votre agenda du quotidien.',
      icon: 'ri-loop-right-line',
    },
  ],
  access: {
    how: 'Accédez à ce service grâce à ProConnect, votre identifiant unique pour accéder à plusieurs services de l’État.',
    illustration: '/images/services/pro-connect-logo.svg',
    info: {
      label: 'En savoir plus sur ProConnect',
      link: 'https://www.proconnect.gouv.fr',
    },
  },
  more: <RdvServicePublicMesOutilsMore />,
} satisfies OutilPageData
