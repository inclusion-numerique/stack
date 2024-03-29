import { createOdtFile } from '@app/web/server/odt/createOdtFile'
import { childrenExample } from '@app/web/server/odt/createOdtContent'
import { MembreBeneficiaireDataForConvention } from '@app/web/gouvernance/getMembreBeneficiaireDataForConvention'

export const generateConventionSubvention = async (
  _data: MembreBeneficiaireDataForConvention,
) => createOdtFile({ children: childrenExample })
