import { createOdtFile } from '@app/web/server/odt/createOdtFile'
import { childrenExample } from '@app/web/server/odt/createOdtContent'

export const generateConventionSubvention = async () => {
  return createOdtFile({ children: childrenExample })

  return ''
}
