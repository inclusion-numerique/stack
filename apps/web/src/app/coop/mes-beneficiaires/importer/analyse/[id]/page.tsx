import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import React from 'react'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import ImportBeneficiairesAnalyseContent from '@app/web/app/coop/mes-beneficiaires/importer/analyse/[id]/ImportBeneficiairesAnalyseContent'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const AnalysePage = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await getAuthenticatedMediateur()

  return (
    <>
      <CoopPageContainer size={794} className="fr-pt-8v">
        <CoopBreadcrumbs
          parents={[
            {
              label: `Mes bénéficiaires`,
              linkProps: { href: '/coop/mes-beneficiaires' },
            },
            {
              label: `Importer des bénéficiaires`,
              linkProps: { href: '/coop/mes-beneficiaires/importer' },
            },
          ]}
          currentPage="Analyse"
        />
        <h1 className="fr-h2 fr-mb-12v">TODO</h1>
        <ImportBeneficiairesAnalyseContent analysisId={id} />
      </CoopPageContainer>
    </>
  )
}

export default AnalysePage
