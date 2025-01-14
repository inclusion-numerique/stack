import { startInscriptionAs } from '@app/e2e/e2e/inscription/inscriptionE2eHelpers'

describe('ETQ médiateur, je peux m’inscrire en suivant le bon parcours', () => {
  beforeEach(() => {
    cy.execute('resetFixtures', {})
  })

  const user = {
    email: 'test@test.com',
    firstName: 'test',
    lastName: 'test',
    emailVerified: new Date(),
  }

  it(`ETQ Médiateur ${user.lastName}, je ne peux pas m’inscrire en tant que conseiller numérique`, () => {
    startInscriptionAs({
      user,
      profilInscription: 'ConseillerNumerique',
      identificationResult: 'not-found',
    })
  })

  it(`ETQ Médiateur ${user.lastName}, je ne peux pas m’inscrire en tant que coordinateur de conseiller numérique`, () => {
    startInscriptionAs({
      user,
      profilInscription: 'CoordinateurConseillerNumerique',
      identificationResult: 'not-found',
    })
  })

  it(`ETQ Médiateur ${user.lastName}, je peux m’inscrire en tant que médiateur`, () => {
    startInscriptionAs({
      user,
      profilInscription: 'Mediateur',
      identificationResult: 'matching',
    })

    cy.findByText('Continuer').click()

    cy.get('input')
      .click()
      .type('Franc')
      .type('e', { delay: 2000 })
      .type('{downarrow}')
      .type('{enter}')

    cy.findByText('Suivant').click()

    cy.findByText('Oui').click()

    cy.findByText('Suivant').click()

    cy.findByText('Valider mon inscription').click()

    cy.findByText('Voir plus tard').click()

    cy.get('h1').should('contain', 'Bonjour')
  })

  it(`ETQ Médiateur ${user.lastName}, je peux m’inscrire en tant que coordinateur`, () => {
    startInscriptionAs({
      user,
      profilInscription: 'Coordinateur',
      identificationResult: 'matching',
    })

    cy.findByText('Continuer').click()

    cy.findByText('Non').click()

    cy.get('input')
      .click()
      .type('Franc')
      .type('e', { delay: 2000 })
      .type('{downarrow}')
      .type('{enter}')

    cy.findByText('Suivant').click()

    cy.findByText('Valider mon inscription').click()

    cy.findByText('Voir plus tard').click()

    cy.get('h1').should('contain', 'Bonjour')
  })
})
