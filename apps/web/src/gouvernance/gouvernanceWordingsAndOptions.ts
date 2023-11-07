import { FrequenceComite, TypeComite } from '@prisma/client'
import { labelsToOptions } from '@app/web/utils/options'

export const feuilleDeRoutePerimetre = {
  region: 'Régional',
  departement: 'Départemental',
  epci: 'EPCI ou groupement de communes',
} as const

export const feuilleDeRoutePerimetreOptions = labelsToOptions(
  feuilleDeRoutePerimetre,
)

export const typeComite: { [value in TypeComite]: string } = {
  [TypeComite.Strategique]: 'Comité stratégique',
  [TypeComite.Technique]: 'Comité technique',
  [TypeComite.Consultatif]: 'Comité consultatif',
  [TypeComite.Autre]: 'Autre',
}

export const typeComiteOptions = labelsToOptions(typeComite)

export const frequenceComite: { [value in FrequenceComite]: string } = {
  [FrequenceComite.Mensuelle]: 'Mensuelle',
  [FrequenceComite.Trimestrielle]: 'Trimestrielle',
  [FrequenceComite.Semestrielle]: 'Semestrielle',
  [FrequenceComite.Annuelle]: 'Annuelle',
  [FrequenceComite.Autre]: 'Autre',
}

export const frequenceComiteOptions = (() => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { [FrequenceComite.Autre]: _autre, ...availableOptions } =
    frequenceComite
  return labelsToOptions(availableOptions)
})()
