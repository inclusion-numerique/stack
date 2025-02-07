import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'
import EquipeListePage from '@app/web/equipe/EquipeListePage/EquipeListePage'
import { getEquipePageData } from '@app/web/equipe/EquipeListePage/getEquipePageData'
import type { EquipeSearchParams } from '@app/web/equipe/EquipeListePage/searchMediateursCoordonneBy'

export const metadata: Metadata = {
  title: metadataTitle('Anciens membres'),
}

const Page = async ({
  params: { coordinateurId },
  searchParams,
}: {
  params: { coordinateurId: string }
  searchParams: EquipeSearchParams
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

  const monEquipePageData = await getEquipePageData({
    searchParams,
    anciensMembres: true,
    coordinateur,
  })

  return (
    <EquipeListePage
      {...monEquipePageData}
      searchParams={searchParams}
      coordinateurView={false}
      baseHref={`/coop/mes-equipes/${coordinateurId}`}
      baseHrefSearch={`/coop/mes-equipes/${coordinateurId}/anciens-membres`}
      anciensMembres
      coordinateur={coordinateur}
    />
  )
}

export default Page
