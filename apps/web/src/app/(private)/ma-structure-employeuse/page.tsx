import { redirect } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { prismaClient } from '@app/web/prismaClient'
import { StructureEmployeuse } from './_components/StructureEmployeuse'

const MaStructureEmployeusePage = async () => {
  const user = await getAuthenticatedSessionUser()

  if (!user.mediateur) {
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
        },
      },
    },
  })

  const structureEmployeuse = structuresEmployeuses.at(0)?.structure

  const matchingLieuActivite = structureEmployeuse
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
      <div className="fr-container fr-mt-2w">
        <Breadcrumbs
          className="fr-mb-0"
          currentPage="Ma structure employeuse"
        />
        <main
          id={contentId}
          className="fr-container fr-container--800 fr-mb-16w"
        >
          <Button
            priority="tertiary no outline"
            size="small"
            linkProps={{
              href: '/',
            }}
            className="fr-mt-6w"
            iconId="fr-icon-arrow-left-line"
          >
            Retour
          </Button>
          <span className="fr-flex fr-flex-wrap fr-direction-row fr-align-items-center fr-flex-gap-4v fr-my-5w">
            <span
              className="ri-home-smile-line ri-lg fr-line-height-1 fr-text-label--blue-france fr-background-alt--blue-france fr-p-2w fr-m-0 fr-border-radius--8"
              aria-hidden
            />
            <h1 className="fr-h3 fr-page-title fr-m-0">
              Ma structure employeuse
            </h1>
          </span>
          {structureEmployeuse && (
            <StructureEmployeuse
              {...structureEmployeuse}
              isLieuActivite={matchingLieuActivite != null}
            />
          )}
        </main>
      </div>
    </>
  )
}

export default MaStructureEmployeusePage
