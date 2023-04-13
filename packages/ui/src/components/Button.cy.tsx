import React, { MouseEventHandler } from 'react'
import { SinonStub } from 'cypress/types/sinon'
import Button from './Button'

describe('<Button />', () => {
  it('should transfer click action', () => {
    const onClick = cy.stub().as('onClick') as MouseEventHandler & SinonStub

    cy.mount(<Button label="My label" onClick={onClick} />)

    cy.get('button').click()

    cy.get('@onClick').should('have.been.calledOnce')
  })
})
