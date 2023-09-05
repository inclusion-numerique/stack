import { output } from '@app/cli/output'
import axios from 'axios'
import { getGeoDepartements } from '@app/web/data/geoDepartements'
import { getBounds } from '@app/web/data/geometry'
import { DomainDataForDataIntegrity } from '@app/web/data/buildDatabase/getDomainDataForDataIntegrity'

export const buildDepartements = async ({
  domainData,
}: {
  domainData: DomainDataForDataIntegrity
}) => {
  output('-- Downloading from https://geo.api.gouv.fr...')

  // We have 2 sources for departements:
  // INSEE (for metropolitan and dom) and Geo API (for non - dom)
  const { data: geoApiDepartements } = await axios.get<
    { code: string; nom: string; codeRegion: string }[]
  >('https://geo.api.gouv.fr/departements?fields=code,nom,codeRegion,geometry')

  const byCode = new Map(
    geoApiDepartements.map((departement) => [departement.code, departement]),
  )

  output('-- Getting geo data from json file ...')

  const departementsGeometry = await getGeoDepartements()

  output('-- Preparing data ...')

  // There is more departements geometry than geo api departements (e.g. dep 975)
  const data = departementsGeometry.features.map((feature) => {
    const code = feature.properties.DDEP_C_COD

    const bounds = getBounds(feature.geometry.coordinates)

    const geoApiDepartement = byCode.get(code)

    if (geoApiDepartement) {
      return {
        ...geoApiDepartement,
        geometry: feature.geometry,
        bounds,
      }
    }

    return {
      code,
      nom: feature.properties.DDEP_L_LIB,
      codeRegion: null,
      geometry: feature.geometry,
      bounds,
    }
  })

  output('-- Checking integrity...')
  const departementCodes = new Set(data.map(({ code }) => code))
  const missingDepartementCodesInFormulaires = domainData.formulaires.filter(
    ({ departementCode }) =>
      !!departementCode && !departementCodes.has(departementCode),
  )

  if (missingDepartementCodesInFormulaires.length > 0) {
    console.warn(
      `Missing departement codes in formulaires: ${missingDepartementCodesInFormulaires
        .map(({ departementCode, id }) => `${id}: ${departementCode ?? 'null'}`)
        .join(', ')}`,
    )
  }

  const missingDepartementCodesInParticipants =
    domainData.departementsParticipants.filter(
      ({ departementCode }) =>
        !!departementCode && !departementCodes.has(departementCode),
    )

  if (missingDepartementCodesInParticipants.length > 0) {
    console.warn(
      `Missing departement codes in participants for formulaire: ${missingDepartementCodesInParticipants
        .map(
          ({ departementCode, id, formulaireGouvernanceId }) =>
            `${formulaireGouvernanceId} / ${id}: ${departementCode ?? 'null'}`,
        )
        .join(', ')}`,
    )
  }

  return { codes: new Set(data.map(({ code }) => code)), data }
}

export type BuildDepartementsOutput = Awaited<
  ReturnType<typeof buildDepartements>
>
