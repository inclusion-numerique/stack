'use client'

import type { MouseEventHandler } from 'react'
import { ActiviteDetailsDynamicModal } from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsDynamicModal'
import type { ActiviteForList } from '@app/web/cra/activitesQueries'

const ActiviteBeneficiaireCardOpenModalLink = ({
  activite,
}: {
  activite: ActiviteForList
}) => {
  const open = ActiviteDetailsDynamicModal.useOpen()

  const onClick: MouseEventHandler = (event) => {
    open({
      activite,
    })
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/control-has-associated-label
    <button type="button" title="Voir le détail" onClick={onClick} />
  )
}

export default ActiviteBeneficiaireCardOpenModalLink
