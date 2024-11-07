import { conseillersV1ThatShouldSignupAsConseiller } from '@app/e2e/e2e/inscription/inscriptionE2eCases'
import { startInscriptionAs } from '@app/e2e/e2e/inscription/inscriptionE2eHelpers'

describe('ETQ Conseiller numérique, je peux m’inscrire en suivant le bon parcours', () => {
  beforeEach(() => {
    cy.execute('resetFixtures', {})
  })

  for (const user of Object.values(conseillersV1ThatShouldSignupAsConseiller)) {
    it(`ETQ Conseiller numérique ${user.lastName}, je peux m’inscrire en tant que conseiller numérique`, () => {
      startInscriptionAs({
        user,
        profilInscription: 'ConseillerNumerique',
        roleShouldBeCheckedAndFound: true,
      })
    })

    it(`ETQ Conseiller numérique ${user.lastName}, je ne peux pas m’inscrire en tant que coordinateur de conseiller numérique`, () => {
      startInscriptionAs({
        user,
        profilInscription: 'Coordinateur',
        roleShouldBeCheckedAndFound: false,
      })
    })

    it.skip(`ETQ Conseiller numérique ${user.lastName}, je ne peux pas m’inscrire en tant que médiateur`, () => {
      startInscriptionAs({
        user,
        profilInscription: 'Mediateur',
        roleShouldBeCheckedAndFound: false,
      })
    })
  }
})
