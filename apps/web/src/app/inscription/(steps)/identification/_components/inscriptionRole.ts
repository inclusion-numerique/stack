export type InscriptionRole =
  | 'mediateur'
  | 'coordinateur'
  | 'conseiller-numerique'

export const inscriptionRolesToText: Record<InscriptionRole, string> = {
  mediateur: 'médiateur',
  coordinateur: 'coordinateur de conseiller numérique',
  'conseiller-numerique': 'conseiller numérique',
}
