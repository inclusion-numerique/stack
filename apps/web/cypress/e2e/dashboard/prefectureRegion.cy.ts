import { appUrl, createTestUser } from 'cypress/support/helpers'

describe("En tant que préfecture de région, j'ai accès aux données de ma région", () => {
  beforeEach(() => {
    cy.execute('deleteAllData', {})
    const user = createTestUser({
      role: 'PrefectureRegion',
      roleScope: '75',
    })
    cy.createUserAndSignin(user)
  })

  it('Should access dashboard and switch departements from own region', () => {
    cy.log('Redirect to scoped dashboard')
    cy.visit(`/tableau-de-bord`)
    cy.url().should('equal', appUrl('/tableau-de-bord/departement/16'))

    cy.contains('Charente')

    // Peut changer de département
    cy.testId('departement-switcher').select('33')

    cy.url().should('equal', appUrl('/tableau-de-bord/departement/33'))
    cy.contains('Gironde')

    cy.intercept(
      'https://openmaptiles.geo.data.gouv.fr/data/france-vector.json',
    ).as('cartographie-map-tiles')
    cy.intercept(
      'https://openmaptiles.geo.data.gouv.fr/fonts/Noto%20Sans%20Regular/0-255.pbf',
    ).as('cartographie-map-fonts')

    // Map framework can throw errors (resize observer...) that we don't care about but make the test fail
    Cypress.on('uncaught:exception', () => false)

    cy.testId('cartographie-button').click()
    cy.url().should(
      'equal',
      appUrl('/tableau-de-bord/departement/33/cartographie'),
    )

    cy.testId('map-loader').should('be.visible')
    cy.wait('@cartographie-map-tiles')
    cy.wait('@cartographie-map-fonts')

    cy.contains('Retour au tableau de bord Gironde')
    cy.testId('structure-details-title').should('not.exist')
    cy.testId('city-details-title').should('not.exist')

    cy.testId('map-loader').should('not.be.visible')
  })
})
