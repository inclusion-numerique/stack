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
        identificationResult: 'matching',
      })
    })

    it(`ETQ Conseiller numérique ${user.lastName}, je ne peux m’inscrire en tant que conseiller même si j’ai choisi "coordinateur"`, () => {
      startInscriptionAs({
        user,
        profilInscription: 'Coordinateur',
        identificationResult: 'different',
        expectedCheckedProfilInscription: 'ConseillerNumerique',
      })
    })

    it(`ETQ Conseiller numérique ${user.lastName}, je peux m’inscrire en tant que conseiller même si j’ai choisi "médiateur"`, () => {
      startInscriptionAs({
        user,
        profilInscription: 'Mediateur',
        identificationResult: 'different',
        expectedCheckedProfilInscription: 'ConseillerNumerique',
      })
    })
  }
})
