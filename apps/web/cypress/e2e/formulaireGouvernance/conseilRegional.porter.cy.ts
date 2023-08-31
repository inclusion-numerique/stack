import { createAndSigninUserForFormulaireGouvernance } from './createAndSigninUserForFormulaireGouvernance'

describe('ETQ Conseil régional connecté, je peux porter une feuille de route', () => {
  it('Acceptation 1 - Porter en selectionnant 1 EPCI, sans structures', () => {
    createAndSigninUserForFormulaireGouvernance('conseil-regional')
    cy.visit(
      '/formulaires-feuilles-de-routes-territoriales/conseil-regional/porter-ou-participer',
    )
    cy.get('button').contains('Porter').click()
    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/conseil-regional/informations-participant',
    )
    cy.contains('Renseignez votre région')

    // Auvergne Rhone Alpes code 84
    cy.findByLabelText('Renseignez votre région *').select(`84`)

    cy.findByLabelText('Nom *').type(`Nasr`)
    cy.findByLabelText('Prénom *').type(`Eddin`)
    cy.findByLabelText('Fonction *').type(`Président`)
    cy.findByLabelText('Adresse e-mail *').type(`nasreddin@test.com`)

    cy.findByLabelText(
      "Êtes vous impliqués dans un schéma ou une gouvernance locale relative à l'inclusion numérique ? Si oui laquelle (SDUN, CRTE, etc.)",
    ).type('Non')
    cy.intercept('/api/trpc/*').as('mutation1')
    cy.get('button').contains('Étape suivante').click()
    cy.wait('@mutation1')

    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/conseil-regional/perimetre-feuille-de-route',
    )
    cy.contains('Périmètre de votre feuille de route')

    cy.contains('Allier (03)').click()
    cy.testId('accordion-departement-03').as('accordion-departement-03')

    cy.get('@accordion-departement-03').find('.fr-accordion__btn').eq(3).click()

    cy.intercept('/api/trpc/*').as('mutation2.1')
    cy.get('@accordion-departement-03')
      .get(
        '.fr-collapse.fr-collapse--expanded .fr-collapse.fr-collapse--expanded input[type="checkbox"]',
      )
      .eq(0)
      .click()
    cy.wait('@mutation2.1')

    cy.intercept('/api/trpc/*').as('mutation2.2')
    cy.get('button').contains('Étape suivante').click()
    cy.wait('@mutation2.2')

    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/conseil-regional/contacts-collectivites',
    )
    cy.contains('Contacts des collectivités partenaires')

    cy.findByLabelText('Nom *').type(`Bob`)
    cy.findByLabelText('Prénom *').type(`Tonton`)
    cy.findByLabelText('Fonction *').type(`Wizard`)
    cy.findByLabelText('Adresse e-mail *').type(`bob@test.com`)

    cy.intercept('/api/trpc/*').as('mutation3')
    cy.get('button').contains('Enregistrer').click()
    cy.wait('@mutation3')

    cy.contains('Bob Tonton, Wizard')

    cy.intercept('/api/trpc/*').as('mutation5')
    cy.get('button').contains('Étape suivante').click()
    cy.wait('@mutation5')
    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/conseil-regional/autres-structures',
    )
    cy.contains('Autres structures impliquées')
    cy.intercept('/api/trpc/*').as('mutation6')
    cy.testId('action-bar-skip').click()
    cy.wait('@mutation6')

    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/conseil-regional/recapitulatif',
    )

    cy.contains('Récapitulatif de votre feuille de route')

    cy.contains(
      'Vous devez renseigner ce contact pour valider le périmètre de votre feuille de route.',
    ).should('not.exist')

    cy.testId('recapitulatif-nombre-collectivites').should(
      'have.text',
      'Nombre de collectivités : 1',
    )
    cy.testId('recapitulatif-nombre-structures').should('not.exist')
    cy.intercept('/api/trpc/*').as('mutation10')
    cy.get('button').contains('Confirmer & envoyer').click()
    cy.wait('@mutation10')

    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/conseil-regional/confirmation-formulaire-envoye',
    )

    cy.contains('Votre réponse a bien été envoyée')

    cy.testId('backlink').should('not.exist')
  })
})
