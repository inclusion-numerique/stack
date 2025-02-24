'use client'

import { hasClosedOnboardingCookie } from '@app/web/app/(onboarding)/onboardingCookie'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'

const setOnboardingCookie = () => {
  Cookies.set(hasClosedOnboardingCookie, new Date().toISOString(), {
    sameSite: 'strict',
    expires: 1,
  })
}

export const OnboardingInfo = ({
  hasSeenOnboarding,
}: {
  hasSeenOnboarding: string | null
}) => {
  const hasClosedOnboarding = Cookies.get(hasClosedOnboardingCookie)

  return (
    hasSeenOnboarding == null &&
    hasClosedOnboarding == null && (
      <Notice
        className="fr-notice--hint fr-notice--no-icon fr-notice--flex fr-border-radius--16 fr-mt-6w"
        isClosable
        onClose={() => setOnboardingCookie()}
        title={
          <span className="fr-flex fr-align-items-center fr-flex-gap-8v fr-py-2w">
            <Image
              width={80}
              height={78}
              src="/images/illustrations/landing-page/fonctionnalites/deployer.svg"
              alt=""
            />
            <span>
              <span className="fr-h6 fr-text-title--blue-france fr-mb-1w fr-display-block">
                Bienvenue sur la Coop de la médiation numérique !
              </span>
              <span className="fr-mb-2w fr-text--regular fr-text-default--grey fr-display-block">
                Découvrez un aperçu des fonctionnalités principales de la
                plateforme.
              </span>
              <Link className="fr-link" href="/en-savoir-plus">
                Découvrir{' '}
                <span className="fr-icon-arrow-right-line fr-icon-arrow-right-line fr-icon--sm fr-ml-1v" />
              </Link>
            </span>
          </span>
        }
      />
    )
  )
}
