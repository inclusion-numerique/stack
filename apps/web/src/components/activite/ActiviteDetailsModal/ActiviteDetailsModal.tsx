'use client'

import React, { ReactNode } from 'react'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  ActiviteDetailsDynamicModal,
  ActiviteDetailsDynamicModalState,
} from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsDynamicModal'
import {
  accompagnementTypeIllustrations,
  accompagnementTypeLabels,
  autonomieStars,
  DureeAccompagnement,
  dureeAccompagnementLabels,
  materielLabels,
  niveauAtelierStars,
  structuresRedirectionLabels,
  thematiqueAccompagnementLabels,
  thematiqueDemarcheAdministrativeLabels,
} from '@app/web/cra/cra'
import styles from './ActiviteDetailsModal.module.css'
import { formatActiviteDayDate } from '@app/web/utils/activiteDayDateFormat'
import Button from '@codegouvfr/react-dsfr/Button'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import Tag from '@codegouvfr/react-dsfr/Tag'
import Stars from '@app/web/components/Stars'
import {
  isBeneficiaireAnonymous,
  isBeneficiaireEmpty,
} from '@app/web/beneficiaire/isBeneficiaireAnonymous'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'

const ListItem = ({ children }: { children: ReactNode }) => (
  <li className="fr-mb-1v fr-text--sm fr-text--medium">
    <div className=" fr-flex fr-flex-gap-1v">{children}</div>
  </li>
)

const ActiviteDetailsModal = ({
  initialState,
}: {
  initialState?: ActiviteDetailsDynamicModalState
}) => {
  const state = ActiviteDetailsDynamicModal.useState() ?? initialState

  if (!state) {
    return null
  }

  const { activite } = state

  const { type, cra } = activite

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
    // Autonomie
    'autonomie' in cra && cra.autonomie && (
      <>
        Autonomie du bénéficiaire :{' '}
        <Stars count={autonomieStars[cra.autonomie]} max={3} />
      </>
    ),
    // Niveau atelier
    'niveau' in cra && cra.niveau && (
      <>
        Niveau de l’atelier :{' '}
        <Stars count={niveauAtelierStars[cra.niveau]} max={3} />
      </>
    ),
    // Redirection structure
    activite.type === 'individuel' &&
      activite.cra.orienteVersStructure &&
      activite.cra.structureDeRedirection &&
      `Orienté vers ${structuresRedirectionLabels[activite.cra.structureDeRedirection]}`,
  ].filter(Boolean)

  return (
    <ActiviteDetailsDynamicModal.Component
      title={
        <div className="fr-background-alt--blue-france fr-p-2v fr-border-radius--8 fr-flex">
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
    >
      <div className="fr-mt-12v fr-flex fr-flex-gap-2v fr-justify-content-space-between fr-align-items-center">
        <div>
          <p className="fr-text--xs fr-text-mention--grey fr-text--bold fr-text--uppercase fr-mb-0">
            {formatActiviteDayDate(cra.date)}
          </p>
          <p className="fr-text--bold fr-mb-0">
            {accompagnementTypeLabels[type]}
          </p>
        </div>
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
            iconId="fr-icon-add-line"
            className="wip-outline"
            priority="secondary"
            title="Dupliquer"
            size="small"
          />
          <Button
            type="button"
            iconId="fr-icon-delete-bin-line"
            className="wip-outline"
            priority="secondary"
            title="Supprimer"
            size="small"
          />
        </div>
      </div>
      <p className="fr-mt-2v fr-mb-0 fr-text-mention--grey fr-ellipsis">
        <span className="fr-icon-time-line fr-icon--sm" /> Durée :{' '}
        {dureeAccompagnementLabels[duree]} ·{' '}
        <span className="fr-icon-map-pin-2-line fr-icon--sm" /> {locationString}
      </p>
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
      {'beneficiaire' in cra &&
        isBeneficiaireAnonymous(cra.beneficiaire) &&
        !isBeneficiaireEmpty(cra.beneficiaire) && (
          <div>TODO BENEFICIAIRE ANONYME</div>
        )}
      {'beneficiaire' in cra && !isBeneficiaireAnonymous(cra.beneficiaire) && (
        <div>
          TODO BENEFICIAIRE SUIVI {getBeneficiaireDisplayName(cra.beneficiaire)}
        </div>
      )}
      <hr className="fr-separator-6v" />
      <div>NOTES</div>
    </ActiviteDetailsDynamicModal.Component>
  )
}

export default withTrpc(ActiviteDetailsModal)
