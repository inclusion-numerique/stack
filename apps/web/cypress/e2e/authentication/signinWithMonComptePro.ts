export const signinWithMonComptePro = ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  // Cypress deletes some cookies on redirection between domains
  // See https://github.com/cypress-io/cypress/issues/20476
  // Also see https://docs.cypress.io/guides/guides/cross-origin-testing
  // We need to intercept the request to our auth endpoint to memorize the cookies
  // then intercept the request for our auth endpoint during callback to add the cookies back
  let authenticationCookies: string[]

  cy.intercept(/\/api\/auth\/signin\/moncomptepro/, (request) => {
    request.continue((response) => {
      // Memorize our cookies
      const responseCookies = response.headers['set-cookie']
      authenticationCookies = Array.isArray(responseCookies)
        ? responseCookies
        : [responseCookies]
    })
  })

  cy.get('button.moncomptepro-button').click()
  cy.url().should('contain', 'moncomptepro.beta.gouv.fr/users/start-sign-in')

  cy.intercept(/\/api\/auth\/callback/, (request) => {
    // Add our cookies back
    request.headers.cookie = authenticationCookies.join('; ')
  })

  cy.get('input[name="login"]').type(email)
  cy.get('button[type="submit"]').click()

  // Inclusion connect has frontend uncaught exceptions
  Cypress.on('uncaught:exception', () => false)
  cy.get('input[name="password"]').type(`${password}{enter}`)

  // Sometimes MCP asks for organization, sometimes not (depending on this test user state independent of the test)
  cy.url().then((url) => {
    if (url.includes('moncomptepro.beta.gouv.fr/users/select-organization')) {
      cy.get('#submit-join-organization-default').click()
    }
  })

  // Cookies are lost in redirect (Cypress issue)
  // https://github.com/cypress-io/cypress/issues/20476#issuecomment-1298486439
}
