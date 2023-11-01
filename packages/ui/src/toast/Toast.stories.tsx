import React, { useEffect } from 'react'
import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import { Meta, StoryObj } from '@storybook/react'
import Button from '@codegouvfr/react-dsfr/Button'
import { createToast } from '@app/ui/toast/createToast'
import Toaster from '@app/ui/toast/Toaster'

const meta: Meta<typeof Tabs> = {
  title: 'Toasts',
  component: Tabs,
}

export default meta

type Story = StoryObj<typeof Tabs>

const Template = ({ action }: { action?: boolean }) => {
  const actionParams = action
    ? {
        children: 'Action',
        onClick: () => createToast('warning', 'Toast inception 🤓'),
      }
    : undefined

  const onClick = () => {
    createToast('info', 'Bonjour le monde', actionParams)
  }

  useEffect(
    () => {
      createToast('success', 'Un nouveau toast de succès total', actionParams)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return (
    <>
      <Toaster />
      <div>
        <Button onClick={onClick}>Open toast</Button>
      </div>
    </>
  )
}

export const Simple: Story = {
  render: () => <Template />,
}

export const Action: Story = {
  render: () => <Template action />,
}
