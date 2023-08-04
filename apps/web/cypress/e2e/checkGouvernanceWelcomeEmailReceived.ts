import { goToMostRecentEmailReceived } from './goToMostRecentEmailReceived'

export const checkGouvernanceWelcomeEmailReceived = () => {
  goToMostRecentEmailReceived({ subjectInclude: 'Inscription confirmée' })
  cy.contains('Espace France Numérique Ensemble')
  cy.contains('Inscription confirmée')
}
