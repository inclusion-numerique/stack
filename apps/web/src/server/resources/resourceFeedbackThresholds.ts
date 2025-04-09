import type { ResourceFeedbackStatus } from '@app/web/components/Resource/feedbackBadge/resourceFeedbackBadge.Status'

export const resourceFeedbackThresholds: {
  [key in ResourceFeedbackStatus]: number
} = {
  tres: 3.25,
  recommande: 2.5,
  peu: 1,
  non: 0,
}
