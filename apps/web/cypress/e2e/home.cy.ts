describe('homepage', () => {
  it('renders', () => {
    cy.visit('/')
    cy.get('.fr-header__brand h2').should('contain', 'Stack')
  })
})
