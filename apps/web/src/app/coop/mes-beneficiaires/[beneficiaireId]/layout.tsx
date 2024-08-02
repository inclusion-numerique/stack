import Button from '@codegouvfr/react-dsfr/Button'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { prismaClient } from '@app/web/prismaClient'
import { notFound } from 'next/navigation'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import { PropsWithChildren } from 'react'

const BeneficiairePage = async ({
  params: { beneficiaireId },
  children,
}: PropsWithChildren<{
  params: { beneficiaireId: string }
}>) => {
  const user = await getAuthenticatedMediateur()

  const beneficiaire = await prismaClient.beneficiaire.findUnique({
    where: {
      id: beneficiaireId,
      mediateurId: user.mediateur.id,
      suppression: null,
    },
    select: {
      id: true,
      prenom: true,
      nom: true,
      email: true,
      anneeNaissance: true,
    },
  })

  if (!beneficiaire) {
    notFound()
    return null
  }

  const { anneeNaissance } = beneficiaire
  const displayName = getBeneficiaireDisplayName(beneficiaire)

  return (
    <CoopPageContainer size={794} className="fr-pt-8v">
      <CoopBreadcrumbs
        parents={[
          {
            label: 'Mes bénéficiaires',
            linkProps: { href: '/coop/mes-beneficiaires' },
          },
        ]}
        currentPage={displayName}
      />
      <div className="fr-mb-4v fr-width-full fr-flex fr-justify-content-space-between fr-align-items-center fr-flex-gap-8v">
        <div>
          <h1 className="fr-text-title--blue-france fr-mb-0">{displayName}</h1>
          {!!anneeNaissance && (
            <p className="fr-mb-0 fr-mt-2v">
              Année de naissance&nbsp;: {anneeNaissance}
            </p>
          )}
        </div>
        <div className="fr-flex fr-flex-gap-4v">
          {/*TODO add cra to existing beneficiaire*/}
          <Button iconId="fr-icon-user-add-line" className="wip-outline">
            Ajouter une activité
          </Button>
          <Button
            iconId="fr-icon-edit-line"
            priority="secondary"
            className="wip-outline"
            title="Modifier"
            linkProps={{
              href: `/coop/mes-beneficiaires/${beneficiaireId}/modifier`,
            }}
          />
          {/*TODO deletion feature*/}
          <Button
            iconId="fr-icon-delete-bin-line"
            priority="secondary"
            className="wip-outline"
            title="Supprimer"
            type="button"
          />
        </div>
      </div>
      {children}
    </CoopPageContainer>
  )
}

export default BeneficiairePage
