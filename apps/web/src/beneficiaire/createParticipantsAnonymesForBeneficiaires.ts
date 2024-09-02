import { Beneficiaire } from '@prisma/client'
import { ParticipantsAnonymesCraCollectifData } from '@app/web/cra/ParticipantsAnonymesCraCollectifValidation'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'

export const createParticipantsAnonymesForBeneficiaires = <
  T extends Pick<
    Beneficiaire,
    'anonyme' | 'statutSocial' | 'genre' | 'trancheAge'
  >,
>(
  beneficiaires: T[],
): {
  participantsAnonymes: ParticipantsAnonymesCraCollectifData
  beneficiairesSuivis: T[]
} => {
  const participantsAnonymes = { ...participantsAnonymesDefault }
  const beneficiairesSuivis: T[] = []

  for (const beneficiaire of beneficiaires) {
    if (beneficiaire.anonyme) {
      // Increment total number of anonymous participants
      participantsAnonymes.total += 1

      // Increment the corresponding counters for genre, statut social, and tranche d'âge
      participantsAnonymes[`genre${beneficiaire.genre ?? 'NonCommunique'}`] += 1
      participantsAnonymes[
        `statutSocial${beneficiaire.statutSocial ?? 'NonCommunique'}`
      ] += 1
      participantsAnonymes[
        `trancheAge${beneficiaire.trancheAge ?? 'NonCommunique'}`
      ] += 1
      continue
    }

    // Add to beneficiairesSuivis if the beneficiary is not anonymous
    beneficiairesSuivis.push(beneficiaire)
  }

  return {
    participantsAnonymes,
    beneficiairesSuivis,
  }
}
