import { coordinateursV1ThatShouldSignupAsCoordinateur } from '@app/e2e/e2e/inscription/inscriptionE2eCases'
import { startInscriptionAs } from '@app/e2e/e2e/inscription/inscriptionE2eHelpers'

describe('ETQ Coordinateur conseiller numérique, je peux m’inscrire en suivant le bon parcours', () => {
  beforeEach(() => {
    cy.execute('resetFixtures', {})
  })

  for (const user of Object.values(
    coordinateursV1ThatShouldSignupAsCoordinateur,
  )) {
    it(`ETQ Coordinateur ${user.lastName}, je peux m’inscrire en tant que coordinateur de conseiller numérique`, () => {
      startInscriptionAs({
        user,
        profilInscription: 'CoordinateurConseillerNumerique',
        identificationResult: 'matching',
      })

      cy.findByText('Continuer').click()

      cy.findByText('Non').click()

      cy.findByText('Suivant').click()

      cy.findByText('Valider mon inscription').click()

      cy.findByText('Voir plus tard').click()

      cy.get('h1').should('contain', 'Bonjour')
    })

    it(`ETQ Coordinateur ${user.lastName}, je peux m’inscrire en tant que coordinateur même si j’ai choisi "conseiller numérique"`, () => {
      startInscriptionAs({
        user,
        profilInscription: 'ConseillerNumerique',
        identificationResult: 'different',
        expectedCheckedProfilInscription: 'CoordinateurConseillerNumerique',
      })
    })

    it(`ETQ Coordinateur ${user.lastName}, je peux m’inscrire en tant que coordinateur même si j’ai choisi "médiateur"`, () => {
      startInscriptionAs({
        user,
        profilInscription: 'Mediateur',
        identificationResult: 'different',
        expectedCheckedProfilInscription: 'CoordinateurConseillerNumerique',
      })
    })
  }
})
