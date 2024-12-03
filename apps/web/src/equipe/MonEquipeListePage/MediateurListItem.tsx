import React from 'react'
import type { AlertProps } from '@codegouvfr/react-dsfr/src/Alert'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { type MediateurListProps } from './MediateurList'

const UserRole = ({
  isConseillerNumerique,
}: {
  isConseillerNumerique: boolean
}) =>
  isConseillerNumerique ? (
    <span className="fr-flex fr-align-items-center">
      <img
        className="fr-mr-2v"
        width="16px"
        height="16px"
        src="/images/illustrations/role/conseillers-numerique.svg"
        alt=""
      />
      Conseiller numérique
    </span>
  ) : (
    <span>
      <span className="ri-account-circle-line fr-mr-2v" aria-hidden />
      Médiateur numérique
    </span>
  )

const statusSeverity = (status: string): AlertProps.Severity => {
  if (status.startsWith('Actif')) return 'success'
  if (status.startsWith('Inactif')) return 'warning'
  return 'info'
}

const showFinDeContratFeatureFlag = false

export const MediateurListItem = ({
  email,
  firstName,
  lastName,
  phone,
  status,
  isConseillerNumerique,
  finDeContrat,
}: MediateurListProps) =>
  firstName || lastName ? (
    <div className="fr-py-5v fr-px-2v">
      <div className="fr-mb-2w fr-flex fr-flex-gap-2v fr-justify-content-space-between fr-direction-md-row fr-direction-column">
        <div className="fr-flex fr-flex-gap-2v fr-direction-md-row fr-direction-column">
          <span className="fr-text--bold ">
            {[firstName, lastName].filter(Boolean).join(' ')}
          </span>
          {showFinDeContratFeatureFlag && finDeContrat && (
            <Badge severity="warning">Fin de contrat le {finDeContrat}</Badge>
          )}
        </div>
        <div>
          <Badge severity={statusSeverity(status)} noIcon>
            {status}
          </Badge>
        </div>
      </div>
      <div className="fr-text-mention--grey fr-text--semi-bold fr-text--sm fr-mb-0 fr-flex fr-flex-gap-2v fr-direction-md-row fr-direction-column">
        <UserRole isConseillerNumerique={isConseillerNumerique} />
        {email && (
          <>
            <span className="fr-hidden fr-unhidden-md" aria-hidden>
              ·
            </span>
            <span>
              <span className="ri-mail-line fr-mr-2v" aria-hidden />
              {email}
            </span>
          </>
        )}
        {phone && (
          <>
            <span className="fr-hidden fr-unhidden-md" aria-hidden>
              ·
            </span>
            <span>
              <span className="ri-phone-line fr-mr-2v" aria-hidden />
              {phone}
            </span>
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="fr-text--bold fr-py-9v fr-flex fr-justify-content-space-between fr-direction-md-row fr-direction-column">
      {email}
      <Badge severity={statusSeverity(status)} noIcon>
        {status}
      </Badge>
    </div>
  )
