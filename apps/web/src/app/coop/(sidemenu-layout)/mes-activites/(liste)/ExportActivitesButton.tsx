'use client'

import { createToast } from '@app/ui/toast/createToast'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import type { ActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import { download } from '@app/web/utils/download'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Tag from '@codegouvfr/react-dsfr/Tag'

const ExportActiviteModal = createModal({
  id: 'export-activites',
  isOpenedByDefault: false,
})

const ExportActivitesButton = ({
  filterLabels,
  filters,
  matchesCount,
}: {
  filters: ActivitesFilters
  filterLabels: ActivitesFiltersLabels
  matchesCount: number
}) => {
  const onExport = () => {
    const exportPath = '/coop/mes-activites/export'
    const searchParams = new URLSearchParams()

    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue
      searchParams.set(key, Array.isArray(value) ? value.join(',') : value)
    }

    const pathWithSearchParams =
      searchParams.size > 0
        ? `${exportPath}?${searchParams.toString()}`
        : exportPath

    download(pathWithSearchParams)
    ExportActiviteModal.close()
    createToast({
      priority: 'success',
      message: `Le téléchargement de vos ${matchesCount} activités est en cours.`,
    })
  }

  return (
    <>
      <Button
        {...ExportActiviteModal.buttonProps}
        priority="secondary"
        iconId="fr-icon-download-line"
        iconPosition="right"
      >
        Exporter
      </Button>
      <ExportActiviteModal.Component
        title={
          <>
            Exporter la liste des{' '}
            <span className="fr-text-title--blue-france">
              {matchesCount} activités
            </span>
          </>
        }
        buttons={[
          {
            title: 'Annuler',
            priority: 'secondary',
            doClosesModal: true,
            children: 'Annuler',
            type: 'button',
          },
          {
            title: 'Exporter',
            doClosesModal: false,
            children: 'Exporter',
            type: 'button',
            onClick: onExport,
          },
        ]}
      >
        {filterLabels.length > 0 ? (
          <>
            <p className="fr-mb-2v">
              Vous avez appliqué les filtres suivants&nbsp;:
            </p>
            <ul className="fr-tags-group">
              {filterLabels.map((filter) => (
                <li
                  className="fr-line-height-1"
                  key={`${filter.type}-${filter.key}`}
                >
                  <Tag small>{filter.label}</Tag>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="fr-mb-2v">
            Vous n’avez pas appliqué de filtre, toutes les activités seront
            exportées.
          </p>
        )}
      </ExportActiviteModal.Component>
    </>
  )
}

export default ExportActivitesButton
