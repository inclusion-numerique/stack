'use client'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useSearchParams } from 'next/navigation'
import { useDsfrModalIsBound } from '@app/ui/hooks/useDsfrModalIsBound'
import { useEffect } from 'react'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { limiteModificationDesGouvernances } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/gouvernanceMetadata'
import { gouvernanceCompletedSearchParam } from '@app/web/app/(private)/gouvernances/gouvernancePaths'

const { Component, id, open } = createModal({
  id: 'gouvernance-completed-modal',
  isOpenedByDefault: false,
})

const GouvernanceCompletedModal = () => {
  const createResourceIsInSearchParams =
    typeof useSearchParams()?.get(gouvernanceCompletedSearchParam) === 'string'

  const modalIsBound = useDsfrModalIsBound(id)

  // Auto open modal when create is in search params and the modal is bound
  useEffect(() => {
    if (createResourceIsInSearchParams && modalIsBound) {
      open()
    }
  }, [createResourceIsInSearchParams, modalIsBound])

  return (
    <Component
      title="2 formulaires complétés"
      buttons={[
        { children: 'J’ai compris', type: 'button', doClosesModal: true },
      ]}
    >
      Votre proposition sera automatiquement envoyée à l’ANCT et aux membres de
      la gouvernance le {dateAsDay(limiteModificationDesGouvernances)}. Merci
      d’avoir complété les formulaires.
    </Component>
  )
}

export default GouvernanceCompletedModal
