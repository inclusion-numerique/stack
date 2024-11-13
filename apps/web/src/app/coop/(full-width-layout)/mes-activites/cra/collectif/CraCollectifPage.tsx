import React from 'react'
import { DefaultValues } from 'react-hook-form'
import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import CraCollectifForm from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/collectif/CraCollectifForm'
import { AdressBanFormFieldOption } from '@app/web/components/form/AdresseBanFormField'
import { type MostUsedBeneficiairesForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import { type MostUsedLieuActiviteForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'
import BackButtonWithModal from '@app/web/components/BackButtonWithModal'

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
  <div className="fr-container fr-container--800">
    <CoopBreadcrumbs currentPage="Enregistrer un atelier collectif" />
    <BackButtonWithModal
      href="/coop"
      modalTitle="Quitter sans enregistrer"
      modalContent="Êtes-vous sur de vouloir quitter votre compe-rendu d’activité sans enregistrer ?"
    >
      Retour à l&apos;accueil
    </BackButtonWithModal>

    <h1 className="fr-text-title--blue-france fr-mb-2v ">Atelier collectif</h1>
    <RequiredFieldsDisclamer
      className="fr-mb-12v"
      helpLink={{
        href: 'https://incubateurdesterritoires.notion.site/Atelier-collectif-f2c9b66bd15a4c31b00343ee583a8832',
        text: 'En savoir plus sur comment compléter un CRA',
      }}
    />

    <CraCollectifForm
      defaultValues={{ ...defaultValues, mediateurId }}
      lieuActiviteOptions={lieuxActiviteOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      initialCommunesOptions={initialCommunesOptions}
      retour={retour}
    />
  </div>
)

export default CraCollectifPage
