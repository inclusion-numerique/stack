import { startInscriptionAs } from '@app/e2e/e2e/inscription/inscriptionE2eHelpers'

describe('ETQ médiateur, je peux m’inscrire en suivant le bon parcours', () => {
  beforeEach(() => {
    cy.execute('resetFixtures', {})
  })

  const user = {
    email: 'test@test.com',
    firstName: 'test',
    lastName: 'test',
    emailVerified: new Date(),
  }

  it(`ETQ Médiateur ${user.lastName}, je ne peux pas m’inscrire en tant que conseiller numérique`, () => {
    startInscriptionAs({
      user,
      profilInscription: 'ConseillerNumerique',
      roleShouldBeCheckedAndFound: false,
    })
  })

  it(`ETQ Médiateur ${user.lastName}, je ne peux pas m’inscrire en tant que coordinateur de conseiller numérique`, () => {
    startInscriptionAs({
      user,
      profilInscription: 'Coordinateur',
      roleShouldBeCheckedAndFound: false,
    })
  })

  it(`ETQ Médiateur ${user.lastName}, je peux  m’inscrire en tant que médiateur`, () => {
    startInscriptionAs({
      user,
      profilInscription: 'Mediateur',
      roleShouldBeCheckedAndFound: true,
    })
  })
})
