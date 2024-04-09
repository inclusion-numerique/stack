import React, { PropsWithChildren } from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import DashboardHeader from '@app/web/components/Dashboard/DashboardHeader'
import { OptionTuples } from '@app/web/utils/options'

/**
 * Dashboard contents is passed as children
 */
const Dashboard = ({
  departementOptions,
  departement,
  national,
  children,
}: PropsWithChildren<
  {
    departementOptions: OptionTuples
  } & (
    | { departement: { code: string; nom: string }; national?: undefined }
    | {
        departement?: undefined
        national: true
      }
  )
>) => (
  <>
    <div className="fr-background-alt--blue-france fr-pt-4v fr-pb-6v fr-pb-md-14v">
      <div className="fr-container">
        <Breadcrumb
          className="fr-mb-6v fr-mt-0"
          currentPageLabel={`Données · ${national ? 'National' : departement.nom}`}
          segments={[
            {
              label: 'Page d’accueil',
              linkProps: {
                href: '/',
              },
            },
          ]}
        />
        <DashboardHeader
          currentCodeDepartement={national ? 'national' : departement.code}
          departementOptions={departementOptions}
        />
      </div>
    </div>
    <div className="fr-container">
      <h2 className="fr-h3 fr-mt-14v fr-mb-8v">
        Lieux d’inclusion numérique et aidants numériques ·{' '}
        {national ? 'National' : departement.nom}
      </h2>
      <div className="fr-mt-4v fr-pb-14v">{children}</div>
    </div>
  </>
)

export default Dashboard
