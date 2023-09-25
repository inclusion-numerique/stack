import '@testing-library/cypress/add-commands'
import { appUrl } from '@app/e2e/support/helpers'
import type { CreateUserInput } from '../e2e/authentication/user.tasks'
import type { Tasks as CustomTasks } from './tasks'
import Timeoutable = Cypress.Timeoutable
import Loggable = Cypress.Loggable

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

/**
 * Adding superjson serialization and typescript typing to cy.task
 */
Cypress.Commands.add(
  'execute',
  <T extends keyof CustomTasks>(
    task: T,
    parameters: Parameters<CustomTasks[T]>[0],
    options?: Partial<Loggable & Timeoutable>,
  ) => cy.task(task, parameters, options),
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

Cypress.Commands.add('dsfrStylesShouldBeLoaded', () => {
  cy.get('body').should(
    'have.css',
    'font-family',
    'Marianne, arial, sans-serif',
  )
  cy.get('body').should('have.css', 'color', 'rgb(58, 58, 58)')
})

Cypress.Commands.add('dsfrShouldBeStarted', () => {
  cy.get('html').should('have.attr', 'data-fr-js', 'true')
})

Cypress.Commands.add('dsfrModalsShouldBeBound', () => {
  cy.get('dialog.fr-modal').each((modal) => {
    cy.wrap(modal).should('have.attr', 'data-fr-js-modal', 'true')
  })
})
Cypress.Commands.add('dsfrCollapsesShouldBeBound', () => {
  cy.get('.fr-collapse').each((modal) => {
    cy.wrap(modal).should('have.attr', 'data-fr-js-collapse', 'true')
  })
})
Cypress.Commands.add('testId', (testId: string) =>
  cy.get(`[data-testid="${testId}"]`),
)
Cypress.Commands.add('appUrlShouldBe', (url: string) => {
  cy.url().should('equal', appUrl(url))
})

//
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      execute<T extends keyof CustomTasks>(
        name: T,
        parameters: Parameters<CustomTasks[T]>[0],
      ): Chainable<Awaited<ReturnType<CustomTasks[T]>>>

      createUserAndSignin(user: CreateUserInput): Chainable<string>

      createUser(user: CreateUserInput): Chainable<void>

      signin(user: { email: string }): Chainable<string>

      dsfrStylesShouldBeLoaded(): Chainable<void>

      dsfrShouldBeStarted(): Chainable<void>

      dsfrModalsShouldBeBound(): Chainable<void>

      dsfrCollapsesShouldBeBound(): Chainable<void>

      testId(testId: string): Chainable<JQuery<HTMLElement>>

      appUrlShouldBe(url: string): Chainable<void>

      //       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
