import React from 'react'
import Alert from './Alert'

describe('<Alert />', () => {
  it('should not close unclosable alert', () => {
    cy.mount(<Alert type="info" title="Hello you" />)
    cy.get('.fr-alert').should('exist')
    cy.get('button').should('not.exist')
  })

  it('should close closable alert', () => {
    const onClose = cy.stub()

    cy.mount(<Alert closable type="info" title="Hello you" onClose={onClose} />)
    cy.get('.fr-alert').should('exist')

    cy.get('button').click()

    cy.get('.fr-alert').should('not.exist')
    expect(onClose).to.be.calledOnce
  })
})
