import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import { DefaultValues } from 'react-hook-form'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import CraCollectifForm from '@app/web/app/coop/mes-activites/cra/collectif/CraCollectifForm'
import { AdressBanFormFieldOption } from '@app/web/components/form/AdresseBanFormField'
import { type MostUsedBeneficiairesForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { type MostUsedLieuActiviteForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'

export type CraCollectifPageData = {
  defaultValues: DefaultValues<CraCollectifData>
  mediateurId: string
  lieuxActiviteOptions: MostUsedLieuActiviteForSearch['lieuxActiviteOptions']
  initialBeneficiairesOptions: MostUsedBeneficiairesForSearch
  initialCommunesOptions: AdressBanFormFieldOption[]
  retour?: string
}

const CraCollectifPage = ({
  defaultValues,
  initialBeneficiairesOptions,
  initialCommunesOptions,
  lieuxActiviteOptions,
  mediateurId,
  retour,
}: CraCollectifPageData) => (
  <CoopPageContainer size={794} className="fr-pt-8v">
    <CoopBreadcrumbs currentPage="Enregistrer un atelier collectif" />
    <h1 className="fr-text-title--blue-france fr-mb-2v">Atelier collectif</h1>
    <RequiredFieldsDisclamer />

    <CraCollectifForm
      defaultValues={{ ...defaultValues, mediateurId }}
      lieuActiviteOptions={lieuxActiviteOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      initialCommunesOptions={initialCommunesOptions}
      retour={retour}
    />
  </CoopPageContainer>
)

export default CraCollectifPage
