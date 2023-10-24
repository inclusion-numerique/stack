import { Meta, StoryObj } from '@storybook/react'
import { mobileStory } from '@app/storybook/storyHelper'
import Skeleton from './Skeleton'

export default {
  title: 'Base/Skeleton',
  component: Skeleton,
} as Meta<typeof Skeleton>

type Story = StoryObj<typeof Skeleton>

export const Desktop: Story = {
  args: {},
}

export const Mobile = mobileStory(Desktop)
