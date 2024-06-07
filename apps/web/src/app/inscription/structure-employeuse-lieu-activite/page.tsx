import { redirect } from 'next/navigation'
import React from 'react'
import classNames from 'classnames'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import InscriptionCard from '@app/web/app/inscription/InscriptionCard'
import { prismaClient } from '@app/web/prismaClient'
import StructureEmployeuseLieuActiviteForm from '@app/web/app/inscription/structure-employeuse-lieu-activite/StructureEmployeuseLieuActiviteForm'
import StructureCard from '@app/web/components/structure/StructureCard'
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
          complementAdresse: true,
          typologie: true,
        },
      },
    },
  })

  if (!emploi) {
    redirect(
      `/inscription/structure-employeuse?profil=${profileInscriptionSlugs[user.profilInscription]}`,
    )
  }

  const structure = {
    ...emploi.structure,
    // Should never happen as the siret is required in first step of inscription
    siret: emploi.structure.siret ?? '',
    codeInsee: emploi.structure.codeInsee ?? '',
  }

  return (
    <InscriptionCard
      title="Renseignez vos lieux d’activité"
      backHref={`/inscription/structure-employeuse?profil=${user.profilInscription}`}
      nextStepTitle="Récapitulatif de vos informations"
      stepNumber={2}
    >
      <div
        className={classNames(
          'fr-mb-12v fr-px-6v fr-py-4v fr-width-full fr-border-radius--8 fr-background-alt--blue-france',
        )}
      >
        <p className="fr-text--bold fr-mb-1v">
          Est-ce que votre structure employeuse est également un de vos lieux
          d’activité&nbsp;?
        </p>
        <p className="fr-text--sm fr-mb-0">
          Vos lieux d’activité sont les lieux ou vous accueillez et accompagnez
          vos bénéficiaires (ex : lieu de permanence...)
        </p>
      </div>
      <StructureCard structure={structure} className="fr-mb-12v" />
      <StructureEmployeuseLieuActiviteForm
        userId={user.id}
        structureEmployeuseId={structure.id}
      />
    </InscriptionCard>
  )
}

export default Page
