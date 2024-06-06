import { redirect } from 'next/navigation'
import React from 'react'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import InscriptionCard from '@app/web/app/inscription/InscriptionCard'
import { prismaClient } from '@app/web/prismaClient'

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
      `/inscription/structure-employeuse?profil=${user.profilInscription}`,
    )
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
          siretOuRna: true,
          adresse: true,
          complementAdresse: true,
          typologie: true,
        },
      },
    },
  })

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
          siretOuRna: true,
          adresse: true,
          complementAdresse: true,
          typologie: true,
        },
      },
    },
  })

  if (!emploi) {
    redirect(
      `/inscription/structure-employeuse?profil=${user.profilInscription}`,
    )
  }

  console.log('ACTIVITE', enActivite)

  return (
    <InscriptionCard
      title="Récapitulatif de vos informations"
      backHref="/inscription/lieux-activite"
      stepNumber={3}
    >
      🚧 Page en construction 🚧
    </InscriptionCard>
  )
}

export default Page
