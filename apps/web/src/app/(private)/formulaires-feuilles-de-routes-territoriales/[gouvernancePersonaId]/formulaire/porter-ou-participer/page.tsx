import { redirect } from 'next/navigation'
import React from 'react'
import { personaPeutPorterUneFeuilleDeRoute } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { prismaClient } from '@app/web/prismaClient'
import { linkToFormulaireGouvernanceParticiper } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'
import {
  getPageFormulaireData,
  PageFormulaireProps,
} from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/formulaire/pageFormulaireData'
import ChoixIntention from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/formulaire/porter-ou-participer/ChoixIntention'

/**
 * Cette page permet de choisir l'intention du formulaire de gouvernance (porter ou participer)
 * Si la persona ne permet pas de choisir, on redirige vers la page de formulaire
 */
const Page = async (props: PageFormulaireProps) => {
  const { persona, formulaireGouvernance } = await getPageFormulaireData(props)

  // Set the intention of the form if the persona can only have one intention
  if (
    !formulaireGouvernance.intention &&
    !personaPeutPorterUneFeuilleDeRoute(persona.id)
  ) {
    await prismaClient.formulaireGouvernance.update({
      where: {
        id: formulaireGouvernance.id,
      },
      data: {
        intention: 'Participer',
      },
    })

    redirect(linkToFormulaireGouvernanceParticiper(persona.id))

    return null
  }

  // If the form persona can only have one intention, we redirect to "Participer"
  if (!personaPeutPorterUneFeuilleDeRoute(persona.id)) {
    redirect(linkToFormulaireGouvernanceParticiper(persona.id))
    return null
  }

  // If the form persona can have both intention "porter" and "participer", we make the user choose
  return (
    <>
      <div className="fr-container">
        <Breadcrumbs
          currentPage={persona.title}
          parents={[
            {
              label: 'Formulaires feuilles de routes territoriales',
              linkProps: { href: '/gouvernance' },
            },
          ]}
        />
      </div>
      <div className="fr-container fr-container--narrow">
        <ChoixIntention
          persona={persona}
          formulaireGouvernance={formulaireGouvernance}
        />
      </div>
    </>
  )
}

export default Page
