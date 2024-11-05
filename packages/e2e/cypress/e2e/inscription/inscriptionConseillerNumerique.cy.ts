import { appUrl } from '@app/e2e/support/helpers'
import { profileInscriptionLabels } from '@app/web/inscription/profilInscription'

describe('ETQ Utilisateur, je peux importer des bénéficiaires', () => {
  before(() => {
    cy.execute('resetFixtures', {})
  })

  it('ETQ Conseiller numérique A, je peux m’inscrire', () => {
    cy.createUserAndSignin({
      email: 'sonia.hamila@saintlaurentduvar.fr',
      firstName: 'Conseiller numérique',
      lastName: 'A',
      emailVerified: new Date(),
    })

    cy.visit(appUrl('/'))
    cy.appUrlShouldBe('/inscription')

    cy.contains(profileInscriptionLabels.ConseillerNumerique).click()
    cy.contains('J’ai lu et j’accepte').click()

    cy.get('button').contains('Continuer').click()

    cy.appUrlShouldBe('/inscription/identification?profil=conseiller-numerique')
  })
})
