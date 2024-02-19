import { notFound, redirect } from 'next/navigation'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const generateMetadata = async ({
  params: { codeRegion },
}: {
  params: { codeRegion: string }
}) => {
  const region = await prismaClient.region.findUnique({
    where: {
      code: codeRegion,
    },
    select: {
      code: true,
      nom: true,
    },
  })
  if (!region) {
    notFound()
  }

  return {
    title: metadataTitle(`Données · ${region.nom}`),
  }
}

/**
 * Cette page redirige vers le premier département d’une région
 */
const Page = async ({
  params: { codeRegion },
}: {
  params: {
    codeRegion: string
  }
}) => {
  const region = await prismaClient.region.findUnique({
    where: {
      code: codeRegion,
    },
    select: {
      code: true,
      nom: true,
      departements: {
        select: { code: true, nom: true },
        orderBy: { code: 'asc' },
        take: 1,
      },
    },
  })
  if (!region || region.departements.length === 0) {
    notFound()
  }

  redirect(`/donnees/departements/${region.departements[0].code}`)

  return null
}

export default Page
