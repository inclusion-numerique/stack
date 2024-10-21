import { profileInscriptionSlugs } from '@app/web/inscription/profilInscription'

/**
 * Inscription pour un conseiller numérique qui a une structure employeuse
 * MAIS PAS de lieux d’activité
 */

export const coordinateurInscriptionSteps = {
  intro: `/inscription/identification?profil=${profileInscriptionSlugs.Coordinateur}`,
  lieuxActivite: `/inscription/coordinateur/lieux-activite`,
  accompagnement: `/inscription/coordinateur/accompagnement`,
  recapitulatif: `/inscription/coordinateur/recapitulatif`,
}
