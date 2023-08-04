import { appUrl } from '../../support/helpers'
import { signinWithMonComptePro } from './signinWithMonComptePro'

describe('ETQ Utilisateur, lorsque je clique sur “Se créer un compte”, je peux créer un compte avec Mon Compte Pro', () => {
  const { email, password, name } = {
    email: Cypress.env('MON_COMPTE_PRO_TEST_USER_EMAIL') as string,
    password: Cypress.env('MON_COMPTE_PRO_TEST_USER_PASSWORD') as string,
    name: 'Jean User',
  }

  before(() => {
    cy.execute('deleteUser', { email })
  })

  it('Acceptation 1 - Création de compte', () => {
    cy.visit('/creer-un-compte')
    signinWithMonComptePro({ email, password })
    cy.url().should('equal', appUrl('/profil'))
    cy.get('.fr-header__tools').contains(name)

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')
  })
})
