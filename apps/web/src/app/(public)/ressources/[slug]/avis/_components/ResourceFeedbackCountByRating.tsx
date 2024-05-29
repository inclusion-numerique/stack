import React from 'react'
import { FeedbackBadge } from '@app/web/components/Resource/feedbackBadge/FeedbackBadge'

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
  resource: { feedbackCount, _count },
  userFeedbackRating = 0,
}: {
  resource: {
    feedbackCount: {
      notRecommended: number
      moderatelyRecommended: number
      recommended: number
      highlyRecommended: number
    }
    _count: {
      resourceFeedback: number
    }
  }
  userFeedbackRating?: number
}) =>
  ((userFeedbackRating != null && _count.resourceFeedback > 1) ||
    (userFeedbackRating == null && _count.resourceFeedback > 0)) && (
    <div className="fr-border fr-border-radius--8 fr-p-4w fr-mb-6w fr-flex fr-justify-content-space-between fr-flex-wrap">
      <FeedbackWithCount
        rating={1}
        feedbackCount={feedbackCount.notRecommended}
        userFeedbackRating={userFeedbackRating}
      />
      <FeedbackWithCount
        rating={2}
        feedbackCount={feedbackCount.moderatelyRecommended}
        userFeedbackRating={userFeedbackRating}
      />
      <FeedbackWithCount
        rating={3}
        feedbackCount={feedbackCount.recommended}
        userFeedbackRating={userFeedbackRating}
      />
      <FeedbackWithCount
        rating={4}
        feedbackCount={feedbackCount.highlyRecommended}
        userFeedbackRating={userFeedbackRating}
      />
    </div>
  )
