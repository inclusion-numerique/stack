import { FrequenceComite, TypeComite, TypeContrat } from '@prisma/client'
import { labelsToOptions } from '@app/web/utils/options'

export const perimetreFeuilleDeRouteLabels = {
  region: 'Régional',
  departement: 'Départemental',
  epci: 'EPCI ou groupement de communes',
} as const

export type PerimetreFeuilleDeRoute = keyof typeof perimetreFeuilleDeRouteLabels

export const feuilleDeRoutePerimetreOptions = labelsToOptions(
  perimetreFeuilleDeRouteLabels,
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

export const typeContratLabels: { [value in TypeContrat]: string } = {
  [TypeContrat.Crte]: 'CRTE',
  [TypeContrat.Sdaasap]: 'SDAASaP',
  [TypeContrat.Sdin]: 'SDIN',
  [TypeContrat.Sdun]: 'SDUN',
  [TypeContrat.Autre]: 'Autre',
}

export const typeContratOptions = labelsToOptions(typeContratLabels)

export const ouiOuNonLabels = {
  oui: 'Oui',
  non: 'Non',
} as const

export type OuiOuNon = keyof typeof ouiOuNonLabels

export const ouiOuNonOptions = labelsToOptions(ouiOuNonLabels)
