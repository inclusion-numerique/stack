import React from 'react'
import { AdministrationGouvernanceListSearchParams } from '@app/web/app/(with-navigation)/administration/gouvernances/getAdministrationGouvernancesList'
import AdmininstrationDataPage from '@app/web/app/(with-navigation)/administration/AdmininstrationDataPage'
import { numberToEuros, numberToString } from '@app/web/utils/formatNumber'
import SortLink from '@app/web/app/(with-navigation)/administration/SortLink'
import { createSortLinkProps } from '@app/web/app/(with-navigation)/administration/createSortLinkProps'
import {
  AdministrationBesoinsSubventionsListSearchParams,
  getAdministrationBesoinsSubventions,
} from '@app/web/app/(with-navigation)/administration/besoins-subventions/getAdministrationBesoinsSubventions'
import BesoinsSubventionsDataFilters from '@app/web/app/(with-navigation)/administration/besoins-subventions/BesoinsSubventionsDataFilters'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams,
}: {
  searchParams: AdministrationBesoinsSubventionsListSearchParams
}) => {
  const { data, categories, csvData } =
    await getAdministrationBesoinsSubventions(searchParams)

  console.log('CATEGORIES', categories)

  const sortLinkProps = (
    sortParams: AdministrationGouvernanceListSearchParams,
    isDefault = false,
  ) =>
    createSortLinkProps({
      searchParams,
      sortParams,
      isDefault,
      baseHref: '/administration/besoins-subventions',
    })

  return (
    <AdmininstrationDataPage
      title="Subventions demandées par besoin"
      filters={<BesoinsSubventionsDataFilters searchParams={searchParams} />}
      csvData={csvData}
      resultCount={data.length}
      infoContents={
        <ul className="fr-m-0 fr-text--sm">
          {categories.map(({ label, actions, montant }) => (
            <li key={label}>
              {label}&nbsp;:&nbsp;
              <b>
                {numberToEuros(montant)} pour {actions} actions
              </b>
            </li>
          ))}
        </ul>
      }
      table={
        <table className="data-table" data-fr-js-table-element="true">
          <thead>
            <tr>
              <th scope="col">
                Besoin
                <SortLink
                  {...sortLinkProps(
                    {
                      tri: 'besoin',
                    },
                    true,
                  )}
                />
              </th>
              <th scope="col">
                Catégorie
                <SortLink
                  {...sortLinkProps({
                    tri: 'categorie',
                  })}
                />
              </th>
              <th scope="col">
                Montant demandé
                <SortLink
                  {...sortLinkProps({
                    tri: 'montant',
                  })}
                />
              </th>
              <th scope="col">
                Actions
                <SortLink
                  {...sortLinkProps({
                    tri: 'actions',
                  })}
                />
              </th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {data.map(({ actions, label, montant, categorie }) => (
              <tr key={label}>
                <th>{label}</th>
                <td>{categorie}</td>
                <td className="fr-text--right">
                  {montant.gt(0) ? numberToEuros(montant) : null}
                </td>
                <td className="fr-text--right">
                  {actions ? numberToString(actions) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    />
  )
}

export default Page
