import { mediateurSansActivites } from '@app/fixtures/users'
import { appUrl } from '@app/e2e/support/helpers'

describe('ETQ Utilisateur, je peux importer des bénéficiaires', () => {
  before(() => {
    cy.execute('resetFixtures', {})
  })

  it('Je vois la page d’erreur si j’upload un fichier invalide', () => {
    cy.signin(mediateurSansActivites)

    cy.visit(appUrl('/coop/mes-beneficiaires/importer'))
    cy.findByRole('heading', { name: 'Importer des bénéficiaires' })

    cy.get('input[type="file"][name="file"]').attachFile(
      'import-beneficiaires_invalide.xlsx',
    )
    cy.get('form').submit()

    cy.url().should(
      'contain',
      appUrl('/coop/mes-beneficiaires/importer/erreur'),
    )
    cy.findByRole('heading', { name: 'Erreur lors de l’analyse du fichier' })
  })

  it('Je peux importer le fichier d’exemple', () => {
    cy.signin(mediateurSansActivites)

    cy.visit(appUrl('/coop/mes-beneficiaires/importer'))
    cy.findByRole('heading', { name: 'Importer des bénéficiaires' })
    // Find link with title "Télécharger le modèle"
    cy.findByRole('link', { name: 'Télécharger le modèle' }).click()
    // This downloads the file in the cypress/downloads folder

    // Should display error as we did not upload a file
    cy.findByRole('button', {
      name: 'Vérifier le fichier avant import',
    }).click()
    cy.get('form p.fr-error-text').should(
      'have.text',
      'Veuillez sélectionner un fichier',
    )

    cy.get('input[type="file"][name="file"]').attachFile(
      'import-beneficiaires_modele.xlsx',
    )

    cy.findByRole('button', {
      name: 'Vérifier le fichier avant import',
    }).click()

    cy.url().should(
      'contain',
      appUrl('/coop/mes-beneficiaires/importer/analyse/'),
    )

    cy.findByRole('heading', { name: 'Analyse du fichier à importer' }).should(
      'be.visible',
    )

    cy.contains('Aucune erreur détectée')

    // Visible in the analysis table
    cy.findByRole('cell', { name: 'Exemple' }).should('be.visible')
    cy.findByRole('cell', { name: 'Léa' }).should('be.visible')
    cy.findByRole('cell', { name: '1970' }).should('be.visible')
    cy.findByRole('cell', { name: '32057' }).should('be.visible')

    // Find and click button "Valider l’import"
    cy.findByRole('button', { name: 'Valider l’import' }).click()

    // We should be redirected to the beneficiaires list page
    cy.appUrlShouldBe('/coop/mes-beneficiaires')
    cy.getToast(/1 bénéficiaire importé/i).should('exist')

    // Visible in beneficiaires list
    cy.findByRole('cell', { name: 'Exemple' }).should('be.visible')
    cy.findByRole('cell', { name: 'Léa' }).should('be.visible')
  })
})
