import { appUrl } from '@app/e2e/support/helpers'
import { coordinateurInscrit } from '@app/fixtures/users/coordinateurInscrit'
import { goToMostRecentEmailReceived } from '../goToMostRecentEmailReceived'

describe('ETQ coordinateur, je peux inviter un médiateur à rejoindre mon équipe', () => {
  before(() => {
    cy.execute('resetFixtures', {})
  })

  it('Je vois le médiateur invité dans la liste des médiateurs', () => {
    cy.signin(coordinateurInscrit)

    cy.visit(appUrl('/coop/mon-equipe'))
    cy.findByRole('link', { name: 'Inviter des membres' }).click()

    cy.contains('Rechercher par nom ou adresse e-mail').click()

    cy.get('#custom-select-form-field__members')
      .type('conseiller', {
        delay: 150,
      })
      .type('{downarrow}')
      .type('{enter}')

    cy.get('#custom-select-form-field__members')
      .type('mediateur', {
        delay: 150,
      })
      .type('{downarrow}')
      .type('{enter}')

    cy.get('#custom-select-form-field__members')
      .type('leo@med.fr', {
        delay: 150,
      })
      .type('{enter}')

    cy.get('form').submit()

    cy.findByRole('status').should(
      'contain',
      'Un email d’invitation a été envoyé aux membres que vous souhaitez ajouter à votre équipe',
    )

    cy.get('ul.fr-list-group>li')
      .eq(0)
      .should('contain', 'Inscrit')
      .should('contain', 'Conseiller numérique')
      .should('contain', 'Invitation envoyée')

    cy.get('ul.fr-list-group>li')
      .eq(1)
      .should('contain', 'leo@med.fr')
      .should('contain', 'Invitation envoyée')

    cy.get('ul.fr-list-group>li')
      .eq(2)
      .should('contain', 'Inscription')
      .should('contain', 'Médiateur numérique')
      .should('contain', 'Invitation envoyée')

    goToMostRecentEmailReceived({
      subjectInclude:
        'Invitation à rejoindre une équipe sur La Coop de la médiation numérique',
    })
  })
})
