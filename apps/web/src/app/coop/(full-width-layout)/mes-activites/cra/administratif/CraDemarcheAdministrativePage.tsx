import React from 'react'
import type { DefaultValues } from 'react-hook-form'
import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import type { CraDemarcheAdministrativeData } from '@app/web/cra/CraDemarcheAdministrativeValidation'
import CraDemarcheAdministrativeForm from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/administratif/CraDemarcheAdministrativeForm'
import { type MostUsedBeneficiairesForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import type { MostUsedLieuActiviteForSearch } from '@app/web/app/lieu-activite/getInitialLieuxActiviteOptionsForSearch'
import BackButtonWithModal from '@app/web/components/BackButtonWithModal'

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
  <div className="fr-container fr-container--800">
    <CoopBreadcrumbs currentPage="Enregistrer une aide aux démarches administratives" />
    <BackButtonWithModal
      href="/coop"
      modalTitle="Quitter sans enregistrer"
      modalContent="Êtes-vous sur de vouloir quitter votre compe-rendu d’activité sans enregistrer ?"
    >
      Retour à l&apos;accueil
    </BackButtonWithModal>
    <h1 className="fr-text-title--blue-france fr-mb-2v">
      Aide aux démarches administratives
    </h1>
    <RequiredFieldsDisclamer
      className="fr-mb-12v"
      helpLink={{
        href: 'https://incubateurdesterritoires.notion.site/Aide-aux-d-marches-administratives-9845c6b41a984eaaa330c59b7aeef282',
        text: 'En savoir plus sur comment compléter un CRA',
      }}
    />

    <CraDemarcheAdministrativeForm
      defaultValues={{ ...defaultValues, mediateurId }}
      lieuActiviteOptions={lieuxActiviteOptions}
      initialBeneficiairesOptions={initialBeneficiairesOptions}
      retour={retour}
    />
  </div>
)

export default CraDemarcheAdministrativePage
