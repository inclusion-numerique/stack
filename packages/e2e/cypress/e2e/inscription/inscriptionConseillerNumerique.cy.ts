import { conseillersV1ThatShouldSignupAsConseiller } from '@app/e2e/e2e/inscription/inscriptionE2eCases'
import { startInscriptionAs } from '@app/e2e/e2e/inscription/inscriptionE2eHelpers'

describe('ETQ Utilisateur, je peux importer des bénéficiaires', () => {
  beforeEach(() => {
    cy.execute('resetFixtures', {})
  })

  it.only('ETQ Conseiller numérique A, je peux m’inscrire en tant que conseiller numérique', () => {
    startInscriptionAs({
      user: conseillersV1ThatShouldSignupAsConseiller.a,
      profilInscription: 'ConseillerNumerique',
      roleShouldBeCheckedAndFound: true,
    })
  })

  it('ETQ Conseiller numérique B, je ne peux pas m’inscrire en tant que coordinateur de conseiller numérique', () => {
    startInscriptionAs({
      user: conseillersV1ThatShouldSignupAsConseiller.a,
      profilInscription: 'Coordinateur',
      roleShouldBeCheckedAndFound: false,
    })
  })

  it('ETQ Conseiller numérique C, je ne peux pas m’inscrire en tant que médiateur', () => {
    startInscriptionAs({
      user: conseillersV1ThatShouldSignupAsConseiller.a,
      profilInscription: 'Mediateur',
      roleShouldBeCheckedAndFound: false,
    })
  })
})
