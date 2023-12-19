import { givenUser } from '@app/e2e/support/given/givenUser'

describe('Utilisateur connecté, je peux suivre un profil', () => {
  /**
   * US
   *  - https://www.notion.so/Utilisateur-je-peux-suivre-arreter-de-suivre-une-profile-ou-un-profil-depuis-une-carte-profile-profil-30ca7dfb9c4041f99dc0ae8e6cebda7e?pvs=4
   */
  beforeEach(() => {
    cy.deleteAllData()
    cy.intercept('/api/trpc/follow.followProfile?*').as('followProfile')
    cy.intercept('/api/trpc/follow.unfollowProfile?*').as('unfollowProfile')
  })

  it('Acceptation 1 : je suis redirigé vers la connexion si je ne suis pas connecté', () => {
    const creator = givenUser()
    const profile = givenUser({
      isPublic: true,
      firstName: 'Philippe',
      lastName: 'Intéressant',
    })
    cy.createUser(creator)
    cy.createUser(profile)

    cy.visit(`/profils/${profile.id}`)

    cy.findByRole('link', { name: /suivre/i }).click()

    cy.appUrlShouldBe('/connexion?intention=suivre-une-base-ou-un-profil')
    cy.contains('Connectez vous pour suivre une base ou un profil')
  })

  it('Acceptation 2 : je peux suivre un profil depuis la page d’un profil puis ne plus la suivre', () => {
    const profile = givenUser({
      isPublic: true,
      firstName: 'Philippe',
      lastName: 'Intéressant',
    })
    const visitor = givenUser({ firstName: 'Yves', lastName: 'Visiteur' })
    cy.createUser(profile)
    cy.createUserAndSignin(visitor)

    cy.visit(`/profils/${profile.id}`)

    cy.findByRole('button', { name: /suivre/i }).click()

    cy.wait('@followProfile')

    cy.getToast(new RegExp(`Vous suivez ${profile.name}`, 'i')).should('exist')

    cy.findByRole('button', { name: /ne plus suivre/i }).should('exist')

    cy.visit(`/profils/${visitor.id}`)

    cy.log('Visitor should see that it has one followed profile')
    cy.visit(`/profils/${visitor.id}`)
    cy.findByRole('link', { name: /mes suivis · 1/i }).click()
    cy.contains(/1 profil/i)
    cy.contains(profile.name)

    cy.log('Visitor should be able to unfollow')
    cy.visit(`/profils/${profile.id}`)
    cy.findByRole('button', { name: /ne plus suivre/i }).click()
    cy.wait('@unfollowProfile')
    cy.getToast(new RegExp(`Vous ne suivez plus ${profile.name}`, 'i')).should(
      'exist',
    )
    cy.findByRole('button', { name: /suivre/i }).should('exist')

    cy.log('Visitor should see that it has no followed profile')
    cy.visit(`/profils/${visitor.id}`)
    cy.findByRole('link', { name: /mes suivis · 0/i }).click()
    cy.contains(profile.name).should('not.exist')
  })

  it('Acceptation 3 : je peux suivre un profil depuis la carte d’un profil puis ne plus la suivre', () => {
    const profile = givenUser({
      isPublic: true,
      firstName: 'Philippe',
      lastName: 'Intéressant',
    })
    const visitor = givenUser({ firstName: 'Yves', lastName: 'Visiteur' })
    cy.createUser(profile)
    cy.createUserAndSignin(visitor)

    cy.visit(`/rechercher/tout/profils`)

    cy.log(
      'Visitor should see 2 profils but only 1 follow button as it cannot follow itself',
    )

    cy.testId('profile-card').should('have.length', 2)

    cy.findByRole('button', { name: /suivre/i }).click()

    cy.wait('@followProfile')

    cy.getToast(new RegExp(`Vous suivez ${profile.name}`, 'i')).should('exist')

    cy.findByRole('button', { name: /ne plus suivre/i }).should('exist')

    cy.visit(`/profils/${visitor.id}`)

    cy.log('Visitor should see that it has one followed profile')
    cy.visit(`/profils/${visitor.id}`)
    cy.findByRole('link', { name: /mes suivis · 1/i }).click()
    cy.contains(/1 profil/i)
    cy.contains(profile.name)

    cy.log('Visitor should be able to unfollow')
    cy.visit(`/rechercher/tout/profils`)
    cy.findByRole('button', { name: /ne plus suivre/i }).click()
    cy.wait('@unfollowProfile')
    cy.getToast(new RegExp(`Vous ne suivez plus ${profile.name}`, 'i')).should(
      'exist',
    )
    cy.findByRole('button', { name: /suivre/i }).should('exist')

    cy.log('Visitor should see that it has no followed profile')
    cy.visit(`/profils/${visitor.id}`)
    cy.findByRole('link', { name: /mes suivis · 0/i }).click()
    cy.contains(profile.name).should('not.exist')
  })
})
