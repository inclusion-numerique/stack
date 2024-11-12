import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import { DefaultValues } from 'react-hook-form'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'
import IconInSquare from '@app/web/components/IconInSquare'
import BeneficiaireForm from '@app/web/app/coop/(full-width-layout)/mes-beneficiaires/BeneficiaireForm'
import BackButton from '@app/web/components/BackButton'

const PageCreerBeneficiaire = async ({
  searchParams: { cra, retour } = {},
}: {
  searchParams?: {
    cra?: EncodedState<DefaultValues<CraIndividuelData>>
    retour?: string
  }
}) => {
  const user = await getAuthenticatedMediateur()

  const parsedCra = cra ? decodeSerializableState(cra, {}) : undefined

  return (
    <div className="fr-container fr-container--medium">
      <CoopBreadcrumbs
        currentPage="Nouveau bénéficiaire"
        parents={[
          {
            label: 'Mes bénéficiaires',
            linkProps: {
              href: '/coop/mes-beneficiaires',
            },
          },
        ]}
      />
      <BackButton href="/coop/mes-beneficiaires">
        Retour à mes bénéficiaires
      </BackButton>
      <div className="fr-flex fr-flex-gap-6v fr-align-items-start fr-mb-12v">
        <IconInSquare iconId="fr-icon-user-add-line" size="large" />
        <div className="fr-flex-grow-1">
          <h1 className="fr-text-title--blue-france fr-mb-2v">
            Nouveau bénéficiaire
          </h1>
          <RequiredFieldsDisclamer className="fr-my-0" />
        </div>
      </div>

      <BeneficiaireForm
        defaultValues={{
          mediateurId: user.mediateur.id,
        }}
        retour={retour}
        cra={parsedCra}
      />
    </div>
  )
}

export default PageCreerBeneficiaire
