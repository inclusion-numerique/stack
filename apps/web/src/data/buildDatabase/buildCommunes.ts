import { output } from '@app/cli/output'
import axios from 'axios'
import type { Prisma } from '@prisma/client'
import { createCodePostalIndex } from '@app/web/data/getCommuneCode'
import { BuildDepartementsOutput } from '@app/web/data/buildDatabase/buildDepartements'
import { districts } from '@app/web/data/districts'
import { DomainDataForDataIntegrity } from '@app/web/data/buildDatabase/getDomainDataForDataIntegrity'

export const buildCommunes = async ({
  departements,
  domainData,
}: {
  departements: BuildDepartementsOutput
  domainData: DomainDataForDataIntegrity
}) => {
  output('-- Downloading from https://geo.api.gouv.fr...')

  const { data: communesGeoWithoutDistricts } = await axios.get<
    {
      nom: string
      code: string
      type: string
      centre: { type: 'Point'; coordinates: [number, number] }
      codeDepartement: string
      siren: string
      codeEpci: string
      codesPostaux: string[]
      population: number
    }[]
  >(
    'https://geo.api.gouv.fr/communes?fields=code,codeDepartement,centre,population,codesPostaux,codeEpci',
  )
  output('-- Preparing data...')

  const codesPostaux: { code: string; codeCommune: string }[] = []

  const communesData: Prisma.CommuneCreateManyInput[] = []

  const codePostalIndex = createCodePostalIndex()

  for (const commune of communesGeoWithoutDistricts) {
    const arrondissements = districts[commune.nom.toLowerCase()]

    // We ignore departementCode for communes that are not registered in geo api (e.g. La Terre Adélie) code 984
    const codeDepartement =
      commune.codeDepartement === '984' ? null : commune.codeDepartement

    if (codeDepartement && !departements.codes.has(codeDepartement)) {
      console.error('Missing departement', commune)
      throw new Error('No departement for municipality')
    }

    // We add districts (arrondissements) for Paris, Lyon and Marseille, not the main commune
    if (arrondissements) {
      for (const arrondissement of arrondissements) {
        codesPostaux.push({
          code: arrondissement.codesPostaux[0],
          codeCommune: arrondissement.code,
        })
        communesData.push({
          code: arrondissement.code,
          nom: arrondissement.nom,
          codeDepartement: commune.codeDepartement,
          population: arrondissement.population,
          codeEpci: commune.codeEpci,
          latitude: (arrondissement.centre.coordinates as [number, number])[0],
          longitude: (arrondissement.centre.coordinates as [number, number])[1],
        })
        codePostalIndex.add(arrondissement.codesPostaux[0], {
          code: arrondissement.code,
          nom: arrondissement.nom.toLowerCase(),
        })
      }

      continue
    }

    const indexInfo = {
      code: commune.code,
      nom: commune.nom.toLowerCase(),
    }

    for (const codePostal of commune.codesPostaux) {
      codesPostaux.push({
        code: codePostal,
        codeCommune: commune.code,
      })
      codePostalIndex.add(codePostal, indexInfo)
    }

    communesData.push({
      code: commune.code,
      nom: commune.nom,
      codeDepartement,
      population: commune.population ?? 0,
      codeEpci: commune.codeEpci,
      latitude: commune.centre.coordinates[0],
      longitude: commune.centre.coordinates[1],
    })
  }

  const uniqueCodesPostaux = [
    ...new Set<string>(codesPostaux.map(({ code }) => code)),
  ].map((code) => ({ code }))

  output('-- Checking integrity...')
  const communeCodes = new Set(communesData.map(({ code }) => code))
  const missingCommuneCodesInFormulaires = domainData.formulaires.filter(
    ({ communeCode }) => !!communeCode && !communeCodes.has(communeCode),
  )

  if (missingCommuneCodesInFormulaires.length > 0) {
    console.warn(
      `Missing commune codes in formulaires: ${missingCommuneCodesInFormulaires
        .map(({ communeCode, id }) => `${id}: ${communeCode ?? 'null'}`)
        .join(', ')}`,
    )
  }

  const missingCommuneCodesInParticipants =
    domainData.communesParticipantes.filter(
      ({ communeCode }) => !communeCodes.has(communeCode),
    )

  if (missingCommuneCodesInParticipants.length > 0) {
    console.warn(
      `Missing commune codes in participants: ${missingCommuneCodesInParticipants
        .map(
          ({ communeCode, id, formulaireGouvernanceId }) =>
            `${formulaireGouvernanceId} / ${id}: ${communeCode ?? 'null'}`,
        )
        .join(', ')}`,
    )
  }

  return {
    codes: new Set(communesData.map(({ code }) => code)),
    codePostalIndex,
    codePostalData: uniqueCodesPostaux,
    communesData,
    codesPostauxData: codesPostaux,
  }
}

export type BuildCommunesOutput = Awaited<ReturnType<typeof buildCommunes>>
