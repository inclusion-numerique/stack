'use client'

import { stringToOpeningHours } from '@app/web/opening-hours/stringToOpeningHours'
import { StructureDataForForm } from '@app/web/structure/getStructureDataForForm'

const StructureHorairesForm = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  structure,
}: {
  structure: StructureDataForForm
}) => {
  const { horaires } = structure

  const openingHours = stringToOpeningHours(horaires)

  return (
    <>
      <pre className="fr-background-alt--blue-france fr-p-4v fr-border-radius--16 fr-text--xs fr-mb-0">
        {JSON.stringify(structure, null, 2)}
      </pre>

      {!horaires && <p>Horaires d’ouvertures non spécifiés</p>}
      {!!horaires && !openingHours && (
        <p>Les horaires ne sont pas au format Open Street Map</p>
      )}
      {!!openingHours && (
        <p>Horaires d’ouvertures spécifiés au format Open Street Map</p>
      )}

      <pre className="fr-background-alt--blue-france fr-p-4v fr-border-radius--16 fr-text--xs fr-mb-0">
        {JSON.stringify(openingHours, null, 2)}
      </pre>
    </>
  )
}

export default StructureHorairesForm
