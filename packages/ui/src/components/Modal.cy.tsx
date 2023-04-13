import React from 'react'
import Modal from './Modal'

describe('<Modal />', () => {
  it('should open and close modal', () => {
    cy.mount(
      <Modal buttonLabel="Ouvrir la modal" title="Titre de la modal">
        Content
      </Modal>,
    )
    cy.get('dialog').should('not.be.visible')

    cy.get('button[class*="fr-btn"]').click()
    cy.get('dialog').should('be.visible')

    cy.get('button[class*="fr-link"]').click()
    cy.get('dialog').should('not.be.visible')
  })
})
