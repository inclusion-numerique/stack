import { Meta, StoryObj } from '@storybook/react'
import { mobileStory } from '@app/storybook/storyHelper'
import BaseCardSkeleton from './BaseCardSkeleton'

export default {
  title: 'Base/Skeleton',
  component: BaseCardSkeleton,
} as Meta<typeof BaseCardSkeleton>

type Story = StoryObj<typeof BaseCardSkeleton>

export const Desktop: Story = {
  args: {},
}

export const Mobile = mobileStory(Desktop)
