export type GouvernanceScope =
  | {
      codeDepartement: string
      codeRegion?: undefined
      national?: undefined
    }
  | {
      codeDepartement?: undefined
      codeRegion: string
      national?: undefined
    }
  | {
      codeDepartement?: undefined
      codeRegion?: undefined
      national: true
    }

export const gouvernanceHomePath = (scope: GouvernanceScope) =>
  scope.codeRegion
    ? `/gouvernances/region/${scope.codeRegion}`
    : scope.codeDepartement
    ? `/gouvernances/departement/${scope.codeDepartement}`
    : `/gouvernances/national`

export const gouvernanceCandidatsPath = (scope: GouvernanceScope) =>
  `${gouvernanceHomePath(scope)}/candidats-a-la-gouvernance`

export const gouvernanceContactsPath = (scope: GouvernanceScope) =>
  `${gouvernanceHomePath(scope)}/contacts`

export const gouvernanceContactsDownloadPath = (scope: GouvernanceScope) =>
  `${gouvernanceContactsPath(scope)}/telecharger`

export const ajouterGouvernancePressentiePath = (scope: {
  codeDepartement: string
}) => `${gouvernanceHomePath(scope)}/gouvernance-pressentie/ajouter`
