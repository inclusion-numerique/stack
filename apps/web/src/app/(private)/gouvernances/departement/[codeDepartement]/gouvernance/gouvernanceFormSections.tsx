import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import Link from 'next/link'
import React from 'react'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'

export const gouvernanceFormSections = {
  contactDuSousPrefetReferent: {
    id: 'contact-du-sous-prefet-referent',
    title: 'Contact du sous-préfet référent',
  },
  coporteursDeLaGouvernance: {
    id: 'co-porteurs-de-la-gouvernance',
    title: 'Co-porteurs de la gouvernance',
  },
  membresDeLaGouvernance: {
    id: 'membres-de-la-gouvernance',
    title: 'Membres de la gouvernance',
    info: 'Renseignez, parmi les collectivités et structures volontaires ou suggérées, celles qui feront partie de la gouvernance.',
  },
  comitologie: {
    id: 'comitologie',
    title: 'Comitologie',
    info: 'Renseignez les comités prévus et la fréquence à laquelle ils se réunissent',
  },
  feuillesDeRouteEtPorteurs: {
    id: 'feuilles-de-route-et-porteurs',
    title: 'Feuilles de route & porteurs',
    info: 'Définissez la ou les feuilles de routes au sein de la gouvernance et pour chacune un porteur.',
    details:
      'Plusieurs feuilles de route peuvent coexister sur votre territoire. Cependant, les feuilles de route infra-départementales doivent être alignées avec la feuille de route départementale ; et deux feuilles de route infra-départementales ne peuvent pas couvrir un même territoire.',
  },
  coordinateurConseillerNumeriqueDeLaGouvernance: {
    id: 'coordinateur-conseiller-numerique-de-la-gouvernance',
    title: 'Coordinateur Conseiller Numérique de la gouvernance',
    info: (
      <>
        La phase de déploiement du dispositif Conseiller numérique laisse place
        à une phase de structuration où le diagnostic des besoins et
        l’accompagnement des conseillers numériques au niveau local peut
        permettre d’organiser l’action de la médiation numérique, et de
        l’intégrer aux politiques publiques territoriales. C’est en ce sens
        qu’un appel à candidatures à été lancé pour identifier des structures
        souhaitant avoir une action de coordination de l’action des conseillers
        numériques et des médiateurs numériques de leur territoire :{' '}
        <Link
          href="https://societenumerique.gouv.fr/fr/actualite/appel-a-candidatures-conseillers-numeriques-coordinateurs/"
          target="_blank"
        >
          https://societenumerique.gouv.fr/fr/actualite/appel-a-candidatures-conseillers-numeriques-coordinateurs/
        </Link>
        . Ces projets de coordination doivent s’articuler avec les projets de
        gouvernances pressenties.
        <br />
        <br />
        Par ailleurs, l’instruction des candidatures doit être faite sur la{' '}
        <Link
          href="https://admin.conseiller-numerique.gouv.fr/login?role=prefet"
          target="_blank"
        >
          plateforme dédiée au dispositif Conseiller Numérique
        </Link>{' '}
        avant le 10 décembre 2023.
      </>
    ),
  },
  noteDeContexte: {
    id: 'note-de-contexte',
    title: 'Note de contexte',
    info: (
      <>
        Précisez, au sein d’une note qualitative, les spécificités de votre
        démarche, les éventuelles difficultés que vous rencontrez, ou tout autre
        élément que vous souhaitez porter à notre connaissance. <RedAsterisk />
      </>
    ),
  },
}

export type GouvernanceFormSection = keyof typeof gouvernanceFormSections

export const gouvernanceFormSectionSideMenuItems: SideMenuProps.Item[] =
  Object.values(gouvernanceFormSections).map(({ id, title }) => ({
    text: title,
    linkProps: {
      href: `#${id}`,
    },
  }))
