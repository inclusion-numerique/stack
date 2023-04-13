import { Meta, StoryObj } from '@storybook/react'
import ClosableAlert from './ClosableAlert'

const meta: Meta<typeof ClosableAlert> = {
  title: 'DSFR Component/Closable Alert',
  component: ClosableAlert,
}

export default meta

type Story = StoryObj<typeof ClosableAlert>

export const Closable: Story = {
  name: 'Alert fermable',
  argTypes: { onClose: { action: 'closed' } },
  args: {
    type: 'info',
    title: 'Titre du message',
    description: "Cliquer sur la croix pour fermer l'alerte",
  },
}
