import React from 'react'
import Alert from './Alert'

describe('<Alert />', () => {
  it('should render alert', () => {
    cy.mount(<Alert type="info" title="Hello you" />)
    cy.get('.fr-alert').should('exist')
    cy.get('button').should('not.exist')
  })
})
