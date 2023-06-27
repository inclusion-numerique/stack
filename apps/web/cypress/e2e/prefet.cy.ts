import { appUrl, createTestUser } from 'cypress/support/helpers'

describe('Préfet', () => {
  beforeEach(() => {
    cy.execute('deleteAllData', undefined)
    const user = createTestUser()
    cy.createUserAndSignin(user)
    cy.visit(`/`)
    cy.intercept(
      'https://openmaptiles.geo.data.gouv.fr/data/france-vector.json',
    ).as('france-map')
  })

  it.skip('Should access dashboard and see detailed map informations', () => {
    cy.testId('prefet-button').click()
    cy.url().should('equal', appUrl('/prefet'))
    cy.wait(1000)
    cy.testId('departement-map').compareSnapshot('departement-map', 0)
    cy.testId('cartographie-button').click()
    cy.url().should('equal', appUrl('/prefet/cartographie'))
    cy.wait('@france-map')
    cy.wait(5000)
    cy.testId('detailed-map').compareSnapshot('detailed-map', 0)
  })
})
