import { Meta, StoryObj } from '@storybook/react'
import { ResourceListItem } from '@app/web/server/resources'
import Card from './Card'

const resource = {
  title:
    'Titre d’une ressource sur deux ligne très longues comme comme sur deux ligne très longues',
  slug: 'titre-d-une-ressource-sur-deux-ligne-très-longues-comme-comme-sur-deux-ligne-très-longues',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae turpis sed vitae vel. Venenatis adipiscing elit.',
  created: new Date('1998-07-12'),
  updated: new Date('2022-07-12'),
  base: { title: 'Titre de la base', slug: 'titre-de-la-base' },
  createdBy: {
    id: '1',
    name: 'Jean Biche',
  },
} satisfies ResourceListItem

export default {
  title: 'Resource/Card',
  component: Card,
} as Meta<typeof Card>

type Story = StoryObj<typeof Card>

export const Default: Story = {
  name: 'Resource',
  args: {
    resource,
  },
}

export const WithImage: Story = {
  name: 'Resource avec image',
  args: {
    resource,
    withImage: true,
  },
}

export const WithImageConnected: Story = {
  name: 'Resource utilisateur connecté avec image',
  args: {
    resource,
    connected: true,
    withImage: true,
  },
}

export const WithoutImageConnected: Story = {
  name: 'Resource utilisateur connecté',
  args: {
    resource,
    connected: true,
  },
}

export const DefaultMobile: Story = {
  name: 'Mobile - Resource',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    resource,
  },
}

export const WithImageMobile: Story = {
  name: 'Mobile - Resource avec image',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    resource,
    withImage: true,
  },
}
