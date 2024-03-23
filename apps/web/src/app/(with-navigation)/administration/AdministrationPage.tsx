import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import Badge from '@codegouvfr/react-dsfr/Badge'
import classNames from 'classnames'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import DepartementSwitcher from '@app/web/components/Dashboard/DepartementSwitcher'
import { OptionTuples } from '@app/web/utils/options'
import { getDepartementsAdministrationInfo } from '@app/web/app/(with-navigation)/administration/getDepartementsAdministrationInfo'
import {
  detailGouvernancePath,
  gouvernanceDemandesDeSubventionPath,
} from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { numberToString } from '@app/web/utils/formatNumber'
import { getDemandesDeSubventionsForGouvernance } from '@app/web/gouvernance/gouvernanceStatus'
import styles from './Administration.module.css'

export const generateMetadata = () => ({
  title: `Administration`,
})

export const dynamic = 'force-dynamic'
export const revalidate = 0

const metabaseDashboardUrl =
  'https://metabase.inclusion-numerique.anct.gouv.fr/public/dashboard/38891b8c-dc4e-4e56-a42c-af27865722e4'

const AdministrationPage = async ({
  codeDepartement,
  departementOptions,
}: {
  codeDepartement?: string
  departementOptions: OptionTuples
}) => {
  const departements = await getDepartementsAdministrationInfo({
    codeDepartement,
  })

  return (
    <div className="fr-width-full">
      <div
        className={classNames(
          'fr-container fr-flex fr-direction-column',
          styles.pageContainer,
        )}
      >
        <Breadcrumb
          currentPageLabel="Administration"
          segments={[
            {
              label: "Page d'accueil",
              linkProps: {
                href: '/',
              },
            },
          ]}
        />
        <div className="fr-flex fr-justify-content-space-between fr-flex-gap-4v fr-pb-12v">
          <div>
            <h1 className="fr-mb-2v fr-text-title--blue-france">
              Administration
            </h1>
            <Link
              href={metabaseDashboardUrl}
              className="fr-link fr-no-after"
              target="_blank"
            >
              Voir le Metabase
            </Link>
          </div>
          <DepartementSwitcher
            noPadding
            label="Filtrer par département"
            departementOptions={departementOptions}
            currentCodeDepartement={codeDepartement}
            target="administration"
          />
        </div>
      </div>
      <div className="fr-container">
        <div className="fr-table" data-fr-js-table="true">
          <table className="data-table" data-fr-js-table-element="true">
            <thead>
              <tr>
                <th scope="col">Département</th>
                <th scope="col">Membres gouvernance</th>
                <th scope="col">Demandes de subvention</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th scope="col" />
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {departements.map((departement) => {
                const { code, nom, gouvernancesRemontees } = departement
                const gouvernance = gouvernancesRemontees[0]
                const demandesSubvention = gouvernance
                  ? getDemandesDeSubventionsForGouvernance(gouvernance)
                  : []

                console.log('DEPARTEMETN', departement)

                const demandesEnCours = demandesSubvention.filter(
                  ({ valideeEtEnvoyee }) => !valideeEtEnvoyee,
                ).length
                const aInstruire = demandesSubvention.filter(
                  ({ valideeEtEnvoyee, acceptee }) =>
                    !!valideeEtEnvoyee && !acceptee,
                ).length
                const validees = demandesSubvention.filter(
                  ({ acceptee }) => !!acceptee,
                ).length

                return (
                  <tr key={code}>
                    <th>
                      {code}&nbsp;·&nbsp;{nom}
                    </th>
                    <td>
                      {gouvernance ? (
                        numberToString(gouvernance._count.membres)
                      ) : (
                        <Badge small severity="warning">
                          Aucune&nbsp;gouvernance&nbsp;remontée
                        </Badge>
                      )}
                    </td>
                    <td>
                      <span className="fr-text--bold">
                        {numberToString(demandesSubvention.length)}
                      </span>
                      {demandesEnCours > 0 && (
                        <Badge small severity="info" className="fr-ml-1w">
                          {numberToString(demandesEnCours)} en cours
                        </Badge>
                      )}
                      {aInstruire > 0 && (
                        <Badge small severity="new" className="fr-ml-1w">
                          {numberToString(aInstruire)} à instruire
                        </Badge>
                      )}
                      {validees > 0 && (
                        <Badge small severity="success" className="fr-ml-1w">
                          {numberToString(validees)} validée{sPluriel(validees)}
                        </Badge>
                      )}
                    </td>
                    <td>
                      {!!gouvernance && (
                        <Button
                          size="small"
                          priority="secondary"
                          iconId="fr-icon-eye-line"
                          linkProps={{
                            href: detailGouvernancePath(
                              { codeDepartement: code },
                              gouvernance.id,
                            ),
                          }}
                        >
                          Gouvernance
                        </Button>
                      )}
                    </td>
                    <td>
                      {!!gouvernance && (
                        <Button
                          size="small"
                          priority="secondary"
                          iconId="fr-icon-eye-line"
                          linkProps={{
                            href: gouvernanceDemandesDeSubventionPath(
                              { codeDepartement: code },
                              gouvernance.id,
                            ),
                          }}
                        >
                          Demandes&nbsp;de&nbsp;subvention
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdministrationPage
