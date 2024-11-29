import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'
import MonEquipeListePage from '@app/web/equipe/MonEquipeListePage/MonEquipeListePage'
import { getMonEquipePageData } from '@app/web/equipe/MonEquipeListePage/getMonEquipePageData'
import type { MonEquipeSearchParams } from '@app/web/equipe/MonEquipeListePage/searchMediateursCordonneBy'

export const metadata: Metadata = {
  title: metadataTitle('Mon équipe'),
}

const Page = async ({
  params: { coordinateurId },
  searchParams,
}: {
  params: { coordinateurId: string }
  searchParams: MonEquipeSearchParams
}) => {
  const coordinateur = await prismaClient.coordinateur.findUnique({
    where: { id: coordinateurId },
    select: {
      id: true,
      mediateursCoordonnes: { select: { mediateurId: true } },
      user: { select: { name: true, email: true, phone: true } },
    },
  })

  if (coordinateur == null) redirect('/')

  const monEquipePageData = await getMonEquipePageData({
    searchParams,
    coordinateur,
  })

  return (
    <MonEquipeListePage
      {...monEquipePageData}
      searchParams={searchParams}
      canSeeMediateursDetails={false}
      baseHref={`/coop/mes-equipes/${coordinateurId}`}
      coordinateur={coordinateur}
    />
  )
}

export default Page
