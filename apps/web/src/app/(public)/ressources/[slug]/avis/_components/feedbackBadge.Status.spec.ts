import { feedbackBadgeStatus } from './feedbackBadge.Status'

describe('feedback badge status', () => {
  it('should be "Non recommandée" when value is less than 2', () => {
    const value = 1.75

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'error',
      label: 'Non recommandée',
    })
  })

  it('should be "Moyennement recommandée" when value is 2', () => {
    const value = 2

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'warning',
      label: 'Moyennement recommandée',
    })
  })

  it('should be "Moyennement recommandée" when value is more than 2 and less than 3', () => {
    const value = 2.66

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'warning',
      label: 'Moyennement recommandée',
    })
  })

  it('should be "Très recommandée" when value is 3', () => {
    const value = 3

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'success',
      label: 'Recommandée',
    })
  })
})
