import { notFound } from 'next/navigation'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import React from 'react'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import { checkAccessControl } from '@app/web/app/checkAccessControl'
import { checkGouvernanceScopeWriteAccess } from '@app/web/app/(with-navigation)/gouvernances/checkGouvernanceScopeWriteAccess'
import {
  gouvernanceDemandesDeSubventionPath,
  gouvernanceHomePath,
} from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import { canEditGouvernance } from '@app/web/security/securityRules'
import { getDemandesSubventionsForForm } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import {
  getDemandesDeSubventionsForGouvernance,
  getMontantDotationRestante,
} from '@app/web/gouvernance/gouvernanceStatus'
import { getDemandesDeSubventionDefaultValues } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getDemandesDeSubventionDefaultValues'
import { getGouvernanceScopeTitle } from '@app/web/app/(with-navigation)/gouvernances/gouvernanceScopeTitle'
import { prismaClient } from '@app/web/prismaClient'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getSubventionBeneficiairesOptions } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getSubventionBeneficiairesOptions'

export const getDemandesDeSubventionFormContext = async ({
  demandeDeSubventionId,
  codeDepartement,
  gouvernanceId,
}: {
  codeDepartement: string
  gouvernanceId: string
  // Null for creation, id for update
  demandeDeSubventionId: string | null
}) => {
  const sessionUser = await getSessionUser()
  const accessCheck = await checkAccessControl({
    check: (user) =>
      checkGouvernanceScopeWriteAccess({ scope: { codeDepartement }, user }),
    signinNextPath: gouvernanceDemandesDeSubventionPath(
      { codeDepartement },
      gouvernanceId,
    ),
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

  let defaultValues = getDemandesDeSubventionDefaultValues()
  let currentPageLabel = 'Ajouter'

  const montantDotationRestante = getMontantDotationRestante(gouvernance)
  let montantDotationRestantePourDemandeDeSubvention =
    montantDotationRestante.montantRestant

  let demandeDeSubvention

  if (demandeDeSubventionId) {
    // Check if demande de subvention belongs to this gouvernance.
    const demandesDeSubventions =
      getDemandesDeSubventionsForGouvernance(gouvernance)

    // Get the one we want to edit
    demandeDeSubvention = demandesDeSubventions.find(
      ({ id }) => id === demandeDeSubventionId,
    )
    if (!demandeDeSubvention) {
      notFound()
    }

    if (
      demandeDeSubvention.valideeEtEnvoyee &&
      sessionUser?.role !== 'Administrator'
    ) {
      notFound()
    }
    // Do not take into account the subventionDemandee for an update
    montantDotationRestantePourDemandeDeSubvention =
      montantDotationRestantePourDemandeDeSubvention.add(
        demandeDeSubvention.subventionDemandee,
      )
    defaultValues = getDemandesDeSubventionDefaultValues(demandeDeSubvention)
    currentPageLabel = demandeDeSubvention.nomAction
  }

  const scopeTitle = await getGouvernanceScopeTitle({ codeDepartement })

  const feuillesDeRouteOptions = await prismaClient.feuilleDeRoute
    .findMany({
      where: {
        gouvernanceId,
      },
      orderBy: {
        nom: 'asc',
      },
      select: {
        id: true,
        nom: true,
      },
    })
    .then((feuillesDeRoute) =>
      feuillesDeRoute.map(
        ({ nom, id }) => ({ name: nom, value: id }) satisfies SelectOption,
      ),
    )

  const backUrl = gouvernanceDemandesDeSubventionPath(
    { codeDepartement },
    gouvernanceId,
  )

  const beneficiairesOptions = await getSubventionBeneficiairesOptions({
    gouvernanceId,
  })

  return {
    gouvernance,
    demandeDeSubvention,
    defaultValues,
    montantDotationRestante,
    montantDotationRestantePourDemandeDeSubvention,
    scopeTitle,
    currentPageLabel,
    feuillesDeRouteOptions,
    beneficiairesOptions,
    backUrl,
    DemandeDeSubventionBreadcrumbs: () => (
      <Breadcrumb
        currentPageLabel={currentPageLabel}
        segments={[
          {
            label: 'Page d’accueil',
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
          {
            label: `Demandes de subvention`,
            linkProps: {
              href: gouvernanceDemandesDeSubventionPath(
                { codeDepartement },
                gouvernanceId,
              ),
            },
          },
        ]}
      />
    ),
  }
}
