import { mount } from 'cypress/react18'
import '../../../../apps/web/public/dsfr/dsfr.module.min'
import '../../../../apps/web/src/app/app.css'
import './commands'
import './component.css'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)
