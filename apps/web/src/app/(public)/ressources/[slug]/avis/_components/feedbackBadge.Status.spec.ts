import { feedbackBadgeStatus } from './feedbackBadge.Status'

describe('feedback badge status', () => {
  it('should be "Non recommandée" when value is less than 2', () => {
    const value = 2.45

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'warning',
      label: 'Peu recommandée',
    })
  })

  it('should be "Moyennement recommandée" when value is 2', () => {
    const value = 2.52

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'success',
      label: 'Recommandée',
    })
  })

  it('should be "Moyennement recommandée" when value is more than 2 and less than 3', () => {
    const value = 3.24

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'success',
      label: 'Recommandée',
    })
  })

  it('should be "Très recommandée" when value is 3', () => {
    const value = 3.26

    const badgeStatus = feedbackBadgeStatus(value)

    expect(badgeStatus).toStrictEqual({
      severity: 'triumph',
      label: 'Très recommandée',
    })
  })
})
