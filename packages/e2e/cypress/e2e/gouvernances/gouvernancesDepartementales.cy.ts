import { createTestUser } from '@app/e2e/support/helpers'

describe('Utilisateur, j’ai accès aux gouvernances départementales en fonction de mon rôle', () => {
  const publicAccessContent =
    'Actuellement, Il n’y a pas de proposition de gouvernance sur ce département.'

  const writeAccessContent =
    'Les acteurs de votre territoire souhaitant porter ou participer à une feuille de route locale France Numérique Ensemble'

  it('Utilisateur non connecté, je vois uniquement les informations publiques', () => {
    cy.visit('/gouvernances/departements/69')

    cy.contains(publicAccessContent)
    cy.contains(writeAccessContent).should('not.exist')
  })

  it('Utilisateur sans rôle, je vois uniquement les informations publiques', () => {
    const user = createTestUser()
    cy.createUserAndSignin(user)
    cy.visit('/gouvernances/departements/69')

    cy.contains(publicAccessContent)
    cy.contains(writeAccessContent).should('not.exist')
  })

  it('Utilisateur avec role prefecture de département, je vois uniquement les informations publiques d’un autre département', () => {
    const user = createTestUser({
      role: 'PrefectureDepartement',
      roleScope: '75',
    })
    cy.createUserAndSignin(user)

    cy.visit('/gouvernances/departements/69')

    cy.contains(publicAccessContent)
    cy.contains(writeAccessContent).should('not.exist')
  })

  it('Utilisateur avec role prefecture de région, je vois uniquement les informations publiques d’une autre région', () => {
    const user = createTestUser({
      role: 'PrefectureRegion',
      // Nouvelle aquitaine
      roleScope: '75',
    })
    cy.createUserAndSignin(user)

    cy.visit('/gouvernances/departements/69')

    cy.contains(publicAccessContent)
    cy.contains(writeAccessContent).should('not.exist')
  })

  it('Utilisateur avec role administrateur, je peux consulter les gouvernances départementales', () => {
    const user = createTestUser({
      role: 'Administrator',
    })
    cy.createUserAndSignin(user)

    cy.visit('/gouvernances/departements/69')

    cy.contains(publicAccessContent).should('not.exist')
    cy.contains(writeAccessContent)
  })

  it('Utilisateur avec role prefecture de département, j’ai un accès détaillé aux gouvernances de mon département', () => {
    const user = createTestUser({
      role: 'PrefectureDepartement',
      roleScope: '69',
    })
    cy.createUserAndSignin(user)

    cy.visit('/gouvernances/departements/69')

    cy.contains(publicAccessContent).should('not.exist')
    cy.contains(writeAccessContent)
  })

  it('Utilisateur avec role prefecture de région, je peux consulter les gouvernances départementales de ma région', () => {
    const user = createTestUser({
      role: 'PrefectureRegion',
      // Nouvelle aquitaine
      roleScope: '75',
    })
    cy.createUserAndSignin(user)

    cy.visit('/gouvernances/departements/33')

    cy.contains(publicAccessContent).should('not.exist')
    cy.contains(writeAccessContent)
  })
})
