import { siretRouter } from '@app/web/server/rpc/siret/siretRouter'
import { createTestContext } from '@app/web/test/createTestContext'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { v4 } from 'uuid'

describe('siretRouter', () => {
  // Helper function to easily test procedures

  const givenUserId = v4()
  const givenUserEmail = `test+${givenUserId}@inclusion-numerique.anct.gouv.fr`
  const givenUser = {
    ...testSessionUser,
    id: givenUserId,
    email: givenUserEmail,
    emailVerified: new Date().toISOString(),
  }

  describe('checkSiret', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const executeSiretInfoProcedure = (input: { siret: string }) =>
      siretRouter
        .createCaller(createTestContext({ user: givenUser }))
        .checkSiret(input)

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
          formeJuridique: {
            code: '7389',
            libelle: 'Établissement public national à caractère administratif',
          },
          nom: 'AGENCE NATIONALE DE LA COHESION DES TERRITOIRES',
          siren: '130026032',
          siret: '13002603200016',
        },
      })
    })

    it('Should return not found type error for a closed company', async () => {
      expect(
        // Etablissement fermé
        await executeSiretInfoProcedure({ siret: '41842282000203' }),
      ).toEqual({
        error: {
          message: 'Cet établissement est fermé',
          type: 'invalidSiret',
        },
        siretInfo: null,
      })
    })
  })
})
