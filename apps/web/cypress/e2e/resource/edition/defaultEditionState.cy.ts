import {
  createTestBase,
  createTestResourceCommands,
  createTestUser,
} from '../../../support/helpers'

describe("Utilisateur connecté, lorsque j'édite une ressource", () => {
  describe("Qui n'a pas été modifiée après création", () => {
    beforeEach(() => {
      cy.execute('deleteAllData', undefined)
      const user = createTestUser()
      const base = createTestBase(user.id)
      const [creationCommand] = createTestResourceCommands({ baseId: base.id })

      cy.createUserAndSignin(user)
      cy.createBase(base)
      cy.sendResourceCommands({ user, commands: [creationCommand] }).then(
        ({ slug }) => {
          cy.visit(`/ressources/${slug}/editer`)
        },
      )

      cy.intercept('/api/trpc/resource.mutate?*').as('mutation')
      cy.dsfrShouldBeStarted()
    })

    it("Acceptation 0 - Le statut d'édition montre un brouillon sans modifications", () => {
      // Resource has been created, and has 2 contents not published
      cy.testId('resource-published-state').should('have.text', 'Brouillon')
      cy.testId('resource-edition-state').should('not.exist')
      cy.testId('publish-resource-button')
        .should('be.disabled')
        .should('have.text', 'Publier la ressource')
    })
  })
})
