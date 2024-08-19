import React, { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useDsfrModalIsBound } from '@app/ui/hooks/useDsfrModalIsBound'
import { expect, waitFor, within } from '@storybook/test'
import {
  ActiviteDetailsDynamicModal,
  ActiviteDetailsDynamicModalState,
} from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsDynamicModal'
import ActiviteDetailsModal from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsModal'
import {
  activiteCollectifInfosDepliees,
  activiteCollectifInfosRepliees,
  activiteIndividuelleBeneficiaireAnonyme,
  activiteIndividuelleBeneficiaireSuivi,
  activiteIndividuelleInfosMinimum,
} from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsModalStoriesData'

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
      activite: activiteIndividuelleInfosMinimum,
    },
  },
}

export const IndividuelBeneficiaireSuivi: Story = {
  name: 'Individuel - Bénéficiaire suivi',
  play,
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: activiteIndividuelleBeneficiaireSuivi,
    },
  },
}

export const IndividuelBeneficiaireAnonyme: Story = {
  name: 'Individuel - Bénéficiaire anonyme',
  play,
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: activiteIndividuelleBeneficiaireAnonyme,
    },
  },
}

export const CollectifInfosRepliees: Story = {
  name: 'Collectif - Infos participants repliées',
  play,
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: activiteCollectifInfosRepliees,
    },
  },
}

export const CollectifInfosDepliees: Story = {
  name: 'Collectif - Infos participants dépliées',
  play: async (playContext) => {
    await play(playContext)
    const { canvasElement } = playContext

    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole('button')
    const button = buttons.find((element) =>
      element.classList.contains('fr-accordion__btn'),
    )
    if (button) {
      button.click()
    } else {
      throw new Error('Button with class .fr-accordion__btn not found')
    }
  },
  render: (args) => <Template {...args} />,
  args: {
    initialState: {
      activite: activiteCollectifInfosDepliees,
    },
  },
}
