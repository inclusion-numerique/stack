import Button from '@codegouvfr/react-dsfr/Button'
import type { PropsWithChildren } from 'react'
import type { Beneficiaire } from '@prisma/client'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import BeneficiaireAjouterUneActivite from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/[beneficiaireId]/(consultation)/BeneficiaireAjouterUneActivite'
import type { BeneficiaireCraData } from '@app/web/beneficiaire/BeneficiaireValidation'
import { DeleteBeneficiaireModal } from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/[beneficiaireId]/(consultation)/DeleteBeneficiaireModal'
import DeleteBeneficiaireModalContent from '@app/web/app/coop/(sidemenu-layout)/mes-beneficiaires/[beneficiaireId]/(consultation)/DeleteBeneficiaireModalContent'
import BackButton from '@app/web/components/BackButton'
import { SessionUser } from '@app/web/auth/sessionUser'

const ViewBeneficiaireLayout = ({
  beneficiaire,
  user,
  children,
}: PropsWithChildren<{
  user: SessionUser
  beneficiaire: Pick<
    Beneficiaire,
    'id' | 'prenom' | 'nom' | 'anneeNaissance' | 'mediateurId'
  >
}>) => {
  const displayName = getBeneficiaireDisplayName(beneficiaire)
  const {
    anneeNaissance,
    id: beneficiaireId,
    nom,
    prenom,
    mediateurId,
  } = beneficiaire

  const beneficiaireCraData = {
    id: beneficiaireId,
    prenom,
    nom,
    mediateurId,
  } satisfies BeneficiaireCraData

  return (
    <CoopPageContainer size={794}>
      <CoopBreadcrumbs
        parents={[
          {
            label: 'Mes bénéficiaires',
            linkProps: { href: '/coop/mes-beneficiaires' },
          },
        ]}
        currentPage={displayName}
      />
      <BackButton href="/coop/mes-beneficiaires">
        Retour à mes bénéficiaires
      </BackButton>
      <div className="fr-mb-4v fr-width-full fr-flex fr-justify-content-space-between fr-align-items-center fr-flex-gap-8v">
        <div>
          <h1 className="fr-text-title--blue-france fr-mb-0">{displayName}</h1>
          {!!anneeNaissance && (
            <p className="fr-mb-0 fr-mt-2v">
              Année de naissance&nbsp;: {anneeNaissance}
            </p>
          )}
        </div>
        <div className="fr-flex fr-flex-gap-4v fr-flex-nowrap fr-flex-shrink-0">
          <BeneficiaireAjouterUneActivite
            user={user}
            beneficiaire={beneficiaireCraData}
            displayName={displayName}
          />
          <Button
            iconId="fr-icon-edit-line"
            priority="secondary"
            title="Modifier"
            linkProps={{
              href: `/coop/mes-beneficiaires/${beneficiaire.id}/modifier`,
            }}
          />
          <Button
            iconId="fr-icon-delete-bin-line"
            priority="secondary"
            title="Supprimer"
            type="button"
            {...DeleteBeneficiaireModal.buttonProps}
          />
        </div>
      </div>
      {children}
      <DeleteBeneficiaireModalContent
        beneficiaireId={beneficiaire.id}
        displayName={displayName}
      />
    </CoopPageContainer>
  )
}

export default ViewBeneficiaireLayout
