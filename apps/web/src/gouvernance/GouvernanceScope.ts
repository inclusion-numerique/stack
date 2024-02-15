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
