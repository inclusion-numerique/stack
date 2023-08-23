import { DefaultValues } from 'react-hook-form/dist/types/form'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { PerimetreFeuilleDeRouteData } from '@app/web/gouvernance/PerimetreFeuilleDeRoute'

export const filterDansTerritoire = ({
  horsTerritoire,
}: {
  horsTerritoire: boolean
}) => !horsTerritoire

export const filterHorsTerritoire = ({
  horsTerritoire,
}: {
  horsTerritoire: boolean
}) => !!horsTerritoire

export const idForEpci = (codeEpci: string) => `epci#${codeEpci}`
export const idForCommune = (codeCommune: string) => `commune#${codeCommune}`

export const perimetreFeuilleDeRouteDefaultValuesFromData = (
  data: GouvernanceFormulaireForForm,
): DefaultValues<PerimetreFeuilleDeRouteData> => ({
  formulaireGouvernanceId: data.id,
  codeCommunes: data.communesParticipantes
    .filter(filterDansTerritoire)
    .map((participation) => participation.communeCode),
  codeCommunesHorsTerritoire: data.communesParticipantes
    .filter(filterHorsTerritoire)
    .map((participation) => participation.communeCode),
  codeDepartements: data.departementsParticipants
    .filter(filterDansTerritoire)
    .map((participation) => participation.departementCode),
  codeDepartementsHorsTerritoire: data.departementsParticipants
    .filter(filterHorsTerritoire)
    .map((participation) => participation.departementCode),
  codeEpcis: data.epcisParticipantes
    .filter(filterDansTerritoire)
    .map((participation) => participation.epciCode),
  codeEpcisHorsTerritoire: data.epcisParticipantes
    .filter(filterHorsTerritoire)
    .map((participation) => participation.epciCode),
})

export const perimetreFeuilleDeRouteTransitiveValuesFromData = (
  data: GouvernanceFormulaireForForm,
  options: unknown[],
): DefaultValues<any> => {}
