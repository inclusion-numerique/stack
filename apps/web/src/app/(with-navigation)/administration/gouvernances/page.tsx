import React from 'react'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Link from 'next/link'
import GouvernancesDataFilters from '@app/web/app/(with-navigation)/administration/gouvernances/GouvernancesDataFilters'
import {
  AdministrationGouvernanceListSearchParams,
  getAdministrationGouvernancesList,
} from '@app/web/app/(with-navigation)/administration/gouvernances/getAdministrationGouvernancesList'
import AdmininstrationDataPage from '@app/web/app/(with-navigation)/administration/AdmininstrationDataPage'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import {
  detailGouvernancePath,
  gouvernanceHomePath,
} from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { numberToString } from '@app/web/utils/formatNumber'
import SortLink from '@app/web/app/(with-navigation)/administration/SortLink'
import { createSortLinkProps } from '@app/web/app/(with-navigation)/administration/createSortLinkProps'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams,
}: {
  searchParams: AdministrationGouvernanceListSearchParams
}) => {
  const { data, gouvernanceCounts, besoinsCounts, subventionsCount, csvData } =
    await getAdministrationGouvernancesList(searchParams)

  const sortLinkProps = (
    sortParams: AdministrationGouvernanceListSearchParams,
    isDefault = false,
  ) =>
    createSortLinkProps({
      searchParams,
      sortParams,
      isDefault,
      baseHref: '/administration/gouvernances',
    })

  return (
    <AdmininstrationDataPage
      title="Gouvernances"
      filters={<GouvernancesDataFilters searchParams={searchParams} />}
      csvData={csvData}
      resultCount={data.length}
      infoContents={
        <ul className="fr-m-0 fr-text--sm">
          <li>
            <b>{gouvernanceCounts.completed}</b>/{data.length} gouvernances
            complétées
          </li>
          <li>
            <b>{besoinsCounts.completed}</b>/{data.length} besoins en ingénierie
            financière complétés
          </li>
          <li>
            <b>{subventionsCount.completed}</b>/{data.length} demandes de
            subventions complétées
          </li>
        </ul>
      }
      table={
        <table className="data-table" data-fr-js-table-element="true">
          <thead>
            <tr>
              <th scope="col">
                Département
                <SortLink
                  {...sortLinkProps(
                    {
                      tri: 'departement',
                    },
                    true,
                  )}
                />
              </th>
              <th scope="col">
                Gouvernance
                <SortLink
                  {...sortLinkProps({
                    tri: 'gouvernance',
                  })}
                />
              </th>
              <th scope="col">
                Besoins en ingénierie financière
                <SortLink
                  {...sortLinkProps({
                    tri: 'besoins',
                  })}
                />
              </th>
              <th scope="col">
                Demandes de subventions
                <SortLink
                  {...sortLinkProps({
                    tri: 'subventions',
                  })}
                />
              </th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({
                departement: { code, nom },
                gouvernance,
                besoinsIngenierieCompletedDate,
                demandesSubvention,
                areDemandesCompleted,
              }) => (
                <tr key={code}>
                  <th>
                    {code}&nbsp;·&nbsp;{nom}
                  </th>
                  <td>
                    {gouvernance ? (
                      <>
                        <Badge small severity="success">
                          Complétée le {dateAsDay(gouvernance.v2Enregistree)}
                        </Badge>
                        <Link
                          className="fr-link fr-link--xs fr-ml-1v"
                          href={detailGouvernancePath(
                            { codeDepartement: code },
                            gouvernance.id,
                          )}
                        >
                          Détail{' '}
                          <span className="fr-icon-arrow-right-line fr-icon--xs" />
                        </Link>
                      </>
                    ) : (
                      <Badge small severity="warning">
                        Aucune&nbsp;gouvernance&nbsp;remontée
                      </Badge>
                    )}
                  </td>
                  <td>
                    {besoinsIngenierieCompletedDate ? (
                      <Badge small severity="success">
                        Complétés le {dateAsDay(besoinsIngenierieCompletedDate)}
                      </Badge>
                    ) : (
                      <Badge small severity="warning">
                        Aucun&nbsp;besoin&nbsp;remonté
                      </Badge>
                    )}
                  </td>
                  <td>
                    {demandesSubvention.length === 0 ? (
                      <Badge small severity="warning">
                        Aucune
                      </Badge>
                    ) : areDemandesCompleted ? (
                      <Badge small severity="success">
                        Complétées ({numberToString(demandesSubvention.length)})
                      </Badge>
                    ) : (
                      <Badge small severity="info">
                        En cours ({numberToString(demandesSubvention.length)})
                      </Badge>
                    )}
                  </td>
                  <td>
                    <Link
                      className="fr-link fr-link--xs fr-ml-1v"
                      href={gouvernanceHomePath({ codeDepartement: code })}
                      target="_blank"
                    >
                      Vue préfecture
                    </Link>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      }
    />
  )
}

export default Page
