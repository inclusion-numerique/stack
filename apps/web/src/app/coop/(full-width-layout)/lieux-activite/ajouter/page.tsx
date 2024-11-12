import React from 'react'
import { redirect } from 'next/navigation'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import IconInSquare from '@app/web/components/IconInSquare'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import BackButton from '@app/web/components/BackButton'
import LieuxActiviteForm from './_components/LieuxActiviteForm'

const AjouterLieuPage = async () => {
  const user = await getAuthenticatedSessionUser()

  if (!user.mediateur || user.mediateur._count.enActivite === 0) {
    return redirect('/')
  }

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container fr-container--narrow">
        <CoopBreadcrumbs
          parents={[
            {
              label: `Mes lieux d'activités`,
              linkProps: { href: '/coop/lieux-activite/' },
            },
          ]}
          currentPage={"Ajouter un lieu d'activité"}
        />
        <main id={contentId} className="fr-mb-30v">
          <BackButton href="/coop/lieux-activite">
            Retour à mes lieux d&apos;activité
          </BackButton>
          <span className="fr-flex fr-direction-row fr-align-items-center fr-flex-gap-6v fr-mb-5w">
            <IconInSquare iconId="ri-home-office-line" />
            <h1 className="fr-page-title fr-m-0 fr-h2">
              Ajouter un lieu d’activité
            </h1>
          </span>
          <div className="fr-border fr-border-radius--8 fr-p-4w">
            <p className="fr-mb-6w">
              Rechercher dans les lieux déjà référencés. Si vous ne trouvez pas
              vos lieux, vous pouvez les créer afin d’être référencé.
            </p>
            <LieuxActiviteForm
              nextHref="/coop/lieux-activite"
              createStructureHref="/coop/lieux-activite/creer"
              userId={user.id}
            />
          </div>
        </main>
      </div>
    </>
  )
}

export default AjouterLieuPage
