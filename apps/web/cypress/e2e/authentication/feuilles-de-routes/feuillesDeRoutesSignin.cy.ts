import { appUrl, createTestUser } from '../../../support/helpers'

const signinWithEmail = ({ email }: { email: string }) => {
  cy.log('Signin form fill and submit')
  cy.findByLabelText('Email').type(`${email}{enter}`)

  cy.url().should('equal', appUrl('/connexion/verification'), {
    timeout: 10_000,
  })

  cy.log('Magic link sent confirmation with email displayed')
  cy.contains('Un lien de connexion sécurisé a été envoyé')
  cy.contains(email)

  cy.log('Go check emails in maildev server')
  // Go to maildev server to checkout the email and get the magic link
  cy.visit('localhost:1080')
  cy.get('.email-list li a').first().click()

  cy.get('.email-meta .subject').should(
    'contain',
    'Connexion à Espace France Numérique Ensemble',
  )

  // Cypress does not work well with iframes, we go to the html source of the email that is
  // included in the iframe preview of maildev ui
  cy.url().then((url) => {
    const emailPath = url.split('#').at(-1)
    if (!emailPath) {
      throw new Error('Could not find email content path from maildev url')
    }
    cy.visit(`localhost:1080${emailPath}/html`)
  })

  cy.log('Check mail contents')
  // We should not have the email html version in full
  cy.contains('Connexion à Espace France Numérique Ensemble')
  cy.contains('Se connecter').invoke('attr', 'target', '_self').click()

  // With a valid magic link we should be automatically redirected to homepage, logged in
  cy.log('User should now be signed in')
}

describe('ETQ Visiteur qui souhaite se connecter en Collectivité, je peux me connecter uniquement avec MonComptePro, email, ou créer un compte', () => {
  /**
   * US https://www.notion.so/ETQ-Visiteur-qui-souhaite-se-connecter-en-Collectivit-je-peux-me-co-par-MCP-ou-par-email-62810bb551454075947aa8374170f1a1?pvs=4
   */

  const monCompteProUser = {
    email: Cypress.env('MON_COMPTE_PRO_TEST_USER_EMAIL') as string,
    password: Cypress.env('MON_COMPTE_PRO_TEST_USER_PASSWORD') as string,
    name: 'Jean User',
  }

  beforeEach(() => {
    cy.execute('deleteUser', { email: monCompteProUser.email })
  })

  it('Préliminaire 1 - Entrée par Se Connecter "Feuilles de route"', () => {
    cy.visit('/')
    cy.get('.fr-header__tools').contains('Se connecter').click()
    cy.url().should('equal', appUrl('/connexion'))

    cy.contains('Vous êtes une collectivité').click()
    cy.url().should('equal', appUrl('/connexion?role=collectivite'))

    cy.contains('feuilles de routes territoriales')
  })

  it('Préliminaire 2 - Le retour ramène sur le choix entre connexion Prefecture ou Collectivité', () => {
    cy.visit('/connexion?role=collectivite')
    cy.contains('Retour').click()
    cy.url().should('equal', appUrl('/connexion'))
  })

  it('Préliminaire 3 - Pas de possibilité de connexion par email ou création de compte', () => {
    cy.visit('/connexion?role=collectivite')
    cy.contains('Se connecter avec MonComptePro')
    cy.contains('Se connecter avec son email')
    cy.contains('Créer un compte')
  })

  it.only("Acceptation 1 - Connexion par email d'un compte existant sans persona de collectivité", () => {
    const user = createTestUser()
    cy.createUser(user)
    cy.visit('/connexion?role=collectivite')
    signinWithEmail(user)
    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales'),
    )
    cy.contains('Conseil Régional').click()
    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales/conseil-regional'),
    )
  })

  it('Acceptation 1 - MCP - La connexion MCP Redirige vers son profil', () => {
    cy.createUser({
      email: monCompteProUser.email,
      name: monCompteProUser.name,
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

  it('Acceptation 5 - La connexion par email redirige vers la création de compte pour un nouvel utilisateur', () => {
    cy.visit('/connexion?role=collectivite')

    const user = createTestUser()

    cy.log('We should not be able to login with unexisting user email')
    cy.get('input[id="input-form-field__email"]')
      .should('have.length', 1)
      .type(`${user.email}{enter}`)

    cy.url().should(
      'equal',
      appUrl(
        `/creer-un-compte?raison=connexion-sans-compte&email=${user.email}`,
      ),
    )

    cy.contains('Se créer un compte avec son email')

    cy.log(
      'Create account using email. It should be pre-completed after failed login attempt',
    )
    cy.get('input[id="input-form-field__email"]').should(
      'have.value',
      user.email,
    )
  })
})
