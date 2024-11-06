import type { ProfileInscriptionSlug } from '@app/web/inscription/profilInscription'

export const inscriptionRolesErrorTitles: {
  [key in ProfileInscriptionSlug]: string
} = {
  mediateur: 'Problème d’identification sur votre adresse email',
  coordinateur: 'Profil de coordinateur non reconnu',
  'conseiller-numerique': 'Profil de conseiller numérique non reconnu',
}
