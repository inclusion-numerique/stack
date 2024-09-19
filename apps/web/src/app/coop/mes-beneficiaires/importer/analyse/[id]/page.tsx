import React from 'react'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import ImportBeneficiairesAnalyseContent from '@app/web/app/coop/mes-beneficiaires/importer/analyse/[id]/ImportBeneficiairesAnalyseContent'
import BackButton from '@app/web/components/BackButton'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const AnalysePage = ({ params: { id } }: { params: { id: string } }) => (
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
    <BackButton href="/coop/mes-beneficiaires/importer">
      Retour à l’import
    </BackButton>
    <h1 className="fr-h2 fr-text-title--blue-france fr-mb-2v">
      Analyse du fichier à importer
    </h1>
    <p className="fr-text-mention--grey fr-mb-12v">
      Veuillez vérifier que la liste des bénéficiaires analysée correspond bien
      à votre fichier.
    </p>
    <ImportBeneficiairesAnalyseContent analysisId={id} />
  </CoopPageContainer>
)

export default AnalysePage
