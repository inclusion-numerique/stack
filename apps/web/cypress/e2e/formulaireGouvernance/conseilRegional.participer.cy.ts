import { appUrl } from '../../support/helpers'
import { createAndSigninUserForFormulaireGouvernance } from './createAndSigninUserForFormulaireGouvernance'

describe('ETQ Commune connectée, je peux compléter mon formulaire de participation à une feuille de route', () => {
  it('Acceptation 1 - Participer avec contact technique supprimé', () => {
    createAndSigninUserForFormulaireGouvernance('conseil-regional')
    cy.visit(
      '/formulaires-feuilles-de-routes-territoriales/conseil-regional/porter-ou-participer',
    )
    cy.get('button').contains('Participer').click()
    cy.url().should(
      'equal',
      appUrl(
        '/formulaires-feuilles-de-routes-territoriales/conseil-regional/participer',
      ),
    )
    cy.contains('Formulaire conseil régional')
    cy.findByLabelText('Renseignez votre région *').select('32')

    cy.findByLabelText('Nom *').type(`Nasr`)
    cy.findByLabelText('Prénom *').type(`Eddin`)
    cy.findByLabelText('Fonction *').type(`Maire`)
    cy.findByLabelText('Adresse e-mail *').type(`nasreddin@test.com`)

    cy.contains('Ajouter un contact technique').click()

    // Should not allow submission with empty contact technique
    cy.contains('Confirmer et envoyer').click()

    cy.contains('Veuillez renseigner un nom')

    // Only fill partially then delete
    cy.get('#input-form-field__contactTechnique\\.nom').type(`Nasr`)
    cy.get('#input-form-field__contactTechnique\\.prenom').type(`Eddin`)
    cy.contains('Supprimer').click()

    cy.contains('Confirmer et envoyer').click()

    cy.url().should(
      'equal',
      appUrl(
        '/formulaires-feuilles-de-routes-territoriales/conseil-regional/confirmation-formulaire-envoye',
      ),
    )
    cy.contains('Votre réponse a bien été envoyée')
  })
})
