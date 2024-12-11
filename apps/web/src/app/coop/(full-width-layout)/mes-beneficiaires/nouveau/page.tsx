import RequiredFieldsDisclamer from '@app/ui/components/Form/RequiredFieldsDisclamer'
import { DefaultValues } from 'react-hook-form'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'
import IconInSquare from '@app/web/components/IconInSquare'
import BeneficiaireForm from '@app/web/app/coop/(full-width-layout)/mes-beneficiaires/BeneficiaireForm'
import BackButton from '@app/web/components/BackButton'
import { authenticateMediateur } from '@app/web/auth/authenticateUser'

const PageCreerBeneficiaire = async ({
  searchParams: { cra, retour } = {},
}: {
  searchParams?: {
    cra?: EncodedState<DefaultValues<CraIndividuelData>>
    retour?: string
  }
}) => {
  const user = await authenticateMediateur()

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

      <Notice
        className="fr-notice--hint fr-notice--no-icon fr-notice--flex fr-border-radius--16 fr-mb-8v"
        title={
          <span className="fr-flex fr-align-items-center fr-flex-gap-8v fr-py-1w">
            <span className="ri-admin-line ri-xl fr-mx-1w fr-text--regular" />

            <span>
              <span className="fr-notice__title fr-text--md fr-text-title--blue-france fr-mb-1w fr-display-block">
                N’oubliez pas d’informer vos bénéficiaires sur leurs droits
                lorsque vous collectez leurs données personnelles.
              </span>
              <span className="fr-mb-1w fr-text--regular fr-text--sm fr-text-default--grey fr-display-block">
                Un modèle de mention d’information à destination des
                bénéficiaires que vous accompagnez est à votre disposition dans
                notre centre d’aide.{' '}
                <Link
                  className="fr-link fr-text--sm"
                  href="https://incubateurdesterritoires.notion.site/Mod-le-de-mention-d-information-destination-des-b-n-ficiaires-accompagn-s-par-les-m-diateurs-num-r-13e744bf03dd80fd9f5ec066c97391b9?pvs=74"
                  target="_blank"
                >
                  Consulter via ce lien
                </Link>
              </span>
            </span>
          </span>
        }
      />

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
