import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { ResourcesListWrapper } from '@app/storybook/components/ResourcesListWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import Skeleton from './Skeleton'

export default {
  title: 'Ressource/Skeleton',
  component: Skeleton,
} as Meta<typeof Skeleton>

type Story = StoryObj<typeof Skeleton>

const Template = (_props: ComponentProps<typeof Skeleton>) => (
  <ResourcesListWrapper>
    <Skeleton />
  </ResourcesListWrapper>
)

const render = () => <Template />

export const Desktop: Story = {
  args: {},
  render,
}

export const Mobile = mobileStory(Desktop)
