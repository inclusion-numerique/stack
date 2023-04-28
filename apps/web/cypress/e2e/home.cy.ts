describe('homepage', () => {
  it('renders', () => {
    cy.visit('/')
    cy.get('.fr-header__service-title').should('contain', 'Stack')
    cy.get('.fr-nav__link')
      .first()
      .should('contain', 'Accueil')
      .should('have.attr', 'aria-current', 'page')
      .should('have.css', 'color', 'rgb(0, 0, 145)')
  })
})
