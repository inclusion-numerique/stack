import { profileInscriptionSlugs } from '@app/web/inscription/profilInscription'

/**
 * Inscription pour un conseiller numérique qui a une structure employeuse ET des lieux d’activité
 */

export const conseillerNumeriqueInscriptionSteps = {
  intro: `/inscription?profil=${profileInscriptionSlugs.ConseillerNumerique}`,
  lieuxActivites: `/inscription/conseiller-numerique/lieux-activite`,
  recapitulatif: `/inscription/conseiller-numerique/recapitulatif`,
}
