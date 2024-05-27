import { appUrl } from '@app/e2e/support/helpers'
import { cleanUpAndCreateTestPublishedResource } from '../edition/editionTestUtils'

describe("Utilisateur sans droit, je peux consulter les avis d'une ressource", () => {
  it('Acceptation 1 - Visiteur sur une ressource publique, je ne vois pas le nombre d’avis d’une ressource sans avis', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-views-and-metadata')
      .contains('Recommandée')
      .should('not.exist')

    cy.testId('resources-views-and-metadata')
      .contains('1 avis')
      .should('not.exist')

    cy.testId('resources-feedbacks').should('not.exist')
  })

  it('Acceptation 2 - Visiteur sur une ressource publique, je peux accéder aux avis par le bouton Je donne mon avis', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.contains('Donner son avis').click()

    cy.url().should(
      'contain',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
      ),
    )
  })

  it('Acceptation 3 - Visiteur sur une ressource publique, je vois le nombre d’avis d’une ressource avec avis', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
      feedbacks: [
        {
          comment: 'Good resource',
          rate: 3,
          user: { firstName: 'Henri', lastName: 'Dubois' },
        },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-views-and-metadata').contains('Recommandée')
    cy.testId('resources-views-and-metadata').contains('1 avis')

    cy.testId('resources-feedbacks').contains('Recommandée')
    cy.testId('resources-feedbacks').contains('1 Avis sur la ressource')
  })

  it('Acceptation 4 - Visiteur sur une ressource publique, je peux accéder aux avis via les liens 1 avis et voir les avis sur une ressource avec avis', () => {
    cleanUpAndCreateTestPublishedResource({
      publicBase: true,
      publicResource: true,
      signinAsResourceCreator: false,
      visitResourcePage: true,
      feedbacks: [
        {
          comment: 'Good resource',
          rate: 3,
          user: { firstName: 'Henri', lastName: 'Dubois' },
        },
      ],
    })

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-views-and-metadata').contains('1 avis').click()

    cy.url().should(
      'contain',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
      ),
    )

    cy.visit(
      '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/',
    )

    cy.testId('resources-feedbacks').contains('Voir les avis').click()

    cy.url().should(
      'contain',
      appUrl(
        '/ressources/titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes/avis',
      ),
    )
  })
})
