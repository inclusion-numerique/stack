'use client'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useSearchParams } from 'next/navigation'
import { useDsfrModalIsBound } from '@app/ui/hooks/useDsfrModalIsBound'
import { useEffect } from 'react'
import { limiteModificationDesGouvernances } from '@app/web/app/(private)/gouvernances/departements/[codeDepartement]/gouvernance/gouvernanceMetadata'
import { dateAsDay } from '@app/web/utils/dateAsDay'
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
      Merci pour vos efforts de concertation. Votre proposition sera
      automatiquement envoyée à l’ANCT et aux membres de la gouvernance le{' '}
      {dateAsDay(limiteModificationDesGouvernances)}. Vous pouvez continuer à y
      apporter des modifications jusqu’à cette date. L’ANCT reviendra vers vous
      début 2024 pour&nbsp;:
      <ul>
        <li>
          vous apporter des réponses relatives à votre expression de
          besoins&nbsp;;
        </li>
        <li>
          vous demander des précisions sur votre gouvernance si elle ne répond
          pas aux critères établis par la circulaire du 28 juillet 2023.
        </li>
      </ul>
    </Component>
  )
}

export default GouvernanceCompletedModal
