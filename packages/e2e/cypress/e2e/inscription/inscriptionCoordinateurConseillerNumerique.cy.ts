import { coordinateursV1ThatShouldSignupAsCoordinateur } from '@app/e2e/e2e/inscription/inscriptionE2eCases'
import { startInscriptionAs } from '@app/e2e/e2e/inscription/inscriptionE2eHelpers'

describe('ETQ Coordinateur conseiller numérique, je peux m’inscrire en suivant le bon parcours', () => {
  beforeEach(() => {
    cy.execute('resetFixtures', {})
  })

  for (const user of Object.values(
    coordinateursV1ThatShouldSignupAsCoordinateur,
  )) {
    it(`ETQ Coordinateur ${user.lastName}, je ne peux pas m’inscrire en tant que conseiller numérique`, () => {
      startInscriptionAs({
        user,
        profilInscription: 'ConseillerNumerique',
        roleShouldBeCheckedAndFound: false,
      })
    })

    it(`ETQ Coordinateur ${user.lastName}, je peux m’inscrire en tant que coordinateur de conseiller numérique`, () => {
      startInscriptionAs({
        user,
        profilInscription: 'Coordinateur',
        roleShouldBeCheckedAndFound: true,
      })
    })

    it.skip(`ETQ Coordinateur ${user.lastName}, je ne peux pas m’inscrire en tant que médiateur`, () => {
      startInscriptionAs({
        user,
        profilInscription: 'Mediateur',
        roleShouldBeCheckedAndFound: false,
      })
    })
  }
})
