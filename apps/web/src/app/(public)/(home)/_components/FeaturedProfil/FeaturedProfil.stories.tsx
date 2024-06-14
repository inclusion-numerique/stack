import { Meta, StoryObj } from '@storybook/react'
import { FeaturedProfil } from './FeaturedProfil'

const meta = {
  title: "Page d'accueil/Profil à la une",
  parameters: {
    layout: 'centered',
    design: [
      {
        type: 'figma',
        name: "Page d'accueil - Profil à la une",
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10461-39471',
      },
    ],
  },
  component: FeaturedProfil,
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedProfil>

export default meta
type Story = StoryObj<typeof meta>

export const Profile: Story = {
  args: {
    slug: 'prenom-nom',
    firstName: 'Prénom',
    lastName: 'Nom',
    name: 'Prénom Nom',
    image: null,
    resourcesCount: 45,
    followersCount: 45,
  },
  render: (args) => (
    <div style={{ width: '380px' }}>
      <FeaturedProfil {...args} />
    </div>
  ),
}
Profile.storyName = "Page d'accueil - Profil à la une"
