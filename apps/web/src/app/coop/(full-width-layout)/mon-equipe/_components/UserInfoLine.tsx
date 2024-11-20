import React from 'react'
import { UserRole } from './UserRole'

export const UserInfoLine = ({
  withUserIcon = true,
  isConseillerNumerique,
  email,
  phone,
}: {
  withUserIcon?: boolean
  isConseillerNumerique: boolean
  email?: string
  phone?: string
}) => (
  <>
    <UserRole
      isConseillerNumerique={isConseillerNumerique}
      withIcon={withUserIcon}
    />
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
  </>
)
