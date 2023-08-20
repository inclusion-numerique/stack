import { redirect } from 'next/navigation'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

export const dynamic = 'force-dynamic'

export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

/**
 * This page redirects to the current step of the form
 */
const Page = async (props: PageFormulaireProps) => {
  const data = await getPageFormulaireData(props, null)

  redirect(data.etapeInfo.absolutePath)
}

export default Page
