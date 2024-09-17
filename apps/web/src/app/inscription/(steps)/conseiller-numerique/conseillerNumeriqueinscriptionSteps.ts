import { profileInscriptionSlugs } from '@app/web/inscription/profilInscription'

/**
 * Inscription pour un conseiller numérique qui a une structure employeuse ET des lieux d’activité
 */

export const conseillerNumeriqueInscriptionSteps = {
  intro: `/inscription/identification?profil=${profileInscriptionSlugs.ConseillerNumerique}`,
  lieuxActivite: `/inscription/conseiller-numerique/lieux-activite`,
  recapitulatif: `/inscription/conseiller-numerique/recapitulatif`,
}
