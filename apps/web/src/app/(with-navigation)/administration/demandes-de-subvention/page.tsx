import React from 'react'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Link from 'next/link'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { numberToEuros } from '@app/web/utils/formatNumber'
import { detailGouvernancePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import DemandesDeSubventionDataFilters from '@app/web/app/(with-navigation)/administration/demandes-de-subvention/DemandesDeSubventionDataFilters'
import {
  AdministrationDemandesDeSubventionsSearchParams,
  getAdministrationDemandesDeSubventionsList,
} from '@app/web/app/(with-navigation)/administration/demandes-de-subvention/getAdministrationDemandesDeSubventionsList'
import { createSortLinkProps } from '@app/web/app/(with-navigation)/administration/createSortLinkProps'
import AdmininstrationDataPage from '@app/web/app/(with-navigation)/administration/AdmininstrationDataPage'
import SortLink from '@app/web/app/(with-navigation)/administration/SortLink'
import { getServerUrl } from '@app/web/utils/baseUrl'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams,
}: {
  searchParams: AdministrationDemandesDeSubventionsSearchParams
}) => {
  const { data, csvData, demandesCounts, montantDemandeTotal, dotationTotale } =
    await getAdministrationDemandesDeSubventionsList(searchParams)

  const sortLinkProps = (
    sortParams: AdministrationDemandesDeSubventionsSearchParams,
    isDefault = false,
  ) =>
    createSortLinkProps({
      searchParams,
      sortParams,
      isDefault,
      baseHref: '/administration/demandes-de-subvention',
    })
  return (
    <AdmininstrationDataPage
      title="Demandes de subvention"
      filters={<DemandesDeSubventionDataFilters searchParams={searchParams} />}
      csvData={csvData}
      resultCount={data.length}
      infoContents={
        <ul className="fr-m-0 fr-text--sm">
          <li>
            Dotation totale&nbsp;:&nbsp;<b>{numberToEuros(dotationTotale)}</b>
          </li>
          <li>
            Montant total des demandes&nbsp;:&nbsp;
            <b>{numberToEuros(montantDemandeTotal)}</b>
          </li>
          <li>
            <b>{demandesCounts.total}</b> demandes de subventions (
            {demandesCounts.enCours} en cours, {demandesCounts.aInstruire} à
            instruire, {demandesCounts.validees} validée
            {sPluriel(demandesCounts.validees)})
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
                Membres
                <SortLink
                  {...sortLinkProps({
                    tri: 'membres',
                  })}
                />
              </th>
              <th scope="col">
                Statut
                <SortLink
                  {...sortLinkProps({
                    tri: 'statut',
                  })}
                />
              </th>
              <th scope="col">
                Dotation
                <SortLink
                  {...sortLinkProps({
                    tri: 'dotation',
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
                Demandes de subvention
                <SortLink
                  {...sortLinkProps({
                    tri: 'demandes',
                  })}
                />
              </th>
              <th scope="col">
                En cours
                <SortLink
                  {...sortLinkProps({
                    tri: 'en-cours',
                  })}
                />
              </th>
              <th scope="col">
                À instruire
                <SortLink
                  {...sortLinkProps({
                    tri: 'a-instruire',
                  })}
                />
              </th>
              <th scope="col">
                Validées
                <SortLink
                  {...sortLinkProps({
                    tri: 'validees',
                  })}
                />
              </th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th scope="col" />
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({
                departement: { code, nom, dotation202406 },
                gouvernance,
                demandesSubvention,
                areDemandesCompleted,
                membres,
                montantDemande,
                demandesCounts: { enCours, aInstruire, validees, total },
              }) => (
                <tr key={code}>
                  <th>
                    {code}&nbsp;·&nbsp;{nom}
                  </th>
                  <td>
                    {membres || (
                      <Badge small severity="warning">
                        Aucune&nbsp;gouvernance&nbsp;remontée
                      </Badge>
                    )}
                  </td>
                  <td>
                    {demandesSubvention.length === 0 ? (
                      <Badge small severity="warning">
                        Aucune demande
                      </Badge>
                    ) : areDemandesCompleted ? (
                      <Badge small severity="success">
                        Finalisées
                      </Badge>
                    ) : (
                      <Badge small severity="info">
                        En cours
                      </Badge>
                    )}
                  </td>
                  <td className="fr-text--right">
                    {numberToEuros(dotation202406)}
                  </td>
                  <td className="fr-text--right">
                    {montantDemande ? numberToEuros(montantDemande) : null}
                  </td>
                  <td>{total || null}</td>
                  <td>
                    {enCours ? (
                      <Badge small severity="info" noIcon>
                        {enCours}
                      </Badge>
                    ) : null}
                  </td>
                  <td>
                    {aInstruire ? (
                      <Badge small severity="new" noIcon>
                        {aInstruire}
                      </Badge>
                    ) : null}
                  </td>
                  <td>
                    {validees ? (
                      <Badge small severity="success" noIcon>
                        {validees}
                      </Badge>
                    ) : null}
                  </td>
                  <td>
                    <Link
                      className="fr-link fr-link--xs fr-ml-1v"
                      href={`/administration/demandes-de-subvention/${code}`}
                      target="_blank"
                    >
                      Instruire les demandes
                    </Link>
                  </td>
                  <td>
                    {gouvernance ? (
                      <Link
                        className="fr-link fr-link--xs fr-ml-1v"
                        href={getServerUrl(
                          detailGouvernancePath(
                            { codeDepartement: code },
                            gouvernance.id,
                          ),
                        )}
                        target="_blank"
                      >
                        Voir la gouvernance
                      </Link>
                    ) : null}
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
