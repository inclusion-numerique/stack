import { givenUser } from '@app/e2e/support/given/givenUser'

export const addFeedbackToResource = ({
  slug,
  feedbacks = [],
}: {
  slug: string
  feedbacks: {
    comment: string
    rate: 1 | 2 | 3 | 4
    user: { firstName: string; lastName: string }
  }[]
}) => {
  feedbacks.forEach((feedback) => {
    const user = givenUser(feedback.user)
    cy.createUserAndSignin(user)
    cy.visit(`/ressources/${slug}/avis`)
    cy.contains('Oui').click()
    cy.get('textarea').first().type('hello')
    cy.contains('Partager mon avis').click()
    cy.logout()
  })
}
