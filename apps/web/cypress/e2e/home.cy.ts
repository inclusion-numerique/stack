import { createTestUser } from '../support/helpers'

describe("Page d'accueil", () => {
  it("La page d'accueil s'affiche correctement, avec les styles du DSFR", () => {
    cy.visit('/')
    cy.get('.fr-header__service a').should(
      'contain',
      'Espace France Numérique Ensemble',
    )
    cy.get('.fr-header__tools .fr-btn')
      .should('contain', 'Se connecter')
      .should('have.css', 'color', 'rgb(0, 0, 145)')
  })

  it('Les overrides DSFR de app.css sont visibles', () => {
    cy.visit('/')
    cy.get('.fr-header').should('have.css', 'filter', 'none')
  })

  it("La page d'accueil affiche le statut de connexion de l'utilisateur", () => {
    const user = createTestUser()
    cy.createUserAndSignin(user)
    cy.visit('/')
    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')
    cy.dsfrShouldBeStarted()
    cy.dsfrCollapsesShouldBeBound()
    cy.get('.fr-header__tools button[aria-controls="header-user-menu"]')
      .contains(user.name)
      .click()
    cy.get('#header-user-menu').should('be.visible').contains('Se déconnecter')
  })

  it('Un utilisateur avec un token invalide peut accéder au site, déconnecté', () => {
    const user = createTestUser()
    cy.createUserAndSignin(user).then((sessionToken) => {
      cy.execute('deleteSession', sessionToken)
    })
    cy.visit('/')
    cy.get('.fr-header__tools').contains('Se connecter')
  })
})
