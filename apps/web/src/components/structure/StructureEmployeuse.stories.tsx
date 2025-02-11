import type { Meta, StoryObj } from '@storybook/react'
import { StructureEmployeuse } from './StructureEmployeuse'

const meta = {
  title: 'Structure/Structure employeuse',
  component: StructureEmployeuse,
  tags: ['autodocs'],
} satisfies Meta<typeof StructureEmployeuse>

export default meta
type Story = StoryObj<typeof meta>

export const Complet: Story = {
  args: {
    id: '1',
    nom: 'Anonymal',
    adresse: '12 bis rue du Général Leclerc',
    complementAdresse: '4e étage',
    commune: 'Reims',
    codePostal: '51100',
    typologies: ['TIERS_LIEUX', 'ASSO'],
    siret: '43493312300029',
    isLieuActivite: true,
  },
}

export const Minimal: Story = {
  args: {
    id: '1',
    nom: 'Anonymal',
    adresse: '12 bis rue du Général Leclerc',
    commune: 'Reims',
    codePostal: '51100',
    isLieuActivite: false,
  },
}

export const MinimalAvecSiret: Story = {
  args: {
    id: '1',
    nom: 'Anonymal',
    adresse: '12 bis rue du Général Leclerc',
    commune: 'Reims',
    codePostal: '51100',
    siret: '43493312300029',
    isLieuActivite: false,
  },
}

export const MinimalAvecTypologies: Story = {
  args: {
    id: '1',
    nom: 'Anonymal',
    adresse: '12 bis rue du Général Leclerc',
    commune: 'Reims',
    codePostal: '51100',
    typologies: ['TIERS_LIEUX', 'ASSO'],
    isLieuActivite: false,
  },
}
