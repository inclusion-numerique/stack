import { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'

export const gouvernanceCompletedSearchParam = 'gouvernance-completee'

export const gouvernanceHomePath = (
  scope: GouvernanceScope,
  { gouvernanceCompleted }: { gouvernanceCompleted?: boolean } = {},
) => {
  const queryParams = new URLSearchParams()
  if (gouvernanceCompleted) {
    queryParams.set(gouvernanceCompletedSearchParam, '1')
  }

  const queryParamsString = queryParams.toString()
  const queryParamsPart = queryParamsString ? `?${queryParamsString}` : ''

  return scope.codeRegion
    ? `/gouvernances/regions/${scope.codeRegion}${queryParamsPart}`
    : scope.codeDepartement
      ? `/gouvernances/departements/${scope.codeDepartement}${queryParamsPart}`
      : `/gouvernances/national${queryParamsPart}`
}

export const gouvernanceCandidatsPath = (scope: GouvernanceScope) =>
  `${gouvernanceHomePath(scope)}/candidats-a-la-gouvernance`

export const gouvernanceContactsPath = (scope: GouvernanceScope) =>
  `${gouvernanceHomePath(scope)}/contacts`

export const gouvernanceContactsDownloadPath = (scope: GouvernanceScope) =>
  `${gouvernanceContactsPath(scope)}/telecharger`

export const ajouterGouvernancePath = (scope: GouvernanceScope) =>
  `${gouvernanceHomePath(scope)}/gouvernance/ajouter`
export const imprimerGouvernancePath = (scope: GouvernanceScope, id: string) =>
  `${gouvernanceHomePath(scope)}/gouvernance/${id}/imprimer`

export const detailGouvernancePath = (scope: GouvernanceScope, id: string) =>
  `${gouvernanceHomePath(scope)}/gouvernance/${id}`

export const modifierGouvernancePath = (scope: GouvernanceScope, id: string) =>
  `${gouvernanceHomePath(scope)}/gouvernance/${id}/modifier`

export const gouvernanceDemandesDeSubventionPath = (
  scope: GouvernanceScope,
  gouvernanceId: string,
) =>
  `${gouvernanceHomePath(scope)}/gouvernance/${gouvernanceId}/demandes-de-subvention`

export const modifierDemandeDeSubventionPath = (
  scope: GouvernanceScope,
  gouvernanceId: string,
  demandeDeSubventionId: string,
) =>
  `${gouvernanceHomePath(scope)}/gouvernance/${gouvernanceId}/demandes-de-subvention/${demandeDeSubventionId}`

export const ajouterDemandeDeSubventionPath = (
  scope: GouvernanceScope,
  gouvernanceId: string,
) =>
  `${gouvernanceHomePath(scope)}/gouvernance/${gouvernanceId}/demandes-de-subvention/ajouter`

export const modifierBesoinsIngenieriePath = (
  scope: GouvernanceScope,
  {
    gouvernanceId,
    step,
  }: { gouvernanceId: string; step: 'intro' | 'selection' | 'priorisation' },
) =>
  `${gouvernanceHomePath(
    scope,
  )}/gouvernance/${gouvernanceId}/besoins-ingenierie-financiere/${step}`
