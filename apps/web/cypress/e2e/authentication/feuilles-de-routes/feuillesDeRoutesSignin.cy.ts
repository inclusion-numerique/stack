import { v4 } from 'uuid'
import { appUrl, createTestUser } from '../../../support/helpers'
import { checkGouvernanceWelcomeEmailReceived } from '../../checkGouvernanceWelcomeEmailReceived'
import { goToMostRecentEmailReceived } from '../../goToMostRecentEmailReceived'

const signinWithEmail = ({ email }: { email: string }) => {
  cy.log('Signin form fill and submit')
  cy.findByLabelText('Email').type(`${email}{enter}`)

  cy.url().should('equal', appUrl('/connexion/verification'), {
    timeout: 10_000,
  })

  cy.log('Magic link sent confirmation with email displayed')
  cy.contains('Un lien de connexion sécurisé a été envoyé')
  cy.contains(email)

  goToMostRecentEmailReceived({
    subjectInclude: 'Connexion à Espace France Numérique Ensemble',
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
    cy.execute('deleteAllData', {})
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

  it("Acceptation 1 - Connexion par email d'un compte existant sans persona de collectivité", () => {
    const user = createTestUser()
    cy.createUser(user)
    cy.visit('/connexion?role=collectivite')
    signinWithEmail(user)
    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales'),
    )
    cy.contains('Conseil régional').click()
    cy.contains('Valider').click()
    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales/conseil-regional'),
    )
    cy.contains('Votre inscription est confirmée')
    checkGouvernanceWelcomeEmailReceived()
    cy.contains('En tant que conseil régional')
  })

  it("Acceptation 2 - Connexion par email d'un compte avec persona de collectivité", () => {
    const userId = v4()
    const user = createTestUser({
      id: userId,
      gouvernancePersona: 'epci',
    })
    cy.createUser(user)
    cy.updateUser({
      where: {
        id: userId,
      },
      data: {
        formulaireGouvernance: {
          create: {
            gouvernancePersona: 'epci',
            id: v4(),
            createurId: userId,
          },
        },
      },
    })
    cy.visit('/connexion?role=collectivite')
    signinWithEmail(user)
    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales/epci'),
    )
    cy.contains('Votre inscription est confirmée')
  })

  it("Acceptation 3 - Connexion d'un compte existant sans persona de collectivité", () => {
    const user = createTestUser()
    cy.createUser(user)
    cy.signin(user)
    cy.visit('/connexion?role=collectivite')

    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales'),
    )

    cy.contains('EPCI').click()
    cy.contains('Valider').click()

    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales/epci'),
    )
    cy.contains('Votre inscription est confirmée')
    checkGouvernanceWelcomeEmailReceived()
    cy.contains('En tant que epci')
  })

  it("Acceptation 4 - Connexion par MCP d'un compte avec persona de collectivité", () => {
    const userId = v4()
    const user = createTestUser({
      id: userId,
      gouvernancePersona: 'commune',
      email: monCompteProUser.email,
      name: monCompteProUser.name,
      emailVerified: new Date().toISOString(),
    })
    cy.createUser(user)

    cy.signin(user)

    cy.updateUser({
      where: {
        id: userId,
      },
      data: {
        formulaireGouvernance: {
          create: {
            gouvernancePersona: 'commune',
            id: v4(),
            createurId: userId,
          },
        },
      },
    })
    cy.visit('/connexion?role=collectivite')
    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales/commune'),
    )
    cy.contains('Votre inscription est confirmée')
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
