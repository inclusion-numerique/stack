import { Meta, StoryObj } from '@storybook/react'
import PublicHeader from '@stack/web/app/(public)/PublicHeader'

export default {
  title: 'PublicHeader',
  component: PublicHeader,
} as Meta<typeof PublicHeader>

type Story = StoryObj<typeof PublicHeader>

export const Desktop: Story = {}
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
