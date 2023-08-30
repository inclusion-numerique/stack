import { appUrl } from '../../support/helpers'
import { createAndSigninUserForFormulaireGouvernance } from './createAndSigninUserForFormulaireGouvernance'

describe('ETQ Commune connectée, je peux compléter mon formulaire de participation à une feuille de route', () => {
  it('Acceptation 1 - Participer sans contact technique', () => {
    createAndSigninUserForFormulaireGouvernance('commune')
    cy.visit('/formulaires-feuilles-de-routes-territoriales/commune/participer')
    cy.contains('Formulaire commune')
    cy.findByLabelText('Renseignez votre commune *').type(`Lyon 2`)
    cy.contains('69002')
    cy.findByLabelText('Renseignez votre commune *').type(`{downArrow}{enter}`)

    cy.findByLabelText('Nom *').type(`Nasr`)
    cy.findByLabelText('Prénom *').type(`Eddin`)
    cy.findByLabelText('Fonction *').type(`Maire`)
    cy.findByLabelText('Adresse e-mail *').type(`nasreddin@test.com`)

    cy.intercept('/api/trpc/*').as('mutation')
    cy.contains('Confirmer et envoyer').click()
    cy.wait('@mutation')

    cy.wait(15_000)

    cy.url().should(
      'equal',
      appUrl(
        '/formulaires-feuilles-de-routes-territoriales/commune/confirmation-formulaire-envoye',
      ),
    )
    cy.contains('Votre réponse a bien été envoyée')
  })
})
