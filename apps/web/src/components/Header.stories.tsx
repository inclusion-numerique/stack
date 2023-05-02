import { Meta, StoryObj } from '@storybook/react'
import Header from '@app/web/components/Header'

export default {
  title: 'Header',
  component: Header,
} as Meta<typeof Header>

type Story = StoryObj<typeof Header>

export const Desktop: Story = {}
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
