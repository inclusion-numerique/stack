import { givenUser } from '@app/e2e/support/given/givenUser'
import { cleanUpAndCreateTestPublishedResource } from '../edition/editionTestUtils'

describe("Les visites d'une ressource sont comptées", () => {
  it.only('Acceptation 1 - Visiteur non connecté', () => {
    Cypress.Cookies.debug(true)

    cleanUpAndCreateTestPublishedResource(true, true)
    cy.logout()

    cy.log('Je peux voir la ressource')
    cy.dsfrShouldBeStarted()
    cy.testId('resource-views-count').should('have.text', '0')
    cy.reload()
    // Visit counts for non connected users
    cy.testId('resource-views-count').should('have.text', '1')
    cy.getCookie('visit-hash').should('exist')
    cy.reload()
    // Visit only counted once
    cy.testId('resource-views-count').should('have.text', '1')
    cy.getCookie('visit-hash').should('exist')
  })

  it('Acceptation 3 - Utilisateur connecté sur une ressource publique', () => {
    Cypress.Cookies.debug(true)

    cleanUpAndCreateTestPublishedResource(true, true)
    const user = givenUser()
    cy.createUserAndSignin(user)

    cleanUpAndCreateTestPublishedResource(true, true)
    cy.logout()

    cy.log('Je peux voir la ressource')
    cy.dsfrShouldBeStarted()
    cy.testId('resource-views-count').should('have.text', '0')
    // Visit counts for non connected users
    cy.testId('resource-views-count').should('have.text', '1')
    cy.getCookie('visit-hash').should('exist')
    cy.reload()
    // Visit only counted once
    cy.testId('resource-views-count').should('have.text', '1')
    cy.getCookie('visit-hash').should('exist')
  })
})
