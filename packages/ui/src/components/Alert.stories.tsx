import { Meta, StoryObj } from '@storybook/react'
import Alert from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'DSFR Component/Alert',
  component: Alert,
}

export default meta

type Story = StoryObj<typeof Alert>

export const Error: Story = {
  name: 'Erreur',
  args: {
    type: 'error',
    title: 'Titre du message',
    description: 'Description',
  },
}

export const Success: Story = {
  name: 'Succès',
  args: {
    type: 'success',
    title: 'Titre du message',
    description: 'Description',
  },
}

export const Information: Story = {
  name: 'Information',
  args: {
    type: 'info',
    title: 'Titre du message',
    description: 'Description',
  },
}

export const Warning: Story = {
  name: 'Attention',
  args: {
    type: 'warning',
    title: 'Titre du message',
    description: 'Description',
  },
}

export const Small: Story = {
  name: 'Alert `Small`',
  args: {
    small: true,
    type: 'info',
    description: 'Titre du message',
  },
}

export const Closable: Story = {
  name: 'Alert fermable',
  argTypes: { onClose: { action: 'closed' } },
  args: {
    closable: true,
    type: 'info',
    title: 'Titre du message',
    description: "Cliquer sur la croix pour fermer l'alerte",
  },
}
