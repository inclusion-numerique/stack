import { Meta, StoryObj } from '@storybook/react'
import { testSessionUser } from '@app/web/test/testSessionUser'
import PrefetPage from './Page'

export default {
  title: 'Prefet/Page',
  component: PrefetPage,
} as Meta<typeof PrefetPage>

type Story = StoryObj<typeof PrefetPage>

export const Default: Story = {
  name: 'Prefet',
  args: { user: testSessionUser },
}
