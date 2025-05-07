import { Spinner } from '@app/web/ui/Spinner'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Spinner',
  component: Spinner,
} as Meta<typeof Spinner>

type Story = StoryObj<typeof Spinner>

export const Small: Story = { args: { size: 'small' } }
export const Medium: Story = {}
export const Large: Story = { args: { size: 'large' } }

export const Blue: Story = { args: { className: 'fr-text-title--blue-france' } }
