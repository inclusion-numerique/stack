import { givenUser } from '@app/e2e/support/given/givenUser'

describe('Utilisateur connecté, je vois que je n’ai pas de suivis', () => {
  /**
   * US
   *  - https://www.notion.so/Utilisateur-je-peux-suivre-arreter-de-suivre-une-base-ou-un-profil-depuis-une-carte-base-profil-30ca7dfb9c4041f99dc0ae8e6cebda7e?pvs=4
   */
  beforeEach(() => {
    cy.deleteAllData()
  })

  it('Acceptation 1 : je vois un CTA de suivi si je n’ai pas de suivis', () => {
    const visitor = givenUser({ firstName: 'Yves', lastName: 'Visiteur' })
    cy.createUserAndSignin(visitor)

    cy.log('Visitor should see that it has no follows')
    cy.visit(`/profils/${visitor.slug}/collections`)
    cy.findByRole('link', { name: /mes suivis · 0/i }).click()
    cy.contains('Vous ne suivez pas de base ni de profil.')
    cy.findByRole('link', { name: /explorer les bases/i }).should('exist')
    cy.findByRole('link', { name: /explorer les profils/i }).should('exist')
  })
})
