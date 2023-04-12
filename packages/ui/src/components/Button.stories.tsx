import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'DSFR Component/Button',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  name: 'Bouton primaire',
  args: { label: 'Label button' },
}

export const Secondary: Story = {
  name: 'Bouton secondaire',
  args: { label: 'Label button', priority: 'secondary' },
}

export const Tertiary: Story = {
  name: 'Bouton tertiaire',
  args: { label: 'Label button', priority: 'tertiary' },
}

export const TertiaryNoOutline: Story = {
  name: 'Bouton tertiaire sans contour',
  args: { label: 'Label button', priority: 'tertiary-no-outline' },
}

export const Disabled: Story = {
  name: 'État désactivé',
  args: { label: 'Label button', disabled: true },
}

export const WithIcon: Story = {
  name: 'Bouton avec icône',
  args: {
    label: 'Label button',
    icon: 'fr-icon-checkbox-circle-line',
  },
}

export const OnlyIcon: Story = {
  name: 'Icone seule',
  args: {
    title: 'Label button',
    icon: 'fr-icon-checkbox-circle-line',
  },
}

export const Size: Story = {
  name: 'Taille',
  args: { label: 'Label button SM', size: 'sm' },
}
