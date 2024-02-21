describe('Utilisateur,depuis la page de selection de département, je peux en savoir plus sur les données de l’inclusion numérique', () => {
  it('Je peux voir et annuler le flow en savoir plus', () => {
    cy.visit('/donnees/choix-du-departement')

    cy.findByRole('link', { name: /en savoir plus/i }).click()

    cy.appUrlShouldBe('/en-savoir-plus/donnees/tableau-de-bord')

    cy.findByRole('link', { name: /fermer/i }).click()

    cy.appUrlShouldBe('/donnees/choix-du-departement')
  })

  it('Je peux aller au bout du flow en savoir plus', () => {
    cy.visit('/donnees/choix-du-departement')

    cy.findByRole('link', { name: /en savoir plus/i }).click()

    cy.appUrlShouldBe('/en-savoir-plus/donnees/tableau-de-bord')

    cy.findByRole('link', { name: /suivant/i }).click()

    cy.appUrlShouldBe('/en-savoir-plus/donnees/cartographie')

    cy.findByRole('link', { name: /suivant/i }).click()

    cy.appUrlShouldBe('/en-savoir-plus/donnees/mise-en-commun')

    cy.findByRole('link', { name: /suivant/i }).click()

    cy.appUrlShouldBe('/en-savoir-plus/donnees/en-evolution')

    cy.findByRole('link', { name: /accéder/i }).click()

    cy.appUrlShouldBe('/donnees/choix-du-departement')
  })
})
