import React from 'react'
import { UserRole } from '@app/web/equipe/UserRole'
import { MediateurToAddOption } from './MediateurToAddOption'

export const FormatOptionLabel = ({
  isDisabled,
  label,
  value,
}: MediateurToAddOption): string =>
  (isDisabled ? (
    <span className="fr-text-default--grey">{label}</span>
  ) : (
    <span className="fr-flex fr-direction-column">
      <span>{label}</span>
      {value?.mediateurId !== value?.email && (
        <span className="fr-flex fr-direction-row fr-flex-wrap fr-flex-gap-2v fr-text-mention--grey fr-text--sm fr-mb-0">
          <UserRole
            isConseillerNumerique={value?.isConseillerNumerique ?? false}
          />
          {value?.email && (
            <>
              <span className="fr-hidden fr-unhidden-md" aria-hidden>
                ·
              </span>
              <span>
                <span className="ri-mail-line fr-mr-2v" aria-hidden />
                {value.email}
              </span>
            </>
          )}
        </span>
      )}
    </span>
  )) as unknown as string
