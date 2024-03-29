import { formatInTimeZone } from 'date-fns-tz'
import { generateConventionSubvention } from '@app/web/gouvernance/conventionSubvention'
import { MembreBeneficiaireDataForConvention } from '@app/web/gouvernance/getMembreBeneficiaireDataForConvention'

export const telechargerConvention = async (
  data: MembreBeneficiaireDataForConvention,
) => {
  const membreNom = `todo${data.membre.id}`

  const date = formatInTimeZone(new Date(), 'Europe/Paris', 'yy-MM-dd')
  const filename = `fne_convention_${membreNom}_${date}.odt`

  const content = await generateConventionSubvention(data)

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.oasis.opendocument.text',
      'Content-Disposition': `attachment; filename=${filename}`,
    },
  })
}
