import React, { ReactNode } from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import DownloadCsvDataButton from '@app/web/app/(with-navigation)/administration/DownloadCsvDataButton'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { numberToString } from '@app/web/utils/formatNumber'

const AdmininstrationDataPage = ({
  title,
  filters,
  infoContents,
  table,
  csvData,
  resultCount,
}: {
  title: ReactNode
  filters?: ReactNode
  infoContents?: ReactNode
  table?: ReactNode
  csvData?: string
  resultCount?: number
}) => (
  <div className="fr-width-full">
    <Breadcrumb
      className="fr-mb-4v"
      currentPageLabel={title}
      segments={[
        {
          label: 'Page d’accueil',
          linkProps: {
            href: '/',
          },
        },
        {
          label: 'Administration',
          linkProps: {
            href: '/administration',
          },
        },
      ]}
    />
    <h1 className="fr-h2 fr-text-title--blue-france fr-mb-8v">{title}</h1>
    {filters}
    <div className="fr-flex fr-justify-content-space-between fr-align-items-start fr-flex-gap-4v fr-text--sm fr-mt-8v fr-mb-4v">
      <div>{infoContents}</div>
      <div>
        {resultCount !== undefined && (
          <p className="fr-mb-1v fr-text--sm fr-text--bold fr-text--right">
            {resultCount ? numberToString(resultCount) : 'Aucun'} résultat
            {sPluriel(resultCount)}
          </p>
        )}
        {!!csvData && (
          <DownloadCsvDataButton
            title={`fne-${dateAsIsoDay(new Date())}-gouvernances`}
            data={csvData}
          />
        )}
      </div>
    </div>
    <div className="fr-table fr-table--nowrap" data-fr-js-table="true">
      {table}
    </div>
  </div>
)

export default AdmininstrationDataPage
