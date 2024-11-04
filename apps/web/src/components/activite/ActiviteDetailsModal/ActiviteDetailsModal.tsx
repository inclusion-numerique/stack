'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import Tag from '@codegouvfr/react-dsfr/Tag'
import Link from 'next/link'
import classNames from 'classnames'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createToast } from '@app/ui/toast/createToast'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import Stars from '@app/web/components/Stars'
import { isBeneficiaireEmpty } from '@app/web/beneficiaire/isBeneficiaireAnonymous'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import { trpc } from '@app/web/trpc'
import {
  genreValues,
  sexLabels,
  statutSocialLabels,
  statutSocialValues,
  trancheAgeLabels,
  trancheAgeValues,
} from '@app/web/beneficiaire/beneficiaire'
import { formatActiviteDayDate } from '@app/web/utils/activiteDayDateFormat'
import {
  autonomieStars,
  degreDeFinalisationDemarcheHints,
  degreDeFinalisationDemarcheLabels,
  materielLabels,
  niveauAtelierStars,
  structuresRedirectionLabels,
  thematiqueDemarcheAdministrativeLabels,
  thematiqueLabels,
  typeActiviteIllustrations,
  typeActiviteLabels,
} from '@app/web/cra/cra'
import {
  ActiviteDetailsDynamicModal,
  type ActiviteDetailsDynamicModalState,
} from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsDynamicModal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { createDupliquerActiviteLink } from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/createDupliquerActiviteLink'
import { createModifierActiviteLink } from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/createModifierActiviteLink'
import type { ActiviteForList } from '@app/web/cra/activitesQueries'
import { createParticipantsAnonymesForBeneficiaires } from '@app/web/beneficiaire/createParticipantsAnonymesForBeneficiaires'
import { dureeAsString } from '@app/web/utils/dureeAsString'
import styles from './ActiviteDetailsModal.module.css'

const ListItem = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <li className={classNames('fr-mb-1v fr-text--sm fr-text--medium', className)}>
    <div className=" fr-flex fr-flex-gap-1v">{children}</div>
  </li>
)

const getActiviteLocationString = (activite: ActiviteForList) => {
  const { structure, lieuCodePostal, lieuCommune, typeLieu } = activite

  if (structure) {
    return `${structure.nom} · ${structure.codePostal} ${structure.commune}`
  }

  return lieuCommune
    ? `${lieuCodePostal} ${lieuCommune}`
    : typeLieu === 'ADistance'
      ? 'À distance'
      : 'Non renseigné'
}

const ActiviteDetailsModal = ({
  initialState,
}: {
  initialState?: ActiviteDetailsDynamicModalState
}) => {
  const state = ActiviteDetailsDynamicModal.useState() ?? initialState

  const router = useRouter()
  const mutation = trpc.cra.deleteActivite.useMutation()

  // Get full path with query params for actionsRetourPath
  const currentPath = usePathname()
  const searchParamsString = useSearchParams().toString()
  const actionsRetourPath = `${currentPath}${searchParamsString ? `?${searchParamsString}` : ''}`

  const [deletionConfirmation, setDeletionConfirmation] = useState(false)
  useEffect(() => {
    // Cancel deletion state on state change
    setDeletionConfirmation(false)
  }, [state?.activite.id])

  const onDeleteButtonClick = () => {
    setDeletionConfirmation(true)
  }
  if (!state) {
    return null
  }

  const { activite } = state

  const {
    type,
    id,
    duree,
    autonomie,
    date,
    degreDeFinalisation,
    structureDeRedirection,
    orienteVersStructure,
    niveau,
    notes,
    titreAtelier,
    materiel,
    precisionsDemarche,
    accompagnements,
    thematiques,
    thematiquesDemarche,
  } = activite

  const onDelete = async () => {
    try {
      await mutation.mutateAsync({
        activiteId: id,
      })
      ActiviteDetailsDynamicModal.close()
      router.refresh()
      createToast({
        priority: 'success',
        message: <>L’activité a bien été supprimée</>,
      })

      // Reset mutation after modal close so loading states are reset
      setTimeout(() => {
        mutation.reset()
      }, 200)
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors de la suppression de l’activité',
      })
      mutation.reset()
    }
  }

  const isLoading = mutation.isPending || mutation.isSuccess

  const dureeString = dureeAsString(duree)
  const locationString = getActiviteLocationString(activite)

  const thematiqueTags = [
    ...thematiques.map((thematique) => thematiqueLabels[thematique]),
    ...thematiquesDemarche.map(
      (thematique) => thematiqueDemarcheAdministrativeLabels[thematique],
    ),
  ]

  const donneesItems: ReactNode[] = [
    // Material utilisé
    materiel.length > 0 &&
      `Matériel utilisé : ${materiel.map((materielValue) => materielLabels[materielValue]).join(', ')}`,
    // Thématiques
    <>
      Thématique{sPluriel(thematiqueTags.length)}&nbsp;:{' '}
      <div className="fr-text--regular fr-flex fr-flex-wrap fr-flex-gap-2v">
        {thematiqueTags.map((label) => (
          <Tag small key={label}>
            {label}
          </Tag>
        ))}
      </div>
    </>,
    // Demarche
    !!precisionsDemarche && `Démarche : ${precisionsDemarche}`,
    // Autonomie
    !!autonomie && (
      <>
        Autonomie du bénéficiaire&nbsp;:{' '}
        <Stars count={autonomieStars[autonomie]} max={3} />
      </>
    ),
    // Finalisation demarche
    !!degreDeFinalisation && (
      <>
        Démarche finalisée&nbsp;:{' '}
        {degreDeFinalisationDemarcheLabels[degreDeFinalisation]}
        {degreDeFinalisationDemarcheHints[degreDeFinalisation] &&
          `, ${(
            degreDeFinalisationDemarcheHints[degreDeFinalisation] ?? ''
          ).toLocaleLowerCase()}`}
      </>
    ),
    // Redirection structure accompagnement individuel
    !!orienteVersStructure &&
      !!structureDeRedirection &&
      `Orienté vers ${structuresRedirectionLabels[structureDeRedirection]}`,
    // Redirection structure démarche
    degreDeFinalisation === 'OrienteVersStructure' &&
      !!structureDeRedirection &&
      `Orienté vers ${structuresRedirectionLabels[structureDeRedirection]}`,
    // Niveau atelier
    !!niveau && (
      <>
        Niveau de l’atelier&nbsp;:{' '}
        <Stars count={niveauAtelierStars[niveau]} max={3} />
      </>
    ),
  ].filter(Boolean)

  const beneficiaires = accompagnements.map(
    (accompagnement) => accompagnement.beneficiaire,
  )

  const beneficiaireUnique = type === 'Collectif' ? null : beneficiaires[0]

  const beneficiairesCollectif = type === 'Collectif' ? beneficiaires : null

  // Informations si le beneficiaire est anonyme et à des informations supplémentaires
  const infosBeneficiaireAnonyme =
    !!beneficiaireUnique &&
    beneficiaireUnique.anonyme &&
    !isBeneficiaireEmpty(beneficiaireUnique)
      ? [
          [
            beneficiaireUnique.genre &&
              beneficiaireUnique.genre !== 'NonCommunique' &&
              sexLabels[beneficiaireUnique.genre],
            beneficiaireUnique.trancheAge &&
              beneficiaireUnique.trancheAge !== 'NonCommunique' &&
              trancheAgeLabels[beneficiaireUnique.trancheAge],
            beneficiaireUnique.statutSocial &&
              beneficiaireUnique.statutSocial !== 'NonCommunique' &&
              statutSocialLabels[beneficiaireUnique.statutSocial],
          ]
            .filter(Boolean)
            .join(', '),
          !!beneficiaireUnique.commune &&
            `${beneficiaireUnique.communeCodePostal} ${beneficiaireUnique.commune}`.trim(),
          beneficiaireUnique.vaPoursuivreParcoursAccompagnement === null
            ? null
            : beneficiaireUnique.vaPoursuivreParcoursAccompagnement
              ? 'Poursuit son parcours d’accompagnement de médiation numérique'
              : 'Ne poursuit pas son parcours d’accompagnement de médiation numérique',
        ].filter(Boolean)
      : null

  const participants = beneficiairesCollectif
    ? createParticipantsAnonymesForBeneficiaires(beneficiairesCollectif)
    : null

  const participantsCountTitle = participants
    ? participants.beneficiairesSuivis.length > 0 &&
      participants.participantsAnonymes.total > 0
      ? // Both participants suivis and anonymes
        `${(beneficiairesCollectif ?? []).length} participant${sPluriel((beneficiairesCollectif ?? []).length)} dont ${
          participants.beneficiairesSuivis.length
        } bénéficiaire${sPluriel(participants.beneficiairesSuivis.length)} suivi${sPluriel(
          participants.beneficiairesSuivis.length,
        )} et ${
          participants.participantsAnonymes.total
        } anonyme${sPluriel(participants.participantsAnonymes.total)}`
      : participants.beneficiairesSuivis.length > 0
        ? // Only participants suivis
          `${participants.beneficiairesSuivis.length} bénéficiaire${sPluriel(participants.beneficiairesSuivis.length)} suivi${sPluriel(participants.beneficiairesSuivis.length)}`
        : // Only participants anonymes
          `${participants.participantsAnonymes.total} participant${sPluriel(participants.participantsAnonymes.total)} anonyme${sPluriel(participants.participantsAnonymes.total)}`
    : null

  const participantsAnonymesInfos =
    participants && participants.participantsAnonymes.total > 0
      ? [
          genreValues
            .map((enumValue) => ({
              enumValue,
              count:
                participants.participantsAnonymes[`genre${enumValue}`] || 0,
              label: sexLabels[enumValue].toLocaleLowerCase(),
              prefix: enumValue === 'NonCommunique' ? ' de genre' : '',
              pluralize: enumValue !== 'NonCommunique',
            }))
            .filter(({ count }) => count > 0)
            .map(
              ({ label, count, prefix, pluralize }) =>
                `${count}${prefix} ${label}${sPluriel(pluralize ? count : 1)}`,
            )
            .join(', '),
          trancheAgeValues
            .map((enumValue) => ({
              enumValue,
              count:
                participants.participantsAnonymes[`trancheAge${enumValue}`] ||
                0,
              label: trancheAgeLabels[enumValue].toLocaleLowerCase(),
              prefix: enumValue === 'NonCommunique' ? ' de tranche d’âge' : '',
              pluralize: enumValue !== 'NonCommunique',
            }))
            .filter(({ count }) => count > 0)
            .map(({ label, count, prefix }) => `${count} ×${prefix} ${label}`)
            .join(', '),
          statutSocialValues
            .map((enumValue) => ({
              enumValue,
              count:
                participants.participantsAnonymes[`statutSocial${enumValue}`] ||
                0,
              label: statutSocialLabels[enumValue].toLocaleLowerCase(),
              prefix: enumValue === 'NonCommunique' ? ' de statut social' : '',
              pluralize: enumValue !== 'NonCommunique',
            }))
            .filter(({ count }) => count > 0)
            .map(
              ({ label, count, prefix, pluralize }) =>
                `${count}${prefix} ${label}${sPluriel(pluralize ? count : 1)}`,
            )
            .join(', '),
        ]
      : null

  return (
    <ActiviteDetailsDynamicModal.Component
      title={
        <div
          className={classNames(
            'fr-background-alt--blue-france fr-p-2v fr-border-radius--8 fr-flex',
            styles.titleIconContainer,
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="fr-display-block"
            alt={typeActiviteLabels[type]}
            src={typeActiviteIllustrations[type]}
            style={{ width: 40, height: 40 }}
          />
        </div>
      }
      className={styles.modal}
      buttons={
        deletionConfirmation
          ? [
              {
                title: 'Annuler',
                priority: 'secondary',
                doClosesModal: false,
                children: 'Annuler',
                type: 'button',
                disabled: isLoading,
                onClick: () => setDeletionConfirmation(false),
              },
              {
                title: 'Supprimer',
                doClosesModal: false,
                children: 'Supprimer',
                type: 'button',
                onClick: onDelete,
                nativeButtonProps: {
                  className: classNames(
                    'fr-btn--danger',
                    isLoading && 'fr-btn--loading',
                  ),
                },
              },
            ]
          : undefined
      }
    >
      <div className="fr-mt-6v fr-flex fr-flex-gap-2v fr-justify-content-space-between fr-align-items-center">
        <div>
          <p className="fr-text--xs fr-text-mention--grey fr-text--bold fr-text--uppercase fr-mb-0">
            {formatActiviteDayDate(date)}
          </p>
          <p className="fr-text--bold fr-mb-0">
            {typeActiviteLabels[type]}
            {!!titreAtelier && ` · ${titreAtelier}`}
          </p>
        </div>
        {!deletionConfirmation && (
          <div className="fr-flex fr-flex-gap-2v">
            <Button
              iconId="fr-icon-edit-line"
              linkProps={{
                href: createModifierActiviteLink(activite, {
                  retour: actionsRetourPath,
                }),
              }}
              title="Modifier"
              size="small"
            />
            <Button
              iconId="ri-file-copy-line"
              className="fr-px-2v"
              priority="secondary"
              title="Dupliquer"
              size="small"
              linkProps={{
                href: createDupliquerActiviteLink(activite, {
                  retour: actionsRetourPath,
                }),
              }}
            />
            <Button
              type="button"
              iconId="fr-icon-delete-bin-line"
              priority="secondary"
              title="Supprimer"
              size="small"
              onClick={onDeleteButtonClick}
            />
          </div>
        )}
      </div>
      <p className="fr-mt-2v fr-text--sm fr-mb-0 fr-text-mention--grey">
        <span className="fr-icon-time-line fr-icon--sm" /> Durée&nbsp;:{' '}
        {dureeString} · <span className="fr-icon-map-pin-2-line fr-icon--sm" />{' '}
        {locationString}
      </p>
      {!deletionConfirmation && (
        <>
          <hr className="fr-separator-6v" />
          <ul>
            {donneesItems.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <ListItem key={index}>{item}</ListItem>
            ))}
          </ul>

          <hr className="fr-separator-6v" />
          {!!beneficiaireUnique && isBeneficiaireEmpty(beneficiaireUnique) && (
            <div className="fr-flex fr-justify-content-space-between fr-flex-gap-4v fr-text-mention--grey">
              <p className="fr-text--xs fr-mb-0 fr-text--bold fr-text--uppercase">
                <span className="fr-icon-user-heart-line fr-icon--sm fr-mr-1w" />
                Infos bénéficiaire
              </p>
              <p className="fr-text--xs fr-mb-0 fr-text--medium">
                <i>Non renseignées</i>
              </p>
            </div>
          )}
          {!!infosBeneficiaireAnonyme && (
            <>
              <p className="fr-text-mention--grey fr-text--xs fr-mb-0 fr-text--bold fr-text--uppercase">
                <span className="fr-icon-user-heart-line fr-icon--sm fr-mr-1w" />
                Infos bénéficiaire anonyme
              </p>
              <ul>
                {infosBeneficiaireAnonyme.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </ul>
            </>
          )}
          {!!beneficiaireUnique && !beneficiaireUnique.anonyme && (
            <div className="fr-flex fr-align-items-center">
              <span className="fr-icon-user-heart-line fr-icon--sm fr-mr-3v fr-text-mention--grey" />
              <Link
                href={`/coop/mes-beneficiaires/${beneficiaireUnique.id}`}
                className="fr-link fr-text--sm fr-mb-0 fr-text--medium fr-link--underline-on-hover"
              >
                {getBeneficiaireDisplayName(beneficiaireUnique)}&nbsp;·&nbsp;
                {beneficiaireUnique._count.accompagnements} accompagnement
                {sPluriel(beneficiaireUnique._count.accompagnements)}
              </Link>
            </div>
          )}
          {!!participants && (
            <Accordion
              className={styles.accordion}
              label={
                <div className="fr-flex fr-direction-column">
                  <p className="fr-text-mention--grey fr-text--xs fr-mb-2v fr-text--bold fr-text--uppercase">
                    <span className="fr-icon-user-heart-line fr-icon--sm fr-mr-1w" />
                    Infos participants
                  </p>
                  <p className="fr-text--sm fr-text--medium fr-mb-0 fr-text-default--grey">
                    {participantsCountTitle}
                  </p>
                </div>
              }
            >
              {participants.beneficiairesSuivis.length > 0 && (
                <>
                  {/* Only add title if both type of participants are present */}
                  {participants.participantsAnonymes.total > 0 && (
                    <p className="fr-text--sm fr-text--bold fr-mb-1v">
                      {participants.beneficiairesSuivis.length} bénéficiaire
                      {sPluriel(participants.beneficiairesSuivis.length)} suivi
                      {sPluriel(participants.beneficiairesSuivis.length)}&nbsp;:
                    </p>
                  )}
                  <ul className="fr-my-0">
                    {participants.beneficiairesSuivis.map((beneficiaire) => (
                      <ListItem key={beneficiaire.id} className="fr-mb-0">
                        <Link
                          className="fr-link fr-link--underline-on-hover fr-text--sm fr-mb-0"
                          href={`/coop/mes-beneficiaires/${beneficiaire.id}`}
                        >
                          {getBeneficiaireDisplayName(beneficiaire)}
                        </Link>
                      </ListItem>
                    ))}
                  </ul>
                </>
              )}
              {participants.participantsAnonymes.total > 0 &&
                participantsAnonymesInfos && (
                  <>
                    {/* Only add title if both type of participants are present */}
                    {participants.beneficiairesSuivis.length > 0 && (
                      <p className="fr-text--sm fr-text--bold fr-mb-1v">
                        {participants.participantsAnonymes.total} participant
                        {sPluriel(participants.participantsAnonymes.total)}{' '}
                        anonyme
                        {sPluriel(participants.participantsAnonymes.total)}
                        &nbsp;:
                      </p>
                    )}
                    <ul className="fr-my-0">
                      {participantsAnonymesInfos.map((info) => (
                        <ListItem className="fr-mb-0" key={info}>
                          {info}
                        </ListItem>
                      ))}
                    </ul>
                  </>
                )}
            </Accordion>
          )}
          {!!notes && (
            <>
              <hr className="fr-separator-6v" />
              <p className="fr-text-mention--grey fr-text--xs fr-mb-2v fr-text--bold fr-text--uppercase">
                <span className="fr-icon-file-text-line fr-icon--sm fr-mr-1w" />
                Notes sur l’
                {type === 'Collectif' ? 'atelier' : 'accompagnement'}
              </p>
              <div
                className={styles.notes}
                dangerouslySetInnerHTML={{
                  __html: notes,
                }}
              />
            </>
          )}
        </>
      )}
      {deletionConfirmation && (
        <>
          <hr className="fr-separator-6v" />
          <div className="fr-mb-8v">
            <p className="fr-text--bold fr-mb-4v">
              Êtes-vous sûr·e de vouloir supprimer cette activité&nbsp;?
            </p>
            <ul className="fr-text--sm">
              <li>
                Elle sera supprimée de votre historique et de vos statistiques.
              </li>
              <li>
                Elle sera également supprimée des historiques des participants
                dans le cas d’un atelier collectif.
              </li>
              <li>Cette action est irréversible.</li>
            </ul>
          </div>
        </>
      )}
    </ActiviteDetailsDynamicModal.Component>
  )
}

export default withTrpc(ActiviteDetailsModal)
