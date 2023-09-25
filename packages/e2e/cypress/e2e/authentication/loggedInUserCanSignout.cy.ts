import { appUrl, createTestUser } from '../../support/helpers'

describe('ETQ Utilisateur, je peux me connecter à mon compte / me déconnecter', () => {
  // Unique user for this test
  const testUser = createTestUser()

  it('Utilisateur connecté, je peux me déconnecter', () => {
    cy.createUserAndSignin(testUser)
    cy.visit('/')
    cy.dsfrShouldBeStarted()
    cy.dsfrCollapsesShouldBeBound()
    cy.get('.fr-header__tools button[aria-controls="header-user-menu"]')
      .contains(testUser.name)
      .click()
    cy.get('#header-user-menu')
      .should('be.visible')
      .contains('Se déconnecter')
      .click()
    cy.url().should('equal', appUrl('/deconnexion'))
    cy.contains('Êtes-vous sur de vouloir vous déconnecter ?')
    cy.get('main').contains('Se déconnecter').click()
    cy.url().should('equal', appUrl('/'))
    cy.get('.fr-header__tools').contains('Se connecter')
  })
})
