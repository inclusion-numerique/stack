import React from 'react'
import { redirect } from 'next/navigation'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { LieuActivitePageContent } from '@app/web/app/lieu-activite/components/LieuActivitePageContent'
import { getLieuActiviteById } from '@app/web/app/lieu-activite/getLieuActiviteById'
import BackButton from '@app/web/components/BackButton'
import { prismaClient } from '@app/web/prismaClient'
import { authenticateUser } from '@app/web/auth/authenticateUser'

const LieuActiviteDetailPage = async ({
  params,
}: {
  params: { mediateurId: string; lieuId: string }
}) => {
  await authenticateUser(`/connexion?suivant=/lieux-activite/${params.lieuId}`)

  const mediateur = await prismaClient.mediateur.findUnique({
    where: { id: params.mediateurId },
    select: { user: { select: { name: true } } },
  })

  const lieuActivite = await getLieuActiviteById(params.lieuId)

  return lieuActivite?.structure == null ? (
    redirect('/coop/lieux-activite')
  ) : (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container ">
        <main id={contentId} className="fr-container fr-flex">
          <LieuActivitePageContent
            structure={lieuActivite.structure}
            contentTop={
              <>
                <CoopBreadcrumbs
                  parents={[
                    {
                      label: 'Mon équipe',
                      linkProps: { href: '/coop/mon-equipe/' },
                    },
                    {
                      label: mediateur?.user.name ?? 'Médiateur',
                      linkProps: {
                        href: `/coop/mon-equipe/${params.mediateurId}`,
                      },
                    },
                  ]}
                  currentPage={lieuActivite.structure.nom}
                />
                <BackButton href={`/coop/mon-equipe/${params.mediateurId}`}>
                  Retour à la fiche de {mediateur?.user.name}
                </BackButton>
              </>
            }
          />
        </main>
      </div>
    </>
  )
}

export default LieuActiviteDetailPage
