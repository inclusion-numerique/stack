import { appUrl, createTestUser } from '@app/e2e/support/helpers'

describe("En tant que préfecture de département, j'ai accès aux données de mon département", () => {
  beforeEach(() => {
    cy.execute('deleteAllData', {})
    const user = createTestUser({
      role: 'PrefectureDepartement',
      roleScope: '33',
    })
    cy.createUserAndSignin(user)
  })

  it('Should access dashboard and see detailed map informations', () => {
    cy.log('Redirect to scoped dashboard')
    cy.visit(`/donnees`)
    cy.appUrlShouldBe('/donnees/departements/33')

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
    cy.url().should('equal', appUrl('/donnees/departements/33/cartographie'))

    cy.testId('map-loader').should('be.visible')
    cy.wait('@cartographie-map-tiles')
    cy.wait('@cartographie-map-fonts')

    cy.contains('Retour aux données · Gironde')
    cy.testId('structure-details-title').should('not.exist')
    cy.testId('city-details-title').should('not.exist')

    cy.testId('map-loader').should('not.be.visible')

    const searchInputPlaceholder = 'Rechercher une commune ou une structure'

    cy.log('Can search and select a city')

    cy.get(`input[placeholder="${searchInputPlaceholder}"]`).type('Arcachon')

    cy.contains('Arcachon 33120').trigger('mousedown')
    cy.get(`input[placeholder="${searchInputPlaceholder}"]`).should(
      'have.value',
      'Arcachon 33120',
    )

    cy.testId('city-details-title').should('include.text', 'Arcachon')

    cy.testId('map-popup-close-button').click()
    cy.testId('city-details-title').should('not.exist')

    cy.log('Can search and select a structure')

    cy.get(`input[placeholder="${searchInputPlaceholder}"]`).type(
      "mairie pomerol",
    )
    cy.contains("Mairie Pomerol").trigger('mousedown')
    cy.get(`input[placeholder="${searchInputPlaceholder}"]`).should(
      'have.value',
      "Mairie Pomerol",
    )

    cy.testId('structure-details-title').should(
      'include.text',
      "Mairie Pomerol",
    )

    cy.testId('map-popup-close-button').click()
    cy.testId('structure-details-title').should('not.exist')
  })
})
