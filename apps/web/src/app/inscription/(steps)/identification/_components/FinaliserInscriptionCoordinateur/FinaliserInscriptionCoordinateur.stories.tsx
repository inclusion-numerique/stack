import { Meta, StoryObj } from '@storybook/react'
import { FinaliserInscriptionCoordinateur } from './FinaliserInscriptionCoordinateur'

export default {
  title: 'Inscription/Finaliser inscription coordinateur',
  component: FinaliserInscriptionCoordinateur,
} as Meta<typeof FinaliserInscriptionCoordinateur>

type Story = StoryObj<typeof FinaliserInscriptionCoordinateur>

export const CoordinateurConseillerNumeriqueTrouve: Story = {
  args: {
    user: { email: 'john-doe@acme.fr', id: '1', usurper: null },
    inscriptionRole: 'coordinateur',
  },
}
CoordinateurConseillerNumeriqueTrouve.storyName =
  'Coordinateur de conseiller numérique identifié'

export const ConseillerNumeriqueTrouve: Story = {
  args: {
    user: { email: 'john-doe@acme.fr', id: '1', usurper: null },
    inscriptionRole: 'conseiller-numerique',
  },
}
ConseillerNumeriqueTrouve.storyName = 'Conseiller numérique identifié'

export const MediateurTrouve: Story = {
  args: {
    user: { email: 'john-doe@acme.fr', id: '1', usurper: null },
    inscriptionRole: 'mediateur',
  },
}
MediateurTrouve.storyName = 'Médiateur'
