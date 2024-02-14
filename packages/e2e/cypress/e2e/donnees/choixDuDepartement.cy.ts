describe('Utilisateur, lorsque je sélectionne depuis la page de selection de département, je peux accéder au dashboard du département sélectionné', () => {
  it('Si je n’ai pas selectionné de département, je ne peux pas accéder aux données', () => {
    cy.visit('/donnees/choix-du-departement')

    cy.findByRole('button', { name: /accéder/i }).click()

    cy.appUrlShouldBe('/donnees/choix-du-departement')
    cy.contains('.fr-error-text', 'Veuillez sélectionner un département')
  })

  it('Si j’ai selectionné de département, je peux accéder aux données', () => {
    cy.visit('/donnees/choix-du-departement')

    cy.findByRole('combobox').select('38')
    cy.findByRole('button', { name: /accéder/i }).click()

    cy.appUrlShouldBe('/donnees/departements/38')
    cy.contains('Isère')
  })
})
