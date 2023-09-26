import { appUrl, createTestUser } from '@app/e2e/support/helpers'
import { cleanUpAndCreateTestBase } from '../resource/edition/editionTestUtils'

describe("Utilisateur connecté, je peux gerer les membres d'une base", () => {
  /**
   * US
   *  - https://www.notion.so/Board-edd4e7b2a95a4f2facd39c78a1e3a32f?p=924133a33d914162bdd646c736074046&pm=s
   *  - https://www.notion.so/Board-edd4e7b2a95a4f2facd39c78a1e3a32f?p=37e7756b09e44ac9b7d3c8d2aa274e3b&pm=s
   */

  beforeEach(() => {
    cleanUpAndCreateTestBase()
    cy.intercept('/api/trpc/profile.getMatchingUsers?*').as('getUser')
    cy.intercept('/api/trpc/baseMember.invite?*').as('invite')
  })

  it("Acceptation 1 - En tant qu'admin je peux inviter un membre", () => {
    const user = createTestUser()
    cy.createUser(user)

    cy.visit(
      '/bases/conseiller-numérique-france-services-contributions/membres',
    )
    cy.testId('member-card-admin').should('have.length', 1)
    cy.wait('@getUser')
    cy.dsfrShouldBeStarted()
    cy.testId('base-invite-member-button').click()
    cy.testId('base-invite-member-modal-input').type('t')
    cy.wait('@getUser')
    cy.testId('base-invite-member-modal-input-option-0').click()
    cy.testId('base-invite-member-modal-button').click()

    cy.wait('@invite')
    // TODO: To reactivate after bug fix
    // cy.testId('member-card-admin').should('have.length', 2)

    cy.signin({ email: user.email })
    cy.log('Go check emails in maildev server')
    // Go to maildev server to checkout the email and get the magic link
    cy.visit('localhost:1080')
    cy.get('.email-list li a').first().click()

    cy.get('.email-meta .subject').should(
      'contain',
      'Invitation à rejoindre la base',
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
    cy.contains(
      'Vous êtes invité par Jean Biche à rejoindre la Base Conseiller numérique France Services - contributions.',
    )
    cy.contains('Accepter').invoke('attr', 'target', '_self').click()
    cy.url().should(
      'equal',
      appUrl('/bases/conseiller-numérique-france-services-contributions'),
    )
    cy.visit(
      '/bases/conseiller-numérique-france-services-contributions/membres',
    )
    cy.testId('member-card-admin').should('not.exist')
    cy.testId('profile-card').should('have.length', 2)
  })

  it("Acceptation 2 - En tant qu'admin je peux changer le role d'un membre", () => {
    const user = createTestUser()
    cy.createUser(user)
    cy.inviteUserTo(user, 'conseiller-numérique-france-services-contributions')

    cy.visit(
      '/bases/conseiller-numérique-france-services-contributions/membres',
    )
    cy.testId('member-card-admin').should('have.length', 2)
    cy.testId('member-card-role-select').eq(0).should('have.value', 'admin')
    cy.testId('member-card-role-select').eq(1).should('have.value', 'member')

    cy.testId('member-card-role-select').eq(1).select('admin')

    // TODO: reactivate after bug fix
    // cy.reload()
    // cy.testId('member-card-admin').should('have.length', 2)
    // cy.testId('member-card-role-select').eq(0).should('have.value', 'admin')
    // cy.testId('member-card-role-select').eq(1).should('have.value', 'admin')

    cy.signin({ email: user.email })
    cy.testId('member-card-admin').should('have.length', 2)
    cy.testId('member-card-role-select').eq(0).should('have.value', 'admin')
    cy.testId('member-card-role-select').eq(1).should('have.value', 'admin')
  })
})