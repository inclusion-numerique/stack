import React from 'react'
import { redirect } from 'next/navigation'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { prismaClient } from '@app/web/prismaClient'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
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

  const lieuActivite = await prismaClient.mediateurEnActivite.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      structure: true,
    },
  })

  if (lieuActivite?.structure == null) {
    return redirect('/coop/lieux-activite')
  }

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container ">
        <main id={contentId} className="fr-container fr-flex">
          <LieuActivitePageContent
            structure={lieuActivite.structure}
            contentTop={
              <CoopBreadcrumbs
                parents={[
                  {
                    label: `Mes lieux d'activités`,
                    linkProps: { href: '/coop/lieux-activite/' },
                  },
                ]}
                currentPage={lieuActivite.structure.nom}
              />
            }
          />
        </main>
      </div>
    </>
  )
}

export default LieuActiviteDetailPage
