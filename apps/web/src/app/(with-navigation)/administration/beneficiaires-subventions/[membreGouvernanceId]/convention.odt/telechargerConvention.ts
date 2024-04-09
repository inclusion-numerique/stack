import { formatInTimeZone } from 'date-fns-tz'
import { computeBranchNamespace } from '@app/cdk/utils'
import { generateConventionSubvention } from '@app/web/gouvernance/conventionSubvention'
import { MembreBeneficiaireDataForConvention } from '@app/web/gouvernance/getMembreBeneficiaireDataForConvention'

const normalizeFilename = (value: string) =>
  computeBranchNamespace(value)
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .replaceAll(' ', ' ')
    .replaceAll('·', '')
    .replaceAll(/ +/g, ' ')
    .replaceAll(' ', '-')
    .trim()

export const telechargerConvention = async (
  data: MembreBeneficiaireDataForConvention,
) => {
  const date = formatInTimeZone(new Date(), 'Europe/Paris', 'yy-MM-dd')
  const filename = `fne_convention_${normalizeFilename(data.nom)}_${date}.odt`

  const content = await generateConventionSubvention(data)

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.oasis.opendocument.text',
      'Content-Disposition': `attachment; filename=${filename}`,
    },
  })
}
