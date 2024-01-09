import { givenUser } from '@app/e2e/support/given/givenUser'
import { cleanUp } from '../resource/edition/editionTestUtils'

describe('Utilisateur sans droit, je ne peux ni voir et ni editer le profil', () => {
  it('Acceptation 1 - Visiteur sur un profile publique', () => {
    const {
      user: { slug },
    } = cleanUp({ isPublic: true })
    cy.logout()

    cy.visit(`/profils/${slug}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('not.exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/profils/${slug}/modifier`)
    cy.appUrlShouldBe(`/connexion?suivant=/profils/${slug}/modifier`)
  })

  it('Acceptation 2 - Visiteur sur un profile privé', () => {
    const {
      user: { slug },
    } = cleanUp({ isPublic: true })
    cy.logout()

    cy.visit(`/profils/${slug}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('not.exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/profils/${slug}/modifier`)
    cy.appUrlShouldBe(`/connexion?suivant=/profils/${slug}/modifier`)
  })

  it('Acceptation 3 - Utilisateur connecté sur un profile publique', () => {
    const {
      user: { slug },
    } = cleanUp({ isPublic: true })

    const user = givenUser({ isPublic: true })
    cy.createUserAndSignin(user)

    cy.visit(`/profils/${slug}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('not.exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/profils/${slug}/modifier`)
    cy.appUrlShouldBe(`/profils/${slug}`)
  })

  it('Acceptation 4 - Utilisateur connecté sur un profile privé', () => {
    const {
      user: { slug },
    } = cleanUp({ isPublic: true })

    const user = givenUser({ isPublic: true })
    cy.createUserAndSignin(user)

    cy.visit(`/profils/${slug}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('not.exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/profils/${slug}/modifier`)
    cy.appUrlShouldBe(`/profils/${slug}`)
  })

  it('Acceptation 5 - Mon Profil', () => {
    const {
      user: { slug },
    } = cleanUp({ isPublic: true })

    cy.visit(`/profils/${slug}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('profile-edition-button').should('exist')
    cy.testId('private-profil-box').should('not.exist')
    cy.testId('create-resource-button').should('exist')

    cy.visit(`/profils/${slug}/modifier`)
    cy.appUrlShouldBe(`/profils/${slug}/modifier`)
  })
})
