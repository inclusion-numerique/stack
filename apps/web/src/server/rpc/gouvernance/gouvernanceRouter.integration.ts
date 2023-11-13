import { gouvernanceRouter } from '@app/web/server/rpc/gouvernance/gouvernanceRouter'
import {
  CreateGouvernanceData,
  GouvernanceData,
} from '@app/web/gouvernance/Gouvernance'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { uuidRegex } from '@app/web/utils/uuidRegex'
import { createTestContext } from '../../../../test/createTestContext'

describe('gouvernanceRouter', () => {
  // Helper function to easily test procedures

  const givenUserId = v4()
  const givenUserEmail = `test+${givenUserId}@inclusion-numerique.anct.gouv.fr`
  const givenUser = {
    ...testSessionUser,
    id: givenUserId,
    email: givenUserEmail,
  }

  beforeAll(() =>
    prismaClient.user.upsert({
      where: { id: givenUser.id },
      update: { ...givenUser, formulaireGouvernance: undefined },
      create: { ...givenUser, formulaireGouvernance: undefined },
    }),
  )

  afterAll(() => prismaClient.user.delete({ where: { id: givenUser.id } }))

  describe('createGouvernance', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const executeCreateGouvernanceProcedure = (input: CreateGouvernanceData) =>
      gouvernanceRouter
        .createCaller(createTestContext({ user: givenUser }))
        .createGouvernance(input)

    it('creates gouvernance', async () => {
      const result = await executeCreateGouvernanceProcedure({
        departementCode: '69',
      })

      expect(result).toEqual({
        departementCode: '69',
        id: expect.stringMatching(uuidRegex),
      })
    })
  })

  // Example: Describe block for a specific procedure
  describe('gouvernance', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const executeGouvernanceProcedure = (input: GouvernanceData) =>
      gouvernanceRouter
        .createCaller(createTestContext({ user: givenUser }))
        .gouvernance(input)

    const gouvernancesToDelete: string[] = []

    afterAll(() =>
      prismaClient.gouvernance.deleteMany({
        where: { id: { in: gouvernancesToDelete } },
      }),
    )

    it('should return expected result', async () => {
      const gouvernanceId = v4()
      gouvernancesToDelete.push(gouvernanceId)

      await prismaClient.gouvernance.create({
        data: {
          id: gouvernanceId,
          departementCode: '69',
          noteDeContexte: '',
          createurId: givenUser.id,
          derniereModificationParId: givenUser.id,
        },
      })

      const input: GouvernanceData = {
        gouvernanceId,
        sousPrefetReferentPrenom: 'Yolo',
        sousPrefetReferentNom: 'De Yolo',
        sousPrefetReferentEmail: 'yo@lo.lo',
        membres: [],
        pasDeCoporteurs: true,
        noteDeContexte: 'Such context',
        comites: [],
        feuillesDeRoute: [],
        recruteursCoordinateurs: [
          { nom: 'Ca recrute dur', siret: '12345678901234' },
        ],
      }

      const result = await executeGouvernanceProcedure(input)

      expect(result).toEqual({
        nom: 'Yolo',
      })
    })

    // Add more tests as needed
  })

  // Repeat describe blocks for each procedure in your router
})
