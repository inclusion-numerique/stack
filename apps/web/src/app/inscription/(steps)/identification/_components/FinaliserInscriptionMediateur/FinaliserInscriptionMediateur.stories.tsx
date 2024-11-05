import type { Meta, StoryObj } from '@storybook/react'
import { FinaliserInscriptionMediateur } from './FinaliserInscriptionMediateur'

export default {
  title: 'Inscription/Finaliser inscription médiateur',
  component: FinaliserInscriptionMediateur,
} as Meta<typeof FinaliserInscriptionMediateur>

type Story = StoryObj<typeof FinaliserInscriptionMediateur>

export const Mediateur: Story = {
  args: {
    inscriptionRole: 'mediateur',
  },
}
Mediateur.storyName = 'Médiateur'

export const ConseillerNumeriqueTrouve: Story = {
  args: {
    inscriptionRole: 'conseiller-numerique',
  },
}
ConseillerNumeriqueTrouve.storyName = 'Conseiller Numerique identifié'

export const CoordinateurConseillerNumeriqueTrouve: Story = {
  args: {
    inscriptionRole: 'coordinateur',
  },
}
CoordinateurConseillerNumeriqueTrouve.storyName =
  'Coordinateur de conseiller numérique identifié'
