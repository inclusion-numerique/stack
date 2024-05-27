const BADGE_STATUS = [
  {
    threshold: 3.25,
    content: {
      severity: 'triumph',
      label: 'Très recommandée',
    },
  },
  {
    threshold: 2.5,
    content: {
      severity: 'success',
      label: 'Recommandée',
    },
  },
  {
    threshold: 1,
    content: {
      severity: 'warning',
      label: 'Peu recommandée',
    },
  },
]

const badgeStatusMatching =
  (value: number) =>
  ({ threshold }: { threshold: number }) =>
    value >= threshold

export const feedbackBadgeStatus = (value: number) =>
  BADGE_STATUS.find(badgeStatusMatching(value))?.content
