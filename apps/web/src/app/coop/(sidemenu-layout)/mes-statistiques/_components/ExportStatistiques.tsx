'use client'

import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { createToast } from '@app/ui/toast/createToast'
import type { LieuActiviteOption } from '@app/web/app/lieu-activite/getLieuxActiviteOptions'
import type { BeneficiaireOption } from '@app/web/beneficiaire/BeneficiaireOption'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import {
  generateActivitesFiltersLabels,
  toLieuPrefix,
} from '@app/web/cra/generateActivitesFiltersLabels'
import { MediateurOption } from '@app/web/mediateurs/MediateurOption'
import { download } from '@app/web/utils/download'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Tag from '@codegouvfr/react-dsfr/Tag'

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
  lieuxActiviteOptions: LieuActiviteOption[]
  departementsOptions: SelectOption[]
  communesOptions: SelectOption[]
}) => {
  const onExportXlsx = () => {
    const exportPath = '/coop/mes-statistiques/export'
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

  const filterLabelsToDisplay = generateActivitesFiltersLabels(filters, {
    communesOptions,
    departementsOptions,
    lieuxActiviteOptions,
    beneficiairesOptions,
    mediateursOptions,
  }).map(toLieuPrefix)

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
            <ul className="fr-tags-group">
              {filterLabelsToDisplay.map((filter) => (
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
            Vous n’avez pas appliqué de filtre, les statistiques seront
            exportées dans leur intégralité.
          </p>
        )}
      </ExportStatistiquesModal.Component>
    </>
  )
}
