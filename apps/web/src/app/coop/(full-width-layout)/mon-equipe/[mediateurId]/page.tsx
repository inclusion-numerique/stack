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
  params: { mediateurId },
}: {
  params: { mediateurId: string }
}) => {
  const mediateurPageData = await getMediateurPageData(mediateurId)

  if (mediateurPageData?.mediateur?.user == null) {
    redirect('/mon-equipe')
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
          ? '/coop/mon-equipe'
          : '/coop/mon-equipe/anciens-membres'
      }
      statistiques={statistiques}
      structureEmployeuse={structureEmployeuse}
      contract={contract}
      lieuxActivites={lieuxActivites}
      coordinateurView
    />
  )
}

export default Page
