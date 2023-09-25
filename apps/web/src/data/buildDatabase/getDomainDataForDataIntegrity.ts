import { output } from '@app/cli/output'
import { prismaClient } from '@app/web/prismaClient'
import { arrayToMap } from '@app/web/utils/arrayToMap'

export const getDomainDataForDataIntegrity = async () => {
  const formulaires = await prismaClient.formulaireGouvernance.findMany({
    select: {
      id: true,
      communeCode: true,
      departementCode: true,
      epciCode: true,
      regionCode: true,
    },
  })
  const departementsParticipants =
    await prismaClient.departementParticipantFormulaireGouvernance.findMany({
      select: {
        id: true,
        formulaireGouvernanceId: true,
        departementCode: true,
      },
    })
  const epciParticipants =
    await prismaClient.epciParticipantFormulaireGouvernance.findMany({
      select: {
        id: true,
        formulaireGouvernanceId: true,
        epciCode: true,
      },
    })
  const communesParticipantes =
    await prismaClient.communeParticipanteFormulaireGouvernance.findMany({
      select: {
        id: true,
        formulaireGouvernanceId: true,
        communeCode: true,
      },
    })
  const regions = await prismaClient.region
    .findMany({
      select: {
        code: true,
        nom: true,
        searchable: true,
      },
    })
    .then((items) => arrayToMap(items, 'code'))

  const departements = await prismaClient.departement
    .findMany({
      select: {
        code: true,
        nom: true,
        codeRegion: true,
        searchable: true,
      },
    })
    .then((items) => arrayToMap(items, 'code'))

  const epcis = await prismaClient.epci
    .findMany({
      select: {
        code: true,
        nom: true,
        population: true,
        searchable: true,
      },
    })
    .then((items) => arrayToMap(items, 'code'))

  const communes = await prismaClient.commune
    .findMany({
      select: {
        code: true,
        nom: true,
        codeDepartement: true,
        codeEpci: true,
        searchable: true,
        latitude: true,
        longitude: true,
        codesPostaux: {
          select: {
            codePostal: {
              select: {
                code: true,
              },
            },
          },
        },
      },
    })
    .then((items) => arrayToMap(items, 'code'))

  // Query code postal separately to correct for inconsistencies
  const codePostaux = await prismaClient.codePostal
    .findMany({
      select: {
        code: true,
      },
    })
    .then((items) => new Set(items.map(({ code }) => code)))

  output(
    `-- ${formulaires.length} formulaires, ${departementsParticipants.length} departements participants, ${epciParticipants.length} epci participants, ${communesParticipantes.length} communes participantes, ${regions.size} regions, ${departements.size} departements, ${epcis.size} epcis, ${communes.size} communes, ${codePostaux.size} code postaux`,
  )

  return {
    formulaires,
    departementsParticipants,
    epciParticipants,
    communesParticipantes,
    regions,
    departements,
    epcis,
    communes,
    codePostaux,
  }
}

export type DomainDataForDataIntegrity = Awaited<
  ReturnType<typeof getDomainDataForDataIntegrity>
>
