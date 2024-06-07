import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import InscriptionCard from '@app/web/app/inscription/InscriptionCard'
import { prismaClient } from '@app/web/prismaClient'
import LieuxActiviteForm from '@app/web/app/inscription/lieux-activite/LieuxActiviteForm'
import { StructureData } from '@app/web/app/structure/StructureValidation'
import { profileInscriptionSlugs } from '@app/web/inscription/profilInscription'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

// next js query params "profil": ProfilInscription
const Page = async () => {
  const user = await getAuthenticatedSessionUser()

  if (!user.profilInscription || !user.mediateur) {
    redirect('/')
  }

  if (user.emplois.length === 0) {
    redirect(
      `/inscription/structure-employeuse?profil=${profileInscriptionSlugs[user.profilInscription]}`,
    )
  }

  const enActivite = await prismaClient.mediateurEnActivite.findMany({
    where: {
      mediateurId: user.mediateur.id,
      suppression: null,
    },
    orderBy: {
      creation: 'asc',
    },
    select: {
      id: true,
      structure: {
        select: {
          id: true,
          structureCartographieNationaleId: true,
          nom: true,
          commune: true,
          codePostal: true,
          codeInsee: true,
          siret: true,
          rna: true,
          adresse: true,
          complementAdresse: true,
          typologie: true,
        },
      },
    },
  })

  const lieuxActivite: StructureData[] = enActivite.map((lieuActivite) => ({
    ...lieuActivite.structure,
  }))

  return (
    <InscriptionCard
      title="Renseignez vos lieux d’activité"
      backHref={`/inscription/structure-employeuse?profil=${profileInscriptionSlugs[user.profilInscription]}`}
      nextStepTitle="Récapitulatif de vos informations"
      stepNumber={2}
    >
      <LieuxActiviteForm
        defaultValues={{
          lieuxActivite,
          userId: user.id,
        }}
      />
    </InscriptionCard>
  )
}

export default Page
