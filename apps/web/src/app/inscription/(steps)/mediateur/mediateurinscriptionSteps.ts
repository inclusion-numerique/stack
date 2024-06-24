import { profileInscriptionSlugs } from '@app/web/inscription/profilInscription'

export const mediateurinscriptionStepsCount = 3

export const mediateurInscriptionSteps = {
  intro: `/inscription?profil=${profileInscriptionSlugs.Mediateur}`,
  structureEmployeuse: `/inscription/mediateur/structure-employeuse`,
  structureEmployeuseLieuActivite: `/inscription/mediateur/structure-employeuse-lieu-activite`,
  lieuxActivite: `/inscription/mediateur/lieux-activite`,
  recapitulatif: `/inscription/mediateur/recapitulatif`,
}
