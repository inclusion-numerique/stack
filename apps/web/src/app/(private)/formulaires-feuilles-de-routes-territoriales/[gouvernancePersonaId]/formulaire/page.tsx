import { redirect } from 'next/navigation'
import { getInfoEtapeFormulaire } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/formulaire/pageFormulaireData'

/**
 * Cette page permet de rediriger vers l'étape courante du formulaire
 */
const Page = async (props: PageFormulaireProps) => {
  const { formulaireGouvernance } = await getPageFormulaireData(props)
  const { absolutePath } = getInfoEtapeFormulaire(formulaireGouvernance)

  redirect(absolutePath)

  return null
}

export default Page
