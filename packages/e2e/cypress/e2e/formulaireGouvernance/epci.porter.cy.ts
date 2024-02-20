import { createAndSigninUserForFormulaireGouvernance } from './createAndSigninUserForFormulaireGouvernance'

describe('ETQ EPCI connecté, je peux porter une feuille de route', () => {
  it('Acceptation 1 - Porter et retourner aux etapes précedentes', () => {
    createAndSigninUserForFormulaireGouvernance('epci')
    cy.visit(
      '/formulaires-feuilles-de-routes-territoriales/epci/porter-ou-participer',
    )
    cy.get('button').contains('Porter').click()
    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/informations-participant',
    )
    cy.contains('Renseignez votre EPCI')
    cy.findByLabelText('Renseignez votre EPCI *').type(`Lyon`)
    cy.contains('Métropole')
    cy.findByLabelText('Renseignez votre EPCI *').type(`{downArrow}{enter}`)

    cy.findByLabelText('Nom *').type(`Nasr`)
    cy.findByLabelText('Prénom *').type(`Eddin`)
    cy.findByLabelText('Fonction *').type(`Maire`)
    cy.findByLabelText('Adresse e-mail *').type(`nasreddin@test.com`)

    cy.findByLabelText(
      "Êtes vous impliqués dans un schéma ou une gouvernance locale relative à l'inclusion numérique ? Si oui laquelle (SDUN, CRTE, etc.)",
    ).type('Non')
    cy.intercept('/api/trpc/*').as('mutation1')
    cy.get('button').contains('Étape suivante').click()
    cy.wait('@mutation1')

    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/perimetre-feuille-de-route',
    )
    cy.contains('Périmètre de votre feuille de route')

    cy.get('.fr-accordion__btn').eq(3).click()
    cy.get('.fr-collapse.fr-collapse--expanded input[type="checkbox"]')
      .eq(0)
      .parent()
      .click()
    cy.get('.fr-collapse.fr-collapse--expanded input[type="checkbox"]')
      .eq(1)
      .parent()
      .click()

    cy.intercept('/api/trpc/*').as('mutation2')
    cy.get('button').contains('Étape suivante').click()
    cy.wait('@mutation2')

    cy.contains('Contacts des collectivités partenaires')

    cy.findByLabelText('Nom *').type(`Bob`)
    cy.findByLabelText('Prénom *').type(`Tonton`)
    cy.findByLabelText('Fonction *').type(`Wizard`)
    cy.findByLabelText('Adresse e-mail *').type(`bob@test.com`)

    cy.intercept('/api/trpc/*').as('mutation3')
    cy.get('button').contains('Enregistrer').click()
    cy.wait('@mutation3')

    cy.contains('Bob Tonton, Wizard')

    // Should not be able because of missing contacts
    cy.get('button').contains('Étape suivante').click()

    cy.get('#etape-error').contains(
      'renseigner un contact pour chaque collectivité',
    )
    cy.contains(
      "Je souhaite porter une feuille de route, mais je n'ai pas encore les contacts de mes partenaires territoriaux",
    ).click()

    cy.intercept('/api/trpc/*').as('mutation5')
    cy.get('button').contains('Étape suivante').click()
    cy.wait('@mutation5')
    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/autres-structures',
    )
    cy.contains('Autres structures impliquées')
    cy.testId('action-bar-skip').should('be.visible')

    cy.contains('Ajouter une structure partenaire').click()
    cy.findByLabelText('Nom de la structure *').type(`Musée de l'ignorance`)
    cy.findByLabelText('Nom *').type('Alice')
    cy.findByLabelText('Prénom *').type(`Aline`)
    cy.findByLabelText('Fonction *').type(`Boss`)
    cy.findByLabelText('Adresse e-mail *').type(`alice@test.com`)

    cy.intercept('/api/trpc/*').as('mutation6')
    cy.get('button').contains('Enregistrer').click()
    cy.wait('@mutation6')

    cy.contains('Alice Aline, Boss')

    cy.testId('action-bar-info').should(
      'have.text',
      '1structure partenaire ajoutée',
    )

    cy.testId('action-bar-skip').should('not.exist')

    cy.intercept('/api/trpc/*').as('mutation7')
    cy.get('button').contains('Étape suivante').click()
    cy.wait('@mutation7')

    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/recapitulatif',
    )

    cy.contains('Récapitulatif de votre feuille de route')

    cy.contains(
      'Vous devez renseigner ce contact pour valider le périmètre de votre feuille de route.',
    )

    cy.get('button').contains('Confirmer & envoyer').click()
    cy.get('#etape-error').contains(
      'Vous devez renseigner les contacts manquants ',
    )

    // Check that back link is working
    cy.testId('backlink').click()
    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/autres-structures',
    )

    // Check that data is still here
    cy.contains('Alice Aline, Boss')
    cy.contains("Musée de l'ignorance")
    cy.testId('action-bar-info').should(
      'have.text',
      '1structure partenaire ajoutée',
    )

    // Check that back link is working
    cy.testId('backlink').click()
    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/contacts-collectivites',
    )

    // Check that data is still here
    cy.contains('Bob Tonton, Wizard')

    // Check that back link is working
    cy.testId('backlink').click()
    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/perimetre-feuille-de-route',
    )
    cy.get('.fr-accordion__btn').eq(3).click()
    // Deselecting all communes
    cy.get('.fr-collapse.fr-collapse--expanded input[type="checkbox"]')
      .eq(1)
      .parent()
      // Click once to select all
      .click()
      // Click twice to deselect all
      .click()

    cy.intercept('/api/trpc/*').as('mutation8')

    // Select only one commune
    cy.get('.fr-collapse.fr-collapse--expanded input[type="checkbox"]')
      .eq(6)
      .parent()
      .click()
    cy.wait('@mutation8')

    // Check that back link is working
    cy.testId('backlink').click()
    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/informations-participant',
    )
    cy.findByLabelText('Nom *').should('have.value', `Nasr`)
    cy.findByLabelText('Prénom *').should('have.value', `Eddin`)
    cy.findByLabelText('Fonction *').should('have.value', `Maire`)
    cy.findByLabelText('Adresse e-mail *').should(
      'have.value',
      `nasreddin@test.com`,
    )

    cy.findByLabelText(
      "Êtes vous impliqués dans un schéma ou une gouvernance locale relative à l'inclusion numérique ? Si oui laquelle (SDUN, CRTE, etc.)",
    ).should('have.value', 'Non')

    // Navigator back should also work with router refresh() keeping the data fresh
    cy.go('back')

    // Unselection / Autosaving of communes should be ok in navigation cache
    cy.testId('action-bar-info').should(
      'contain.text',
      '1EPCI -1commune sélectionnés',
    )

    cy.go('back')

    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/contacts-collectivites',
    )

    // The previous contact is still here, old is deleted, and a new one in pending
    cy.testId('action-bar-info').should('have.text', '1/2contacts complétés')
    // Data still here
    cy.contains('Bob Tonton, Wizard')

    // New contact is pending
    cy.findByLabelText('Nom *').type('Caroline')
    cy.findByLabelText('Prénom *').type(`Chaos`)
    cy.findByLabelText('Fonction *').type(`Uber boss`)
    cy.findByLabelText('Adresse e-mail *').type(`caroline@test.com`)
    cy.intercept('/api/trpc/*').as('mutation9')

    cy.get('button').contains('Enregistrer').click()
    cy.wait('@mutation9')

    cy.go('back')

    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/autres-structures',
    )

    // Data is still here
    cy.contains('Alice Aline, Boss')

    cy.go('back')
    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/recapitulatif',
    )
    cy.testId('recapitulatif-nombre-collectivites').should(
      'have.text',
      'Nombre de collectivités : 2',
    )
    cy.testId('recapitulatif-nombre-structures').should(
      'have.text',
      'Nombre de structures partenaires : 1',
    )
    cy.intercept('/api/trpc/*').as('mutation10')
    cy.get('button').contains('Confirmer & envoyer').click()
    cy.wait('@mutation10')

    cy.appUrlShouldBe(
      '/formulaires-feuilles-de-routes-territoriales/epci/confirmation-formulaire-envoye',
    )

    cy.contains('Votre réponse a bien été envoyée')

    cy.testId('backlink').should('not.exist')
  })
})
