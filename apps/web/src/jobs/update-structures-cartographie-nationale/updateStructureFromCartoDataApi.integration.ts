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

const ANOTHER_STRUCTURE_TO_DELETE = {
  ...COMMON_STRUCTURE_FIELDS,
  id: 'Les-Assembleurs_1528',
  source: 'Les Assembleurs',
}

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

const toStructureCartoInDatabase = (
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

const createStructureFor =
  (email: string) =>
  async (structure: {
    commune: string
    adresse: string
    id: string
    codePostal: string
    nom: string
  }) => {
    await prismaClient.structure.createMany({
      data: [structure],
    })

    const user = await prismaClient.user.create({
      data: { email },
    })

    await prismaClient.employeStructure.create({
      data: {
        userId: user.id,
        structureId: structure.id,
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
        structureId: structure.id,
      },
    })
  }

describe('updateStructureFromCartoDataApi', () => {
  beforeEach(async () => {
    await deleteAll(prismaClient)
  })

  it('inserts structures if none are present in database', async () => {
    await prismaClient.structureCartographieNationale.createMany({
      data: [
        toStructureCartoInDatabase(STRUCTURE_TO_UPDATE),
        toStructureCartoInDatabase(STRUCTURE_TO_DELETE),
        toStructureCartoInDatabase(ANOTHER_STRUCTURE_TO_DELETE),
        toStructureCartoInDatabase(STRUCTURE1_TO_BE_MERGED),
        toStructureCartoInDatabase(STRUCTURE2_TO_BE_MERGED),
      ],
    })

    await prismaClient.structure.createMany({
      data: [
        toStructureInDatabase(ANOTHER_STRUCTURE_TO_DELETE),
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
      expect.objectContaining(toStructureCartoInDatabase(UPDATED_STRUCTURE)),
      expect.objectContaining(toStructureCartoInDatabase(STRUCTURE_TO_INSERT)),
      expect.objectContaining(toStructureCartoInDatabase(MERGED_STRUCTURE)),
      expect.objectContaining(
        toStructureCartoInDatabase(MERGED_INTERNAL_STRUCTURE),
      ),
    ])

    const structures = await prismaClient.structure.findMany()

    expect(structures).toEqual([
      expect.objectContaining({
        structureCartographieNationaleId: null,
      }),
      expect.objectContaining({
        structureCartographieNationaleId: null,
      }),
      expect.objectContaining({
        structureCartographieNationaleId: null,
      }),
      expect.objectContaining({
        id: '0927f824-b84d-4840-ae2e-e4a96a7a519b',
        structureCartographieNationaleId:
          'Coop-numérique_0927f824-b84d-4840-ae2e-e4a96a7a519b__Coop-numérique_f98724ab-93d2-46cd-bff6-1821dd6a6da7',
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

  it('inserts coop structure imported from cartographie national', async () => {
    const cartographieId = 'Coop-numérique_00efad2c-0d71-43e3-a174-9e0c2defa083'
    const structure = {
      id: '00efad2c-0d71-43e3-a174-9e0c2defa083',
      nom: 'France services',
      adresse: '11 rue Ferdinand Mercusot',
      commune: 'Sombernon',
      codePostal: '21540',
    }

    const mediateurEmail = 'john@doe.com'

    await createStructureFor(mediateurEmail)(structure)

    await updateStructureFromCartoDataApi({
      structuresCartographieNationale: [
        {
          id: cartographieId,
          pivot: '00000000000000',
          nom: structure.nom,
          adresse: structure.adresse,
          commune: structure.commune,
          code_postal: structure.codePostal,
          date_maj: '2024-10-08',
        },
      ],
      now: NOW,
    })()

    const structureFound = await prismaClient.structure.findUnique({
      where: { id: structure.id },
    })

    expect(structureFound).toEqual(
      expect.objectContaining({
        id: structure.id,
        structureCartographieNationaleId: cartographieId,
      }),
    )
  })

  it('inserts merged coop structure imported from cartographie national', async () => {
    const cartographieId =
      'Aidants-Connect_85a0a369-c7b0-45b5-a985-b24bd4e519e6__Conseiller-Numerique_63c93c2dcb6a5406f25be3bc__Coop-numérique_a6648fed-4d21-4ca4-a25b-d5a44d8ca38a'
    const structure = {
      id: 'a6648fed-4d21-4ca4-a25b-d5a44d8ca38a',
      nom: 'MSD Bellerive-sur-Allier',
      adresse: '11 Esplanade François Mitterrand le Fontane',
      commune: 'Bellerive-sur-allier',
      codePostal: '03700',
    }

    const mediateurEmail = 'john@doe.com'

    await createStructureFor(mediateurEmail)(structure)

    await updateStructureFromCartoDataApi({
      structuresCartographieNationale: [
        {
          id: cartographieId,
          pivot: '00000000000000',
          nom: structure.nom,
          adresse: structure.adresse,
          commune: structure.commune,
          code_postal: structure.codePostal,
          date_maj: '2024-10-08',
        },
      ],
      now: NOW,
    })()

    const structureFound = await prismaClient.structure.findUnique({
      where: { id: structure.id },
    })

    const structureCartographieNationaleFound =
      await prismaClient.structureCartographieNationale.findUnique({
        where: { id: cartographieId },
      })

    expect(structureFound).toEqual(
      expect.objectContaining({
        id: structure.id,
        structureCartographieNationaleId: cartographieId,
      }),
    )

    expect(structureCartographieNationaleFound).toEqual(
      expect.objectContaining({
        id: cartographieId,
      }),
    )
  })

  it('inserts merged coop structure imported from cartographie national after a previous import with different merge', async () => {
    const initialCartographieId =
      'Conseiller-Numerique_63c93c2dcb6a5406f25be3bc__Coop-numérique_a6648fed-4d21-4ca4-a25b-d5a44d8ca38a'
    const finalCartographieId = `Aidants-Connect_85a0a369-c7b0-45b5-a985-b24bd4e519e6__${initialCartographieId}`

    const structure = {
      id: 'a6648fed-4d21-4ca4-a25b-d5a44d8ca38a',
      nom: 'MSD Bellerive-sur-Allier',
      adresse: '11 Esplanade François Mitterrand le Fontane',
      commune: 'Bellerive-sur-allier',
      codePostal: '03700',
      structureCartographieNationaleId: initialCartographieId,
    }

    await prismaClient.structureCartographieNationale.create({
      data: {
        id: initialCartographieId,
        nom: 'MSD Bellerive-sur-Allier',
        pivot: '00000000000000',
        adresse: '11 Esplanade François Mitterrand le Fontane',
        commune: 'Bellerive-sur-allier',
        codePostal: '03700',
        dateMaj: new Date('2024-10-07'),
      },
    })

    const mediateurEmail = 'john@doe.com'

    await createStructureFor(mediateurEmail)(structure)

    await updateStructureFromCartoDataApi({
      structuresCartographieNationale: [
        {
          id: finalCartographieId,
          pivot: '00000000000000',
          nom: structure.nom,
          adresse: structure.adresse,
          commune: structure.commune,
          code_postal: structure.codePostal,
          date_maj: '2024-10-08',
        },
      ],
      now: NOW,
    })()

    const structureFound = await prismaClient.structure.findUnique({
      where: { id: structure.id },
    })

    const structureCartographieNationaleFound =
      await prismaClient.structureCartographieNationale.findUnique({
        where: { id: finalCartographieId },
      })

    expect(structureFound).toEqual(
      expect.objectContaining({
        id: structure.id,
        structureCartographieNationaleId: finalCartographieId,
      }),
    )

    expect(structureCartographieNationaleFound).toEqual(
      expect.objectContaining({
        id: finalCartographieId,
      }),
    )
  })

  it('inserts update already imported structure from cartographie nationale', async () => {
    const structure: SchemaLieuMediationNumerique = {
      id: 'Conseiller-Numerique_62bc656a8dd70306dc40c12a__dora_f69e4ed3-fa22-404e-b924-c67dc4b64106__dora_024462c5-6a5f-47cd-a846-bd2df10e69cf__dora_36b8da58-ef0e-48d4-98f3-9c7ab2f21d18__Francil-in_244',
      date_maj: '2024-10-08T00:00:00.000Z',
      source: 'dora',
      pivot: '80163389200030',
      nom: 'La Mine',
      latitude: 48,
      longitude: 2,
      presentation_detail:
        'L’association la Mine gère une Ressourcerie atelier chantier d’insertion. C’est un lieu qui collecte, revalorise et revend ou recycle les objets usagés (meubles, textile, petit électronique mais aussi à plus long terme déchets industriels banals et papier) et sensibilise le public à la réduction des déchets.',
      site_web: 'http://www.ressourcerie-la-mine.com',
      telephone: '+33769617320',
      typologie: 'ACI',
      adresse: '74 Avenue de la Convention',
      code_insee: '94003',
      code_postal: '94110',
      commune: 'Arcueil',
      courriels: 'contact@ressourcerie-la-mine.com',
      frais_a_charge: 'Gratuit',
      modalites_accompagnement: 'Accompagnement individuel',
      services:
        'Aide aux démarches administratives|Maîtrise des outils numériques du quotidien|Compréhension du monde numérique|Utilisation sécurisée du numérique',
    }

    await prismaClient.structureCartographieNationale.create({
      data: {
        id: structure.id,
        dateMaj: structure.date_maj,
        source: structure.source,
        pivot: structure.pivot,
        nom: structure.nom,
        latitude: structure.latitude,
        longitude: structure.longitude,
        presentationDetail: structure.presentation_detail,
        siteWeb: structure.site_web,
        telephone: structure.telephone,
        typologie: structure.typologie,
        adresse: structure.adresse,
        codeInsee: structure.code_insee,
        codePostal: structure.code_postal,
        commune: structure.commune,
        courriels: structure.courriels,
        fraisACharge: structure.frais_a_charge,
      },
    })

    await updateStructureFromCartoDataApi({
      structuresCartographieNationale: [structure],
      now: NOW,
    })()
  })
})
