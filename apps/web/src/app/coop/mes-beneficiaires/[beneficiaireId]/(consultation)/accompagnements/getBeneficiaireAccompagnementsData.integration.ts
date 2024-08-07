import { prismaClient } from '@app/web/prismaClient'
import {
  LieuAccompagnement,
  LieuAtelier,
  ThematiqueAccompagnement,
  ThematiqueDemarcheAdministrative,
} from '@prisma/client'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'
import { getBeneficiaireAccompagnementsPageData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/getBeneficiaireAccompagnementsPageData'

describe('getBeneficiaireAccompagnementsData', () => {
  const userId = '3afe39cb-9c3b-4411-a202-5829584e3ae4'
  const mediateurId = '2ec95060-d4ac-446a-bf72-c5ce2e02a0ba'
  const beneficiaireIds: string[] = [
    '5d839b7c-69f8-4a4f-bc4a-bf7dd34a734c',
    '0e6569fe-6672-46f9-b4d2-ecfc5233e8f5',
  ]
  const crasIndividuelsIds: string[] = [
    '69cc03f6-12ee-47e5-8759-8a82fb97ba89',
    '3921644e-2343-4fce-954b-0c69bd81a358',
  ]
  const crasCollectifsIds: string[] = [
    'bfce1609-2170-431a-903e-728c541d3fe3',
    'faf81ac7-cb7f-4949-8dbf-330b435fa87c',
  ]
  const crasDemarchesIds: string[] = [
    '31a4230e-b992-49cc-92de-1823fadd4d6a',
    'aa9765e2-7f8e-4af5-8bf1-d40bdf6ec5cd',
  ]

  const deleteFixtures = async () => {
    await prismaClient.craIndividuel.deleteMany({
      where: {
        id: {
          in: crasIndividuelsIds,
        },
      },
    })
    await prismaClient.participantAtelierCollectif.deleteMany({
      where: {
        craCollectifId: {
          in: crasCollectifsIds,
        },
      },
    })
    await prismaClient.craCollectif.deleteMany({
      where: {
        id: {
          in: crasCollectifsIds,
        },
      },
    })
    await prismaClient.participantsAnonymesCraCollectif.deleteMany({
      where: {
        id: {
          in: crasCollectifsIds,
        },
      },
    })
    await prismaClient.craDemarcheAdministrative.deleteMany({
      where: {
        id: {
          in: crasDemarchesIds,
        },
      },
    })
    await prismaClient.beneficiaire.deleteMany({
      where: {
        id: {
          in: beneficiaireIds,
        },
      },
    })
    await prismaClient.mediateur.deleteMany({
      where: {
        id: { in: [mediateurId] },
      },
    })
    await prismaClient.user.deleteMany({
      where: {
        id: {
          in: [userId],
        },
      },
    })
  }

  const prepare = async () => {
    await deleteFixtures()
    // Fixtures loading
    await prismaClient.mediateur.create({
      data: {
        id: mediateurId,
        user: {
          create: {
            id: userId,
            email: `test-integration+${userId}@test.test`,
          },
        },
      },
    })
  }

  const cleanup = async () => {
    await deleteFixtures()
  }

  afterAll(async () => {
    await cleanup()
  })

  it('returns no activites for beneficiaire with no data', async () => {
    await prepare()
    const beneficiaire = await prismaClient.beneficiaire.create({
      data: {
        id: beneficiaireIds[0],
        prenom: 'Test',
        nom: 'Integration',
        mediateurId,
      },
    })

    expect(
      await getBeneficiaireAccompagnementsPageData({
        mediateurId,
        beneficiaireId: beneficiaire.id,
      }),
    ).toEqual({
      beneficiaire: {
        id: beneficiaire.id,
        mediateurId,
        prenom: 'Test',
        nom: 'Integration',
        anneeNaissance: null,
        _count: {
          crasDemarchesAdministratives: 0,
          crasIndividuels: 0,
          participationsAteliersCollectifs: 0,
        },
      },
      totalCrasCount: 0,
      activitesByDate: [],
    })
  })

  it('returns thematiques for beneficiaire with cras', async () => {
    await prepare()
    const beneficiaire = await prismaClient.beneficiaire.create({
      data: {
        id: beneficiaireIds[1],
        prenom: 'Test',
        nom: 'Integration',
        mediateurId,
      },
    })
    const date = new Date('2024-07-05')
    const duree = 90

    const commonData = {
      beneficiaireId: beneficiaire.id,
      creeParMediateurId: mediateurId,
      date,
      duree,
      lieuAccompagnement: LieuAccompagnement.ADistance,
    }

    await prismaClient.craIndividuel.createMany({
      data: [
        {
          ...commonData,
          id: crasIndividuelsIds[0],
          thematiques: [
            ThematiqueAccompagnement.Email,
            ThematiqueAccompagnement.Parentalite,
          ],
        },
        {
          ...commonData,
          id: crasIndividuelsIds[1],
          thematiques: [
            ThematiqueAccompagnement.Email,
            ThematiqueAccompagnement.Sante,
          ],
        },
      ],
    })

    await prismaClient.craDemarcheAdministrative.createMany({
      data: [
        {
          ...commonData,
          id: crasDemarchesIds[0],
          thematiques: [
            ThematiqueDemarcheAdministrative.SocialSante,
            ThematiqueDemarcheAdministrative.Logement,
          ],
        },
        {
          ...commonData,
          id: crasDemarchesIds[1],
          thematiques: [
            ThematiqueDemarcheAdministrative.SocialSante,
            ThematiqueDemarcheAdministrative.Justice,
          ],
        },
      ],
    })

    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      beneficiaireId: _deletedProperty,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      lieuAccompagnement: _deletedProperty2,
      ...collectifCommonData
    } = commonData

    await prismaClient.participantsAnonymesCraCollectif.createMany({
      data: crasCollectifsIds.map((id) => ({
        ...participantsAnonymesDefault,
        id,
      })),
    })
    await prismaClient.craCollectif.createMany({
      data: [
        {
          ...collectifCommonData,
          id: crasCollectifsIds[0],
          participantsAnonymesId: crasCollectifsIds[0],
          lieuAtelier: LieuAtelier.Autre,
          thematiques: [
            ThematiqueAccompagnement.Email,
            ThematiqueAccompagnement.ReseauxSociaux,
          ],
        },
        {
          ...collectifCommonData,
          id: crasCollectifsIds[1],
          participantsAnonymesId: crasCollectifsIds[1],
          lieuAtelier: LieuAtelier.LieuActivite,
          thematiques: [
            ThematiqueAccompagnement.ReseauxSociaux,
            ThematiqueAccompagnement.CultureNumerique,
          ],
          titreAtelier: 'Exemple de titre',
          date: new Date('2024-07-07'),
        },
      ],
    })
    await prismaClient.participantAtelierCollectif.createMany({
      data: crasCollectifsIds.map((id) => ({
        craCollectifId: id,
        beneficiaireId: beneficiaire.id,
      })),
    })

    expect(
      await getBeneficiaireAccompagnementsPageData({
        mediateurId,
        beneficiaireId: beneficiaire.id,
      }),
    ).toEqual({
      beneficiaire: {
        id: beneficiaire.id,
        mediateurId,
        prenom: 'Test',
        nom: 'Integration',
        anneeNaissance: null,
        _count: {
          crasDemarchesAdministratives: 2,
          crasIndividuels: 2,
          participationsAteliersCollectifs: 2,
        },
      },
      totalCrasCount: 6,
      activitesByDate: [
        {
          activites: [
            {
              id: crasCollectifsIds[1],
              date: new Date('2024-07-07T00:00:00.000Z'),
              niveau: null,
              thematiques: ['ReseauxSociaux', 'CultureNumerique'],
              type: 'collectif',
              titreAtelier: 'Exemple de titre',
            },
          ],
          date: '2024-07-07',
        },
        {
          activites: [
            {
              id: crasIndividuelsIds[0],
              autonomie: null,
              date: new Date('2024-07-05T00:00:00.000Z'),
              thematiques: ['Email', 'Parentalite'],
              type: 'individuel',
            },
            {
              id: crasIndividuelsIds[1],
              autonomie: null,
              date: new Date('2024-07-05T00:00:00.000Z'),
              thematiques: ['Email', 'Sante'],
              type: 'individuel',
            },
            {
              id: crasDemarchesIds[0],
              autonomie: null,
              date: new Date('2024-07-05T00:00:00.000Z'),
              thematiques: ['SocialSante', 'Logement'],
              type: 'demarche',
            },
            {
              id: crasDemarchesIds[1],
              autonomie: null,
              date: new Date('2024-07-05T00:00:00.000Z'),
              thematiques: ['SocialSante', 'Justice'],
              type: 'demarche',
            },
            {
              id: crasCollectifsIds[0],
              date: new Date('2024-07-05T00:00:00.000Z'),
              niveau: null,
              thematiques: ['Email', 'ReseauxSociaux'],
              type: 'collectif',
              titreAtelier: null,
            },
          ],
          date: '2024-07-05',
        },
      ],
    })
  })
})
