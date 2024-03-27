import React from 'react'
import { AdministrationDemandesDeSubventionsSearchParams } from '@app/web/app/(with-navigation)/administration/demandes-de-subvention/getAdministrationDemandesDeSubventionsList'
import AdmininstrationDataPage from '@app/web/app/(with-navigation)/administration/AdmininstrationDataPage'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams,
}: {
  searchParams: AdministrationDemandesDeSubventionsSearchParams
}) => (
  <AdmininstrationDataPage
    title="Bénéficiaires subventions"
    infoContents={
      <ul className="fr-m-0 fr-text--sm">
        <li>Todo</li>
      </ul>
    }
  />
)

export default Page
