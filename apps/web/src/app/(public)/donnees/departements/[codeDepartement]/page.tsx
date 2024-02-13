import { notFound } from 'next/navigation'
import React from 'react'
import DepartementDashboard from '@app/web/components/Dashboard/DepartementDashboard'
import { prismaClient } from '@app/web/prismaClient'
import { getDepartementDashboardData } from '@app/web/app/(public)/donnees/departements/[codeDepartement]/getDepartementDashboardData'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const generateMetadata = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const departement = await prismaClient.departement.findUnique({
    where: {
      code: codeDepartement,
    },
    select: {
      code: true,
      nom: true,
    },
  })
  if (!departement) {
    notFound()
  }

  return {
    title: metadataTitle(`Données · ${departement.nom}`),
  }
}

const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  // Security has been checked in metadata
  const data = await getDepartementDashboardData(codeDepartement)

  const departementWithRegion = await prismaClient.departement.findUnique({
    where: {
      code: codeDepartement,
    },
    select: {
      code: true,
      nom: true,
      region: {
        select: {
          code: true,
          nom: true,
          departements: {
            select: {
              code: true,
              nom: true,
            },
          },
        },
      },
    },
  })
  if (!departementWithRegion) {
    notFound()
    return null
  }

  // User only has access to one departement
  return <DepartementDashboard data={data} />
}

export default Page
