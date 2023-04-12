import React from 'react'
import Button from './Button'

describe('<Button />', () => {
  it('should transfer click action', () => {
    const onClick = cy.stub()

    cy.mount(<Button label="My label" onClick={onClick} />)

    cy.get('button').click()

    expect(onClick).to.be.calledOnce
  })
})
