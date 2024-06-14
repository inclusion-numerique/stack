import type { Meta, StoryObj } from '@storybook/react'
import { FeaturedBase } from './FeaturedBase'

const meta = {
  title: "Page d'accueil/Base à la une",
  parameters: {
    layout: 'centered',
    design: [
      {
        type: 'figma',
        name: "Page d'accueil - Base à la une",
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10461-39435',
      },
    ],
  },
  component: FeaturedBase,
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedBase>

export default meta
type Story = StoryObj<typeof meta>

export const PublishedInBase: Story = {
  args: {
    id: 'f41d4215-aee5-4b39-95c9-60484df15de9',
    slug: 'nom-de-la-base',
    image: { id: 'portrait' },
    title: 'Nom de la base',
    excerpt:
      "Anciennement appelé <b>Maison de la Recherche et de l'Imagination</b> (MRI), Le Dôme est un espace collaboratif d’innovation né du Programme des Investissements d’Avenir Inmediats en...",
    department: '08',
    resourcesCount: 45,
    followersCount: 45,
  },
  render: (args) => (
    <div style={{ width: '380px' }}>
      <FeaturedBase {...args} />
    </div>
  ),
}
PublishedInBase.storyName = "Page d'accueil - Base à la une"
