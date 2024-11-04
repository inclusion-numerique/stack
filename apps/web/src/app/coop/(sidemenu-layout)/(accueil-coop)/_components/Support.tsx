import React from 'react'
import Link from 'next/link'

export const Support = () => (
  <>
    <div>
      <h2 className="fr-mb-1w fr-text--xs fr-text--uppercase fr-flex fr-flex-gap-3v fr-align-items-center">
        <span className="ri-video-chat-line ri-xl fr-text--light" aria-hidden />
        Participez au prochain webinaire
      </h2>
      <p className="fr-text--sm fr-my-2w">
        Nous organisons régulièrement des présentations de l’outil & des
        prochaines évolutions.
      </p>
      <Link
        href="/"
        target="_blank"
        rel="noreferrer"
        title="Accéder à l'inscription au prochain webinaire - nouvelle fenêtre"
        className="fr-btn fr-btn--sm wip-outline"
      >
        S’inscrire au prochain webinaire
      </Link>
    </div>
    <div className="fr-border-right fr-border--blue-france fr-mx-md-5w" />
    <div className="fr-border-bottom fr-border--blue-france fr-my-3w fr-hidden-xl" />
    <div>
      <h2 className="fr-mb-1w fr-text--xs fr-text--uppercase fr-flex fr-flex-gap-3v fr-align-items-center">
        <span
          className="ri-questionnaire-line ri-xl fr-text--light"
          aria-hidden
        />
        Contactez le support
      </h2>
      <p className="fr-text--sm fr-my-2w">
        En cas de problèmes rencontrés sur la plateforme, n’hésitez pas à nous
        contacter&nbsp;:
      </p>
      <div className="fr-text--lg fr-text-label--blue-france fr-flex fr-flex-gap-3v fr-align-items-center fr-mb-0">
        <span
          className="ri-mail-line ri-lg fr-text--light"
          aria-hidden="true"
        />
        <Link href="mailto:coop-numerique@anct.gouv.fr" target="_blank">
          coop-numerique@anct.gouv.fr
        </Link>
      </div>
    </div>
  </>
)
