import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import React, { PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from '@app/web/components/Dashboard/DashboardHeader.module.css'
import { getDepartementOptions } from '@app/web/data/getDepartementOptions'
import DepartementSwitcher from '@app/web/components/Dashboard/DepartementSwitcher'

const GouvernancesHeader = async ({
  departement,
  national,
}: PropsWithChildren<
  | { departement: { code: string; nom: string }; national?: undefined }
  | {
      departement?: undefined
      national: true
    }
>) => {
  const departementOptions = await getDepartementOptions()

  const currentCodeDepartement = national ? 'national' : departement.code

  return (
    <div className="fr-background-alt--blue-france fr-pt-4v fr-pb-6v fr-pb-md-14v">
      <div className="fr-container">
        <Breadcrumb
          className="fr-mb-6v fr-mt-0"
          currentPageLabel={`Gouvernance · ${national ? 'National' : departement.nom}`}
          segments={[
            {
              label: 'Page d’accueil',
              linkProps: {
                href: '/',
              },
            },
          ]}
        />
        <div
          className={classNames(
            styles.header,
            'fr-flex fr-direction-column fr-flex-gap-6v fr-direction-md-row fr-align-items-md-center fr-justify-content-space-between',
          )}
        >
          <div className="fr-mr-3w">
            <h1 className="fr-h2 fr-text-title--blue-france fr-mb-4v">
              Gouvernances de l’Inclusion Numérique dans les territoires
            </h1>
            <p className="fr-text--xl fr-mb-0">
              Retrouvez la gouvernance établie au sein d’un département, sa
              composition et ses feuilles de route.
            </p>
          </div>
          <DepartementSwitcher
            departementOptions={departementOptions}
            currentCodeDepartement={currentCodeDepartement}
            target="gouvernances"
          />
        </div>
      </div>
    </div>
  )
}

export default GouvernancesHeader
