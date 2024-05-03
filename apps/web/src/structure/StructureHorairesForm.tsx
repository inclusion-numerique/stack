'use client'

import { StructureDataForForm } from '@app/web/structure/getStructureDataForForm'
import { stringToOpeningHours } from '@app/web/opening-hours/stringToOpeningHours'

const StructureHorairesForm = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  structure,
}: {
  structure: StructureDataForForm
}) => {
  const { horairesOuverture } = structure

  const openingHours = stringToOpeningHours(horairesOuverture)

  console.log('OPENING HOURS', openingHours)

  return (
    <>
      <pre className="fr-background-alt--blue-france fr-p-4v fr-border-radius--16 fr-text--xs fr-mb-0">
        {JSON.stringify(structure, null, 2)}
      </pre>

      {!horairesOuverture && <p>Horaires d’ouvertures non spécifiés</p>}
      {!!horairesOuverture && !openingHours && (
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
