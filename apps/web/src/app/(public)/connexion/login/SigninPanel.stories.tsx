import { Meta, StoryObj } from '@storybook/react'
import { SigninPanel } from '@lb/web/app/(public)/connexion/login/SigninPanel'

const meta: Meta<typeof SigninPanel> = {
  title: 'SigninPanel',
  component: SigninPanel,
}

export default meta

type Story = StoryObj<typeof SigninPanel>

export const Desktop: Story = {}
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
