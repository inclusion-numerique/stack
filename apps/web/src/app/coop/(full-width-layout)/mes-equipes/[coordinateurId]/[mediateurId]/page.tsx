import { redirect } from 'next/navigation'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getMediateurPageData } from '@app/web/equipe/MediateurDetailPage/getMediateurPageData'
import { MediateurDetailPage } from '@app/web/equipe/MediateurDetailPage/MediateurDetailPage'

export const generateMetadata = async ({
  params: { mediateurId },
}: {
  params: { mediateurId: string }
}) => {
  const mediateur = await prismaClient.mediateur.findUnique({
    where: { id: mediateurId },
    select: { user: { select: { name: true } } },
  })

  return {
    title: metadataTitle(`${mediateur?.user.name} | Médiateur`),
  }
}

const Page = async ({
  params: { coordinateurId, mediateurId },
}: {
  params: { coordinateurId: string; mediateurId: string }
}) => {
  const mediateurPageData = await getMediateurPageData(
    mediateurId,
    coordinateurId,
  )

  if (mediateurPageData?.mediateur?.user == null) {
    redirect(`/coop/mes-equipes/${coordinateurId}`)
  }

  const {
    statistiques,
    mediateur,
    structureEmployeuse,
    contract,
    lieuxActivites,
  } = mediateurPageData

  const coordinateionEnd = mediateur.coordinations[0]?.suppression ?? undefined

  return (
    <MediateurDetailPage
      {...mediateur}
      coordinationEnd={coordinateionEnd}
      href={
        coordinateionEnd == null
          ? `/coop/mes-equipes/${coordinateurId}`
          : `/coop/mes-equipes/${coordinateurId}/anciens-membres`
      }
      statistiques={statistiques}
      structureEmployeuse={structureEmployeuse}
      contract={contract}
      lieuxActivites={lieuxActivites}
      conseillerNumerique={mediateur.conseillerNumerique}
    />
  )
}

export default Page
