import { v4 } from 'uuid'
import { appUrl, createTestUser } from '../support/helpers'
import { checkGouvernanceWelcomeEmailReceived } from './checkGouvernanceWelcomeEmailReceived'
import { goToMostRecentEmailReceived } from './goToMostRecentEmailReceived'

const signinWithCtaEmail = ({ email }: { email: string }) => {
  cy.log('Signin form fill and submit')
  cy.findByLabelText('Renseignez votre adresse email').type(`${email}{enter}`)

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

describe('ETQ Visiteur de la page gouvernance, je peux accéder au formulaire qui correspond à ma collectivité', () => {
  /**
   * US https://www.notion.so/ETQ-Visiteur-de-la-page-gouvernance-je-peux-acc-der-au-formulaire-qui-correspond-ma-collectivit-7d447c5044004d77b92659776a2e0456?pvs=4
   */

  it('Préliminaire 1 - Acceder a la page gouvernance depuis la home"', () => {
    cy.visit('/')
    cy.contains('Accéder au formulaire').click()
    cy.url().should('equal', appUrl('/gouvernance'))
    cy.contains(
      'Participer à l’élaboration des feuilles de routes territoriales',
    )
  })

  it("Acceptation 1 - Inscription et reception de l'email de confirmation", () => {
    cy.visit('/gouvernance')
    cy.contains('Conseil départemental').click()
    cy.url().should('equal', appUrl('/gouvernance/conseil-departemental'))
    cy.contains('Conseil départemental')
    signinWithCtaEmail({ email: `test-${v4()}@example.com` })

    cy.url().should(
      'equal',
      appUrl(
        '/formulaires-feuilles-de-routes-territoriales/conseil-departemental',
      ),
    )

    cy.contains('Un mail de confirmation vous a été envoyé')

    checkGouvernanceWelcomeEmailReceived()
    cy.contains('En tant que conseil départemental')
  })

  it('Acceptation 2 - Inscription déjà réalisée, indempotent', () => {
    const userId = v4()
    const user = createTestUser({
      id: userId,
      gouvernancePersona: 'epci',
      emailVerified: new Date().toISOString(),
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
    cy.visit('/gouvernance')
    cy.get('a').contains('EPCI').click()
    cy.url().should('equal', appUrl('/gouvernance/epci'))
    cy.contains('EPCI')
    signinWithCtaEmail({ email: user.email })

    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales/epci'),
    )

    cy.contains('Un mail de confirmation vous a été envoyé')
  })

  it('Acceptation 3 - Inscription déjà réalisée avec une autre persona', () => {
    const userId = v4()
    const user = createTestUser({
      id: userId,
      gouvernancePersona: 'epci',
      emailVerified: new Date().toISOString(),
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
    cy.visit('/gouvernance')
    cy.get('a').contains('Commune').click()
    cy.url().should('equal', appUrl('/gouvernance/commune'))
    cy.contains('Commune')
    signinWithCtaEmail({ email: user.email })

    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales'),
    )

    cy.contains(
      'vous vous êtes identifié comme étant un autre type de collectivité ou d’acteur territorial',
    )

    cy.get('label').contains('Conseil régional').should('not.exist')
    cy.get('label').contains('Conseil départemental').should('not.exist')
    cy.get('label').contains('structure').should('not.exist')
    cy.get('label').contains('EPCI')
    cy.get('label').contains('Commune').click()

    cy.get('button').contains('Valider').click()
    cy.url().should(
      'equal',
      appUrl('/formulaires-feuilles-de-routes-territoriales/commune'),
    )
    cy.contains('Un mail de confirmation vous a été envoyé')

    checkGouvernanceWelcomeEmailReceived()
    cy.contains('En tant que commune')
  })
})
