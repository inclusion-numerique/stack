import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import { DefaultValues } from 'react-hook-form'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import CraIndividuelForm from '@app/web/app/coop/mes-activites/cra/individuel/CraIndividuelForm'
import { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import { type MostUsedBeneficiairesForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { type MostUsedLieuActiviteForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'

export type CraIndividuelPageData = {
  defaultValues: DefaultValues<CraIndividuelData>
  mediateurId: string
  initialBeneficiairesOptions: MostUsedBeneficiairesForSearch
  lieuxActiviteOptions: MostUsedLieuActiviteForSearch['lieuxActiviteOptions']
  retour?: string
}

const CraIndividuelPage = ({
  defaultValues,
  initialBeneficiairesOptions,
  lieuxActiviteOptions,
  mediateurId,
  retour,
}: CraIndividuelPageData) => (
  <CoopPageContainer size={794} className="fr-pt-8v">
    <CoopBreadcrumbs currentPage="Enregistrer un accompagnement individuel" />
    <h1 className="fr-text-title--blue-france fr-mb-2v">
      Accompagnement individuel
    </h1>
    <RequiredFieldsDisclamer />

    <CraIndividuelForm
      defaultValues={{ ...defaultValues, mediateurId }}
      lieuActiviteOptions={lieuxActiviteOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      retour={retour}
    />
  </CoopPageContainer>
)

export default CraIndividuelPage
