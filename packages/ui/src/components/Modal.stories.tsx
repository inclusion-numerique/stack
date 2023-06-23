import React from 'react'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { Meta, StoryObj } from '@storybook/react'
import { within } from '@storybook/testing-library'

const Modal = createModal({
  id: 'modal',
  isOpenedByDefault: false,
})

const meta: Meta<typeof Modal.Component> = {
  title: 'DSFR Component/Modal',
  component: Modal.Component,
}

export default meta

type Story = StoryObj<typeof Modal.Component>

const Template = () => (
  <>
    <button type="button" onClick={() => Modal.open()}>
      Open
    </button>
    <Modal.Component
      title=""
      buttons={[
        {
          title: 'Annuler',
          priority: 'tertiary',
          children: 'Annuler',
        },
      ]}
    >
      Hello
    </Modal.Component>
  </>
)

export const Default: Story = {
  name: 'Modale mobile',
  render: () => <Template />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await new Promise((resolve) => {
      setTimeout(resolve, 100)
    })
    canvas.getByRole('button').click()
  },
  parameters: {
    chromatic: { delay: 150 },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
