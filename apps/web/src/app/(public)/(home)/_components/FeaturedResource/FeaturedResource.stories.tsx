import type { Meta, StoryObj } from '@storybook/react'
import { FeaturedResource, FeaturedResourceProps } from './FeaturedResource'

const BASE: FeaturedResourceProps['base'] = {
  id: '2',
  slug: 'conseiller-numerique',
  title: 'Conseiller numérique France Services',
  image: null,
}

const CREATED_BY: FeaturedResourceProps['createdBy'] = {
  id: '1',
  slug: 'jean-biche',
  name: 'Jean Biche',
  firstName: 'Jean',
  lastName: 'Biche',
  isPublic: true,
  image: null,
}

const FEATURED_RESSOURCE: FeaturedResourceProps = {
  title:
    'Lorem ipsum dolor sit amet consectetur. Curabitur pellentesque tincidunt viverra',
  slug: 'exemple',
  published: new Date('2022-07-12'),
  base: BASE,
  createdBy: CREATED_BY,
}

const meta = {
  title: "Page d'accueil/Ressource à la une",
  parameters: {
    layout: 'centered',
    design: [
      {
        type: 'figma',
        name: "Page d'accueil - Ressource à la une publiée dans une base",
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=11395-86067',
      },
    ],
  },
  component: FeaturedResource,
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedResource>

export default meta
type Story = StoryObj<typeof meta>

export const PublishedInBase: Story = {
  args: FEATURED_RESSOURCE,
  render: (args) => (
    <div style={{ width: '380px' }}>
      <FeaturedResource {...args} />
    </div>
  ),
}
PublishedInBase.storyName =
  "Page d'accueil - Ressource à la une publiée dans une base"

export const PublishedInProfileProfile: Story = {
  args: {
    ...FEATURED_RESSOURCE,
    base: undefined,
  },
  render: (args) => (
    <div style={{ width: '380px' }}>
      <FeaturedResource {...args} />
    </div>
  ),
}
PublishedInProfileProfile.storyName =
  "Page d'accueil - Ressource à la une publiée dans un profil public"

export const PublishedInPrivateProfile: Story = {
  args: {
    ...FEATURED_RESSOURCE,
    base: undefined,
    createdBy: {
      ...CREATED_BY,
      isPublic: false,
    },
  },
  render: (args) => (
    <div style={{ width: '380px' }}>
      <FeaturedResource {...args} />
    </div>
  ),
}
PublishedInPrivateProfile.storyName =
  "Page d'accueil - Ressource à la une publiée dans un profil privé"
