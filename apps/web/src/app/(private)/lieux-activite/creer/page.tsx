import React from 'react'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import { CreerLieuActivitePageContent } from './_components/CreerLieuActivitePageContent'

const LieuActiviteCreerPage = async () => {
  const user = await getSessionUser()

  if (!user || !user.mediateur) {
    redirect(`/connexion?suivant=/lieux-activite/`)
  }

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId} className="fr-container fr-flex">
        <CreerLieuActivitePageContent />
      </main>
    </>
  )
}

export default LieuActiviteCreerPage
