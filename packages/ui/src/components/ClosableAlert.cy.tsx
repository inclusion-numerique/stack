import React, { PropsWithChildren } from 'react'
import ClosableAlert from './ClosableAlert'

// We need a wrapper as Cypress needs to access and unmount the mounted component between each test
// and closable alert component is deleted from the DOM when closed
const Wrapper = ({ children }: PropsWithChildren) => <div>{children}</div>

describe('<ClosableAlert />', () => {
  it('should close closable alert', () => {
    const onClose = cy.stub().as('onClose')

    cy.mount(
      <Wrapper>
        <ClosableAlert type="info" title="Hello you" onClose={onClose} />
      </Wrapper>,
    )
    cy.get('.fr-alert').should('exist')

    cy.get('button').click()

    cy.get('.fr-alert').should('not.exist')
    cy.get('@onClose').should('have.been.calledOnce')
  })

  it('should close closable alert even without onClose prop', () => {
    cy.mount(
      <Wrapper>
        <ClosableAlert type="info" title="Hello you" />
      </Wrapper>,
    )
    cy.get('.fr-alert').should('exist')

    cy.get('button').click()
    cy.get('.fr-alert').should('not.exist')
  })
})
