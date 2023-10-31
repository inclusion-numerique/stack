import { v4 } from 'uuid'
import { givenUser } from '@app/e2e/support/given/givenUser'
import { cleanUp } from '../resource/edition/editionTestUtils'

describe('Utilisateur sans droit, je ne peux ni voir et ni editer le profil', () => {
  it('Acceptation 1 - Visiteur sur un profile publique', () => {
    const id = v4()
    cleanUp({ isPublic: true, id })
    cy.logout()

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('not.exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/profils/${id}/modifier`)
    cy.appUrlShouldBe(`/connexion?suivant=/profils/${id}/modifier`)
  })

  it('Acceptation 2 - Visiteur sur un profile privé', () => {
    const id = v4()
    cleanUp({ isPublic: false, id })
    cy.logout()

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('not.exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/profils/${id}/modifier`)
    cy.appUrlShouldBe(`/connexion?suivant=/profils/${id}/modifier`)
  })

  it('Acceptation 3 - Utilisateur connecté sur un profile publique', () => {
    const id = v4()
    cleanUp({ isPublic: true, id })

    const user = givenUser({ isPublic: true })
    cy.createUserAndSignin(user)

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('not.exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/profils/${id}/modifier`)
    cy.appUrlShouldBe(`/profils/${id}`)
  })

  it('Acceptation 4 - Utilisateur connecté sur un profile privé', () => {
    const id = v4()
    cleanUp({ isPublic: false, id })

    const user = givenUser({ isPublic: true })
    cy.createUserAndSignin(user)

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('not.exist')
    cy.testId('profile-edition-button').should('not.exist')
    cy.testId('private-profil-box').should('exist')
    cy.testId('create-resource-button').should('not.exist')

    cy.visit(`/profils/${id}/modifier`)
    cy.appUrlShouldBe(`/profils/${id}`)
  })

  it('Acceptation 5 - Mon Profil', () => {
    const id = v4()
    cleanUp({ isPublic: false, id })

    cy.visit(`/profils/${id}`)
    cy.dsfrShouldBeStarted()
    cy.testId('empty-box').should('exist')
    cy.testId('profile-edition-button').should('exist')
    cy.testId('private-profil-box').should('not.exist')
    cy.testId('create-resource-button').should('exist')

    cy.visit(`/profils/${id}/modifier`)
    cy.appUrlShouldBe(`/profils/${id}/modifier`)
  })
})
