import React from 'react'
import { FeedbackBadge } from './FeedbackBadge'

const FeedbackWithCount = ({
  feedbackCount,
  userFeedbackRating,
  rating,
}: {
  feedbackCount: number
  userFeedbackRating: number
  rating: number
}) => {
  const countWithoutUserFeedback =
    feedbackCount - (userFeedbackRating === rating ? 1 : 0)

  return (
    countWithoutUserFeedback > 0 && (
      <div data-testid="feedback-count">
        <FeedbackBadge value={rating} />
        <div className="fr-text--sm fr-mb-0">
          {countWithoutUserFeedback} Avis
        </div>
      </div>
    )
  )
}

export const ResourceFeedbackCountByRating = ({
  feedbackCount: {
    notRecommended,
    moderatelyRecommended,
    recommended,
    highlyRecommended,
    total,
  },
  userFeedbackRating = 0,
}: {
  feedbackCount: {
    notRecommended: number
    moderatelyRecommended: number
    recommended: number
    highlyRecommended: number
    total: number
  }
  userFeedbackRating?: number
}) =>
  ((userFeedbackRating != null && total > 1) ||
    (userFeedbackRating == null && total > 0)) && (
    <div className="fr-border fr-border-radius--8 fr-p-4w fr-mb-6w fr-flex fr-justify-content-space-between fr-flex-wrap">
      <FeedbackWithCount
        rating={1}
        feedbackCount={notRecommended}
        userFeedbackRating={userFeedbackRating}
      />
      <FeedbackWithCount
        rating={2}
        feedbackCount={moderatelyRecommended}
        userFeedbackRating={userFeedbackRating}
      />
      <FeedbackWithCount
        rating={3}
        feedbackCount={recommended}
        userFeedbackRating={userFeedbackRating}
      />
      <FeedbackWithCount
        rating={4}
        feedbackCount={highlyRecommended}
        userFeedbackRating={userFeedbackRating}
      />
    </div>
  )
