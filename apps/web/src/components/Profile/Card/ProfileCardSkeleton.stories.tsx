import { Meta, StoryObj } from '@storybook/react'
import { mobileStory } from '@app/storybook/storyHelper'
import ProfileCardSkeleton from './ProfileCardSkeleton'

export default {
  title: 'Profile/Skeleton',
  component: ProfileCardSkeleton,
} as Meta<typeof ProfileCardSkeleton>

type Story = StoryObj<typeof ProfileCardSkeleton>

export const Desktop: Story = {
  args: {},
}

export const Mobile = mobileStory(Desktop)
