'use client'

import React from 'react'
import CreateCraModalContent from '@app/web/app/coop/mon-activite/CreateCraModalContent'
import { CreateCraModalDefinition } from '@app/web/app/coop/mon-activite/CreateCraModalDefinition'

const CreateCraModal = () => (
  <CreateCraModalDefinition.Component title="Compléter un compte-rendu d’activité">
    <CreateCraModalContent onClose={CreateCraModalDefinition.close} />
  </CreateCraModalDefinition.Component>
)

export default CreateCraModal
