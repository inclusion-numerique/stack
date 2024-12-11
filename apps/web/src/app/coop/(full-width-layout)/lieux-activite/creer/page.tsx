import React from 'react'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { authenticateMediateur } from '@app/web/auth/authenticateUser'
import { CreerLieuActivitePageContent } from './_components/CreerLieuActivitePageContent'

const LieuActiviteCreerPage = async () => {
  await authenticateMediateur(`/connexion?suivant=/lieux-activite/`)

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId} className="fr-container fr-flex">
        <CreerLieuActivitePageContent
          contentTop={
            <CoopBreadcrumbs
              parents={[
                {
                  label: `Mes lieux d'activités`,
                  linkProps: { href: '/coop/lieux-activite/' },
                },
              ]}
              currentPage="Créer un lieu d'activité"
            />
          }
        />
      </main>
    </>
  )
}

export default LieuActiviteCreerPage
