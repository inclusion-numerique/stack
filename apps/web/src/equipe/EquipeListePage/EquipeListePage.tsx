import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { EquipeVide } from '@app/web/app/coop/EquipeVide'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import DataSearchBar from '@app/web/data-table/DataSearchBar'
import PaginationNavWithPageSizeSelect from '@app/web/data-table/PaginationNavWithPageSizeSelect'
import SortSelect from '@app/web/data-table/SortSelect'
import { generatePageSizeSelectOptions } from '@app/web/data-table/pageSizeSelectOptions'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import React from 'react'
import LeaveTeamButton from './LeaveTeamButton'
import { MediateurList } from './MediateurList'
import { MonEquipePageData } from './getEquipePageData'

const pluralize = (expression: string, count: number) =>
  expression
    .split(' ')
    .map((mot) => `${mot}${sPluriel(count)}`)
    .join(' ')

const pageSizeOptions = generatePageSizeSelectOptions([10, 20, 50, 100])

const EquipeListePage = ({
  mediateurs,
  anciensMembres = false,
  searchParams,
  totalPages,
  baseHref,
  baseHrefSearch,
  coordinateur: {
    id: coordinateurId,
    user: { name, email, phone },
  },
  coordinateurView = true,
  stats: { total, totalAncien, conseillersNumeriques, mediateursNumeriques },
}: MonEquipePageData & {
  anciensMembres?: boolean
  searchParams: { lignes?: string; page?: string; recherche?: string }
  totalPages: number
  baseHref: string
  baseHrefSearch: string
  coordinateur: {
    id: string
    user: { name: string | null; email: string | null; phone: string | null }
  }
  coordinateurView?: boolean
}) => (
  <>
    <SkipLinksPortal links={defaultSkipLinks} />
    <div className="fr-container fr-container--800">
      <CoopBreadcrumbs currentPage="Mon équipe" />
      <main id={contentId} className="fr-mb-16w">
        <div className="fr-flex fr-align-items-center fr-justify-content-space-between fr-mt-12v fr-mb-6v">
          <span className="fr-flex fr-flex-wrap fr-direction-row fr-align-items-center fr-flex-gap-4v">
            <span
              className="ri-group-2-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-alt--blue-france fr-p-2w fr-m-0 fr-border-radius--8"
              aria-hidden
            />
            <h1 className="fr-page-title fr-m-0">Mon équipe · {total}</h1>
          </span>
          {coordinateurView ? (
            <span>
              <Button
                linkProps={{
                  href: `${baseHref}/inviter`,
                }}
                iconId="fr-icon-user-add-line"
              >
                Inviter des membres
              </Button>
            </span>
          ) : (
            <span>
              <LeaveTeamButton coordinateurId={coordinateurId} />
            </span>
          )}
        </div>
        <div>
          Équipe coordonnée par <span className="fr-text--bold">{name}</span>
          <div className="fr-flex fr-text-mention--grey fr-text--sm fr-mb-0 fr-flex-gap-2v">
            <span>
              <span className="ri-mail-line fr-mr-2v" aria-hidden />
              {email}
            </span>
            {phone && (
              <>
                <span className="fr-hidden fr-unhidden-md" aria-hidden>
                  ·
                </span>
                <span>
                  <span className="ri-phone-line fr-mr-2v" aria-hidden />
                  {phone}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="fr-my-12v">
          <DataSearchBar
            baseHref={baseHrefSearch}
            searchParams={searchParams}
            placeholder="Rechercher par nom ou adresse e-mail"
          />
        </div>
        {total === 0 && mediateurs?.length === 0 && <EquipeVide />}
        {(total !== 0 ||
          totalAncien !== 0 ||
          (!!mediateurs && mediateurs.length > 0)) && (
          <>
            <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-mb-4w">
              {totalAncien === 0 && (
                <p className="fr-text--lg fr-text--bold fr-flex fr-flex-gap-2v fr-direction-column fr-direction-sm-row fr-mb-0">
                  <span>
                    {conseillersNumeriques}{' '}
                    {pluralize('conseiller numérique', conseillersNumeriques)}
                  </span>
                  <span className="fr-hidden fr-unhidden-sm">·</span>
                  <span>
                    {mediateursNumeriques}{' '}
                    {pluralize('médiateur numérique', mediateursNumeriques)}
                  </span>
                </p>
              )}
              <SortSelect
                options={[
                  { label: 'Ordre alphabétique', value: 'alphabetique' },
                  { label: 'Les plus récents', value: 'recent' },
                  { label: 'Les plus anciens', value: 'ancien' },
                ]}
                baseHref={baseHrefSearch}
              />
            </div>

            {totalAncien === 0 ? (
              <MediateurList mediateurs={mediateurs} baseHref={baseHref} />
            ) : (
              <div className="fr-tabs">
                <ul className="fr-tabs__list">
                  <li role="presentation">
                    <Link
                      href={baseHref}
                      className="fr-tabs__tab"
                      aria-selected={!anciensMembres}
                    >
                      Membres · {total}
                    </Link>
                  </li>
                  <li role="presentation">
                    <Link
                      href={`${baseHref}/anciens-membres`}
                      className="fr-tabs__tab"
                      aria-selected={anciensMembres}
                    >
                      Anciens membres · {totalAncien}
                    </Link>
                  </li>
                </ul>
                <div
                  className="fr-tabs__panel fr-tabs__panel--selected fr-p-0"
                  style={{ marginTop: '-1px' }}
                >
                  <MediateurList mediateurs={mediateurs} baseHref={baseHref} />
                </div>
              </div>
            )}
          </>
        )}
        <PaginationNavWithPageSizeSelect
          className="fr-mt-12v"
          defaultPageSize={10}
          pageSizeOptions={pageSizeOptions}
          totalPages={totalPages}
          baseHref={baseHrefSearch}
          searchParams={searchParams}
        />
      </main>
    </div>
  </>
)

export default EquipeListePage
