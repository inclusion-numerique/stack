import React from 'react'

export const UserRole = ({
  withIcon = true,
  isConseillerNumerique,
}: {
  withIcon?: boolean
  isConseillerNumerique: boolean
}) =>
  isConseillerNumerique ? (
    <span className="fr-flex fr-align-items-center">
      {withIcon && (
        <img
          className="fr-mr-2v"
          width="16px"
          height="16px"
          src="/images/illustrations/role/conseillers-numerique.svg"
          alt=""
        />
      )}
      Conseiller numérique
    </span>
  ) : (
    <span>
      {withIcon && (
        <span className="ri-account-circle-line fr-mr-2v" aria-hidden />
      )}
      Médiateur numérique
    </span>
  )
