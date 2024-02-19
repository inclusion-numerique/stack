import React from 'react'
import { idForCommune } from '@app/web/gouvernance/perimetreFeuilleDeRouteHelpers'
import { OptionTuples } from '@app/web/utils/options'

const PerimetreCommunesCheckboxes = React.memo(
  ({
    disabled,
    epciId,
    communes,
    onCommuneCheckboxChange,
    initiallySelectedCommunes,
  }: {
    epciId: string
    disabled: boolean
    communes: OptionTuples
    onCommuneCheckboxChange: (
      event: React.ChangeEvent<HTMLInputElement>,
      communeCode: string,
    ) => void
    initiallySelectedCommunes: Set<string>
  }) => (
    <>
      {communes.map((commune) => {
        const id = `dansTerritoire.${idForCommune(commune[0])}`
        return (
          <div key={id} className="fr-fieldset__element">
            <div className="fr-checkbox-group fr-checkbox-group--sm">
              <input
                data-epci={epciId}
                data-commune={commune[0]}
                type="checkbox"
                disabled={disabled}
                id={id}
                name={id}
                onChange={(event) => onCommuneCheckboxChange(event, commune[0])}
                defaultChecked={initiallySelectedCommunes.has(commune[0])}
              />
              <label className="fr-label" htmlFor={id}>
                {commune[1]}
              </label>
            </div>
          </div>
        )
      })}
    </>
  ),
)
PerimetreCommunesCheckboxes.displayName = 'PerimetreCommunesCheckboxes'

export default PerimetreCommunesCheckboxes
