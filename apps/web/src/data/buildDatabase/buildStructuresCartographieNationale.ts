import { output } from '@app/cli/output'
import axios from 'axios'
import type { Prisma } from '@prisma/client'
import {
  DataInclusionStructure,
  DataInclusionTypologies,
} from '@app/web/data/dataInclusionSchema'
import { getCommuneCode } from '@app/web/data/getCommuneCode'
import { getDepartementCodeFromPostalCode } from '@app/web/data/getDepartementCodeFromPostalCode'
import { titleCase } from '@app/web/utils/titleCase'
import { BuildCommunesOutput } from '@app/web/data/buildDatabase/buildCommunes'

/**
 * E.g. "mediation-numerique-conseiller-numerique-62ab017b8255a806e299c725-mediation-numerique"
 */
const conumIdExtract = /conseiller-numerique-([\dA-Fa-f]{3,})/

/**
 * E.g. "aidants-connect-1539|numi-conseiller-numerique-63d784fce6d6a806f256657a|numinumiconseiller-numerique-63d784fce6d6a806f256657a"
 */
const aidantsConnectIdExtract = /aidants-connect-(\d*)/

export const extractMetadataFromId = (id: string) => {
  const conumPermanenceIdMatch = id.match(conumIdExtract)
  const conumPermanenceId = conumPermanenceIdMatch
    ? conumPermanenceIdMatch[1]
    : undefined

  const aidantsConnectStructureIdMatch = id.match(aidantsConnectIdExtract)
  const aidantsConnectStructureId = aidantsConnectStructureIdMatch
    ? aidantsConnectStructureIdMatch[1]
    : undefined
  return {
    conumPermanenceId,
    aidantsConnectStructureId,
  }
}

export const buildStructuresCartographieNationale = async ({
  communes,
}: {
  communes: BuildCommunesOutput
}) => {
  output('-- Getting data from https://www.data.gouv.fr...')

  const byAidantsConnectId = new Map<string, string>()
  const byConumPermanenceId = new Map<string, string>()

  // https://www.data.gouv.fr/fr/datasets/lieux-de-mediation-numerique-sur-le-territoire-national-fournis-par-data-inclusion-1/
  const { data: allDataInclusionStructures } = await axios.get<
    DataInclusionStructure[]
  >(
    'https://www.data.gouv.fr/fr/datasets/r/be3323ec-4662-4b3b-b90e-18cf5c97193d',
  )
  const data: Prisma.StructureCartographieNationaleCreateManyInput[] = []
  const reconstructedCodes = []

  output(`-- Preparing data (${allDataInclusionStructures.length})...`)

  for (const structure of allDataInclusionStructures) {
    const dataInclusionTypologie =
      !!structure.typologie && structure.typologie in DataInclusionTypologies
        ? DataInclusionTypologies[structure.typologie]
        : null

    const type = dataInclusionTypologie?.type ?? 'nonDefini'

    const sousTypePublic =
      dataInclusionTypologie && 'subtype' in dataInclusionTypologie
        ? dataInclusionTypologie.subtype
        : null

    const { conumPermanenceId, aidantsConnectStructureId } =
      extractMetadataFromId(structure.id)
    if (conumPermanenceId) {
      byConumPermanenceId.set(conumPermanenceId, structure.id)
    }
    if (aidantsConnectStructureId) {
      byAidantsConnectId.set(aidantsConnectStructureId, structure.id)
    }

    if (!structure.code_insee || !communes.codes.has(structure.code_insee)) {
      reconstructedCodes.push(structure)
    }

    const codeCommune =
      structure.code_insee && communes.codes.has(structure.code_insee)
        ? structure.code_insee
        : getCommuneCode(
            { nom: structure.commune, codePostal: structure.code_postal },
            communes.codePostalIndex,
            false,
          )

    const codeDepartement = getDepartementCodeFromPostalCode(
      structure.code_postal,
    )

    let errors: Record<string, string> | undefined

    if (!codeCommune) {
      errors = {}
      errors.codeCommune = `Code commune non trouvé pour ${structure.commune} ${structure.code_postal}`
    }

    data.push({
      id: structure.id,
      nom: titleCase(structure.nom),
      siret: structure.siret,
      type,
      sousTypePublic,
      codeDepartement,
      codeCommune,
      adresse: structure.adresse,
      codePostal: structure.code_postal,
      source: structure.source,
      updatedAt: structure.date_maj,
      latitude: structure.latitude,
      longitude: structure.longitude,
      labelConseillersNumerique:
        structure.labels_nationaux?.includes('conseiller-numerique') ?? false,
      labelFranceServices:
        structure.labels_nationaux?.includes('france-service') ?? false,
      labelAidantsConnect:
        structure.labels_nationaux?.includes('aidants-connect') ?? false,
      errors,
    })
  }

  return { reconstructedCodes, byAidantsConnectId, byConumPermanenceId, data }
}

export type BuildStructuresCartographieNationaleOutput = Awaited<
  ReturnType<typeof buildStructuresCartographieNationale>
>
