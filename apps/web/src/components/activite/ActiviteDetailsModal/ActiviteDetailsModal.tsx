'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import Tag from '@codegouvfr/react-dsfr/Tag'
import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { createToast } from '@app/ui/toast/createToast'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import Stars from '@app/web/components/Stars'
import {
  isBeneficiaireAnonymous,
  isBeneficiaireEmpty,
} from '@app/web/beneficiaire/isBeneficiaireAnonymous'
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
  accompagnementTypeIllustrations,
  accompagnementTypeLabels,
  autonomieStars,
  degreDeFinalisationDemarcheHints,
  degreDeFinalisationDemarcheLabels,
  DureeAccompagnement,
  dureeAccompagnementLabels,
  materielLabels,
  niveauAtelierStars,
  structuresRedirectionLabels,
  thematiqueAccompagnementLabels,
  thematiqueDemarcheAdministrativeLabels,
} from '@app/web/cra/cra'
import {
  ActiviteDetailsDynamicModal,
  ActiviteDetailsDynamicModalState,
} from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsDynamicModal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
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

const ActiviteDetailsModal = ({
  initialState,
}: {
  initialState?: ActiviteDetailsDynamicModalState
}) => {
  const state = ActiviteDetailsDynamicModal.useState() ?? initialState

  const router = useRouter()
  const mutation = trpc.cra.deleteActivite.useMutation()

  const [deletionConfirmation, setDeletionConfirmation] = useState(false)
  useEffect(() => {
    // Cancel deletion state on state change
    setDeletionConfirmation(false)
  }, [state?.activite.cra.id])

  const onDeleteButtonClick = () => {
    setDeletionConfirmation(true)
  }
  if (!state) {
    return null
  }

  const { activite } = state

  const { type, cra } = activite

  const onDelete = async () => {
    try {
      await mutation.mutateAsync({
        type,
        craId: cra.id,
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

  const duree = cra.duree.toString() as DureeAccompagnement
  const locationString = cra.lieuActivite
    ? `${cra.lieuActivite.nom} · ${cra.lieuActivite.codePostal} ${cra.lieuActivite.commune}`
    : (activite.type === 'demarche' || activite.type === 'individuel') &&
        activite.cra.lieuAccompagnementDomicileCommune
      ? `${activite.cra.lieuAccompagnementDomicileCodePostal} ${activite.cra.lieuAccompagnementDomicileCommune}`
      : activite.type === 'collectif' &&
          activite.cra.lieuAccompagnementAutreCommune
        ? `${activite.cra.lieuAccompagnementAutreCodePostal} ${activite.cra.lieuAccompagnementAutreCommune}`
        : 'À distance'

  const thematiqueLabels =
    activite.type === 'demarche'
      ? activite.cra.thematiques.map(
          (thematique) => thematiqueDemarcheAdministrativeLabels[thematique],
        )
      : activite.cra.thematiques.map(
          (thematique) => thematiqueAccompagnementLabels[thematique],
        )

  const donneesItems: ReactNode[] = [
    // Materiel utilisé
    'materiel' in cra &&
      cra.materiel.length > 0 &&
      `Matériel utilisé : ${cra.materiel.map((materiel) => materielLabels[materiel]).join(', ')}`,
    // Thématiques
    <>
      Thématique{sPluriel(thematiqueLabels.length)}&nbsp;:{' '}
      <div className="fr-text--regular fr-flex fr-flex-wrap fr-flex-gap-2v">
        {thematiqueLabels.map((label) => (
          <Tag small key={label}>
            {label}
          </Tag>
        ))}
      </div>
    </>,
    // Demarche
    'precisionsDemarche' in cra &&
      !!cra.precisionsDemarche &&
      `Démarche : ${cra.precisionsDemarche}`,
    // Autonomie
    'autonomie' in cra && cra.autonomie && (
      <>
        Autonomie du bénéficiaire&nbsp;:{' '}
        <Stars count={autonomieStars[cra.autonomie]} max={3} />
      </>
    ),
    // Finalisation démarche
    'degreDeFinalisation' in cra && cra.degreDeFinalisation && (
      <>
        Démarche finalisée&nbsp;:{' '}
        {degreDeFinalisationDemarcheLabels[cra.degreDeFinalisation]}
        {degreDeFinalisationDemarcheHints[cra.degreDeFinalisation] &&
          `, ${(
            degreDeFinalisationDemarcheHints[cra.degreDeFinalisation] ?? ''
          ).toLocaleLowerCase()}`}
      </>
    ),
    // Redirection structure accompagnement individuel
    activite.type === 'individuel' &&
      activite.cra.orienteVersStructure &&
      activite.cra.structureDeRedirection &&
      `Orienté vers ${structuresRedirectionLabels[activite.cra.structureDeRedirection]}`,
    // Redirection structure démarche
    'degreDeFinalisation' in cra &&
      cra.degreDeFinalisation === 'OrienteVersStructure' &&
      cra.structureDeRedirection &&
      `Orienté vers ${structuresRedirectionLabels[cra.structureDeRedirection]}`,
    // Niveau atelier
    'niveau' in cra && cra.niveau && (
      <>
        Niveau de l’atelier&nbsp;:{' '}
        <Stars count={niveauAtelierStars[cra.niveau]} max={3} />
      </>
    ),
  ].filter(Boolean)

  const infosBeneficiaireAnonyme =
    'beneficiaire' in cra &&
    isBeneficiaireAnonymous(cra.beneficiaire) &&
    !isBeneficiaireEmpty(cra.beneficiaire)
      ? [
          [
            cra.beneficiaire.genre &&
              cra.beneficiaire.genre !== 'NonCommunique' &&
              sexLabels[cra.beneficiaire.genre],
            cra.beneficiaire.trancheAge &&
              cra.beneficiaire.trancheAge !== 'NonCommunique' &&
              trancheAgeLabels[cra.beneficiaire.trancheAge],
            cra.beneficiaire.statutSocial &&
              cra.beneficiaire.statutSocial !== 'NonCommunique' &&
              statutSocialLabels[cra.beneficiaire.statutSocial],
          ]
            .filter(Boolean)
            .join(', '),
          !!cra.beneficiaire.commune &&
            `${cra.beneficiaire.communeCodePostal} ${cra.beneficiaire.commune}`.trim(),
          cra.beneficiaire.vaPoursuivreParcoursAccompagnement === null
            ? null
            : cra.beneficiaire.vaPoursuivreParcoursAccompagnement
              ? 'Poursuit son parcours d’accompagnement de médiation numérique'
              : 'Ne poursuit pas son parcours d’accompagnement de médiation numérique',
        ].filter(Boolean)
      : null

  const participantsCountTitle =
    'participants' in cra
      ? cra.participants.length > 0 && cra.participantsAnonymes.total > 0
        ? // Both participants suivis and anonymes
          `${cra.participants.length + cra.participantsAnonymes.total} participant${sPluriel(cra.participants.length + cra.participantsAnonymes.total)} dont ${
            cra.participants.length
          } bénéficiaire${sPluriel(cra.participants.length)} suivi${sPluriel(
            cra.participants.length,
          )} et ${
            cra.participantsAnonymes.total
          } anonyme${sPluriel(cra.participantsAnonymes.total)}`
        : cra.participants.length > 0
          ? // Only participants suivis
            `${cra.participants.length} bénéficiaire${sPluriel(cra.participants.length)} suivi${sPluriel(cra.participants.length)}`
          : // Only participants anonymes
            `${cra.participantsAnonymes.total} participant${sPluriel(cra.participantsAnonymes.total)} anonyme${sPluriel(cra.participantsAnonymes.total)}`
      : null

  const participantsAnonymesInfos =
    'participants' in cra && cra.participantsAnonymes.total > 0
      ? [
          genreValues
            .map((enumValue) => ({
              enumValue,
              count: cra.participantsAnonymes[`genre${enumValue}`] || 0,
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
              count: cra.participantsAnonymes[`trancheAge${enumValue}`] || 0,
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
              count: cra.participantsAnonymes[`statutSocial${enumValue}`] || 0,
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
            alt={accompagnementTypeLabels[type]}
            src={accompagnementTypeIllustrations[type]}
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
            {formatActiviteDayDate(cra.date)}
          </p>
          <p className="fr-text--bold fr-mb-0">
            {accompagnementTypeLabels[type]}
            {activite.type === 'collectif' &&
              !!activite.cra.titreAtelier &&
              ` · ${activite.cra.titreAtelier}`}
          </p>
        </div>
        {!deletionConfirmation && (
          <div className="fr-flex fr-flex-gap-2v">
            <Button
              iconId="fr-icon-edit-line"
              className="wip-outline"
              linkProps={{
                href: `/coop/mes-activites/${type}/${cra.id}/modifier`,
              }}
              title="Modifier"
              size="small"
            />
            <Button
              type="button"
              iconId="ri-file-copy-line"
              className="wip-outline fr-px-2v"
              priority="secondary"
              title="Dupliquer"
              size="small"
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
      <p className="fr-mt-2v fr-text--sm fr-mb-0 fr-text-mention--grey fr-ellipsis">
        <span className="fr-icon-time-line fr-icon--sm" /> Durée :{' '}
        {dureeAccompagnementLabels[duree]} ·{' '}
        <span className="fr-icon-map-pin-2-line fr-icon--sm" /> {locationString}
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
          {'beneficiaire' in cra && isBeneficiaireEmpty(cra.beneficiaire) && (
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
          {'beneficiaire' in cra &&
            !isBeneficiaireAnonymous(cra.beneficiaire) && (
              <div className="fr-flex fr-align-items-center">
                <span className="fr-icon-user-heart-line fr-icon--sm fr-mr-3v fr-text-mention--grey" />
                <Link
                  href={`/coop/mes-beneficiaires/${cra.beneficiaire.id}`}
                  className="fr-link fr-text--sm fr-mb-0 fr-text--medium fr-link--underline-on-hover"
                >
                  {getBeneficiaireDisplayName(cra.beneficiaire)}&nbsp;·&nbsp;
                  {cra.beneficiaire._count.activites} accompagnement
                  {sPluriel(cra.beneficiaire._count.activites)}
                </Link>
              </div>
            )}
          {'participants' in cra && (
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
              {cra.participants.length > 0 && (
                <>
                  {/* Only add title if both type of participants are present */}
                  {cra.participantsAnonymes.total > 0 && (
                    <p className="fr-text--sm fr-text--bold fr-mb-1v">
                      {cra.participants.length} bénéficiaire
                      {sPluriel(cra.participants.length)} suivi
                      {sPluriel(cra.participants.length)}&nbsp;:
                    </p>
                  )}
                  <ul className="fr-my-0">
                    {cra.participants.map((participant) => (
                      <ListItem
                        key={participant.beneficiaire.id}
                        className="fr-mb-0"
                      >
                        <Link
                          className="fr-link fr-link--underline-on-hover fr-text--sm fr-mb-0"
                          href={`/coop/mes-beneficiaires/${participant.beneficiaire.id}`}
                        >
                          {getBeneficiaireDisplayName(participant.beneficiaire)}
                        </Link>
                      </ListItem>
                    ))}
                  </ul>
                </>
              )}
              {cra.participantsAnonymes.total > 0 &&
                participantsAnonymesInfos && (
                  <>
                    {/* Only add title if both type of participants are present */}
                    {cra.participants.length > 0 && (
                      <p className="fr-text--sm fr-text--bold fr-mb-1v">
                        {cra.participantsAnonymes.total} participant
                        {sPluriel(cra.participantsAnonymes.total)} anonyme
                        {sPluriel(cra.participantsAnonymes.total)}&nbsp;:
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
          {!!cra.notes && (
            <>
              <hr className="fr-separator-6v" />
              <p className="fr-text-mention--grey fr-text--xs fr-mb-2v fr-text--bold fr-text--uppercase">
                <span className="fr-icon-file-text-line fr-icon--sm fr-mr-1w" />
                Notes sur l’
                {type === 'collectif' ? 'atelier' : 'accompagnement'}
              </p>
              <div
                className={styles.notes}
                dangerouslySetInnerHTML={{
                  __html: cra.notes,
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
