'use client'

import OpeningHours from 'opening_hours'
import { StructureDataForForm } from '@app/web/structure/getStructureDataForForm'

const toOpeningHoursObject = (horairesOuverture: string | null) => {
  if (!horairesOuverture) return null

  try {
    return new OpeningHours(horairesOuverture)
  } catch (error) {
    console.error('Invalid opening hours format', error)
    return null
  }
}

const StructureHorairesForm = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  structure,
}: {
  structure: StructureDataForForm
}) => {
  const { horairesOuverture } = structure

  const openingHours = toOpeningHoursObject(horairesOuverture)

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
    </>
  )
}

export default StructureHorairesForm
