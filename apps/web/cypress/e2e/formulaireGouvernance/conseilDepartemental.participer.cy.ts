import { appUrl } from '../../support/helpers'
import { createAndSigninUserForFormulaireGouvernance } from './createAndSigninUserForFormulaireGouvernance'

describe('ETQ Commune connectée, je peux compléter mon formulaire de participation à une feuille de route', () => {
  it('Acceptation 1 - Participer avec contact technique', () => {
    createAndSigninUserForFormulaireGouvernance('conseil-departemental')
    cy.visit(
      '/formulaires-feuilles-de-routes-territoriales/conseil-departemental/porter-ou-participer',
    )
    cy.get('button').contains('Participer').click()
    cy.url().should(
      'equal',
      appUrl(
        '/formulaires-feuilles-de-routes-territoriales/conseil-departemental/participer',
      ),
    )
    cy.contains('Formulaire conseil départemental')
    cy.findByLabelText('Renseignez votre département *').select('32')

    cy.findByLabelText('Nom *').type(`Nasr`)
    cy.findByLabelText('Prénom *').type(`Eddin`)
    cy.findByLabelText('Fonction *').type(`Maire`)
    cy.findByLabelText('Adresse e-mail *').type(`nasreddin@test.com`)

    cy.contains('Ajouter un contact technique').click()

    // Should not allow submission with empty contact technique
    cy.contains('Confirmer et envoyer').click()

    cy.contains('Veuillez renseigner un nom')

    cy.get('#input-form-field__contactTechnique\\.nom').type(`Nasr`)
    cy.get('#input-form-field__contactTechnique\\.prenom').type(`Eddin`)
    cy.get('#input-form-field__contactTechnique\\.fonction').type(`Maire`)
    cy.get('#input-form-field__contactTechnique\\.email').type(
      'nasreddin@test.com',
    )

    cy.intercept('/api/trpc/*').as('mutation')
    cy.contains('Confirmer et envoyer').click()
    cy.wait('@mutation')

    cy.url().should(
      'equal',
      appUrl(
        '/formulaires-feuilles-de-routes-territoriales/conseil-departemental/confirmation-formulaire-envoye',
      ),
    )
    cy.contains('Votre réponse a bien été envoyée')
  })
})
