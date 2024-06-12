import { redirect } from 'next/navigation'
import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { prismaClient } from '@app/web/prismaClient'
import {
  profileInscriptionLabels,
  profileInscriptionSlugs,
} from '@app/web/inscription/profilInscription'
import IconInSquare from '@app/web/components/IconInSquare'
import InfoLabelValue from '@app/web/components/InfoLabelValue'
import StructureCard from '@app/web/components/structure/StructureCard'
import ValiderInscriptionForm from '@app/web/app/inscription/(steps)/recapitulatif/ValiderInscriptionForm'

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

  if (!emploi) {
    redirect(
      `/inscription/structure-employeuse?profil=${profileInscriptionSlugs[user.profilInscription]}`,
    )
  }

  return (
    <InscriptionCard
      title="Récapitulatif de vos informations"
      backHref="/inscription/lieux-activite"
      stepNumber={3}
    >
      <p style={{ marginTop: '-32px' }}>
        Vérifiez que les informations sont exacts avant de valider votre
        inscription.
      </p>
      <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-mt-12v">
        <IconInSquare iconId="fr-icon-account-circle-line" />{' '}
        <h2 className="fr-h6 fr-mb-0 fr-text-title--blue-france">
          Mes informations
        </h2>
      </div>
      <div className="fr-width-full fr-border-radius--8 fr-p-6v fr-p-md-8v fr-border fr-mt-6v">
        <InfoLabelValue
          label="Profession"
          value={profileInscriptionLabels[user.profilInscription]}
        />
        <InfoLabelValue
          labelClassName="fr-mt-4v"
          label="Nom"
          value={user.name}
        />
        <InfoLabelValue
          labelClassName="fr-mt-4v"
          label="Adresse e-mail"
          value={user.email}
        />
      </div>
      <hr className="fr-separator-12v" />
      <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-mt-12v fr-mb-6v">
        <IconInSquare iconId="ri-home-smile-2-line" />
        <h2 className="fr-h6 fr-mb-0 fr-text-title--blue-france">
          Ma structure employeuse
        </h2>
        <span className="fr-flex-grow-1" />
        <Button
          priority="tertiary no outline"
          linkProps={{
            href: `/inscription/structure-employeuse?profil=${profileInscriptionSlugs[user.profilInscription]}`,
          }}
          iconId="fr-icon-edit-line"
          iconPosition="right"
          size="small"
        >
          Modifier
        </Button>
      </div>
      <StructureCard structure={emploi.structure} className="fr-mt-4v" />
      <hr className="fr-separator-12v" />
      <div className="fr-flex fr-align-items-center fr-flex-gap-3v fr-mt-12v fr-mb-6v">
        <IconInSquare iconId="ri-home-office-line" />{' '}
        <h2 className="fr-h6 fr-mb-0 fr-text-title--blue-france">
          {enActivite.length === 1
            ? 'Mon lieu d’activité'
            : `Mes lieux d’activité · ${enActivite.length}`}
        </h2>
        <span className="fr-flex-grow-1" />
        <Button
          priority="tertiary no outline"
          linkProps={{
            href: `/inscription/structure-employeuse-lieu-activite`,
          }}
          iconId="fr-icon-edit-line"
          iconPosition="right"
          size="small"
        >
          Modifier
        </Button>
      </div>
      {enActivite.map((lieu) => (
        <StructureCard
          key={lieu.id}
          structure={lieu.structure}
          className="fr-mt-4v"
        />
      ))}
      <hr className="fr-separator-12v" />
      <ValiderInscriptionForm userId={user.id} />
    </InscriptionCard>
  )
}

export default Page
