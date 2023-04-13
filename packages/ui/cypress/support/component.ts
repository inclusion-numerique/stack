import './commands'
import { mount } from 'cypress/react18'
import '../../public/dsfr/dsfr.module.min'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)
