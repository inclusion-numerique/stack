import React, { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  ActiviteDetailsDynamicModal,
  ActiviteDetailsDynamicModalState,
} from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsDynamicModal'
import ActiviteDetailsModal from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsModal'
import { useDsfrModalIsBound } from '@app/ui/hooks/useDsfrModalIsBound'
import { expect, waitFor, within } from '@storybook/test'

const Template = ({
  initialState,
}: {
  initialState: ActiviteDetailsDynamicModalState
}) => {
  const loaded = useDsfrModalIsBound(ActiviteDetailsDynamicModal.id)
  useEffect(() => {
    if (loaded) {
      ActiviteDetailsDynamicModal.open()
    }
  }, [loaded])

  return <ActiviteDetailsModal initialState={initialState} />
}

const meta: Meta<typeof ActiviteDetailsModal> = {
  title: 'Activités/Modale détails',
  component: ActiviteDetailsModal,
}

export default meta

type Story = StoryObj<typeof Template>

/**
 * Use play to delay chromatic snapshot until modal is visible
 */
const play = (async ({ canvasElement }) => {
  // Assigns canvas to the component root element
  const canvas = within(canvasElement)
  //   Wait for the below assertion not throwing an error anymore (default timeout is 1000ms)
  await waitFor(() =>
    expect(canvas.findByRole('dialog')).resolves.toBeVisible(),
  )
}) satisfies Story['play']

export const IndividuelInfosMinimum: Story = {
  name: 'Individuel - Infos minimum',
  play,
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: {
        type: 'individuel',
        cra: {
          id: '1',
          date: new Date('2024-03-22'),
          duree: 90,
          thematiques: [
            'CreerAvecLeNumerique',
            'PrendreEnMainDuMateriel',
            'InsertionProfessionnelle',
          ],
          notes: null,
          beneficiaire: {
            id: '2',
            prenom: null,
            nom: null,
            _count: {
              activites: 5,
            },
          },
          lieuAccompagnement: 'LieuActivite',
          autonomie: null,
          materiel: [],
          lieuAccompagnementDomicileCommune: null,
          lieuAccompagnementDomicileCodeInsee: null,
          lieuAccompagnementDomicileCodePostal: null,
          lieuActivite: {
            id: '1',
            nom: 'Bibliotheque Musee de l’Opera, au fond du couloir à droite',
            commune: 'Paris',
            codePostal: '75006',
          },
        },
      },
    },
  },
}

export const IndividuelBeneficiaireSuivi: Story = {
  name: 'Individuel - Bénéficiaire suivi',
  play,
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: {
        type: 'individuel',
        cra: {
          id: '1',
          date: new Date('2024-03-22'),
          duree: 120,
          thematiques: ['NavigationSurInternet', 'Email'],
          notes: null,
          beneficiaire: {
            id: '2',
            prenom: 'Jean',
            nom: 'Dupont',
            _count: {
              activites: 5,
            },
          },
          lieuAccompagnement: 'ADistance',
          autonomie: null,
          materiel: [],
          lieuAccompagnementDomicileCommune: null,
          lieuAccompagnementDomicileCodeInsee: null,
          lieuAccompagnementDomicileCodePostal: null,
          lieuActivite: {
            id: '1',
            nom: 'Bibliotheque Musee de l’Opera, au fond du couloir à droite',
            commune: 'Paris',
            codePostal: '75006',
          },
        },
      },
    },
  },
}
