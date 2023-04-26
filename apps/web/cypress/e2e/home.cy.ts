describe('homepage', () => {
  it('renders', () => {
    cy.visit('/')
    cy.get('.fr-header__brand p').should(
      'contain',
      'Les Bases du numérique d’intérêt général',
    )
    cy.get('.fr-nav__link')
      .first()
      .should('contain', 'Accueil')
      .should('have.attr', 'aria-current', 'page')
      .should('have.css', 'color', 'rgb(0, 0, 145)')
  })
})
