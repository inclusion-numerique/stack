import React from 'react'
import Header from '@app/web/components/Header'

/**
 * While cypress components do not support server actions, we cannot test Header
 * as it requires a server action for usurpation feature
 */
describe.skip('<Header />', () => {
  it('Should display desktop header without dropshadow', () => {
    cy.viewport(1200, 750) // Set viewport to 550px x 750px
    cy.mount(<Header />)
    cy.get('.fr-header').should('have.css', 'filter', 'none')
    cy.get('.fr-header__brand').should('have.css', 'filter', 'none')
  })

  it('Should display mobile header without dropshadow', () => {
    cy.viewport(500, 500) // Set viewport to 550px x 750px
    cy.mount(<Header />)
    cy.get('.fr-header').should('have.css', 'filter', 'none')
    cy.get('.fr-header__brand').should('have.css', 'filter', 'none')
  })
})
