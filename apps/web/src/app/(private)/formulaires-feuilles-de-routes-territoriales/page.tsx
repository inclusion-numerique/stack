import { redirect } from 'next/navigation'
import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import {
  getAuthenticatedSessionUser,
  getSessionUser,
} from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { hasAccessToGouvernanceForm } from '@app/web/security/securityRules'
import { prismaClient } from '@app/web/prismaClient'
import { gouvernancePersonaIds } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import ContainerCard from '@app/web/components/ContainerCard'

export const generateMetadata = async () => {
  const user = await getSessionUser()

  if (!user) {
    redirect(`/connexion?suivant=/formulaires-feuilles-de-routes-territoriales`)
  }

  if (!hasAccessToGouvernanceForm(user)) {
    redirect(`/profil`)
  }

  return {
    title: `Formulaire de feuille de route territoriale`,
  }
}

/**
 * This page allows to :
 *  - Change the gouvernance persona if the user persona is not the same as the form he started
 *  - Set the gouvernance persona if the user has no persona
 */
const Page = async ({
  params: { changer },
}: {
  params: { changer: string }
}) => {
  const user = await getAuthenticatedSessionUser()

  const formulaireGouvernance =
    await prismaClient.formulaireGouvernance.findFirst({
      where: {
        participants: {
          some: {
            id: user.id,
          },
        },
      },
      select: {
        id: true,
        gouvernancePersona: true,
      },
    })

  // The user has not changed his gouvernance persona and do not want to change it
  // We redirect to his form
  if (
    user.gouvernancePersona &&
    formulaireGouvernance?.gouvernancePersona === user.gouvernancePersona &&
    changer === undefined
  ) {
    redirect(
      `/formulaires-feuilles-de-routes-territoriales/${user.gouvernancePersona}`,
    )
  }

  // TODO Add a form to change the gouvernance persona
  // -- If there is a mismatch between the user persona and the form persona, we ask him to choose
  // -- If the user has no persona or form, we ask him to choose one
  // -- This will change the user persona AND create a new Formulaire if needed

  const { isMismatch, choices } =
    !!user.gouvernancePersona &&
    !!formulaireGouvernance &&
    formulaireGouvernance.gouvernancePersona !== user.gouvernancePersona
      ? {
          isMismatch: true,
          choices: [
            formulaireGouvernance.gouvernancePersona,
            user.gouvernancePersona,
          ],
        }
      : {
          isMismatch: false,
          choices: gouvernancePersonaIds,
        }

  return (
    <div className="fr-container">
      <Breadcrumbs
        parents={[
          {
            label: 'Formulaires feuilles de routes territoriales',
            linkProps: { href: '/gouvernance' },
          },
        ]}
        currentPage="Choix du formulaire"
      />
      <ContainerCard illustrationSrc="/dsfr/artwork/pictograms/system/information.svg">
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
            choisir le type de collectivité ou d’acteur territorial qui vous
            correspond.
            <br />
            <br />
            Quel formulaire souhaitez-vous compléter&nbsp;?
          </p>
        )}
        <form>
          <Notice title="🚧 En cours de développement 🚧" />
          <ul>
            {choices.map((choice) => (
              <li key={choice}>{choice}</li>
            ))}
          </ul>
        </form>
      </ContainerCard>
    </div>
  )
}

export default Page
