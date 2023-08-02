import { notFound, redirect } from 'next/navigation'
import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Button from '@codegouvfr/react-dsfr/Button'
import {
  getAuthenticatedSessionUser,
  getSessionUser,
} from '@app/web/auth/getSessionUser'
import {
  hasAccessToGouvernanceForm,
  hasAccessToGouvernanceFormDevelopmentPreview,
} from '@app/web/security/securityRules'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ContainerCard from '@app/web/components/ContainerCard'

export const generateMetadata = async ({
  params: { gouvernancePersonaId },
}: {
  params: { gouvernancePersonaId: GouvernancePersonaId }
}) => {
  const user = await getSessionUser()

  if (!user) {
    redirect(
      `/connexion?suivant=/formulaires-feuilles-de-routes-territoriales/${gouvernancePersonaId}`,
    )
  }

  if (!(gouvernancePersonaId in gouvernancePersonas)) {
    notFound()
  }

  if (!hasAccessToGouvernanceForm(user)) {
    redirect(`/profil`)
  }

  // User has accessed wrong url
  if (gouvernancePersonaId !== user.gouvernancePersona) {
    redirect(
      user.gouvernancePersona
        ? `/formulaires-feuilles-de-routes-territoriales/${user.gouvernancePersona}`
        : '/formulaires-feuilles-de-routes-territoriales',
    )
  }

  return {
    title: `Inscription confirmée`,
  }
}

const Page = async ({
  params: { gouvernancePersonaId },
}: {
  params: { gouvernancePersonaId: GouvernancePersonaId }
}) => {
  const persona = gouvernancePersonas[gouvernancePersonaId]
  const user = await getAuthenticatedSessionUser()

  const canAccessDevelopmentPreview =
    hasAccessToGouvernanceFormDevelopmentPreview(user)

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs
          currentPage={persona.title}
          parents={[
            {
              label: 'Formulaires feuilles de routes territoriales',
              linkProps: { href: '/gouvernance' },
            },
          ]}
        />
      </div>
      <ContainerCard
        illustrationSrc="/dsfr/artwork/pictograms/system/success.svg"
        className={canAccessDevelopmentPreview ? 'fr-mb-8v' : undefined}
      >
        <h2 className="fr-mb-4v">Votre inscription est confirmée&nbsp;</h2>
        <p className="fr-mb-0">
          Un mail de confirmation vous a été envoyé à l’adresse{' '}
          <strong>{user.email}</strong> avec le récapitulatif des informations
          qui vous seront demandées pour compléter ce formulaire.
          <br />
          <br />
          Vous serez informé par mail lorsque les formulaires seront prêts à
          être complétés.
        </p>
      </ContainerCard>

      {canAccessDevelopmentPreview && (
        <div className="fr-container fr-container--narrow">
          <Notice title="Vous avez été autorisé(e) à accéder aux formulaires en cours de développement" />
          <Button
            className="fr-mt-8v fr-mb-20v"
            priority="secondary"
            iconId="fr-icon-arrow-right-line"
            linkProps={{
              href: `/formulaires-feuilles-de-routes-territoriales/${gouvernancePersonaId}/formulaire`,
            }}
          >
            Accéder au formulaire en cours de développement
          </Button>
        </div>
      )}
    </>
  )
}

export default Page
