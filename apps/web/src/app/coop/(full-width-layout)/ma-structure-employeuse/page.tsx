import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { ReferentStructure } from '@app/web/components/structure/ReferentStructure'
import { StructureEmployeuse } from '@app/web/components/structure/StructureEmployeuse'
import UpdateStructure from '@app/web/components/structure/UpdateStructure'
import { prismaClient } from '@app/web/prismaClient'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
  title: metadataTitle('Ma structure employeuse'),
}

const MaStructureEmployeusePage = async () => {
  const user = await authenticateUser()

  if (!user.mediateur && !user.coordinateur) {
    return redirect('/')
  }

  const structuresEmployeuses = await prismaClient.employeStructure.findMany({
    where: {
      userId: user.id,
      suppression: null,
    },
    orderBy: {
      modification: 'desc',
    },
    select: {
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
          typologies: true,
          nomReferent: true,
          courrielReferent: true,
          telephoneReferent: true,
        },
      },
    },
  })

  const structureEmployeuse = structuresEmployeuses.at(0)?.structure

  const matchingLieuActivite =
    structureEmployeuse && user.mediateur
      ? await prismaClient.mediateurEnActivite.findFirst({
          where: {
            mediateurId: user.mediateur.id,
            structureId: structureEmployeuse.id,
            suppression: null,
          },
        })
      : null

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <div className="fr-container fr-container--800">
        <CoopBreadcrumbs currentPage="Ma structure employeuse" />
        <main id={contentId} className="fr-mb-16w">
          <div className="fr-flex fr-flex-wrap fr-direction-row fr-align-items-center fr-flex-gap-4v fr-my-12v">
            <span
              className="ri-home-smile-2-line ri-xl fr-line-height-1 fr-text-label--blue-france fr-background-alt--blue-france fr-p-2w fr-m-0 fr-border-radius--8"
              aria-hidden
            />
            <h1 className="fr-page-title fr-m-0">Ma structure employeuse</h1>
          </div>

          {structureEmployeuse ? (
            <StructureEmployeuse
              {...structureEmployeuse}
              isLieuActivite={matchingLieuActivite != null}
            >
              {structureEmployeuse.nomReferent && (
                <>
                  <hr className="fr-mt-6v fr-pb-6v" />
                  <ReferentStructure {...structureEmployeuse} />
                </>
              )}
              {user.mediateur?.conseillerNumerique && (
                <>
                  <hr className="fr-mt-6v fr-pb-6v" />
                  <UpdateStructure />
                </>
              )}
            </StructureEmployeuse>
          ) : (
            <div className="fr-text--center fr-background-alt--blue-france fr-border-radius--8 fr-p-6w">
              <h2 className="fr-h6 fr-mb-1v">
                Vous n’avez pas renseigné de structure employeuse
              </h2>
              <p className="fr-mb-0">
                Vous pouvez continuez à utiliser la plateforme, cependant vous
                ne serez plus identifié sur votre territoire comme faisant
                partie de la communauté de la médiation numérique
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

export default MaStructureEmployeusePage
