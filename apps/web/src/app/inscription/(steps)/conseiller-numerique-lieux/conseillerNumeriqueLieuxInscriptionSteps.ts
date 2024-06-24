import { profileInscriptionSlugs } from '@app/web/inscription/profilInscription'

/**
 * Inscription pour un conseiller numérique qui a une structure employeuse
 * MAIS PAS de lieux d’activité
 */

export const conseillerNumeriqueLieuxInscriptionSteps = {
  intro: `/inscription?profil=${profileInscriptionSlugs.ConseillerNumerique}`,
  lieuxActivites: `/inscription/conseiller-numerique-lieux/lieux-activites`,
  recapituatif: `/inscription/conseiller-numerique-lieux/recapitulatif`,
}
