import { createTestUser } from '@app/e2e/support/helpers'

describe('Utilisateur, lorsque je clique sur “Accéder aux données”, je suis redirigé en fonction de mon role', () => {
  it('Utilisateur non connecté, je peux accéder au données en tant que prefecture', () => {
    cy.visit('/')

    cy.findByRole('link', { name: /accéder aux données/i }).click()

    cy.appUrlShouldBe('/acceder-aux-donnees')

    cy.contains('a', 'Vous êtes une préfecture').click()

    cy.appUrlShouldBe('/connexion?role=prefecture&suivant=/donnees')

    cy.contains('Préfecture')
    cy.contains('Se connecter ')
  })

  it('Utilisateur non connecté, je peux accéder au données en tant que grand public', () => {
    cy.visit('/')

    cy.findByRole('link', { name: /accéder aux données/i }).click()

    cy.appUrlShouldBe('/acceder-aux-donnees')

    cy.contains('a', 'Ouvert au grand public').click()

    cy.appUrlShouldBe('/donnees/choix-du-departement')
  })

  it('Utilisateur sans rôle prefecture, je suis redirigé vers la selection du département', () => {
    const user = createTestUser()
    cy.createUserAndSignin(user)
    cy.visit('/')

    cy.findByRole('link', { name: /accéder aux données/i }).click()
    cy.appUrlShouldBe('/donnees/choix-du-departement')
  })

  it('Utilisateur avec role prefecture de département, je suis redirigé vers les données de mon département', () => {
    const user = createTestUser({
      role: 'PrefectureDepartement',
      roleScope: '75',
    })
    cy.createUserAndSignin(user)

    cy.visit('/')

    cy.findByRole('link', { name: /accéder aux données/i }).click()
    cy.appUrlShouldBe('/donnees/departements/75')
  })

  it('Utilisateur avec role prefecture de région, je suis redirigé vers les données de département de ma région', () => {
    const user = createTestUser({
      role: 'PrefectureRegion',
      // Nouvelle aquitaine
      roleScope: '75',
    })
    cy.createUserAndSignin(user)

    cy.visit('/donnees')
    // Charentes, premier departement de la region
    cy.appUrlShouldBe('/donnees/departements/16')
  })

  it('La redirection vers les données fonctionne en fonction de mon rôle', () => {
    cy.allowNextRedirectException()
    cy.visit('/donnees')
    cy.appUrlShouldBe('/acceder-aux-donnees')
  })
})
