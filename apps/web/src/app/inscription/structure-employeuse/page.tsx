import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import {
  profileInscriptionFromSlug,
  ProfileInscriptionSlug,
} from '@app/web/inscription/profilInscription'
import InscriptionCard from '@app/web/app/inscription/InscriptionCard'
import RenseignerStructureEmployeuseForm from '@app/web/app/inscription/structure-employeuse/RenseignerStructureEmployeuseForm'
import { prismaClient } from '@app/web/prismaClient'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

// next js query params "profil": ProfilInscription
const Page = async ({
  searchParams: { profil },
}: {
  searchParams: {
    profil?: ProfileInscriptionSlug
  }
}) => {
  const user = await getAuthenticatedSessionUser()

  console.log('USER', user)

  if (!profil) {
    redirect('/')
  }

  const emploi = await prismaClient.employeStructure.findFirst({
    where: {
      userId: user.id,
      suppression: null,
    },
    orderBy: {
      creation: 'desc',
    },
    select: {
      id: true,
      structure: {
        select: {
          id: true,
          nom: true,
          commune: true,
          codePostal: true,
          codeInsee: true,
          siret: true,
          rna: true,
          adresse: true,
          typologie: true,
        },
      },
    },
  })

  const structure = emploi?.structure

  const structureEmployeuse = structure
    ? {
        ...structure,
        // Those casts should not happen as in creation they are required. This is for type safety
        codeInsee: structure.codeInsee ?? '',
        siret: structure.siret ?? '',
      }
    : null

  return (
    <InscriptionCard
      title="Renseignez votre structure employeuse"
      backHref={`/inscription?profil=${profil}`}
      nextStepTitle="Renseignez vos lieux d’activité"
      stepNumber={1}
    >
      <RenseignerStructureEmployeuseForm
        defaultValues={{
          profil: profileInscriptionFromSlug[profil],
          structureEmployeuse: structureEmployeuse ?? undefined,
          userId: user.id,
        }}
        structureEmployeuse={structureEmployeuse}
      />
    </InscriptionCard>
  )
}

export default Page
