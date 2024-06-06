import { redirect } from 'next/navigation'
import React from 'react'
import classNames from 'classnames'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import InscriptionCard from '@app/web/app/inscription/InscriptionCard'
import { prismaClient } from '@app/web/prismaClient'
import StructureEmployeuseLieuActiviteForm from '@app/web/app/inscription/structure-employeuse-lieu-activite/StructureEmployeuseLieuActiviteForm'
import { StructureInfoWithId } from '@app/web/structure/structuresInfoFromUniteLegale'
import { TypologieStructure } from '@app/web/structure/typologieStructure'
import StructureCard from '@app/web/components/structure/StructureCard'

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

  if (!emploi) {
    redirect(
      `/inscription/structure-employeuse?profil=${user.profilInscription}`,
    )
  }

  const structureInfo: StructureInfoWithId = {
    id: emploi.structure.id,
    siret: emploi.structure.siretOuRna ?? '',
    nom: emploi.structure.nom,
    // Todo adresse helpers
    adresse: emploi.structure.adresse,
    codeInsee: emploi.structure.codeInsee ?? '',
    commune: emploi.structure.commune,
    typologie: emploi.structure.typologie as TypologieStructure | null,
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
      <StructureCard
        structure={{ ...structureInfo, siretOuRna: structureInfo.siret }}
        className="fr-mb-12v"
      />
      <StructureEmployeuseLieuActiviteForm
        userId={user.id}
        structureEmployeuse={structureInfo}
      />
    </InscriptionCard>
  )
}

export default Page
