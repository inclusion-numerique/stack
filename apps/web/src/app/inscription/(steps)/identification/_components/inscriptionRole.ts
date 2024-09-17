export type InscriptionRole =
  | 'mediateur'
  | 'coordinateur'
  | 'conseiller-numerique'

export const inscriptionRolesErrorTitles: { [key in InscriptionRole]: string } =
  {
    mediateur: 'Problème d’identification sur votre adresse email',
    coordinateur: 'Profil de coordinateur non reconnu',
    'conseiller-numerique': 'Profil de conseiller numérique non reconnu',
  }

export const inscriptionRolesToText: { [key in InscriptionRole]: string } = {
  mediateur: 'médiateur',
  coordinateur: 'coordinateur de conseiller numérique',
  'conseiller-numerique': 'conseiller numérique',
}
