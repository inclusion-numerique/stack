import { createTestUser } from '@app/e2e/support/helpers'

describe('Utilisateur, j’ai accès aux gouvernances nationales en fonction de mon rôle', () => {
  const accessRefusedMessage =
    'Veuillez sélectionner un département pour consulter une gouvernance'

  const accessGrantedMessage =
    'Les acteurs au niveau national souhaitant porter ou participer à une feuille de route locale France Numérique Ensemble'

  it('Utilisateur non connecté, je ne peux pas consulter les gouvernances nationales', () => {
    cy.visit('/gouvernances/national')

    cy.contains(accessRefusedMessage)
    cy.contains(accessGrantedMessage).should('not.exist')
  })

  it('Utilisateur sans rôle, je ne peux pas consulter les gouvernances nationales', () => {
    const user = createTestUser()
    cy.createUserAndSignin(user)
    cy.visit('/gouvernances/national')

    cy.contains(accessRefusedMessage)
    cy.contains(accessGrantedMessage).should('not.exist')
  })

  it('Utilisateur avec role prefecture de région, je ne peux pas consulter les gouvernances nationales', () => {
    const user = createTestUser({
      role: 'PrefectureRegion',
      // Nouvelle aquitaine
      roleScope: '75',
    })
    cy.createUserAndSignin(user)

    cy.visit('/gouvernances/national')

    cy.contains(accessRefusedMessage)
    cy.contains(accessGrantedMessage).should('not.exist')
  })

  it('Utilisateur avec role administrateur, je peux consulter les gouvernances nationales', () => {
    const user = createTestUser({
      role: 'Administrator',
    })
    cy.createUserAndSignin(user)

    cy.visit('/gouvernances/national')

    cy.contains(accessRefusedMessage).should('not.exist')
    cy.contains(accessGrantedMessage)
  })
})
