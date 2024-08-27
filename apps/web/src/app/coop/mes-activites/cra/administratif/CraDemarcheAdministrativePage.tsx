import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import type { DefaultValues } from 'react-hook-form'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import type { CraDemarcheAdministrativeData } from '@app/web/cra/CraDemarcheAdministrativeValidation'
import CraDemarcheAdministrativeForm from '@app/web/app/coop/mes-activites/cra/administratif/CraDemarcheAdministrativeForm'
import { type MostUsedBeneficiairesForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import type { MostUsedLieuActiviteForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'

export type CraDemarcheAdministrativePageData = {
  defaultValues: DefaultValues<CraDemarcheAdministrativeData>
  mediateurId: string
  initialBeneficiairesOptions: MostUsedBeneficiairesForSearch
  lieuxActiviteOptions: MostUsedLieuActiviteForSearch['lieuxActiviteOptions']
  retour?: string
}

export const CraDemarcheAdministrativePage = ({
  defaultValues,
  mediateurId,
  lieuxActiviteOptions,
  initialBeneficiairesOptions,
  retour,
}: CraDemarcheAdministrativePageData) => (
  <CoopPageContainer size={794} className="fr-pt-8v">
    <CoopBreadcrumbs currentPage="Enregistrer une aide aux démarches administratives" />
    <h1 className="fr-text-title--blue-france fr-mb-2v">
      Aide aux démarches administratives
    </h1>
    <RequiredFieldsDisclamer />

    <CraDemarcheAdministrativeForm
      defaultValues={{ ...defaultValues, mediateurId }}
      lieuActiviteOptions={lieuxActiviteOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      retour={retour}
    />
  </CoopPageContainer>
)

export default CraDemarcheAdministrativePage
