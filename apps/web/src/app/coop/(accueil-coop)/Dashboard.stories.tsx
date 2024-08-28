import { Meta, StoryObj } from '@storybook/react'
import { Dashboard } from './Dashboard'

export default {
  title: 'Coop/Dashboard',
  component: Dashboard,
} as Meta<typeof Dashboard>

type Story = StoryObj<typeof Dashboard>

export const Statistiques: Story = {
  args: {
    firstName: 'John',
    name: 'Doe',
    email: 'john@doe.com',
  },
}
Statistiques.storyName = 'Dashboard'
