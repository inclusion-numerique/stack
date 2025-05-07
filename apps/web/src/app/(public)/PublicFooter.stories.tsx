import PublicFooter from '@app/web/app/(public)/PublicFooter'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'PublicFooter',
  component: PublicFooter,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=2454-153528&t=MbwOB3HnF8uqKTBI-4',
    },
  },
} as Meta<typeof PublicFooter>

type Story = StoryObj<typeof PublicFooter>

export const Desktop: Story = {}
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
