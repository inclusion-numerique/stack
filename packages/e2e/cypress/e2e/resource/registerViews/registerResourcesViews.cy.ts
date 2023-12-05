import { givenUser } from '@app/e2e/support/given/givenUser'
import { cleanUpAndCreateTestPublishedResource } from '../edition/editionTestUtils'

describe("Les visites d'une ressource sont comptées", () => {
  it.only('Acceptation 1 - Visiteur non connecté', () => {
    cleanUpAndCreateTestPublishedResource(true, true)
    cy.logout()

    cy.log('Je peux voir la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )
    cy.dsfrShouldBeStarted()
    // Visit counts for non connected users
    cy.testId('resource-views-count').should('have.text', '1')
    cy.reload()
    // Visit only counted once
    cy.testId('resource-views-count').should('have.text', '1')
  })

  it('Acceptation 3 - Utilisateur connecté sur une ressource publique', () => {
    cleanUpAndCreateTestPublishedResource(true, true)

    const user = givenUser()
    cy.createUserAndSignin(user)

    cleanUpAndCreateTestPublishedResource(true, true)
    cy.logout()

    cy.log('Je peux voir la ressource')
    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )
    cy.dsfrShouldBeStarted()
    // Visit counts for non connected users
    cy.testId('resource-views-count').should('have.text', '1')
    cy.reload()
    // Visit only counted once
    cy.testId('resource-views-count').should('have.text', '1')
  })
})
