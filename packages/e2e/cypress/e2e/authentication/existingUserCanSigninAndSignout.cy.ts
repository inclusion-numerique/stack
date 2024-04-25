import { appUrl } from '../../support/helpers'

describe('ETQ Utilisateur, je peux me connecter à mon compte / me déconnecter', () => {
  /**
   * US https://www.notion.so/ETQ-Utilisateur-je-peux-me-connecter-mon-compte-me-d-connecter-8a4ed652501042fd8445df6a2d2273df?pvs=4
   * Parcours https://www.figma.com/file/4wfmwOaKRnMhgiGEF256qS/La-Base---Parcours-utilisateurs?node-id=38%3A1135&t=mLwaw4Kkwt7FG9lz-1
   */

  // This user exists in inclusion connect, but not in our db
  const inclusionConnectUser = {
    email: Cypress.env('INCLUSION_CONNECT_TEST_USER_EMAIL') as string,
    password: Cypress.env('INCLUSION_CONNECT_TEST_USER_PASSWORD') as string,
    firstName: 'Test Bot',
    lastName: 'Inclusion Numerique',
  }

  before(() => {
    cy.execute('deleteUser', { email: inclusionConnectUser.email })
  })

  it('Préliminaire - Les pages de connexions sont accessibles', () => {
    cy.visit('/')
    cy.get('.fr-header__tools').contains('Se connecter').click()
    cy.url().should('equal', appUrl('/connexion'))

    cy.log('Check that the signup CTA is linked correctly')
    cy.contains('Créer un compte').click()
    cy.url().should('equal', appUrl('/creer-un-compte'))

    cy.log('Check that the signin CTA is linked correctly')
    cy.findByRole('main')
      .contains(/^Se connecter$/)
      .click()
    cy.url().should('equal', appUrl('/connexion'))
  })

  it('Acceptation 1 - Connexion avec Inclusion Connect', () => {
    cy.visit('/connexion')
    // Cypress deletes some cookies on redirection between domains
    // See https://github.com/cypress-io/cypress/issues/20476
    // Also see https://docs.cypress.io/guides/guides/cross-origin-testing
    // We need to intercept the request to our auth endpoint to memorize the cookies
    // then intercept the request for our auth endpoint during callback to add the cookies back
    let authenticationCookies: string[]

    cy.intercept(/\/api\/auth\/signin\/inclusion-connect/, (request) => {
      request.continue((response) => {
        // Memorize our cookies
        const responseCookies = response.headers['set-cookie']
        authenticationCookies = Array.isArray(responseCookies)
          ? responseCookies
          : [responseCookies]
      })
    })

    cy.get('button[title="S\'identifier avec InclusionConnect"]').click()
    cy.url().should('contain', 'connect.inclusion.beta.gouv.fr')

    cy.intercept(/\/api\/auth\/callback/, (request) => {
      // Add our cookies back
      request.headers.cookie = authenticationCookies.join('; ')
    })

    cy.get('input[name="email"]').type(inclusionConnectUser.email)

    // Inclusion connect has frontend uncaught exceptions
    Cypress.on('uncaught:exception', () => false)
    cy.get('input[name="password"]').type(
      `${inclusionConnectUser.password}{enter}`,
    )

    // Cookies are lost in redirect (Cypress issue)
    // https://github.com/cypress-io/cypress/issues/20476#issuecomment-1298486439

    cy.url().should('equal', appUrl('/inscription'))

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')

    cy.log('Check that the user can logout')

    cy.dsfrShouldBeStarted()
    cy.dsfrCollapsesShouldBeBound()
    cy.get('.fr-header__tools button[aria-controls="header-user-menu"]')
      .contains(inclusionConnectUser.firstName)
      .contains(inclusionConnectUser.lastName)
      .click()

    cy.get('#header-user-menu').should('be.visible')

    cy.get('#header-user-menu').contains('Se déconnecter').click()
    cy.url().should('equal', appUrl('/deconnexion'))
    cy.contains('Êtes-vous sur de vouloir vous déconnecter ?')
    cy.get('main').contains('Se déconnecter').click()
    cy.url().should('equal', appUrl('/'))
    cy.get('.fr-header__tools').contains('Se connecter')
  })
})
