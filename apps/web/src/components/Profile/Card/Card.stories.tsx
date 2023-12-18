import { Meta, StoryObj } from '@storybook/react'
import { mobileStory } from '@app/storybook/storyHelper'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import ProfileCard from './Card'

const profile = {
  id: 'f41d4215-aee5-4b39-95c9-60484df15de9',
  name: 'Jean Biche',
  image: null,
  firstName: 'Jean',
  lastName: 'Biche',
  followedBy: [],
} satisfies ProfileListItem

export default {
  title: 'Profile/Card',
  component: ProfileCard,
} as Meta<typeof ProfileCard>

type Story = StoryObj<typeof ProfileCard>

export const Desktop: Story = { args: { profile } }

export const Mobile = mobileStory(Desktop)
