'use client'

import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { createToast } from '@app/ui/toast/createToast'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { generateActivitesFiltersLabels } from '@app/web/cra/generateActivitesFiltersLabels'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { download } from '@app/web/utils/download'

const ExportStatistiquesModal = createModal({
  id: 'export-statistiques',
  isOpenedByDefault: false,
})

export const ExportStatistiques = ({
  filters,
  lieuxActiviteOptions,
  mediateursOptions,
  beneficiairesOptions,
  departementsOptions,
  communesOptions,
}: {
  filters: ActivitesFilters
  mediateursOptions: MediateurOption[]
  beneficiairesOptions: BeneficiaireOption[]
  lieuxActiviteOptions: SelectOption[]
  departementsOptions: SelectOption[]
  communesOptions: SelectOption[]
}) => {
  const onExportXlsx = () => {
    const exportPath = '/coop/mes-statistiques/export'
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
    ExportStatistiquesModal.close()
    createToast({
      priority: 'success',
      message: 'Le téléchargement de vos statistiques est en cours.',
    })
  }

  const onExportPdf = () => {
    ExportStatistiquesModal.close()
    window.print()
    createToast({
      priority: 'success',
      message: 'Le téléchargement de vos statistiques est en cours.',
    })
  }

  const filterLabelsToDisplay = Object.entries(
    generateActivitesFiltersLabels(filters, {
      communesOptions,
      departementsOptions,
      lieuxActiviteOptions,
      beneficiairesOptions,
      mediateursOptions,
    }),
  )
    .filter(
      ([key]) =>
        key !== 'du' && key !== 'au' && key !== 'typeLieu' && key !== 'nomLieu',
    )
    .filter((entry): entry is [string, string] => !!entry[1])

  return (
    <>
      <Button
        {...ExportStatistiquesModal.buttonProps}
        title="Exporter les statistiques"
        priority="secondary"
        iconId="fr-icon-download-line"
        iconPosition="right"
      >
        Exporter
      </Button>
      <ExportStatistiquesModal.Component
        title="Exporter les statistiques"
        buttons={[
          {
            title: 'Annuler',
            priority: 'secondary',
            doClosesModal: true,
            children: 'Annuler',
            type: 'button',
          },
          {
            title: 'Exporter pdf',
            doClosesModal: true,
            children: 'Exporter en pdf',
            type: 'button',
            priority: 'primary',
            onClick: onExportPdf,
          },
          {
            title: 'Exporter xlsx',
            doClosesModal: false,
            children: 'Exporter en xlsx',
            type: 'button',
            onClick: onExportXlsx,
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
      </ExportStatistiquesModal.Component>
    </>
  )
}
