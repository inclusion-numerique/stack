import React from 'react'
import { redirect } from 'next/navigation'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { LieuActivitePageContent } from './_components/LieuActivitePageContent'

const LieuActiviteDetailPage = async ({
  params,
}: {
  params: { id: string }
}) => {
  const user = await getSessionUser()

  if (!user || !user.mediateur) {
    redirect(`/connexion?suivant=/lieux-activite/${params.id}`)
  }

  const lieuActivite = await prismaClient.mediateurEnActivite.findFirst({
    where: {
      mediateurId: user.mediateur.id,
      structureId: params.id,
    },
    select: {
      structure: true,
    },
  })

  if (lieuActivite?.structure == null) {
    return redirect('/lieux-activite')
  }

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <main id={contentId} className="fr-container fr-flex">
        <LieuActivitePageContent structure={lieuActivite.structure} />
      </main>
    </>
  )
}

export default LieuActiviteDetailPage
