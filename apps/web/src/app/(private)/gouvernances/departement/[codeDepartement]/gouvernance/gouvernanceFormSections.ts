import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'

export const gouvernanceFormSections = {
  contactDuSousPrefetReferent: {
    id: 'contact-du-sous-prefet-referent',
    title: 'Contact du sous-préfet référent',
  },
  coPorteursDeLaGouvernance: {
    id: 'co-porteurs-de-la-gouvernance',
    title: 'Co-porteurs de la gouvernance',
  },
  membresDeLaGouvernance: {
    id: 'membres-de-la-gouvernance',
    title: 'Membres de la gouvernance',
  },
  comitologie: {
    id: 'comitologie',
    title: 'Comitologie',
  },
  feuillesDeRouteEtPorteurs: {
    id: 'feuilles-de-route-et-porteurs',
    title: 'Feuilles de route & porteurs',
  },
  coordinateurConseillerNumeriqueDeLaGouvernance: {
    id: 'coordinateur-conseiller-numerique-de-la-gouvernance',
    title: 'Coordinateur Conseiller Numérique de la gouvernance',
  },
  besoinsEnIngenierieFinanciere: {
    id: 'besoins-en-ingenierie-financiere',
    title: 'Besoins en ingénierie financière',
  },
  noteDeContexte: {
    id: 'note-de-contexte',
    title: 'Note de contexte',
  },
}

export const gouvernanceFormSectionSideMenuItems: SideMenuProps.Item[] =
  Object.values(gouvernanceFormSections).map(({ id, title }) => ({
    text: title,
    linkProps: {
      href: `#${id}`,
    },
  }))
