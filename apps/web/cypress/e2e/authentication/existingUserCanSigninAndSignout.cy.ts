import { appUrl, createTestUser } from '../../support/helpers'

describe('ETQ Utilisateur, je peux me connecter à mon compte / me déconnecter', () => {
  /**
   * US https://www.notion.so/ETQ-Utilisateur-je-peux-me-connecter-mon-compte-me-d-connecter-8a4ed652501042fd8445df6a2d2273df?pvs=4
   * Parcours https://www.figma.com/file/4wfmwOaKRnMhgiGEF256qS/La-Base---Parcours-utilisateurs?node-id=38%3A1135&t=mLwaw4Kkwt7FG9lz-1
   */

  // Unique user for this test
  const emailUser = createTestUser()

  const monCompteProUser = {
    email: Cypress.env('MON_COMPTE_PRO_TEST_USER_EMAIL') as string,
    password: Cypress.env('MON_COMPTE_PRO_TEST_USER_PASSWORD') as string,
    firstName: 'Test Bot',
    lastName: 'Mon Compte Pro',
  }

  before(() => {
    cy.execute('deleteUser', { email: monCompteProUser.email })
  })

  it('Préliminaire - Les pages de connexions sont accessibles', () => {
    cy.visit('/')
    cy.get('.fr-header__tools').contains('Espace Préfet').click()
    cy.url().should('equal', appUrl('/connexion?suivant=/prefet'))
  })

  it('Acceptation 0 - La connexion redirige vers la création de compte pour un nouvel utilisateur', () => {
    cy.visit('/connexion')

    cy.log('We should not be able to login with unexisting user email')
    cy.get('input[id="input-form-field__email"]')
      .should('have.length', 1)
      .type(`${emailUser.email}{enter}`)

    cy.url().should(
      'equal',
      appUrl(
        `/creer-un-compte?raison=connexion-sans-compte&email=${emailUser.email}`,
      ),
    )

    cy.contains(
      'Le service Inclusion Numérique est uniquement accessible aux agents publics autorisé',
    )
  })
  it.skip('Acceptation 2 - Connexion avec email', () => {
    cy.visit('/connexion')
    cy.execute('createUser', emailUser)
    const { email, firstName, lastName } = emailUser

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
      'Connexion à Inclusion Numérique',
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
    cy.contains('Connexion à Inclusion Numérique')
    cy.contains('Se connecter').click()

    // With a valid magic link we should be automatically redirected to homepage, logged in
    cy.log('User should now be signed in')
    cy.url().should('eq', appUrl('/'))
    cy.get('.fr-header__tools').contains(firstName).contains(lastName)

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')

    cy.log('Check that the user can logout')

    cy.dsfrShouldBeStarted()
    cy.dsfrCollapsesShouldBeBound()
    cy.get('.fr-header__tools button[aria-controls="header-user-menu"]')
      .contains(emailUser.name)
      .click()
    cy.get('#header-user-menu')
      .should('be.visible')
      .contains('Se déconnecter')
      .click()
    cy.url().should('equal', appUrl('/deconnexion'))
    cy.contains('Êtes-vous sur de vouloir vous déconnecter ?')
    cy.get('main').contains('Se déconnecter').click()
    cy.url().should('equal', appUrl('/'))
    cy.get('.fr-header__tools').contains('Espace Préfet')
  })

  it.skip('Acceptation 3 - Connexion avec Mon Compte Pro', () => {
    cy.visit('/connexion')
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

    cy.get('button[class="fr-btn fr-connect moncomptepro-button"]').click()
    cy.url().should('contain', 'app-test.moncomptepro.beta.gouv.fr')

    cy.intercept(/\/api\/auth\/callback/, (request) => {
      // Add our cookies back
      request.headers.cookie = authenticationCookies.join('; ')
    })

    cy.get('input[type="email"]').type(monCompteProUser.email)
    cy.get('button[type="submit"]').click()

    cy.get('input[name="password"]').type(`${monCompteProUser.password}{enter}`)

    cy.url().should('equal', appUrl('/'))

    cy.get('.fr-header__tools').should('not.contain', 'Se connecter')

    cy.log('Check that the user can logout')

    cy.dsfrShouldBeStarted()
    cy.dsfrCollapsesShouldBeBound()
    cy.get('.fr-header__tools button[aria-controls="header-user-menu"]')
      .contains(monCompteProUser.firstName)
      .contains(monCompteProUser.lastName)
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
