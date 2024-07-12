import type { Meta, StoryObj } from '@storybook/react'
import { LieuActivite } from './LieuActivite'

const meta = {
  title: 'Lieu activité/list item',
  component: LieuActivite,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof LieuActivite>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
  args: {
    id: '64258318456999069aa3c9bb',
    nom: "Bibliotheque Musee de l'Opera · Bibliotheque Nationale de France",
    adresse: '19 Rue Proudhon',
    complementAdresse: 'Bâtiment 5',
    codePostal: '93210',
    commune: 'Saint-Denis',
    typologies: ['Association', 'RFS', 'BIB', 'CAARUD'],
    siret: '77560540501013',
    rna: '802477',
    visiblePourCartographieNationale: true,
    structureCartographieNationaleId:
      'Conseiller-Numerique_64258318456999069aa3c9bb',
    creation: new Date('2018-03-01'),
    modification: new Date('2020-01-01'),
  },
}

export const Minimal: Story = {
  args: {
    id: '64258318456999069aa3c9bb',
    nom: "Bibliotheque Musee de l'Opera · Bibliotheque Nationale de France",
    adresse: '19 Rue Proudhon',
    codePostal: '93210',
    commune: 'Saint-Denis',
    creation: new Date('2018-03-01'),
    modification: new Date('2018-03-01'),
  },
}

export const LieuEnCoursDAjout: Story = {
  args: {
    id: '64258318456999069aa3c9bb',
    nom: "Bibliotheque Musee de l'Opera · Bibliotheque Nationale de France",
    adresse: '19 Rue Proudhon',
    codePostal: '93210',
    commune: 'Saint-Denis',
    creation: new Date('2018-03-01'),
    modification: new Date('2018-03-01'),
    visiblePourCartographieNationale: true,
  },
}
