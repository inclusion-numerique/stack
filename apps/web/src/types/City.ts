import { LngLatLike } from 'maplibre-gl'
import type { StructuresCount } from '@app/web/components/Prefet/Cartographie/countStructures'

export type GeoApiCity = {
  nom: string
  code: string
  codesPostaux: string[]
  codeEpci: string
  population: number
  centre: { type: 'Polygon'; coordinates: LngLatLike }
}

// from https://geo.api.gouv.fr/decoupage-administratif/communes
// + ifn
export type City = GeoApiCity & {
  // These are the labels from IFN data to avoid renaming them
  // ⚠️ Allow null while city codes for arrondissements are not in geo cities
  ifnTotal: number | null
  ifnNoThdCoverageRate: number | null
  ifnNo4gCoverageRate: number | null
  ifnPovertyRate: number | null
  ifnOlder65Rate: number | null
  ifnNscol15pRate: number | null

  // Aggregated data from structures
  structuresCount: StructuresCount
  aidants: number
  conseillersNumeriques: number
  habilitesAidantsConnect: number
}

export type EPCI = {
  code: string
  ifn: number | null
}

export type IFNResponse = Record<
  string,
  {
    score: {
      total: number
      no_thd_coverage_rate: number
      no_4g_coverage_rate: number
      poverty_rate: number
      older_65_rate: number
      nscol15p_rate: number
    }
  }
>
