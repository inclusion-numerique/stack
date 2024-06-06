import { UniteLegale } from '@app/web/external-apis/apiEntrepriseApiModels'
import { TypologieStructure } from '@app/web/structure/typologieStructure'

/**
 * Specs :
 *
 * ASSO
 *
 * complements.est_association
 *
 * CC
 *
 * 7346
 *
 * CD
 *
 * 7220
 *
 * CCAS
 *
 * 7361
 *
 * CIAS
 *
 * 7367
 *
 * EPCI
 *
 * 7340
 * 7341
 * 7342
 * 7343
 * 7344
 * 7345
 * 7347
 * 7348
 *
 * ESS
 *
 * plutot basé sur complements.est_ess
 *
 * ACIPHC
 *
 * complements.est_siae
 */
export const getTypologieFromApiEntreprise = (
  uniteLegale: Pick<UniteLegale, 'complements' | 'nature_juridique'>,
): TypologieStructure | null => {
  if (uniteLegale.complements?.est_association) return 'ASSO'

  if (uniteLegale.nature_juridique === '7346') return 'CC'

  if (uniteLegale.nature_juridique === '7220') return 'CD'

  if (uniteLegale.nature_juridique === '7361') return 'CCAS'

  if (uniteLegale.nature_juridique === '7367') return 'CIAS'

  if (
    ['7340', '7341', '7342', '7343', '7344', '7345', '7347', '7348'].includes(
      uniteLegale.nature_juridique,
    )
  )
    return 'EPCI'

  if (uniteLegale.complements?.est_ess) return 'ESS'

  if (uniteLegale.complements?.est_siae) return 'ACIPHC'

  return null
}
