'use client'

import { ActiviteDetailsDynamicModal } from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsDynamicModal'
import type { MouseEventHandler } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { Activite } from '@app/web/cra/activitesQueries'

const ActiviteRowShowDetailsButton = ({ activite }: { activite: Activite }) => {
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
    <Button
      size="small"
      priority="secondary"
      iconId="fr-icon-more-line"
      type="button"
      title="Voir le détail"
      onClick={onClick}
    />
  )
}
export default ActiviteRowShowDetailsButton
