import { profileInscriptionSlugs } from '@app/web/inscription/profilInscription'

/**
 * Inscription pour un conseiller numérique qui a une structure employeuse
 * MAIS PAS de lieux d’activité
 */

export const conseillerNumeriqueLieuxInscriptionSteps = {
  intro: `/inscription/identification?profil=${profileInscriptionSlugs.ConseillerNumerique}`,
  // Vérifier infos de base
  verifier: `/inscription/conseiller-numerique-lieux/verifier`,
  lieuxActivite: `/inscription/conseiller-numerique-lieux/lieux-activite`,
  recapitulatif: `/inscription/conseiller-numerique-lieux/recapitulatif`,
}

export const conseillerNumeriqueLieuxInscriptionStepsCount = 3
