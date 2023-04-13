import { Meta, StoryObj } from '@storybook/react'
import Link from './Link'

const meta: Meta<typeof Link> = {
  title: 'DSFR Component/Link',
  component: Link,
  argTypes: { onClick: { action: 'clicked' } },
}

export default meta

type Story = StoryObj<typeof Link>

export const Default: Story = {
  name: 'Lien au fil du texte',
  args: { href: '/', children: 'Lien interne' },
}

export const Extenal: Story = {
  name: 'Lien externe',
  args: {
    href: '/',
    children: 'Lien externe',
    target: '_blank',
    rel: 'noopener',
  },
}

export const Simple: Story = {
  name: 'Lien simple',
  args: {
    href: '/',
    children: 'Lien simple',
    simple: true,
  },
}

export const SimpleWithIcon: Story = {
  name: 'Lien simple avec icone',
  args: {
    href: '/',
    children: 'Lien simple',
    simple: true,
    icon: 'fr-fi-arrow-right-line',
  },
}

export const SmallIcon: Story = {
  name: 'Tailles',
  args: {
    href: '/',
    children: 'Lien de taille différente',
    size: 'sm',
  },
}
