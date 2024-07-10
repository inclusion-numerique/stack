import { redirect } from 'next/navigation'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { prismaClient } from '@app/web/prismaClient'
import LieuxActiviteList from './_components/LieuActiviteList'

const LieuActivitePage = async () => {
  const user = await getAuthenticatedSessionUser()

  if (
    !user.mediateur ||
    !user.mediateur.conseillerNumerique ||
    user.mediateur._count.enActivite === 0
  ) {
    return redirect('/')
  }

  const lieuxActivite = await prismaClient.mediateurEnActivite.findMany({
    where: {
      mediateurId: user.mediateur.id,
      suppression: null,
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
          visiblePourCartographieNationale: true,
          structureCartographieNationaleId: true,
          typologies: true,
        },
      },
    },
  })

  return (
    <div className="fr-container fr-container--800 fr-mb-16w">
      <h1 className="fr-h3 fr-page-title fr-my-5w">
        Mes lieux d’activités · {user.mediateur._count.enActivite}
      </h1>
      <div className="fr-flex fr-direction-column fr-flex-gap-4v">
        <LieuxActiviteList lieuxActivite={lieuxActivite} />
      </div>
    </div>
  )
}

export default LieuActivitePage
