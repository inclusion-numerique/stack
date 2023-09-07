import Accordion from '@codegouvfr/react-dsfr/Accordion'
import React from 'react'
import { idForEpci } from '@app/web/gouvernance/perimetreFeuilleDeRouteHelpers'
import styles from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/PerimetreFeuilleDeRoute.module.css'
import { PerimetreDepartementOptions } from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/perimetreData'
import PerimetreCommunesCheckboxes from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/PerimetreCommunesCheckboxes'
import SelectedCollectivitiesCountBadge from '@app/web/app/(private-no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/perimetre-feuille-de-route/SelectedCollectivitiesCountBadge'

const PerimetreEpciCheckboxes = React.memo(
  ({
    initiallySelectedEpcis,
    initiallySelectedCommunes,
    onEpciCheckboxChange,
    selectedEpcis,
    selectedCommunes,
    onCommuneCheckboxChange,
    onSelectAllChange,
    disabled,
    perimetreOptions,
  }: {
    perimetreOptions: PerimetreDepartementOptions
    selectedEpcis: Set<string>
    selectedCommunes: Set<string>
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
  }) => (
    <div className="fr-accordions-group">
      {perimetreOptions.epcis.map((epci) => {
        const epciId = idForEpci(epci.codeEpci)
        const epciSelectAllId = `select-all#${epci.codeEpci}`

        const epciSelectedCommunesCount = epci.communes.filter((commune) =>
          selectedCommunes.has(commune[0]),
        ).length

        return (
          <Accordion
            key={epci.codeEpci}
            className={styles.epciAccordion}
            label={
              <div className={styles.accordionTitleContainer}>
                <span>
                  <p>{epci.nom}</p>
                  <p className="fr-text-mention--grey fr-text--xs fr-mb-0">
                    Nombre de communes&nbsp;: {epci.nombreCommunes}
                  </p>
                </span>
                <SelectedCollectivitiesCountBadge
                  selectedCommunesCount={epciSelectedCommunesCount}
                  selectedEpcisCount={selectedEpcis.has(epci.codeEpci) ? 1 : 0}
                />
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
                  defaultChecked={initiallySelectedEpcis.has(epci.codeEpci)}
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

              <PerimetreCommunesCheckboxes
                communes={epci.communes}
                epciId={epciId}
                disabled={disabled}
                onCommuneCheckboxChange={onCommuneCheckboxChange}
                initiallySelectedCommunes={initiallySelectedCommunes}
              />
            </fieldset>
          </Accordion>
        )
      })}
    </div>
  ),
)
PerimetreEpciCheckboxes.displayName = 'PerimetreEpciCheckboxes'
export default PerimetreEpciCheckboxes
