import { Meta, StoryObj } from '@storybook/react'
import ButtonLink from './ButtonLink'

const meta: Meta<typeof ButtonLink> = {
  title: 'DSFR Component/Button Link',
  component: ButtonLink,
  argTypes: { onClick: { action: 'clicked' } },
}

export default meta

type Story = StoryObj<typeof ButtonLink>

export const Default: Story = {
  name: 'Lien en bouton',
  args: { href: '/', children: 'Link button' },
}
