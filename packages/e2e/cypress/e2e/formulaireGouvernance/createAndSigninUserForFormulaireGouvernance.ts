import { v4 } from 'uuid'
import { createTestUser } from '../../support/helpers'
import type { GouvernancePersonaId } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import type { Prisma } from '@prisma/client'

export const createAndSigninUserForFormulaireGouvernance = (
  persona: GouvernancePersonaId,
  formulaireGouvernance?: Partial<Prisma.FormulaireGouvernanceCreateWithoutParticipantsInput>,
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
