import { output } from '@app/cli/output'
import axios from 'axios'
import { Prisma } from '@prisma/client'
import { getGeoDepartements } from '@app/web/data/geoDepartements'
import { getBounds } from '@app/web/data/geometry'
import { DomainDataForDataIntegrity } from '@app/web/data/buildDatabase/getDomainDataForDataIntegrity'
import { transformStringToSearchableString } from '@app/web/search/transformStringToSearchableString'
import { arrayToMap } from '@app/web/utils/arrayToMap'

export const buildDepartements = async ({
  domainData,
}: {
  domainData: DomainDataForDataIntegrity
}) => {
  output('-- Downloading from https://geo.api.gouv.fr...')

  // We have 2 sources for departements:
  // INSEE (for metropolitan and dom) and Geo API (for non - dom)
  const geoApiDepartements = await axios
    .get<{ code: string; nom: string; codeRegion: string }[]>(
      'https://geo.api.gouv.fr/departements?fields=code,nom,codeRegion,geometry',
    )
    .then(({ data }) => arrayToMap(data, 'code'))

  output('-- Getting geo data from json file ...')

  const departementsGeometry = await getGeoDepartements()

  output('-- Preparing data ...')

  // There is more departements geometry than geo api departements (e.g. dep 975)
  const data = departementsGeometry.features.map((feature) => {
    const code = feature.properties.DDEP_C_COD

    const bounds = getBounds(feature.geometry.coordinates)

    const geoApiDepartement = geoApiDepartements.get(code)

    const searchable = transformStringToSearchableString(
      `${code}${feature.properties.DDEP_L_LIB}`,
    )

    if (geoApiDepartement) {
      return {
        searchable,
        ...geoApiDepartement,
        geometry: feature.geometry,
        bounds,
      }
    }

    return {
      searchable,
      code,
      nom: feature.properties.DDEP_L_LIB,
      codeRegion: null,
      geometry: feature.geometry,
      bounds,
    }
  })

  const dataByCode = arrayToMap(data, 'code')

  // First we check if rows need to be deleted
  const toDelete = new Set<string>()

  for (const existing of domainData.departements.values()) {
    if (!dataByCode.has(existing.code)) {
      toDelete.add(existing.code)
    }
  }
  const toCreate: Prisma.DepartementCreateManyInput[] = []
  const toUpdate: Prisma.DepartementUpdateArgs[] = []

  for (const departement of data) {
    const existing = domainData.departements.get(departement.code)

    if (!existing) {
      toCreate.push(departement)
      continue
    }

    if (
      existing.code === departement.code &&
      existing.nom === departement.nom &&
      existing.codeRegion === departement.codeRegion
    ) {
      continue
    }

    toUpdate.push({
      select: { code: true },
      where: { code: departement.code },
      data: departement,
    })
  }

  output('-- Checking integrity...')
  const missingDepartementCodesInFormulaires = domainData.formulaires.filter(
    ({ departementCode }) =>
      !!departementCode && !geoApiDepartements.has(departementCode),
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
        !!departementCode && !geoApiDepartements.has(departementCode),
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

  return {
    codes: new Set(data.map(({ code }) => code)),
    toCreate,
    toUpdate,
    toDelete,
  }
}

export type BuildDepartementsOutput = Awaited<
  ReturnType<typeof buildDepartements>
>
