import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound } from 'next/navigation'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { getDemandesSubventionsForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { generateDepartementMetadata } from '@app/web/app/(with-navigation)/gouvernances/departements/generateDepartementMetadata'
import {
  gouvernanceDemandesDeSubventionPath,
  gouvernanceHomePath,
} from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { canEditGouvernance } from '@app/web/security/securityRules'
import BackLink from '@app/web/components/BackLink'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'
import RedAsterisk from '@app/web/ui/RedAsterisk'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { limiteModicitaionDesDemandesDeSubvention } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/gouvernanceMetadata'
import DemandeDeSubventionForm from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/[demandeDeSubventionId]/DemandeDeSubventionForm'
import { getDemandesDeSubventionsForGouvernance } from '@app/web/gouvernance/gouvernanceStatus'
import { getDemandesDeSubventionDefaultValues } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getDemandesDeSubventionDefaultValues'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement, gouvernanceId, demandeDeSubventionId },
}: {
  params: {
    codeDepartement: string
    gouvernanceId: string
    demandeDeSubventionId: string
  }
}) => {
  const accessCheck = await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({ scope: { codeDepartement }, user }),
    signinNextPath: `/gouvernances/departements/${codeDepartement}/gouvernance/${gouvernanceId}/demandes-de-subvention`,
  })
  if (
    !canEditGouvernance(accessCheck.user, {
      departementCode: codeDepartement,
    })
  ) {
    notFound()
  }

  const gouvernance = await getDemandesSubventionsForForm({
    gouvernanceId,
  })

  if (!gouvernance) {
    notFound()
  }
  if (gouvernance.departement.code !== codeDepartement) {
    notFound()
  }

  // Check if demande de subvention belongs to this gouvernance.
  const demandesDeSubventions =
    getDemandesDeSubventionsForGouvernance(gouvernance)

  // Get the one we want to edit
  const demandeDeSubvention = demandesDeSubventions.find(
    ({ id }) => id === demandeDeSubventionId,
  )
  if (!demandeDeSubvention) {
    notFound()
  }

  const defaultValues =
    getDemandesDeSubventionDefaultValues(demandeDeSubvention)

  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  return (
    <>
      <div className="fr-container">
        <Breadcrumb
          currentPageLabel="Demandes de subvention"
          segments={[
            {
              label: "Page d'accueil",
              linkProps: {
                href: '/',
              },
            },
            {
              label: `Gouvernance - ${scopeTitle}`,
              linkProps: {
                href: gouvernanceHomePath({ codeDepartement }),
              },
            },
          ]}
        />
      </div>
      <div className="fr-container fr-container--narrow fr-pb-10v fr-mb-20v">
        <BackLink
          href={gouvernanceDemandesDeSubventionPath(
            { codeDepartement },
            gouvernance.id,
          )}
          label={`Retour à mes actions & demandes de subventions · ${scopeTitle}`}
        />

        <h1 className="fr-text-title--blue-france fr-mt-6v fr-mb-2v">
          Formulaire de demande de subvention
        </h1>
        <p className="fr-text--sm fr-hint-text fr-my-2v">
          Les champs avec <RedAsterisk /> sont obligatoires
        </p>
        <Notice
          className="fr-mt-6v fr-mb-12v"
          title={
            <span>
              Proposition modifiable jusqu’au{' '}
              <strong>
                {dateAsDay(limiteModicitaionDesDemandesDeSubvention)}
              </strong>
            </span>
          }
        />
        <DemandeDeSubventionForm defaultValues={defaultValues} />
      </div>
    </>
  )
}

export default Page
