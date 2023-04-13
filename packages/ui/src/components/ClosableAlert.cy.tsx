import React from 'react'
import ClosableAlert from './ClosableAlert'

describe('<ClosableAlert />', () => {
  it('should close closable alert', () => {
    const onClose = cy.stub().as('onClose')

    cy.mount(<ClosableAlert type="info" title="Hello you" onClose={onClose} />)
    cy.get('.fr-alert').should('exist')

    cy.get('button').click()

    cy.get('.fr-alert').should('not.exist')
    cy.get('@onClose').should('have.been.calledOnce')
  })

  it('should close closable alert even without onClose prop', () => {
    cy.mount(<ClosableAlert type="info" title="Hello you" />)
    cy.get('.fr-alert').should('exist')

    cy.get('button').click()

    cy.get('.fr-alert').should('not.exist')
  })
})
