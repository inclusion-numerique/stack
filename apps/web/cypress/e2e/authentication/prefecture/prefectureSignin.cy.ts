import { appUrl } from '../../../support/helpers'

describe('ETQ Visiteur qui souhaite se connecter en Préfecture, je peux me connecter uniquement avec MonComptePro', () => {
  /**
   * US https://www.notion.so/ETQ-Visiteur-qui-souhaite-se-connecter-en-Pr-fecture-je-peux-me-connecter-uniquement-avec-MonCompte-84de6d2827de422b9360473617023502?pvs=4
   */

  const monCompteProUser = {
    email: Cypress.env('MON_COMPTE_PRO_TEST_USER_EMAIL') as string,
    password: Cypress.env('MON_COMPTE_PRO_TEST_USER_PASSWORD') as string,
    name: 'Jean User',
  }

  beforeEach(() => {
    cy.execute('deleteUser', { email: monCompteProUser.email })
  })

  it('Préliminaire 1 -Entrée par Se Connecter "Je travaille en préfecture"', () => {
    cy.visit('/')
    cy.get('.fr-header__tools').contains('Se connecter').click()
    cy.url().should('equal', appUrl('/connexion'))

    cy.contains('Vous travaillez en préfecture').click()
    cy.url().should('equal', appUrl('/connexion?role=prefecture'))

    cy.contains('Préfecture')
  })

  it('Préliminaire 2 -Entrée par CTA landing', () => {
    cy.visit('/')
    cy.dsfrModalsShouldBeBound()

    cy.testId('tableau-de-bord-cta').click()

    cy.findByRole('dialog').as('modal')
    cy.get('@modal').contains('J’ai compris').click()

    cy.url().should('equal', appUrl('/connexion?role=prefecture'))

    cy.contains('Préfecture')
    cy.contains('Se connecter ')
  })

  it('Préliminaire 2 - Le retour ramène sur le choix entre connexion Prefecture ou Collectivité', () => {
    cy.visit('/connexion?role=prefecture')
    cy.contains('Retour').click()
    cy.url().should('equal', appUrl('/connexion'))
  })

  it('Préliminaire 3 - Pas de possibilité de connexion par email ou création de compte', () => {
    cy.visit('/connexion?role=prefecture')
    cy.contains('Se connecter avec MonComptePro')
    cy.contains('Se connecter avec son email').should('not.exist')
    cy.contains('Créer un compte').should('not.exist')
  })

  it('Acceptation 1 - MCP - La connexion detecte un prefet et le redirige sur son tableau de bord', () => {
    cy.createUser({
      email: monCompteProUser.email,
      name: monCompteProUser.name,
      role: 'Prefect',
      roleScope: '34',
    })
    cy.visit('/connexion?role=prefecture')

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
    cy.url().should('contain', 'app-test.moncomptepro.beta.gouv.fr')

    cy.intercept(/\/api\/auth\/callback/, (request) => {
      // Add our cookies back
      request.headers.cookie = authenticationCookies.join('; ')
    })

    cy.get('input[type="email"]').type(monCompteProUser.email)
    cy.get('button[type="submit"]').click()

    cy.get('input[name="password"]').type(`${monCompteProUser.password}{enter}`)

    // Sometimes MCP asks for organization, sometimes not (depending on this test user state independent of the test)
    cy.url().then((url) => {
      if (url.includes('moncomptepro.beta.gouv.fr/users/accept-organization')) {
        cy.get('#submit-join-organization-default').click()
      }
    })

    cy.url().should('equal', appUrl('/tableau-de-bord/departement/34'))

    cy.contains('Hérault')

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')
  })

  it('Acceptation 2 - MCP - La connexion detecte PAS un prefet et le redirige sur son profil', () => {
    cy.visit('/connexion?role=prefecture')

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
    cy.url().should('contain', 'app-test.moncomptepro.beta.gouv.fr')

    cy.intercept(/\/api\/auth\/callback/, (request) => {
      // Add our cookies back
      request.headers.cookie = authenticationCookies.join('; ')
    })

    cy.get('input[type="email"]').type(monCompteProUser.email)
    cy.get('button[type="submit"]').click()

    cy.get('input[name="password"]').type(`${monCompteProUser.password}{enter}`)

    // Sometimes MCP asks for organization, sometimes not (depending on this test user state independent of the test)
    cy.url().then((url) => {
      if (url.includes('moncomptepro.beta.gouv.fr/users/accept-organization')) {
        cy.get('#submit-join-organization-default').click()
      }
    })

    cy.url().should('equal', appUrl('/profil'))
    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')
    cy.contains('Tableau de bord').should('not.exist')

    cy.contains('Accéder aux formulaires').click()
    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales'),
    )
  })
})
