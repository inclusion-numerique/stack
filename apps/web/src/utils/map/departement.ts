import axios from 'axios'
import { chunk } from 'lodash'
import {
  DepartementGeoJson,
  getDepartementGeoJson,
} from '@app/web/utils/map/departementGeoJson'
import { City, EPCI, IFNResponse } from '@app/web/types/City'

type GeoApiCity = Omit<City, 'ifn'>

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

// TODO Memoize this
const getSections = async (
  departement: string,
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
    cities: cities.map((city) => ({
      ...city,
      ifn: getIfnFromMap(city.code, citiesIfn)?.score.total ?? null,
    })),
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
export const getDepartementInformations = async (
  departement: string,
): Promise<DepartementData | null> => {
  const departementGeoJson = getDepartementGeoJson({ code: departement })
  const sections = await getSections(departement)

  return departementGeoJson
    ? {
        ...departementGeoJson,
        ...sections,
      }
    : null
}
