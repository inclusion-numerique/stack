import { notFound, redirect } from 'next/navigation'
import { gouvernanceSelect } from '@app/web/app/(with-navigation)/gouvernances/departements/[codeDepartement]/gouvernance/getGouvernanceForForm'
import { prismaClient } from '@app/web/prismaClient'
import { detailGouvernancePath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'

export const dynamic = 'force-dynamic'
export const revalidate = 0
const Page = async ({
  params: { codeDepartement },
}: {
  params: { codeDepartement: string }
}) => {
  const departement = await prismaClient.departement.findUnique({
    where: {
      code: codeDepartement,
    },
    select: {
      nom: true,
      code: true,
      gouvernancesRemontees: {
        where: {
          v2Enregistree: {
            not: null,
          },
          supression: null,
        },
        select: gouvernanceSelect,
      },
    },
  })

  if (!departement) {
    notFound()
  }

  const { gouvernancesRemontees } = departement
  const gouvernance = gouvernancesRemontees[0]

  if (!gouvernance) {
    notFound()
  }

  redirect(detailGouvernancePath({ codeDepartement }, gouvernance.id))

  return null
}

export default Page
