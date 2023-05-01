import { createTestUser } from '../support/helpers'

describe("Page d'accueil", () => {
  it("La page d'accueil s'affiche correctement, avec les styles du DSFR", () => {
    cy.visit('/')
    cy.get('.fr-header__service-title').should('contain', 'Stack')
    cy.get('.fr-nav__link')
      .first()
      .should('contain', 'Accueil')
      .should('have.attr', 'aria-current', 'page')
      .should('have.css', 'color', 'rgb(0, 0, 145)')
    cy.get('.fr-header__tools').contains('Se connecter')
  })

  it("La page d'accueil affiche le statut de connexion de l'utilisateur", () => {
    const user = createTestUser()
    cy.createUserAndSignin(user)
    cy.visit('/')
    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')
    cy.get('.fr-header__tools').should('contain', user.name)
  })
})
