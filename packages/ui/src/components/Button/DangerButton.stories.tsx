import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import Button from '@codegouvfr/react-dsfr/Button'

const meta: Meta<typeof Button> = {
  title: 'DSFR Component/Button/Danger',
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  name: 'Bouton danger',
  render: (args) => <Button {...args} className="fr-btn--danger" />,
  args: {
    children: 'Danger',
  },
}
