import { v4 } from 'uuid'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { siretRouter } from '@app/web/server/rpc/data/siretRouter'
import { createTestContext } from '../../../../test/createTestContext'

describe('siretRouter', () => {
  // Helper function to easily test procedures

  const givenUserId = v4()
  const givenUserEmail = `test+${givenUserId}@inclusion-numerique.anct.gouv.fr`
  const givenUser = {
    ...testSessionUser,
    id: givenUserId,
    email: givenUserEmail,
  }

  describe('siretInfo', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const executeSiretInfoProcedure = (input: { siret: string }) =>
      siretRouter
        .createCaller(createTestContext({ user: givenUser }))
        .siretInfo(input)

    it('Should return siret data for a company', async () => {
      expect(
        await executeSiretInfoProcedure({ siret: '13002603200016' }),
      ).toEqual({
        error: null,
        siretInfo: {
          activitePrincipale: {
            code: '84.12Z',
            libelle:
              'Administration publique (tutelle) de la santé, de la formation, de la culture et des services sociaux, autre que sécurité sociale',
            nomenclature: 'NAFRev2',
          },
          nom: 'AGENCE NATIONALE DE LA COHESION DES TERRITOIRES',
          siret: '13002603200016',
        },
      })
    })

    it('Should return not found type error for a unexisting company', async () => {
      expect(
        await executeSiretInfoProcedure({ siret: '11111111111111' }),
      ).toEqual({
        error: {
          message: "Le numéro de siret n'est pas correctement formatté",
          type: 'invalidSiret',
        },
        siretInfo: null,
      })
    })
  })
})
