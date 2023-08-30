import { appUrl } from '../../support/helpers'
import { createAndSigninUserForFormulaireGouvernance } from './createAndSigninUserForFormulaireGouvernance'

describe('ETQ EPCI connectée, je peux compléter mon formulaire de participation à une feuille de route', () => {
  it('Acceptation 1 - Participer sans contact technique', () => {
    createAndSigninUserForFormulaireGouvernance('epci')
    cy.visit(
      '/formulaires-feuilles-de-routes-territoriales/epci/porter-ou-participer',
    )
    cy.get('button').contains('Participer').click()
    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales/epci/participer'),
    )
    cy.contains('Formulaire epci')
    cy.findByLabelText('Renseignez votre EPCI *').type(`Lyon`)
    cy.contains('Métropole')
    cy.findByLabelText('Renseignez votre EPCI *').type(`{downArrow}{enter}`)

    cy.findByLabelText('Nom *').type(`Nasr`)
    cy.findByLabelText('Prénom *').type(`Eddin`)
    cy.findByLabelText('Fonction *').type(`Maire`)
    cy.findByLabelText('Adresse e-mail *').type(`nasreddin@test.com`)

    cy.contains('Confirmer et envoyer').click()

    cy.url().should(
      'equal',
      appUrl(
        '/formulaires-feuilles-de-routes-territoriales/epci/confirmation-formulaire-envoye',
      ),
    )
    cy.contains('Votre réponse a bien été envoyée')
  })
})
