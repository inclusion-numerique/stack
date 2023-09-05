import { redirect } from 'next/navigation'
import React from 'react'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import {
  GouvernancePersonaId,
  gouvernancePersonaIds,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import ContainerCard from '@app/web/components/ContainerCard'
import ChoixDuFormulaireForm from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/ChoixDuFormulaireForm'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'
import BackLink from '@app/web/components/BackLink'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export { pageFormulaireMetadata as metadata } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/pageFormulaireData'

/**
 * This page allows to :
 *  - Change the gouvernance persona if the user persona is not the same as the form he started
 *  - Set the gouvernance persona if the user has no persona
 */
const Page = async (props: PageFormulaireProps<{ changer?: string }>) => {
  const {
    etapeCouranteInfo,
    breadcrumbs,
    retourHref,
    etapeCourante,
    user,
    formulaireGouvernance,
  } = await getPageFormulaireData(props, 'choix-du-formulaire')
  const { changer } = props.searchParams ?? {}

  // The user has not changed his gouvernance persona and do not want to change it
  // We redirect to current step
  if (
    etapeCourante !== 'choix-du-formulaire' &&
    formulaireGouvernance?.gouvernancePersona === user.gouvernancePersona &&
    changer === undefined
  ) {
    redirect(etapeCouranteInfo.absolutePath)
  }

  // -- If there is a mismatch between the user persona and the form persona, we ask him to choose
  // -- If the user has no persona or form, we ask him to choose one
  // -- This will change the user persona AND create a new Formulaire if needed

  const { isMismatch, availableChoices } =
    !!user.gouvernancePersona &&
    !!formulaireGouvernance &&
    formulaireGouvernance.gouvernancePersona !== user.gouvernancePersona
      ? {
          isMismatch: true,
          availableChoices: [
            formulaireGouvernance.gouvernancePersona,
            user.gouvernancePersona,
          ] as GouvernancePersonaId[],
        }
      : {
          isMismatch: false,
          availableChoices: gouvernancePersonaIds,
        }

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs {...breadcrumbs} />
      </div>
      <div className="fr-container fr-container--narrow">
        <BackLink href={retourHref} />
      </div>
      <ContainerCard
        className="fr-mt-8v"
        illustrationSrc="/dsfr/artwork/pictograms/system/information.svg"
      >
        <h2>Choix du formulaire à compléter</h2>
        {isMismatch ? (
          <p>
            Lors de votre inscription au formulaire pour participer à
            l’élaboration des feuilles de routes territoriales, vous vous êtes
            identifié comme étant un autre type de collectivité ou d’acteur
            territorial.
            <br />
            <br />
            Quel formulaire souhaitez-vous compléter&nbsp;?
          </p>
        ) : (
          <p>
            Pour participer aux feuilles de routes territoriales, veuillez
            choisir le type de collectivité ou d’acteur territorial que vous
            représentez.
            <br />
            <br />
            Quel formulaire souhaitez-vous compléter&nbsp;?
          </p>
        )}
        <ChoixDuFormulaireForm availableChoices={availableChoices} />
      </ContainerCard>
    </>
  )
}

export default Page
