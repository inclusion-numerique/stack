import Image from 'next/image'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Onboarding from '../../_components/Onboarding'

export const OnboardingMesOutils = ({
  isConseillerNumerique,
}: {
  isConseillerNumerique: boolean
}) => (
  <Onboarding
    image={
      <Image
        className="fr-responsive-img fr-border-radius--16"
        width={541}
        height={538}
        src="/images/illustrations/onboarding/mes-outils.svg"
        alt=""
      />
    }
    title="Bénéficiez d’outils adaptés à vos besoins"
    label={
      <>
        <span className="ri-apps-2-line ri-lg fr-mr-1w" aria-hidden />
        Mes outils
      </>
    }
    stepIndex={4}
    totalSteps={isConseillerNumerique ? 6 : 5}
    previous={{ href: '/en-savoir-plus/mes-beneficiaires' }}
    next={{ href: '/en-savoir-plus/france-numerique-ensemble' }}
    closeHref="/coop"
  >
    <p className="fr-text--lg">
      Retrouvez une sélection d’outils et de services numériques dédiées à la
      médiation numérique dans une seule et même plateforme&nbsp;!
    </p>
    <Notice
      className="fr-notice--new fr-notice--flex"
      title={
        <span className="fr-text--regular">
          <span className="fr-text-default--grey fr-text--bold fr-display-block">
            Prochaines évolutions à venir !
          </span>
          <span className="fr-display-block fr-text--sm fr-my-1v">
            Amélioration du partage d’informations entre ces outils pour
            fluidifier l’organisation du travail.
          </span>
        </span>
      }
    />
  </Onboarding>
)
