/* eslint unicorn/prevent-abbreviations: 0 */

import { CreateUserInput } from '@app/e2e/tasks/handlers/user.tasks'
import {
  lowerCaseProfileInscriptionLabels,
  profileInscriptionLabels,
  profileInscriptionSlugs,
} from '@app/web/inscription/profilInscription'
import type { ProfilInscription } from '@prisma/client'
import { appUrl } from '@app/e2e/support/helpers'

export const startInscriptionAs = ({
  profilInscription,
  roleShouldBeCheckedAndFound,
  user,
}: {
  user: CreateUserInput
  profilInscription: ProfilInscription
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
    cy.contains(
      `Vous avez été identifié en tant que ${lowerCaseProfileInscriptionLabels[profilInscription]}`,
    )
  } else {
    cy.contains('todo wording for role not found')
  }
}
