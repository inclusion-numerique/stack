import React from 'react'
import AdministrationDataPage from '@app/web/app/(with-navigation)/administration/AdministrationDataPage'
import { AdministrationGouvernancesSearchParams } from '@app/web/app/(with-navigation)/administration/gouvernances/getAdministrationGouvernances'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams,
}: {
  searchParams: AdministrationGouvernancesSearchParams
}) => (
  <AdministrationDataPage
    title="Bénéficiaires subventions"
    infoContents={
      <ul className="fr-m-0 fr-text--sm">
        <li>Todo</li>
      </ul>
    }
  />
)

export default Page
