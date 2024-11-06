'use client'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Button from '@codegouvfr/react-dsfr/Button'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { createToast } from '@app/ui/toast/createToast'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import type { ActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import { download } from '@app/web/utils/download'

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
      searchParams.set(key, value)
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

  const filterLabelsToDisplay = Object.entries(filterLabels)
    // we hide filters that give to much granular information
    .filter(
      ([key]) =>
        key !== 'du' && key !== 'au' && key !== 'typeLieu' && key !== 'nomLieu',
    )
    // only keep applied filters
    .filter((entry): entry is [string, string] => !!entry[1])

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
        {filterLabelsToDisplay.length > 0 ? (
          <>
            <p className="fr-mb-2v">
              Vous avez appliqué les filtres suivants&nbsp;:
            </p>
            <div className="fr-flex fr-flex-wrap fr-flex-gap-2v">
              {filterLabelsToDisplay.map(([key, value]) => (
                <Tag key={key} small>
                  {value}
                </Tag>
              ))}
            </div>
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
