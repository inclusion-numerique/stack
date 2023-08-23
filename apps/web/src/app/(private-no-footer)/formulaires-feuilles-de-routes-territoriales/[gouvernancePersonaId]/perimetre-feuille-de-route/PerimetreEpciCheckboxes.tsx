import Accordion from '@codegouvfr/react-dsfr/Accordion'
import React, { useRef } from 'react'
import {
  idForCommune,
  idForEpci,
} from '@app/web/gouvernance/perimetreFeuilleDeRouteHelpers'
import styles from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/PerimetreFeuilleDeRoute.module.css'
import { PerimetreDepartementOptions } from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/perimetreData'

const PerimetreEpciCheckboxes = React.memo(
  ({
    initiallySelectedEpcis,
    initiallySelectedCommunes,
    onEpciCheckboxChange,
    onCommuneCheckboxChange,
    onSelectAllChange,
    disabled,
    perimetreOptions,
  }: {
    perimetreOptions: PerimetreDepartementOptions
    initiallySelectedEpcis: Set<string>
    initiallySelectedCommunes: Set<string>
    onEpciCheckboxChange: (
      event: React.ChangeEvent<HTMLInputElement>,
      epciCode: string,
    ) => void
    onCommuneCheckboxChange: (
      event: React.ChangeEvent<HTMLInputElement>,
      communeCode: string,
    ) => void
    onSelectAllChange: (
      event: React.ChangeEvent<HTMLInputElement>,
      epciId: string,
    ) => void
    disabled: boolean
  }) => {
    const renders = useRef(0)
    // eslint-disable-next-line no-plusplus
    console.log('RENDER CHECKBOXES', renders.current++)
    return (
      <div className="fr-accordions-group">
        {perimetreOptions.epcis.map((epci) => {
          const epciId = idForEpci(epci.codeEpci)
          const epciSelectAllId = `select-all#${epci.codeEpci}`

          return (
            <Accordion
              key={epci.codeEpci}
              className={styles.epciAccordion}
              label={
                <div className={styles.accordionTitleContainer}>
                  <p>{epci.nom}</p>
                  <p className="fr-text-mention--grey fr-text--xs fr-mb-0">
                    Nombre de communes&nbsp;: {epci.nombreCommunes}
                  </p>
                </div>
              }
            >
              <div className="fr-fieldset__element">
                <div className="fr-checkbox-group fr-checkbox-group--sm">
                  <input
                    type="checkbox"
                    id={epciId}
                    disabled={disabled}
                    name={epciId}
                    defaultValue={
                      initiallySelectedEpcis.has(epci.codeEpci)
                        ? 'on'
                        : undefined
                    }
                    onChange={(event) =>
                      onEpciCheckboxChange(event, epci.codeEpci)
                    }
                  />
                  <label className="fr-label" htmlFor={epciId}>
                    {epci.nom}
                  </label>
                </div>
              </div>
              <hr />
              <fieldset className="fr-fieldset" role="group">
                <div className="fr-fieldset__element">
                  <div className="fr-checkbox-group fr-checkbox-group--sm">
                    <input
                      type="checkbox"
                      id={epciSelectAllId}
                      disabled={disabled}
                      name={epciSelectAllId}
                      data-epci={epci.codeEpci}
                      onChange={(event) => onSelectAllChange(event, epciId)}
                    />
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label
                      className="fr-label fr-text--bold"
                      htmlFor={epciSelectAllId}
                    >
                      Sélectionner toutes les communes
                    </label>
                  </div>
                </div>

                {epci.communes.map((commune) => {
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
                          onChange={(event) =>
                            onCommuneCheckboxChange(event, commune[0])
                          }
                          defaultValue={
                            initiallySelectedCommunes.has(commune[0])
                              ? 'on'
                              : undefined
                          }
                        />
                        <label className="fr-label" htmlFor={id}>
                          {commune[1]}
                        </label>
                      </div>
                    </div>
                  )
                })}
              </fieldset>
            </Accordion>
          )
        })}
      </div>
    )
  },
)
export default PerimetreEpciCheckboxes
