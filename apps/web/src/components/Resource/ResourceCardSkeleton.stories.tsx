import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { ResourcesListWrapper } from '@app/storybook/components/ResourcesListWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import ResourceCardSkeleton from '@app/web/components/Resource/ResourceCardSkeleton'

export default {
  title: 'Ressource/Skeleton',
  component: ResourceCardSkeleton,
} as Meta<typeof ResourceCardSkeleton>

type Story = StoryObj<typeof ResourceCardSkeleton>

const Template = (_props: ComponentProps<typeof ResourceCardSkeleton>) => (
  <ResourcesListWrapper>
    <ResourceCardSkeleton />
  </ResourcesListWrapper>
)

const render = () => <Template />

export const Desktop: Story = {
  args: {},
  render,
}

export const Mobile = mobileStory(Desktop)
