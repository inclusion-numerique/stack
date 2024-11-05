import type { TrancheAge } from '@prisma/client'
import {
  anneeNaissanceMax,
  anneeNaissanceMin,
} from '@app/web/beneficiaire/BeneficiaireValidation'

export const trancheAgeFromAnneeNaissance = (
  anneeNaissance?: string | number | null,
): TrancheAge | null => {
  if (!anneeNaissance) return null

  const anneeInt =
    typeof anneeNaissance === 'string'
      ? Number.parseInt(anneeNaissance, 10)
      : anneeNaissance

  if (anneeInt < anneeNaissanceMin || anneeInt > anneeNaissanceMax) return null

  const age = new Date().getFullYear() - anneeInt

  if (age < 12) return 'MoinsDeDouze'
  if (age < 18) return 'DouzeDixHuit'
  if (age < 25) return 'DixHuitVingtQuatre'
  if (age < 40) return 'VingtCinqTrenteNeuf'
  if (age < 60) return 'QuaranteCinquanteNeuf'
  if (age < 70) return 'SoixanteSoixanteNeuf'

  return 'SoixanteDixPlus'
}
