import type { TrancheAge } from '@prisma/client'
import {
  anneeNaissanceMax,
  anneeNaissanceMin,
} from '@app/web/beneficiaire/BeneficiaireValidation'

/**
 * Mineur: 'Mineur',
 *   DixHuitVingtQuatre: 'DixHuitVingtQuatre',
 *   VingtCinqTrenteNeuf: 'VingtCinqTrenteNeuf',
 *   QuaranteCinquanteNeuf: 'QuaranteCinquanteNeuf',
 *   SoixanteSoixanteNeuf: 'SoixanteSoixanteNeuf',
 *   SoixanteDixPlus: 'SoixanteDixPlus',
 *   NonCommunique: 'NonCommunique'
 */

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

  if (age < 18) return 'Mineur'
  if (age < 25) return 'DixHuitVingtQuatre'
  if (age < 40) return 'VingtCinqTrenteNeuf'
  if (age < 60) return 'QuaranteCinquanteNeuf'
  if (age < 70) return 'SoixanteSoixanteNeuf'

  return 'SoixanteDixPlus'
}
