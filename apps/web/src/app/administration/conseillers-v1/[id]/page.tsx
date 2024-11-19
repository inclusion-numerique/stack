import { notFound } from 'next/navigation'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import Link from 'next/link'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Button from '@codegouvfr/react-dsfr/Button'
import { metadataTitle } from '@app/web/app/metadataTitle'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import { findConseillerNumeriqueV1 } from '@app/web/external-apis/conseiller-numerique/searchConseillerNumeriqueV1'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import { indexedDayLabels } from '@app/web/components/structure/fields/openingHoursHelpers'
import AdministrationInlineLabelsValues from '@app/web/app/administration/AdministrationInlineLabelsValues'
import { createOpenStreetMapLink } from '@app/web/utils/createOpenStreetMapLink'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { prismaClient } from '@app/web/prismaClient'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import AdministrationMailtoLink from '@app/web/app/administration/AdministrationMailtoLink'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import { isConseillerNumeriqueV1DataWithActiveMiseEnRelation } from '@app/web/external-apis/conseiller-numerique/isConseillerNumeriqueV1WithActiveMiseEnRelation'

export const metadata = {
  title: metadataTitle('Conseillers V1 - Détails'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const result = await findConseillerNumeriqueV1({ id, includeDeleted: true })

  if (!result) {
    notFound()
    return null
  }

  const { conseiller, miseEnRelationActive, permanences, miseEnRelations } =
    result

  const coopInfo = await prismaClient.conseillerNumerique.findUnique({
    where: {
      id,
    },
    include: {
      mediateur: {
        include: {
          user: {
            include: {
              coordinateur: true,
            },
          },
        },
      },
    },
  })

  // Pour voir si il y a un compte créé pré-inscription ou pré-check conum
  const userInfo = await prismaClient.user.findFirst({
    where: {
      OR: [
        conseiller.email
          ? {
              email: conseiller.email.trim().toLowerCase(),
            }
          : null,
        conseiller.emailPro
          ? { email: conseiller.emailPro.trim().toLowerCase() }
          : null,
        conseiller.emailConseillerNumerique
          ? { email: conseiller.emailConseillerNumerique.trim().toLowerCase() }
          : null,
      ].filter(onlyDefinedAndNotNull),
    },
  })

  const name = `${conseiller.prenom} ${conseiller.nom}`

  const noAccount = userInfo == null && coopInfo == null
  const inscriptionEnCours = userInfo != null && coopInfo == null
  const inscrit = coopInfo != null

  return (
    <CoopPageContainer>
      <AdministrationBreadcrumbs
        currentPage={`${name}`}
        parents={[
          {
            label: 'Conseillers numériques V1',
            linkProps: { href: '/administration/conseillers-v1' },
          },
        ]}
      />
      <AdministrationTitle
        icon="fr-icon-archive-line"
        actions={
          <Button
            size="small"
            priority="secondary"
            linkProps={{
              href: `/administration/conseillers-v1/${id}/data.json`,
              target: '_blank',
            }}
          >
            Données&nbsp;.json
          </Button>
        }
      >
        Conseiller V1 - {name}
      </AdministrationTitle>

      <p className="fr-text--lg fr-text--medium fr-mb-4v fr-mt-8v">
        Ces informations proviennent de la base de données de la Coop V1.
        <br />
        Elles sont importées lors de l’inscription.
      </p>

      {inscrit && (
        <Notice
          className="fr-notice--success fr-mb-8v"
          title={
            <>
              Inscrit à la Coop depuis le{' '}
              {dateAsDayAndTime(coopInfo.mediateur.user.created)}{' '}
              <Button
                size="small"
                className="fr-ml-2v"
                priority="tertiary no outline"
                iconId="fr-icon-arrow-right-line"
                linkProps={{
                  href: `/administration/utilisateurs/${coopInfo.mediateur.user.id}`,
                }}
              >
                Voir les détails du compte Coop
              </Button>
            </>
          }
        />
      )}
      {inscriptionEnCours && (
        <Notice
          className="fr-notice--new fr-mb-8v"
          title={
            <>
              Inscription en cours depuis le{' '}
              {dateAsDayAndTime(userInfo.created)}{' '}
              <Button
                size="small"
                className="fr-ml-2v"
                priority="tertiary no outline"
                iconId="fr-icon-arrow-right-line"
                linkProps={{
                  href: `/administration/utilisateurs/${userInfo.id}`,
                }}
              >
                Voir les détails du compte Coop
              </Button>
            </>
          }
        />
      )}
      {noAccount && (
        <Notice
          className="fr-notice--error fr-mb-6v"
          title={<>N’a pas de compte sur la Coop</>}
        />
      )}
      {isConseillerNumeriqueV1DataWithActiveMiseEnRelation(result) ? (
        <Notice
          className="fr-notice--success fr-mb-8v"
          title={<>Contrat actif</>}
        />
      ) : (
        <Notice
          className="fr-notice--warning fr-mb-8v"
          title={<>Pas de contrat actif</>}
        />
      )}

      <AdministrationInfoCard title="Détails du conseiller">
        <p className="fr-text--lg fr-text--bold fr-mb-4v fr-mt-8v">
          {conseiller.prenom} {conseiller.nom}
        </p>

        {!!conseiller.deletedAt && (
          <Notice
            className="fr-notice--error fr-mb-6v"
            title={<>Compte supprimé</>}
          />
        )}

        <AdministrationInlineLabelsValues
          items={[
            {
              label: 'Identifiant conseiller numérique',
              value: conseiller.id,
            },
            {
              label: 'Email professionnel',
              value: conseiller.emailPro ? (
                <AdministrationMailtoLink email={conseiller.emailPro} />
              ) : (
                'Non renseigné'
              ),
            },
            {
              label: 'Email conseiller numérique',
              value: conseiller.emailConseillerNumerique ? (
                <AdministrationMailtoLink
                  email={conseiller.emailConseillerNumerique}
                />
              ) : (
                'Non renseigné'
              ),
            },
            {
              label: 'Email personnel',
              value: conseiller.email ? (
                <AdministrationMailtoLink email={conseiller.email} />
              ) : (
                'Non renseigné'
              ),
            },
            {
              label: 'En emploi',
              value:
                typeof conseiller.estEnEmploi === 'boolean'
                  ? conseiller.estEnEmploi
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'En formation',
              value:
                typeof conseiller.estEnFormation === 'boolean'
                  ? conseiller.estEnFormation
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Code postal',
              value: conseiller.codePostal || 'Non renseigné',
            },
            {
              label: 'Commune',
              value: conseiller.nomCommune || 'Non renseigné',
            },
            {
              label: 'Code commune',
              value: conseiller.codeCommune || 'Non renseigné',
            },
            {
              label: 'Code COM',
              value: conseiller.codeCom || 'Non renseigné',
            },
            {
              label: 'Département',
              value: conseiller.codeDepartement || 'Non renseigné',
            },
            {
              label: 'Département structure',
              value: conseiller.codeDepartementStructure || 'Non renseigné',
            },
            {
              label: 'Région',
              value: conseiller.codeRegion || 'Non renseigné',
            },
            {
              label: 'Région structure',
              value: conseiller.codeRegionStructure || 'Non renseigné',
            },
            {
              label: 'Date de création',
              value: dateAsDay(new Date(conseiller.createdAt)),
            },
            {
              label: 'Date de suppression',
              value: conseiller.deletedAt
                ? dateAsDay(new Date(conseiller.deletedAt))
                : 'Non renseigné',
            },
            {
              label: 'Email confirmé le',
              value: conseiller.emailConfirmedAt
                ? dateAsDay(new Date(conseiller.emailConfirmedAt))
                : 'Non renseigné',
            },
            {
              label: 'Dernière mise à jour',
              value: conseiller.updatedAt
                ? dateAsDay(new Date(conseiller.updatedAt))
                : 'Non renseigné',
            },
            {
              label: 'Importé le',
              value: conseiller.importedAt
                ? dateAsDay(new Date(conseiller.importedAt))
                : 'Non renseigné',
            },
            {
              label: 'Recruté',
              value:
                typeof conseiller.estRecrute === 'boolean'
                  ? conseiller.estRecrute
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Identifiant PG',
              value: conseiller.idPG
                ? conseiller.idPG.toString()
                : 'Non renseigné',
            },
            {
              label: 'ID de la structure',
              value: conseiller.structureId || 'Non renseigné',
            },
            {
              label: 'Permanence',
              value:
                typeof conseiller.hasPermanence === 'boolean'
                  ? conseiller.hasPermanence
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            conseiller.mattermost
              ? {
                  label: 'Compte Mattermost',
                  value: conseiller.mattermost.login || 'Non renseigné',
                }
              : null,
            conseiller.mattermost
              ? {
                  label: 'Erreur Mattermost',
                  value: conseiller.mattermost.error ? 'Oui' : 'Non',
                }
              : null,
            conseiller.mattermost
              ? {
                  label:
                    'Erreur de réinitialisation de mot de passe Mattermost',
                  value: conseiller.mattermost.errorResetPassword
                    ? 'Oui'
                    : 'Non',
                }
              : null,
            conseiller.mattermost
              ? {
                  label: 'Hub rejoint sur Mattermost',
                  value: conseiller.mattermost.hubJoined ? 'Oui' : 'Non',
                }
              : null,
            conseiller.coordinateurs && conseiller.coordinateurs.length > 0
              ? {
                  label: 'Coordinateur',
                  value: conseiller.coordinateurs.map((coord) => (
                    <Link
                      href={`/administration/conseillers-v1/${coord.id}`}
                      key={coord.id}
                    >
                      {coord.prenom} {coord.nom}
                    </Link>
                  )),
                }
              : null,
            {
              label: 'A une expérience en médiation numérique',
              value:
                typeof conseiller.aUneExperienceMedNum === 'boolean'
                  ? conseiller.aUneExperienceMedNum
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Certification Pix Formation',
              value:
                typeof conseiller.certificationPixFormation === 'boolean'
                  ? conseiller.certificationPixFormation
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Certifié',
              value:
                typeof conseiller.certifie === 'boolean'
                  ? conseiller.certifie
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Date de naissance',
              value: conseiller.dateDeNaissance
                ? dateAsDay(new Date(conseiller.dateDeNaissance))
                : 'Non renseigné',
            },
            {
              label: 'Date de disponibilité',
              value: conseiller.dateDisponibilite
                ? dateAsDay(new Date(conseiller.dateDisponibilite))
                : 'Non renseigné',
            },
            {
              label: 'Date de fin de formation',
              value: conseiller.dateFinFormation
                ? dateAsDay(new Date(conseiller.dateFinFormation))
                : 'Non renseigné',
            },
            {
              label: 'Date de prise de poste',
              value: conseiller.datePrisePoste
                ? dateAsDay(new Date(conseiller.datePrisePoste))
                : 'Non renseigné',
            },
            {
              label: 'Disponible',
              value:
                typeof conseiller.disponible === 'boolean'
                  ? conseiller.disponible
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Distance maximale',
              value:
                conseiller.distanceMax === undefined
                  ? 'Non renseigné'
                  : `${conseiller.distanceMax} km`,
            },
            {
              label: 'Erreur Email CN',
              value:
                typeof conseiller.emailCNError === 'boolean'
                  ? conseiller.emailCNError
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Clé de confirmation email',
              value: conseiller.emailConfirmationKey || 'Non renseigné',
            },
            {
              label: "Est demandeur d'emploi",
              value:
                typeof conseiller.estDemandeurEmploi === 'boolean'
                  ? conseiller.estDemandeurEmploi
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Est diplômé en médiation numérique',
              value:
                typeof conseiller.estDiplomeMedNum === 'boolean'
                  ? conseiller.estDiplomeMedNum
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Groupe CRA',
              value:
                conseiller.groupeCRA === undefined
                  ? 'Non renseigné'
                  : conseiller.groupeCRA.toString(),
            },
            {
              label: 'Localisation',
              value: conseiller.location
                ? `(${conseiller.location.coordinates[0]}, ${conseiller.location.coordinates[1]})`
                : 'Non renseigné',
            },
            {
              label: 'Mail activité CRA mois',
              value: conseiller.mailActiviteCRAMois || 'Non renseigné',
            },
            {
              label: 'Nom du diplôme en médiation numérique',
              value: conseiller.nomDiplomeMedNum || 'Non renseigné',
            },
            {
              label: 'Pix compétence 1',
              value:
                typeof conseiller.pix?.competence1 === 'boolean'
                  ? conseiller.pix.competence1
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Pix compétence 2',
              value:
                typeof conseiller.pix?.competence2 === 'boolean'
                  ? conseiller.pix.competence2
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Pix compétence 3',
              value:
                typeof conseiller.pix?.competence3 === 'boolean'
                  ? conseiller.pix.competence3
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Date de partage Pix',
              value: conseiller.pix?.datePartage
                ? dateAsDay(new Date(conseiller.pix.datePartage))
                : 'Non renseigné',
            },
            {
              label: 'Palier Pix',
              value: conseiller.pix?.palier
                ? conseiller.pix.palier.toString()
                : 'Non renseigné',
            },
            {
              label: 'Partage Pix',
              value:
                typeof conseiller.pix?.partage === 'boolean'
                  ? conseiller.pix.partage
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Erreur de réinitialisation du mot de passe CN',
              value:
                typeof conseiller.resetPasswordCNError === 'boolean'
                  ? conseiller.resetPasswordCNError
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            {
              label: 'Sexe',
              value: conseiller.sexe || 'Non renseigné',
            },
            {
              label: "Date d'envoi du sondage",
              value: conseiller.sondageSentAt
                ? dateAsDay(new Date(conseiller.sondageSentAt))
                : 'Non renseigné',
            },
            {
              label: 'Token du sondage',
              value: conseiller.sondageToken || 'Non renseigné',
            },
            {
              label: 'Statut',
              value: conseiller.statut || 'Non renseigné',
            },
            {
              label: 'Téléphone',
              value: conseiller.telephone || 'Non renseigné',
            },
            {
              label: 'Téléphone professionnel',
              value: conseiller.telephonePro || 'Non renseigné',
            },
            {
              label: 'Désabonné le',
              value: conseiller.unsubscribedAt
                ? dateAsDay(new Date(conseiller.unsubscribedAt))
                : 'Non renseigné',
            },
            {
              label: 'Utilisateur créé',
              value:
                typeof conseiller.userCreated === 'boolean'
                  ? conseiller.userCreated
                    ? 'Oui'
                    : 'Non'
                  : 'Non renseigné',
            },
            conseiller.supHierarchique
              ? {
                  label: 'Supérieur hiérarchique - Nom',
                  value: conseiller.supHierarchique.nom || 'Non renseigné',
                }
              : null,
            conseiller.supHierarchique
              ? {
                  label: 'Supérieur hiérarchique - Prénom',
                  value: conseiller.supHierarchique.prenom || 'Non renseigné',
                }
              : null,
            conseiller.supHierarchique
              ? {
                  label: 'Supérieur hiérarchique - Email',
                  value: conseiller.supHierarchique.email ? (
                    <AdministrationMailtoLink
                      email={conseiller.supHierarchique.email}
                    />
                  ) : (
                    'Non renseigné'
                  ),
                }
              : null,
            conseiller.supHierarchique
              ? {
                  label: 'Supérieur hiérarchique - Fonction',
                  value: conseiller.supHierarchique.fonction || 'Non renseigné',
                }
              : null,
            conseiller.supHierarchique
              ? {
                  label: 'Supérieur hiérarchique - Numéro de téléphone',
                  value:
                    conseiller.supHierarchique.numeroTelephone ||
                    'Non renseigné',
                }
              : null,
            conseiller.ruptures && conseiller.ruptures.length > 0
              ? {
                  label: 'Ruptures',
                  value: conseiller.ruptures.map((rupture, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                      <p>
                        Date de rupture:{' '}
                        {rupture.dateRupture
                          ? dateAsDay(new Date(rupture.dateRupture))
                          : 'Non renseigné'}
                      </p>
                      <p>
                        Motif de rupture:{' '}
                        {rupture.motifRupture || 'Non renseigné'}
                      </p>
                      <p>
                        ID de la structure:{' '}
                        {rupture.structureId?.toString('hex') ||
                          'Non renseigné'}
                      </p>
                    </div>
                  )),
                }
              : null,
          ].filter(Boolean)} // Filter out null entries
        />
      </AdministrationInfoCard>

      <AdministrationInfoCard title="Contrat actif">
        {!miseEnRelationActive && (
          <Notice
            title={<>Aucun contrat actif trouvé</>}
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
                    miseEnRelationActive.structureObj.conventionnement.statut,
                },
                {
                  label: 'Nb de postes attribués',
                  value:
                    miseEnRelationActive.structureObj.conventionnement?.dossierReconventionnement?.nbPostesAttribuees?.toString(),
                },
              ]}
            />
          </div>
        )}
      </AdministrationInfoCard>

      <AdministrationInfoCard
        title={`${permanences.length} permanence${sPluriel(permanences.length)}`}
      >
        {permanences.map((permanence) => (
          <div key={permanence._id.toString('hex')}>
            <p className="fr-text--lg fr-text--medium fr-mb-4v fr-mt-8v">
              {permanence.nomEnseigne}
            </p>

            <AdministrationInlineLabelsValues
              items={[
                {
                  label: 'Adresse',
                  value: (
                    <>
                      {permanence.adresse.numeroRue} {permanence.adresse.rue},{' '}
                      {permanence.adresse.codePostal} {permanence.adresse.ville}
                    </>
                  ),
                },
                permanence.location?.coordinates
                  ? {
                      label: 'Géolocalisation',
                      value: (
                        <a
                          href={createOpenStreetMapLink({
                            coordinates: permanence.location.coordinates,
                          })}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Voir sur OpenStreetMap
                        </a>
                      ),
                    }
                  : null,
                {
                  label: 'Téléphone',
                  value: permanence.numeroTelephone || 'Non renseigné',
                },
                {
                  label: 'Email',
                  value: permanence.email || 'Non renseigné',
                },
                {
                  label: 'Site web',
                  value: permanence.siteWeb || 'Non renseigné',
                },
                {
                  label: 'SIRET',
                  value: permanence.siret,
                },
                {
                  label: 'Type d’accès',
                  value: permanence.typeAcces.join(', '),
                },
              ]}
            />
            <p className="fr-text--medium fr-mb-4v fr-mt-8v">
              Horaires d’ouverture&nbsp;:
            </p>

            <AdministrationInlineLabelsValues
              items={permanence.horaires.map((jour, index) => ({
                label: indexedDayLabels[index],
                value: (
                  <>
                    Matin&nbsp;: {jour.matin[0]} - {jour.matin[1]},
                    Après-midi&nbsp;: {jour.apresMidi[0]} - {jour.apresMidi[1]}
                  </>
                ),
              }))}
            />
          </div>
        ))}
      </AdministrationInfoCard>

      <AdministrationInfoCard title="Historique des mises en relation (contrats)">
        {miseEnRelations.length === 0 && (
          <Notice
            title={<>Aucune mise en relation trouvée</>}
            className="fr-notice--alert"
          />
        )}
        {miseEnRelations.map((miseEnRelation, index) => (
          <div key={miseEnRelation._id.toString('hex')}>
            {index !== 0 && <hr className="fr-separator-6v" />}

            <p className="fr-text--lg fr-text--medium fr-mb-4v fr-mt-8v">
              {miseEnRelation.structureObj.nom}
            </p>

            <p className="fr-text--medium fr-mb-4v fr-mt-8v">
              Informations sur le contrat&nbsp;:
            </p>
            <AdministrationInlineLabelsValues
              items={[
                {
                  label: 'Date de recrutement',
                  value: miseEnRelation.dateRecrutement
                    ? dateAsDay(new Date(miseEnRelation.dateRecrutement))
                    : 'Non renseigné',
                },
                {
                  label: 'Date de début de contrat',
                  value: miseEnRelation.dateDebutDeContrat
                    ? dateAsDay(new Date(miseEnRelation.dateDebutDeContrat))
                    : 'Non renseigné',
                },
                {
                  label: 'Date de fin de contrat',
                  value: miseEnRelation.dateFinDeContrat
                    ? dateAsDay(new Date(miseEnRelation.dateFinDeContrat))
                    : 'Non renseigné',
                },
                {
                  label: 'Type de contrat',
                  value: miseEnRelation.typeDeContrat,
                },
                {
                  label: 'Statut de la mise en relation',
                  value: miseEnRelation.statut,
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
                  value: miseEnRelation.structureObj._id.toString('hex'),
                },
                {
                  label: 'Adresse',
                  value: (
                    <>
                      {miseEnRelation.structureObj.insee.adresse.numero_voie}{' '}
                      {miseEnRelation.structureObj.insee.adresse.libelle_voie},{' '}
                      {miseEnRelation.structureObj.insee.adresse.code_postal}{' '}
                      {
                        miseEnRelation.structureObj.insee.adresse
                          .libelle_commune
                      }
                    </>
                  ),
                },
                miseEnRelation.structureObj.location?.coordinates
                  ? {
                      label: 'Géolocalisation',
                      value: (
                        <a
                          href={`https://www.openstreetmap.org/?mlat=${miseEnRelation.structureObj.location.coordinates[1]}&mlon=${miseEnRelation.structureObj.location.coordinates[0]}#map=15/${miseEnRelation.structureObj.location.coordinates[1]}/${miseEnRelation.structureObj.location.coordinates[0]}`}
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
                  value: `${miseEnRelation.structureObj.contact.prenom} ${miseEnRelation.structureObj.contact.nom}`,
                },
                {
                  label: 'Fonction',
                  value: miseEnRelation.structureObj.contact.fonction,
                },
                {
                  label: 'Téléphone',
                  value:
                    miseEnRelation.structureObj.contact.telephone ||
                    'Non renseigné',
                },
                {
                  label: 'Email',
                  value:
                    miseEnRelation.structureObj.contact.email ||
                    'Non renseigné',
                },
                {
                  label: 'SIRET',
                  value: miseEnRelation.structureObj.siret,
                },
                {
                  label: 'Type',
                  value: miseEnRelation.structureObj.type,
                },
                {
                  label: 'Date de début de mission',
                  value: dateAsDay(
                    new Date(miseEnRelation.structureObj.dateDebutMission),
                  ),
                },
                {
                  label: 'Nombre de conseillers souhaités',
                  value:
                    miseEnRelation.structureObj.nombreConseillersSouhaites?.toString(),
                },
                {
                  label: 'Conventionnement statut',
                  value: miseEnRelation.structureObj.conventionnement.statut,
                },
                {
                  label: 'Nb de postes attribués',
                  value:
                    miseEnRelation.structureObj.conventionnement?.dossierReconventionnement?.nbPostesAttribuees?.toString(),
                },
              ]}
            />
          </div>
        ))}
      </AdministrationInfoCard>
    </CoopPageContainer>
  )
}

export default Page
