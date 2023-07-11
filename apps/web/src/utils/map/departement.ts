import axios from 'axios'
import { chunk } from 'lodash'
import {
  DepartementGeoJson,
  getDepartementGeoJson,
} from '@app/web/utils/map/departementGeoJson'
import type { City, EPCI, GeoApiCity, IFNResponse } from '@app/web/types/City'
import { Structure } from '@app/web/components/Prefet/structuresData'
import { countStructures } from '@app/web/components/Prefet/Cartographie/countStructures'

const fetchDepartementCities = (
  departementCode: string,
): Promise<GeoApiCity[]> =>
  axios
    .get<GeoApiCity[]>(
      `https://geo.api.gouv.fr/departements/${departementCode}/communes?fields=centre,population,codesPostaux,codeEpci`,
    )
    .then(({ data }) => data)

const getCitiesEpciCodes = (cities: GeoApiCity[]): string[] => {
  const epciCodes = new Set<string>()
  for (const city of cities) {
    epciCodes.add(city.codeEpci)
  }

  return [...epciCodes.values()]
}

const fetchEpcisIfn = (epciCodes: string[]): Promise<IFNResponse> =>
  axios
    .get<IFNResponse>(
      `https://preprod.fragilite-numerique.tlscp.fr/api/scoring/epci?${epciCodes
        .map((epci) => `codes[]=${epci}`)
        .join(
          '&',
        )}&filters[]=no_thd_coverage_rate&filters[]=no_4g_coverage_rate&filters[]=older_65_rate&filters[]=nscol15p_rate&filters[]=poverty_rate`,
    )
    .then(({ data }) => data)

const fetchCitiesIfn = (
  cities: GeoApiCity[],
): Promise<Map<string, IFNResponse[string]>> => {
  const chunks = chunk(cities, 350)

  return Promise.all(
    chunks.map((cityCodes) =>
      axios
        .get<IFNResponse>(
          `https://preprod.fragilite-numerique.tlscp.fr/api/scoring/city?${cityCodes
            .map((city) => `codes[]=${city.code}`)
            .join(
              '&',
            )}&filters[]=no_thd_coverage_rate&filters[]=no_4g_coverage_rate&filters[]=older_65_rate&filters[]=nscol15p_rate&filters[]=poverty_rate`,
        )
        .then(({ data }) => data),
    ),
  ).then((responses) =>
    responses.reduce(
      (allIfn: Map<string, IFNResponse[string]>, ifnResponse) => {
        for (const [code, ifn] of Object.entries(ifnResponse)) {
          allIfn.set(code, ifn)
        }
        return allIfn
      },
      new Map<string, IFNResponse[string]>(),
    ),
  )
}

const getIfnFromResponse = (
  code: string,
  ifn: IFNResponse,
): IFNResponse[string] | null => {
  const result = ifn[code]

  if (!result) {
    console.error(`IFN response is missing for code ${code}`)
    return null
  }

  return result
}

const getIfnFromMap = (
  code: string,
  ifn: Map<string, IFNResponse[string]>,
): IFNResponse[string] | null => {
  const result = ifn.get(code)

  if (!result) {
    console.error(`IFN response is missing for code ${code}`)
    return null
  }

  return result
}

export const getStructuresDataForCity = (
  city: GeoApiCity,
  structures: Structure[],
) => {
  // TODO This data and aggregated data will direclty come from the graphql API, not aggregated here
  const cityStructures = structures.filter((structure) =>
    city.codesPostaux.includes(structure.properties.postalCode),
  )
  const structuresCount = countStructures(cityStructures)

  let aidants = 0
  let conseillersNumeriques = 0
  let habilitesAidantsConnect = 0

  for (const structure of cityStructures) {
    // TODO: this is temporary for demo, one conseiller can work in X structures so use data from API
    conseillersNumeriques += structure.properties.conseillersNumeriques ?? 0
    aidants += structure.properties.conseillersNumeriques ?? 0

    habilitesAidantsConnect +=
      structure.properties.aidantsHabilitesAidantsConnect ?? 0
    aidants += structure.properties.aidantsHabilitesAidantsConnect ?? 0
  }

  return {
    structuresCount,
    aidants,
    conseillersNumeriques,
    habilitesAidantsConnect,
  }
}

const getSections = async (
  departement: string,
  structures: Structure[],
): Promise<{
  cities: City[]
  epcis: EPCI[]
}> => {
  const cities = await fetchDepartementCities(departement)

  const epciCodes = getCitiesEpciCodes(cities)

  const [citiesIfn, epcisIfn] = await Promise.all([
    fetchCitiesIfn(cities),
    fetchEpcisIfn(epciCodes),
  ])

  return {
    cities: cities.map((city): City => {
      const ifn = getIfnFromMap(city.code, citiesIfn)

      const ifnData = ifn
        ? {
            ifnTotal: ifn.score.total,
            ifnNo4gCoverageRate: ifn.score.no_4g_coverage_rate,
            ifnNoThdCoverageRate: ifn.score.no_thd_coverage_rate,
            ifnPovertyRate: ifn.score.poverty_rate,
            ifnNscol15pRate: ifn.score.nscol15p_rate,
            ifnOlder65Rate: ifn.score.older_65_rate,
          }
        : {
            ifnTotal: null,
            ifnNo4gCoverageRate: null,
            ifnNoThdCoverageRate: null,
            ifnPovertyRate: null,
            ifnNscol15pRate: null,
            ifnOlder65Rate: null,
          }

      const structuresData = getStructuresDataForCity(city, structures)

      return {
        ...city,
        ...ifnData,
        ...structuresData,
      }
    }),
    epcis: epciCodes.map((epciCode) => ({
      code: epciCode,
      ifn: getIfnFromResponse(epciCode, epcisIfn)?.score.total ?? null,
    })),
  }
}

export type DepartementData = DepartementGeoJson & {
  cities: City[]
  epcis: EPCI[]
}

const memoizedDepartementData = new Map<string, DepartementData | null>()

export const getDepartementInformations = async (
  departement: string,
  structures: Structure[],
): Promise<DepartementData | null> => {
  const memoized = memoizedDepartementData.get(departement)
  if (memoized) {
    return memoized
  }

  const departementGeoJson = getDepartementGeoJson({ code: departement })
  const sections = await getSections(departement, structures)

  const result = departementGeoJson
    ? {
        ...departementGeoJson,
        ...sections,
      }
    : null

  memoizedDepartementData.set(departement, result)
  return result
}
