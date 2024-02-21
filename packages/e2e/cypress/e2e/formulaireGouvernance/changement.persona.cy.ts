import { createAndSigninUserForFormulaireGouvernance } from './createAndSigninUserForFormulaireGouvernance'

describe('ETQ Utilisateur, je peux commencer un formulaire puis changer de persona', () => {
  it('Acceptation 1 - Debut en conseil departemental puis changement en EPCI', () => {
    createAndSigninUserForFormulaireGouvernance('conseil-departemental')
    cy.visit(
      '/formulaires-feuilles-de-routes-territoriales/conseil-departemental/porter-ou-participer',
    )
    cy.intercept('/api/trpc/*').as('mutation1')
    cy.get('button').contains('Porter').click()
    cy.wait('@mutation1')

    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/conseil-departemental/informations-participant',
    )
    cy.contains('Renseignez votre département')

    // Auvergne Rhone Alpes code 84
    cy.findByLabelText('Renseignez votre département *').select(`84`)

    cy.findByLabelText('Nom *').type(`Nasr`)
    cy.findByLabelText('Prénom *').type(`Eddin`)
    cy.findByLabelText('Fonction *').type(`Président`)
    cy.findByLabelText('Adresse e-mail *').type(`nasreddin@test.com`)

    cy.intercept('/api/trpc/*').as('mutation2')
    cy.get('button').contains('Étape suivante').click()
    cy.wait('@mutation2')

    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/conseil-departemental/perimetre-feuille-de-route',
    )
    cy.contains('Périmètre de votre feuille de route')

    cy.contains('Formulaires feuilles de routes territoriales').click()
    cy.appUrlShouldBe('/gouvernance')

    cy.get('a').contains('EPCI').click()
    cy.appUrlShouldBe('/gouvernance/epci')

    cy.intercept('/api/trpc/*').as('mutation3')
    cy.get('button').contains('Accéder au formulaire').click()
    cy.wait('@mutation3')

    cy.allowNextRedirectException()
    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/choix-du-formulaire',
    )
    cy.contains('Choix du formulaire à compléter')
    cy.contains('EPCI & groupement de communes').click()
    cy.intercept('/api/trpc/*').as('mutation4')
    cy.get('button').contains('Valider').click()
    cy.wait('@mutation4')
    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/porter-ou-participer',
    )
  })
})
