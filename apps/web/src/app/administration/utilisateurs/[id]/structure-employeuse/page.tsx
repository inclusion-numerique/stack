import { notFound } from 'next/navigation'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'
import type { Structure } from '@prisma/client'
import { metadataTitle } from '@app/web/app/metadataTitle'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import AdministrationInlineLabelsValues, {
  type LabelAndValue,
} from '@app/web/app/administration/AdministrationInlineLabelsValues'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { prismaClient } from '@app/web/prismaClient'
import { getUserDisplayName } from '@app/web/utils/user'
import { getUserLifecycleBadge } from '@app/web/app/administration/utilisateurs/getUserLifecycleBadge'
import { findConseillerNumeriqueV1 } from '@app/web/external-apis/conseiller-numerique/searchConseillerNumeriqueV1'
import AdministrationStructureEmployeuseFromContratActifForm from '@app/web/app/administration/utilisateurs/[id]/structure-employeuse/AdministrationStructureEmployeuseFromContratActifForm'

export const metadata = {
  title: metadataTitle('Utilisateurs - Structure employeuse'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const getStructuresInfos = ({
  id,
  commune,
  adresse,
  codeInsee,
  codePostal,
  siret,
  rna,
  nom,
  creation,
  suppression,
}: Structure): LabelAndValue[] => [
  {
    label: 'Nom',
    value: nom,
  },
  {
    label: 'Id',
    value: (
      <Link href={`/administration/structures/${id}`} target="_blank">
        {id}
      </Link>
    ),
  },
  {
    label: 'Adresse',
    value: adresse || 'Non renseignée',
  },
  {
    label: 'Siret',
    value: siret || 'Non renseigné',
  },
  {
    label: 'Rna',
    value: rna || 'Non renseigné',
  },
  {
    label: 'Commune',
    value: commune || 'Non renseignée',
  },
  {
    label: 'Code Insee',
    value: codeInsee || 'Non renseigné',
  },
  {
    label: 'Code postal',
    value: codePostal || 'Non renseigné',
  },
  {
    label: 'Créé le',
    value: dateAsDay(creation),
  },
  {
    label: 'Supprimée le',
    value: suppression ? dateAsDay(suppression) : '-',
  },
]

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
    include: {
      mediateur: {
        include: {
          conseillerNumerique: true,
          coordinations: {
            include: {
              coordinateur: {
                select: {
                  id: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
          enActivite: {
            include: {
              structure: true,
            },
          },
          _count: {
            select: {
              activites: true,
              beneficiaires: true,
            },
          },
        },
      },
      coordinateur: {
        include: {
          mediateursCoordonnes: {
            include: {
              mediateur: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      accounts: true,
      sessions: true,
      uploads: true,
      mutations: true,
      emplois: {
        include: {
          structure: true,
        },
        orderBy: {
          creation: 'desc',
        },
      },
      usurpateur: true,
    },
  })

  if (!user) {
    notFound()
    return null
  }

  const name = getUserDisplayName(user)

  const { mediateur, coordinateur, emplois } = user

  const conseillerNumeriqueInfo = await findConseillerNumeriqueV1(
    user.mediateur?.conseillerNumerique?.id
      ? {
          id: user.mediateur.conseillerNumerique.id,
          includeDeleted: true,
        }
      : {
          email: user.email,
          includeDeleted: true,
        },
  )

  const miseEnRelationActive = conseillerNumeriqueInfo?.miseEnRelationActive

  const structureEmployeuseActive = emplois.at(0)

  const canUseContratActifForNewStructureEmployeuse =
    !!miseEnRelationActive &&
    miseEnRelationActive.structureObj.siret !==
      structureEmployeuseActive?.structure.siret

  return (
    <CoopPageContainer>
      <AdministrationBreadcrumbs
        currentPage="Structure employeuse"
        parents={[
          {
            label: 'Utilisateurs',
            linkProps: { href: '/administration/utilisateurs' },
          },
          {
            label: name,
            linkProps: { href: `/administration/utilisateurs/${id}` },
          },
        ]}
      />
      <AdministrationTitle icon="fr-icon-user-line">
        {name} - Structure employeuse <span className="fr-mx-1v" />{' '}
        {getUserLifecycleBadge(user, { small: false })}
      </AdministrationTitle>

      {emplois.length > 0 ? (
        <AdministrationInfoCard title="Structures employeuses">
          {emplois.map((emploi) => (
            <div key={emploi.id}>
              <p className="fr-text--lg fr-text--medium fr-mb-4v fr-mt-8v">
                {emploi.structure.nom}
              </p>
              <AdministrationInlineLabelsValues
                items={[
                  {
                    label: 'Lien d’emploi créé le',
                    value: dateAsDay(emploi.creation),
                  },
                  {
                    label: 'Lien d’emploi supprimé le',
                    value: emploi.suppression
                      ? dateAsDay(emploi.suppression)
                      : '-',
                  },
                  ...getStructuresInfos(emploi.structure),
                ]}
              />
            </div>
          ))}
        </AdministrationInfoCard>
      ) : (
        (!!coordinateur || !!mediateur) && (
          <Notice
            className="fr-notice--alert fr-mb-6v"
            title={<>Aucune structure employeuse</>}
          />
        )
      )}

      <AdministrationInfoCard title="Contrat actif">
        {!!conseillerNumeriqueInfo &&
          !conseillerNumeriqueInfo.miseEnRelationActive && (
            <Notice
              title={
                <>
                  Aucun contrat actif trouvé dans la base de données des
                  conseillers numériques V1
                </>
              }
              className="fr-notice--alert"
            />
          )}
        {!!miseEnRelationActive && (
          <div key={miseEnRelationActive._id.toString('hex')}>
            <p className="fr-text--lg fr-text--medium fr-mb-4v fr-mt-8v">
              {miseEnRelationActive.structureObj.nom}
            </p>

            <p className="fr-text--medium fr-mb-4v fr-mt-8v">
              Informations sur le contrat&nbsp;:
            </p>
            <AdministrationInlineLabelsValues
              items={[
                {
                  label: 'Date de recrutement',
                  value: miseEnRelationActive.dateRecrutement
                    ? dateAsDay(new Date(miseEnRelationActive.dateRecrutement))
                    : 'Non renseigné',
                },
                {
                  label: 'Date de début de contrat',
                  value: miseEnRelationActive.dateDebutDeContrat
                    ? dateAsDay(
                        new Date(miseEnRelationActive.dateDebutDeContrat),
                      )
                    : 'Non renseigné',
                },
                {
                  label: 'Date de fin de contrat',
                  value: miseEnRelationActive.dateFinDeContrat
                    ? dateAsDay(new Date(miseEnRelationActive.dateFinDeContrat))
                    : 'Non renseigné',
                },
                {
                  label: 'Type de contrat',
                  value: miseEnRelationActive.typeDeContrat,
                },
                {
                  label: 'Statut de la mise en relation',
                  value: miseEnRelationActive.statut,
                },
              ]}
            />
            <p className="fr-text--medium fr-mb-4v fr-mt-8v">
              Informations sur la structure&nbsp;:
            </p>
            <AdministrationInlineLabelsValues
              items={[
                {
                  label: 'Identifiant structure',
                  value: miseEnRelationActive.structureObj._id.toString('hex'),
                },
                {
                  label: 'Adresse',
                  value: (
                    <>
                      {
                        miseEnRelationActive.structureObj.insee.adresse
                          .numero_voie
                      }{' '}
                      {
                        miseEnRelationActive.structureObj.insee.adresse
                          .libelle_voie
                      }
                      ,{' '}
                      {
                        miseEnRelationActive.structureObj.insee.adresse
                          .code_postal
                      }{' '}
                      {
                        miseEnRelationActive.structureObj.insee.adresse
                          .libelle_commune
                      }
                    </>
                  ),
                },
                miseEnRelationActive.structureObj.location?.coordinates
                  ? {
                      label: 'Géolocalisation',
                      value: (
                        <a
                          href={`https://www.openstreetmap.org/?mlat=${miseEnRelationActive.structureObj.location.coordinates[1]}&mlon=${miseEnRelationActive.structureObj.location.coordinates[0]}#map=15/${miseEnRelationActive.structureObj.location.coordinates[1]}/${miseEnRelationActive.structureObj.location.coordinates[0]}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Voir sur OpenStreetMap
                        </a>
                      ),
                    }
                  : null,
                {
                  label: 'Directeur/trice',
                  value: `${miseEnRelationActive.structureObj.contact.prenom} ${miseEnRelationActive.structureObj.contact.nom}`,
                },
                {
                  label: 'Fonction',
                  value: miseEnRelationActive.structureObj.contact.fonction,
                },
                {
                  label: 'Téléphone',
                  value:
                    miseEnRelationActive.structureObj.contact.telephone ||
                    'Non renseigné',
                },
                {
                  label: 'Email',
                  value:
                    miseEnRelationActive.structureObj.contact.email ||
                    'Non renseigné',
                },
                {
                  label: 'SIRET',
                  value: miseEnRelationActive.structureObj.siret,
                },
                {
                  label: 'Type',
                  value: miseEnRelationActive.structureObj.type,
                },
                {
                  label: 'Date de début de mission',
                  value: dateAsDay(
                    new Date(
                      miseEnRelationActive.structureObj.dateDebutMission,
                    ),
                  ),
                },
                {
                  label: 'Nombre de conseillers souhaités',
                  value:
                    miseEnRelationActive.structureObj.nombreConseillersSouhaites?.toString(),
                },
                {
                  label: 'Conventionnement statut',
                  value:
                    miseEnRelationActive.structureObj.conventionnement
                      ?.statut ?? '-',
                },
                {
                  label: 'Nb de postes attribués',
                  value:
                    miseEnRelationActive.structureObj.conventionnement?.dossierReconventionnement?.nbPostesAttribuees?.toString(),
                },
              ]}
            />
            {canUseContratActifForNewStructureEmployeuse && (
              <>
                <Notice
                  title={
                    <>
                      Le contrat actif de l’utilisateur ne correspond pas à sa
                      structure employeuse. Vous pouvez l’utiliser pour mettre à
                      jour les informations de la structure employeuse.
                    </>
                  }
                  className="fr-notice--new fr-mt-6v"
                />
                <div className="fr-mt-6v">
                  <AdministrationStructureEmployeuseFromContratActifForm
                    miseEnRelationActive={miseEnRelationActive}
                    user={user}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </AdministrationInfoCard>
    </CoopPageContainer>
  )
}

export default Page
