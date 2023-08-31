import '@testing-library/cypress/add-commands'
import compareSnapshotCommand from 'cypress-visual-regression/dist/command'
import type {
  CreateUserInput,
  UpdateUserInput,
} from '../e2e/authentication/user.tasks'
import type { Tasks as CustomTasks } from './tasks'

import Timeoutable = Cypress.Timeoutable
import Loggable = Cypress.Loggable
import { appUrl } from './helpers'

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

compareSnapshotCommand()

/**
 * Adding superjson serialization and typescript typing to cy.task
 */
Cypress.Commands.add(
  'execute',
  <T extends keyof CustomTasks>(
    task: T,
    args: Parameters<CustomTasks[T]>[0],
    options?: Partial<Loggable & Timeoutable>,
  ) => cy.task(task, args, options),
)

Cypress.Commands.add('signin', ({ email }: { email: string }) =>
  cy.execute('createSession', { email }).then((session) => {
    cy.setCookie('next-auth.session-token', session.sessionToken)
    return cy.wrap(session.sessionToken)
  }),
)
Cypress.Commands.add('createUserAndSignin', (user: CreateUserInput) => {
  cy.task('createUser', user)
  return cy.signin(user)
})
Cypress.Commands.add('createUser', (user: CreateUserInput) => {
  cy.task('createUser', user)
})
Cypress.Commands.add('updateUser', (user: UpdateUserInput) => {
  cy.task('updateUser', user)
})

Cypress.Commands.add('dsfrShouldBeStarted', () => {
  cy.get('html').should('have.attr', 'data-fr-js', 'true')
})

Cypress.Commands.add('dsfrModalsShouldBeBound', () => {
  cy.get('dialog.fr-modal').each((modal) =>
    cy.wrap(modal).should('have.attr', 'data-fr-js-modal', 'true'),
  )
})
Cypress.Commands.add('dsfrCollapsesShouldBeBound', () => {
  cy.get('.fr-collapse').each((modal) =>
    cy.wrap(modal).should('have.attr', 'data-fr-js-collapse', 'true'),
  )
})
Cypress.Commands.add('testId', (testId: string) =>
  cy.get(`[data-testid="${testId}"]`),
)
Cypress.Commands.add('acceptNextRedirectsException', () => {
  Cypress.on('uncaught:exception', (error, runnable) => {
    if (error.message.includes('NEXT_REDIRECT')) {
      return false
    }
  })
})
Cypress.Commands.add('appUrlShouldBe', (url: string) => {
  cy.url().should('equal', appUrl(url))
})

//
declare global {
  namespace Cypress {
    interface Chainable {
      execute<T extends keyof CustomTasks>(
        name: T,
        args: Parameters<CustomTasks[T]>[0],
      ): Chainable<Awaited<ReturnType<CustomTasks[T]>>>

      createUserAndSignin(user: CreateUserInput): Chainable<string>
      createUser(user: CreateUserInput): Chainable<void>
      updateUser(user: UpdateUserInput): Chainable<void>
      signin(user: { email: string }): Chainable<string>
      dsfrShouldBeStarted(): Chainable<void>
      dsfrModalsShouldBeBound(): Chainable<void>
      dsfrCollapsesShouldBeBound(): Chainable<void>
      testId(testId: string): Chainable<JQuery<HTMLElement>>
      acceptNextRedirectsException(): Chainable<void>
      appUrlShouldBe(url: string): Chainable<void>

      //       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
