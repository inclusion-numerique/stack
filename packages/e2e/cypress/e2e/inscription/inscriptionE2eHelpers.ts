/* eslint unicorn/prevent-abbreviations: 0 */

import { CreateUserInput } from '@app/e2e/tasks/handlers/user.tasks'
import {
  lowerCaseProfileInscriptionLabels,
  profileInscriptionLabels,
  profileInscriptionSlugs,
} from '@app/web/inscription/profilInscription'
import { appUrl } from '@app/e2e/support/helpers'
import {
  inscriptionRolesErrorTitles,
} from '@app/web/app/inscription/(steps)/identification/_components/inscriptionRole'

export const startInscriptionAs = ({
  profilInscription,
  roleShouldBeCheckedAndFound,
  user,
}: {
  user: CreateUserInput
  profilInscription: keyof typeof profileInscriptionLabels
  roleShouldBeCheckedAndFound: boolean
}) => {
  cy.createUserAndSignin(user)

  cy.visit(appUrl('/inscription'))

  cy.contains(profileInscriptionLabels[profilInscription]).click()
  cy.contains('J’ai lu et j’accepte').click()

  cy.get('button').contains('Continuer').click()

  cy.appUrlShouldBe(
    `/inscription/identification?profil=${profileInscriptionSlugs[profilInscription]}`,
    { timeout: 15_000 },
  )

  if (roleShouldBeCheckedAndFound) {
    if (profilInscription === 'Mediateur') {
      cy.contains('Finaliser votre inscription pour accéder à votre espace')
    } else {
      cy.contains(
        `Vous avez été identifié en tant que ${lowerCaseProfileInscriptionLabels[profilInscription]}`,
      )
    }
    cy.findByRole('link', { name: 'Continuer' })
  } else {
    cy.contains(
      inscriptionRolesErrorTitles[profileInscriptionSlugs[profilInscription]],
    )
    cy.findByRole('button', { name: 'Essayer une autre adresse email' })
  }
}
