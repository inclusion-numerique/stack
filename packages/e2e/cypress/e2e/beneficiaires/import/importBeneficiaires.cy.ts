import { appUrl } from '../../../support/helpers'
// import { mediateurSansActivites } from '@app/fixtures/users'

describe('ETQ Utilisateur, je peux importer des bénéficiaires', () => {
  before(() => {
    cy.execute('resetFixtures', { lol: true })
  })

  it('Je peux importer le fichier d’exemple', () => {
    // cy.signin(mediateurSansActivites)
    cy.visit(appUrl('/mes-beneficiaires/importer'))
  })
})
