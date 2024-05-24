const BADGE_STATUS = [
  {
    threshold: 4,
    content: {
      severity: 'triumph',
      label: 'Très recommandée',
    },
  },
  {
    threshold: 3,
    content: {
      severity: 'success',
      label: 'Recommandée',
    },
  },
  {
    threshold: 2,
    content: {
      severity: 'warning',
      label: 'Moyennement recommandée',
    },
  },
  {
    threshold: 1,
    content: {
      severity: 'error',
      label: 'Non recommandée',
    },
  },
]

const badgeStatusMatching =
  (value: number) =>
  ({ threshold }: { threshold: number }) =>
    value >= threshold

export const feedbackBadgeStatus = (value: number) =>
  BADGE_STATUS.find(badgeStatusMatching(value))?.content
