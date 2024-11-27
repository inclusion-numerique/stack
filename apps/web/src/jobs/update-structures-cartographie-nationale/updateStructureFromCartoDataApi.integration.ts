import { deleteAll } from '@app/fixtures/seeds'
import { prismaClient } from '@app/web/prismaClient'
import { SchemaLieuMediationNumerique } from '@gouvfr-anct/lieux-de-mediation-numerique'
import { updateStructureFromCartoDataApi } from './updateStructureFromCartoDataApi'

const COMMON_STRUCTURE_FIELDS = {
  adresse: '12 Rue Louise Leclercq',
  code_postal: '62100',
  commune: 'Calais',
  date_maj: '2024-04-02',
  nom: 'Anonymal',
  pivot: '43493312300029',
}

const STRUCTURE_TO_INSERT = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Conseiller-Numerique_65eec075991038075ed174b5',
  source: 'Conseiller Numérique',
}

const STRUCTURE_TO_INSERT_HASH =
  '9bc48dfac97087cd0bdba7207cd521262c7664b30d64ec6f2759463c28df07ab'

const STRUCTURE_TO_UPDATE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Hinaura_FablabVichyCommunaute3',
  source: 'Hinaura',
}

const UPDATED_STRUCTURE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Hinaura_FablabVichyCommunaute3',
  source: 'Hinaura',
  adresse: '12 bis Rue Louise Leclercq',
}

const STRUCTURE_TO_DELETE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Aidants-Connect_0b05bd0c-09e5-404f-a4e4-56eadfc7e5da',
  source: 'Aidants Connect',
}

const STRUCTURE_TO_SOFT_DELETE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Les-Assembleurs_1528',
  source: 'Les Assembleurs',
}

const UPDATED_STRUCTURE_HASH =
  '38a1c1a7a2363abaebeff7047ecc54868cb61f62fc76d555dd240bfd28f44555'

const STRUCTURE1_TO_BE_MERGED = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Aidants-Connect_5325296e-6318-40b3-8e5f-9b6689f03948',
  source: 'Aidants-Connect',
}

const STRUCTURE2_TO_BE_MERGED = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Conseiller-Numerique_62bb6a3edd51e705b180bb22',
  source: 'Conseiller-Numerique',
}

const MERGED_STRUCTURE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Aidants-Connect_5325296e-6318-40b3-8e5f-9b6689f03948__Conseiller-Numerique_62bb6a3edd51e705b180bb22',
  source: 'Conseiller Numerique',
}

const COOP_NUMERIQUE_STRUCTURE1_TO_BE_MERGED = {
  ...COMMON_STRUCTURE_FIELDS,
  id: '0927f824-b84d-4840-ae2e-e4a96a7a519b',
}

const COOP_NUMERIQUE_STRUCTURE2_TO_BE_MERGED = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'f98724ab-93d2-46cd-bff6-1821dd6a6da7',
}

const MERGED_INTERNAL_STRUCTURE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: `Coop-numérique_${COOP_NUMERIQUE_STRUCTURE1_TO_BE_MERGED.id}__Coop-numérique_${COOP_NUMERIQUE_STRUCTURE2_TO_BE_MERGED.id}`,
  source: 'Coop numérique',
}

const MERGED_STRUCTURE_HASH =
  'df9973465ba3baf0f741cf4d0f6b461b673a5ba6b8c7ec69af0e17a6abdee2d8'

const toStructureCartoInDatabase = (
  hash: string,
  structure: SchemaLieuMediationNumerique,
) => ({
  id: structure.id,
  nom: structure.nom,
  pivot: structure.pivot,
  source: structure.source,
  adresse: structure.adresse,
  codePostal: structure.code_postal,
  commune: structure.commune,
  dateMaj: new Date(structure.date_maj),
  hash,
})

const toStructureFields = (structure: SchemaLieuMediationNumerique) => ({
  nom: structure.nom,
  adresse: structure.adresse,
  commune: structure.commune,
  codePostal: structure.code_postal,
})

const toStructureInDatabase = (structure: SchemaLieuMediationNumerique) => ({
  structureCartographieNationaleId: structure.id,
  ...toStructureFields(structure),
})

const NOW = new Date('2024-10-08')

describe('updateStructureFromCartoDataApi', () => {
  beforeEach(async () => {
    await deleteAll(prismaClient)
  })

  it('inserts structures if none are present in database', async () => {
    await prismaClient.structureCartographieNationale.createMany({
      data: [
        toStructureCartoInDatabase('to-update-hash', STRUCTURE_TO_UPDATE),
        toStructureCartoInDatabase('to-delete-hash', STRUCTURE_TO_DELETE),
        toStructureCartoInDatabase(
          'to-soft-delete-hash',
          STRUCTURE_TO_SOFT_DELETE,
        ),
        toStructureCartoInDatabase('to-merge-1-hash', STRUCTURE1_TO_BE_MERGED),
        toStructureCartoInDatabase('to-merge-2-hash', STRUCTURE2_TO_BE_MERGED),
      ],
    })

    await prismaClient.structure.createMany({
      data: [
        toStructureInDatabase(STRUCTURE_TO_SOFT_DELETE),
        toStructureInDatabase(STRUCTURE1_TO_BE_MERGED),
        toStructureInDatabase(STRUCTURE2_TO_BE_MERGED),
        {
          id: COOP_NUMERIQUE_STRUCTURE1_TO_BE_MERGED.id,
          ...toStructureFields(COOP_NUMERIQUE_STRUCTURE1_TO_BE_MERGED),
        },
        {
          id: COOP_NUMERIQUE_STRUCTURE2_TO_BE_MERGED.id,
          ...toStructureFields(COOP_NUMERIQUE_STRUCTURE2_TO_BE_MERGED),
        },
      ],
    })

    const user = await prismaClient.user.create({
      data: { email: 'john@doe.com' },
    })

    await prismaClient.employeStructure.create({
      data: {
        userId: user.id,
        structureId: COOP_NUMERIQUE_STRUCTURE2_TO_BE_MERGED.id,
      },
    })

    const mediateur = await prismaClient.mediateur.create({
      data: {
        userId: user.id,
      },
    })

    await prismaClient.mediateurEnActivite.create({
      data: {
        mediateurId: mediateur.id,
        structureId: COOP_NUMERIQUE_STRUCTURE2_TO_BE_MERGED.id,
      },
    })

    await prismaClient.activite.create({
      data: {
        type: 'Individuel',
        typeLieu: 'ADistance',
        mediateurId: mediateur.id,
        date: NOW,
        duree: 60,
        structureId: COOP_NUMERIQUE_STRUCTURE2_TO_BE_MERGED.id,
      },
    })

    await updateStructureFromCartoDataApi({
      structuresCartographieNationale: [
        UPDATED_STRUCTURE,
        STRUCTURE_TO_INSERT,
        MERGED_STRUCTURE,
        MERGED_INTERNAL_STRUCTURE,
      ],
      now: NOW,
    })()

    const structuresCartographieNationale =
      await prismaClient.structureCartographieNationale.findMany()

    expect(structuresCartographieNationale).toEqual([
      expect.objectContaining(
        toStructureCartoInDatabase(MERGED_STRUCTURE_HASH, MERGED_STRUCTURE),
      ),
      expect.objectContaining(
        toStructureCartoInDatabase(
          STRUCTURE_TO_INSERT_HASH,
          STRUCTURE_TO_INSERT,
        ),
      ),
      expect.objectContaining(
        toStructureCartoInDatabase(UPDATED_STRUCTURE_HASH, UPDATED_STRUCTURE),
      ),
      expect.objectContaining({
        ...toStructureCartoInDatabase(
          'to-soft-delete-hash',
          STRUCTURE_TO_SOFT_DELETE,
        ),
        modification: NOW,
        suppression: NOW,
        suppressionImport: NOW,
      }),
    ])

    const structures = await prismaClient.structure.findMany()

    expect(structures).toEqual([
      expect.objectContaining({
        structureCartographieNationaleId: 'Les-Assembleurs_1528',
      }),
      expect.objectContaining({
        id: '0927f824-b84d-4840-ae2e-e4a96a7a519b',
      }),
      expect.objectContaining({
        structureCartographieNationaleId:
          'Aidants-Connect_5325296e-6318-40b3-8e5f-9b6689f03948__Conseiller-Numerique_62bb6a3edd51e705b180bb22',
      }),
      expect.objectContaining({
        structureCartographieNationaleId:
          'Aidants-Connect_5325296e-6318-40b3-8e5f-9b6689f03948__Conseiller-Numerique_62bb6a3edd51e705b180bb22',
      }),
    ])

    const employeStructures = await prismaClient.employeStructure.findMany()

    expect(employeStructures).toEqual([
      expect.objectContaining({
        structureId: COOP_NUMERIQUE_STRUCTURE1_TO_BE_MERGED.id,
      }),
    ])

    const mediateurEnActivite =
      await prismaClient.mediateurEnActivite.findMany()

    expect(mediateurEnActivite).toEqual([
      expect.objectContaining({
        structureId: COOP_NUMERIQUE_STRUCTURE1_TO_BE_MERGED.id,
      }),
    ])

    const activites = await prismaClient.activite.findMany()

    expect(activites).toEqual([
      expect.objectContaining({
        structureId: COOP_NUMERIQUE_STRUCTURE1_TO_BE_MERGED.id,
      }),
    ])
  })
})
