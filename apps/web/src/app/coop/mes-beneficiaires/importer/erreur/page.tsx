import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import React from 'react'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Add a search param "message" for the error message
const ImportErreurPage = async ({
  searchParams: { message },
}: {
  searchParams: { message?: string }
}) => {
  const displayMessage =
    message ?? 'Une erreur est survenue, veuillez réessayer'

  return (
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
        currentPage="Erreur"
      />
      <h1 className="fr-h2 fr-mb-12v">TODO</h1>
      <h5>{displayMessage}</h5>
    </CoopPageContainer>
  )
}

export default ImportErreurPage
