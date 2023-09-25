import { v4 } from 'uuid'
import type { GouvernancePersonaId } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { createTestUser } from '@app/e2e/support/helpers'
import { prismaClient } from '@app/web/prismaClient'

export const createAndSigninUserForFormulaireGouvernance = (
  persona: GouvernancePersonaId,
  formulaireGouvernance?: Partial<
    Parameters<
      typeof prismaClient.user.update
    >[0]['data']['formulaireGouvernance']
  >,
) => {
  const userId = v4()
  const user = createTestUser({
    id: userId,
    gouvernancePersona: persona,
    emailVerified: new Date().toISOString(),
  })
  cy.createUser(user)
  cy.updateUser({
    where: {
      id: userId,
    },
    data: {
      formulaireGouvernance: {
        create: {
          gouvernancePersona: persona,
          id: v4(),
          createur: {
            connect: { id: userId },
          },
          demonstration: false,
          ...formulaireGouvernance,
        },
      },
    },
  })
  cy.signin(user)
}
