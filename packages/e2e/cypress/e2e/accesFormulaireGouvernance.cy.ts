import { v4 } from 'uuid'
import { appUrl, createTestUser } from '../support/helpers'

describe('ETQ Utilisateur connecté de la page gouvernance, je peux accéder à mon formulaire en cours', () => {
  it('Acceptation 1 - Accès au formulaire correspondant à la meme persona', () => {
    const userId = v4()
    const user = createTestUser({
      id: userId,
      gouvernancePersona: 'conseil-departemental',
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
            gouvernancePersona: 'conseil-departemental',
            id: v4(),
            createurId: userId,
            demonstration: false,
          },
        },
      },
    })
    cy.signin(user)
    cy.visit('/gouvernance')
    cy.contains('Conseil départemental').click()
    cy.url().should('equal', appUrl('/gouvernance/conseil-departemental'))
    cy.contains('Conseil départemental')

    cy.contains('Accéder au formulaire').click()

    cy.acceptNextRedirectsException()

    cy.url().should(
      'equal',
      appUrl(
        '/formulaires-feuilles-de-routes-territoriales/conseil-departemental/porter-ou-participer',
      ),
    )

    cy.contains('Conseil départemental')
  })

  it('Acceptation 2 - Accès au formulaire correspondant à une autre persona', () => {
    const userId = v4()
    const user = createTestUser({
      id: userId,
      gouvernancePersona: 'commune',
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
            gouvernancePersona: 'commune',
            id: v4(),
            createurId: userId,
            demonstration: false,
          },
        },
      },
    })
    cy.signin(user)
    cy.visit('/gouvernance')
    cy.contains('Conseil départemental').click()
    cy.url().should('equal', appUrl('/gouvernance/conseil-departemental'))
    cy.contains('Conseil départemental')

    cy.contains('Accéder au formulaire').click()

    cy.acceptNextRedirectsException()

    cy.url().should(
      'equal',
      appUrl(
        '/formulaires-feuilles-de-routes-territoriales/choix-du-formulaire',
      ),
    )

    cy.contains('Conseil départemental')
    cy.contains('Commune')
  })

  it('Acceptation 3 - Accès par un compte déjà connecté sans précédent formulaire', () => {
    const userId = v4()
    const user = createTestUser({
      id: userId,
      emailVerified: new Date().toISOString(),
    })

    cy.createUser(user)

    cy.signin(user)

    cy.acceptNextRedirectsException()

    cy.visit('/formulaires-feuilles-de-routes-territoriales')

    cy.appUrlShouldBe('/gouvernance')
    cy.contains('Conseil régional').click()
    cy.appUrlShouldBe('/gouvernance/conseil-regional')

    cy.intercept('/api/trpc/*').as('mutation1')
    cy.get('button').contains('Accéder au formulaire').click()
    cy.wait('@mutation1')
    cy.url().should(
      'equal',
      appUrl(
        '/formulaires-feuilles-de-routes-territoriales/conseil-regional/porter-ou-participer',
      ),
    )
  })
})
