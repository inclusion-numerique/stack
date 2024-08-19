'use client'

import React from 'react'
import CreateCraModalContent from '@app/web/app/coop/mes-activites/CreateCraModalContent'
import { CreateCraModalDefinition } from '@app/web/app/coop/mes-activites/CreateCraModalDefinition'

const CreateCraModal = () => (
  <CreateCraModalDefinition.Component title="Compléter un compte-rendu d’activité">
    <CreateCraModalContent onClose={CreateCraModalDefinition.close} />
  </CreateCraModalDefinition.Component>
)

export default CreateCraModal
