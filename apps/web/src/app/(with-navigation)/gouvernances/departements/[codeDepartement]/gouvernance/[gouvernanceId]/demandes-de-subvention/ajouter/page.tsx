import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { generateDepartementMetadata } from '@app/web/app/(with-navigation)/gouvernances/departements/generateDepartementMetadata'
import { gouvernanceDemandesDeSubventionPath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import BackLink from '@app/web/components/BackLink'
import RedAsterisk from '@app/web/ui/RedAsterisk'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { limiteModicitaionDesDemandesDeSubvention } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/gouvernanceMetadata'
import DemandeDeSubventionForm from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/DemandeDeSubventionForm'
import { getDemandesDeSubventionFormContext } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/[gouvernanceId]/demandes-de-subvention/getDemandesDeSubventionFormContext'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const generateMetadata = generateDepartementMetadata('Gouvernance')

const Page = async ({
  params: { codeDepartement, gouvernanceId },
}: {
  params: {
    codeDepartement: string
    gouvernanceId: string
  }
}) => {
  const {
    gouvernance,
    defaultValues,
    montantDotationRestante,
    feuillesDeRouteOptions,
    beneficiairesOptions,
    backUrl,
    DemandeDeSubventionBreadcrumbs,
  } = await getDemandesDeSubventionFormContext({
    demandeDeSubventionId: null,
    codeDepartement,
    gouvernanceId,
  })
  return (
    <>
      <div className="fr-container">
        <DemandeDeSubventionBreadcrumbs />
      </div>
      <div className="fr-container fr-container--narrow fr-pb-10v fr-mb-20v">
        <BackLink
          href={gouvernanceDemandesDeSubventionPath(
            { codeDepartement },
            gouvernance.id,
          )}
        />

        <h1 className="fr-text-title--blue-france fr-mt-6v fr-mb-2v">
          Formulaire de demande de subvention
        </h1>
        <p className="fr-text--sm fr-hint-text fr-my-4v">
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
        <DemandeDeSubventionForm
          backUrl={backUrl}
          beneficiairesOptions={beneficiairesOptions}
          feuillesDeRouteOptions={feuillesDeRouteOptions}
          defaultValues={{
            ...defaultValues,
            montantDotationRestante:
              montantDotationRestante.montantRestant.toNumber(),
          }}
        />
      </div>
    </>
  )
}

export default Page
