'use client'

import CreateCraModalContent from '@app/web/app/coop/(full-width-layout)/mes-activites/CreateCraModalContent'
import { CreateCraModalDefinition } from '@app/web/app/coop/(full-width-layout)/mes-activites/CreateCraModalDefinition'
import React from 'react'

const CreateCraModal = () => (
  <CreateCraModalDefinition.Component title="Compléter un compte-rendu d’activité">
    <CreateCraModalContent onClose={CreateCraModalDefinition.close} />
  </CreateCraModalDefinition.Component>
)

export default CreateCraModal
