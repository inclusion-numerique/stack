import { redirect } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { prismaClient } from '@app/web/prismaClient'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { LieuActivite } from './_components/LieuActivite'

const LieuActiviteListPage = async () => {
  const user = await getAuthenticatedSessionUser()

  if (!user.mediateur || user.mediateur._count.enActivite === 0) {
    return redirect('/')
  }

  const lieuxActivite = await prismaClient.mediateurEnActivite.findMany({
    where: {
      mediateurId: user.mediateur.id,
      suppression: null,
    },
    select: {
      id: true,
      creation: true,
      modification: true,
      structure: {
        select: {
          id: true,
          nom: true,
          adresse: true,
          commune: true,
          codePostal: true,
          complementAdresse: true,
          siret: true,
          rna: true,
          visiblePourCartographieNationale: true,
          structureCartographieNationaleId: true,
          typologies: true,
        },
      },
    },
  })

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container fr-container--800 fr-mb-32v">
        <CoopBreadcrumbs currentPage="Mes lieux d'activités" />
        <main id={contentId}>
          <span className="fr-flex fr-flex-wrap fr-direction-row fr-align-items-center fr-flex-gap-4v fr-my-5w">
            <span
              className="ri-home-office-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-alt--blue-france fr-p-2w fr-m-0 fr-border-radius--8"
              aria-hidden
            />
            <h1 className="fr-h3 fr-page-title fr-m-0">
              Mes lieux d’activités · {user.mediateur._count.enActivite}
            </h1>
            <Button
              className="fr-ml-auto"
              priority="secondary"
              linkProps={{
                href: '/coop/lieux-activite/ajouter',
              }}
              iconId="fr-icon-add-line"
            >
              Ajouter un lieu d’activité
            </Button>
          </span>
          <div className="fr-flex fr-direction-column fr-flex-gap-4v">
            {lieuxActivite.map((lieuActivite) => (
              <LieuActivite
                key={lieuActivite.id}
                {...lieuActivite.structure}
                mediateurEnActiviteId={lieuActivite.id}
                canDelete={lieuxActivite.length > 1}
                creation={lieuActivite.creation}
                modification={lieuActivite.modification}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default LieuActiviteListPage
