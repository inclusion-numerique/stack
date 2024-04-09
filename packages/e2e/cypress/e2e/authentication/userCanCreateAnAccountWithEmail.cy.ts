import { goToMostRecentEmailReceived } from '@app/e2e/e2e/goToMostRecentEmailReceived'
import { appUrl, createTestUser } from '../../support/helpers'

describe('ETQ Utilisateur, lorsque je clique sur “Se créer un compte”, je peux créer un compte avec mon mail', () => {
  /**
   * US https://www.notion.so/ETQ-Utilisateur-lorsque-je-clique-sur-Cr-er-un-compte-je-peux-cr-er-un-compte-avec-mon-mail-19ceedd5ad574940af80f3f51d6943cf?pvs=4
   * Parcours https://www.figma.com/file/4wfmwOaKRnMhgiGEF256qS/La-Base---Parcours-utilisateurs?node-id=0-1&t=FqCnK7P9epO9Wpc4-0
   */

  // Unique user for this test
  const { email } = createTestUser()

  it('Acceptation 1 - Création de compte', () => {
    cy.visit('/creer-un-compte')

    cy.log('Signup form fill and submit')
    cy.findByLabelText('Email').type(email).type('{enter}')

    cy.url().should('equal', appUrl('/connexion/verification'), {
      timeout: 10_000,
    })

    cy.log('Magic link sent confirmation with email displayed')
    cy.contains('Un lien de connexion sécurisé a été envoyé')
    cy.contains(email)

    goToMostRecentEmailReceived({
      subjectInclude: 'Connexion à Espace France Numérique Ensemble',
    })

    cy.log('Check mail contents')
    // We should not have the email html version in full
    cy.contains('Connexion à Espace France Numérique Ensemble')
    cy.contains('Se connecter').invoke('attr', 'target', '_self').click()

    // With a valid magic link we should be automatically redirected to homepage, logged in
    cy.log('User should now be signed in')
    cy.url().should('eq', appUrl('/profil'))
    cy.get('.fr-header__tools').contains(email)

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')
  })

  it('Acceptation 2 - Création de compte déjà existant', () => {
    cy.visit('/creer-un-compte')

    cy.log('Signup form fill and submit')
    cy.findByLabelText('Email').type(email).type('{enter}')

    cy.url().should('equal', appUrl('/creer-un-compte'))
    cy.contains('Un compte existe déjà avec cet email')
  })
})
