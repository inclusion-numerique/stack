import { Meta, StoryObj } from '@storybook/react'
import Empty from '@app/web/components/Empty'

export default {
  title: 'Empty',
  component: Empty,
} as Meta<typeof Empty>

type Story = StoryObj<typeof Empty>

export const Default: Story = {}
