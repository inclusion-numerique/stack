import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import DataSearchBar from '@app/web/data-table/DataSearchBar'
import { generatePageSizeSelectOptions } from '@app/web/data-table/pageSizeSelectOptions'
import PaginationNavWithPageSizeSelect from '@app/web/data-table/PaginationNavWithPageSizeSelect'
import SortSelect from '@app/web/data-table/SortSelect'
import { MonEquipePageData } from '../getMonEquipePageData'
import { MediateurList } from './MediateurList'

const pluralize = (expression: string, count: number) =>
  expression
    .split(' ')
    .map((mot) => `${mot}${sPluriel(count)}`)
    .join(' ')

const pageSizeOptions = generatePageSizeSelectOptions([10, 20, 50, 100])

const MonEquipeListePage = ({
  mediateurs,
  searchParams,
  totalPages,
  stats: { total, conseillerNumerique, mediateurNumerique },
}: MonEquipePageData & {
  searchParams: { lignes?: string; page?: string; recherche?: string }
  totalPages: number
}) => (
  <>
    <SkipLinksPortal links={defaultSkipLinks} />
    <div className="fr-container fr-container--800">
      <CoopBreadcrumbs currentPage="Mon équipe" />
      <main id={contentId} className="fr-mb-16w">
        <div className="fr-flex fr-flex-wrap fr-direction-row fr-align-items-center fr-flex-gap-4v fr-my-12v">
          <span
            className="ri-group-2-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-alt--blue-france fr-p-2w fr-m-0 fr-border-radius--8"
            aria-hidden
          />
          <h1 className="fr-page-title fr-m-0">Mon équipe · {total}</h1>
        </div>
        <div className="fr-border--top fr-border--bottom fr-py-3w fr-mb-5w">
          <DataSearchBar
            baseHref="/coop/mon-equipe"
            searchParams={searchParams}
            placeholder="Rechercher par nom ou adresse e-mail"
          />
        </div>
        <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-mb-2w">
          <p className="fr-text--lg fr-text--bold fr-flex fr-flex-gap-2v fr-direction-column fr-direction-sm-row fr-mb-0">
            <span>
              {conseillerNumerique}{' '}
              {pluralize('conseiller numérique', conseillerNumerique)}
            </span>
            <span className="fr-hidden fr-unhidden-sm">·</span>
            <span>
              {mediateurNumerique}{' '}
              {pluralize('médiateur numérique', mediateurNumerique)}
            </span>
          </p>
          <SortSelect
            options={[
              { label: 'Ordre alphabétique', value: 'alphabetique' },
              { label: 'Les plus récents', value: 'recent' },
              { label: 'Les plus anciens', value: 'ancien' },
            ]}
            baseHref="/coop/mon-equipe"
          />
        </div>
        <MediateurList mediateurs={mediateurs} />
        <PaginationNavWithPageSizeSelect
          className="fr-mt-5w"
          defaultPageSize={10}
          pageSizeOptions={pageSizeOptions}
          totalPages={totalPages}
          baseHref="/coop/mon-equipe"
          searchParams={searchParams}
        />
      </main>
    </div>
  </>
)

export default MonEquipeListePage
