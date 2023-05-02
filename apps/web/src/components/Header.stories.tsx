import { Meta, StoryObj } from '@storybook/react'
import Header from '@app/web/components/Header'
import { testSessionUser } from '@app/web/test/testSessionUser'

export default {
  title: 'Header',
  component: Header,
} as Meta<typeof Header>

type Story = StoryObj<typeof Header>

export const SignedOut: Story = {
  name: 'Utilisateur non connecté',
}

export const SignedInNoBases: Story = {
  name: 'Utilisateur connecté - Sans bases',
  args: { user: testSessionUser },
}

export const SignedInWithBases: Story = {
  name: 'Utilisateur connecté - Avec bases',
  args: {
    user: {
      ...testSessionUser,
      ownedBases: [
        { title: 'Ma première base', slug: 'a' },
        { title: 'Une autre base', slug: 'b' },
      ],
    },
  },
}

export const SignedOutBacklink: Story = {
  name: 'Avec lien de retour',
  args: { backLink: '/' },
}
