import { prismaClient } from '@app/web/prismaClient'
import { getBeneficiaireInformationsData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(informations)/getBeneficiaireInformationsData'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import {
  LieuAccompagnement,
  LieuAtelier,
  ThematiqueAccompagnement,
  ThematiqueDemarcheAdministrative,
} from '@prisma/client'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'
import { CountThematiquesResult } from '@app/web/beneficiaire/beneficiaireQueries'

describe('getBeneficiaireInformationsData', () => {
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

  beforeAll(async () => {
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
  })

  // Delete all this whatever happens in the test
  afterAll(async () => {
    await deleteFixtures()
  })

  it('returns no thematiques for beneficiaire with no data', async () => {
    const beneficiaire = await prismaClient.beneficiaire.create({
      data: {
        id: beneficiaireIds[0],
        prenom: 'Test',
        nom: 'Integration',
        mediateurId,
      },
    })

    expect(
      await getBeneficiaireInformationsData({
        mediateurId,
        beneficiaireId: beneficiaire.id,
      }),
    ).toEqual({
      beneficiaire: {
        _count: {
          crasDemarchesAdministratives: 0,
          crasIndividuels: 0,
          participationsAteliersCollectifs: 0,
        },
        anneeNaissance: null,
        email: null,
        id: beneficiaire.id,
        nom: beneficiaire.nom,
        prenom: beneficiaire.prenom,

        adresse: null,
        commune: null,
        communeCodeInsee: null,
        communeCodePostal: null,
        creation: expect.any(Date) as string,
        dateNaissance: null,
        genre: null,
        notes: null,
        pasDeTelephone: null,
        statutSocial: null,
        telephone: null,
        trancheAge: null,
      },
      displayName: getBeneficiaireDisplayName(beneficiaire),
      thematiquesCounts: [],
      activites: [],
      totalCrasCount: 0,
    })
  })

  it('returns thematiques for beneficiaire with cras', async () => {
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

    const expectedThematiqueCounts = [
      {
        count: 1,
        enumValue: 'culture_numerique',
        label: 'Culture numérique',
        thematique: 'CultureNumerique',
      },
      {
        count: 3,
        enumValue: 'email',
        label: 'E-mail',
        thematique: 'Email',
      },
      {
        count: 1,
        enumValue: 'justice',
        label: 'Justice',
        thematique: 'Justice',
      },
      {
        count: 1,
        enumValue: 'logement',
        label: 'Logement',
        thematique: 'Logement',
      },
      {
        count: 1,
        enumValue: 'parentalite',
        label: 'Parentalité',
        thematique: 'Parentalite',
      },
      {
        count: 2,
        enumValue: 'reseaux_sociaux',
        label: 'Réseaux sociaux communication',
        thematique: 'ReseauxSociaux',
      },
      {
        count: 1,
        enumValue: 'sante',
        label: 'Santé',
        thematique: 'Sante',
      },
      {
        count: 2,
        enumValue: 'social_sante',
        label: 'Social - Santé',
        thematique: 'SocialSante',
      },
    ] satisfies CountThematiquesResult

    expect(
      await getBeneficiaireInformationsData({
        mediateurId,
        beneficiaireId: beneficiaire.id,
      }),
    ).toEqual({
      beneficiaire: {
        _count: {
          crasDemarchesAdministratives: 2,
          crasIndividuels: 2,
          participationsAteliersCollectifs: 2,
        },
        anneeNaissance: null,
        email: null,
        id: beneficiaire.id,
        nom: beneficiaire.nom,
        prenom: beneficiaire.prenom,

        adresse: null,
        commune: null,
        communeCodeInsee: null,
        communeCodePostal: null,
        creation: expect.any(Date) as string,
        dateNaissance: null,
        genre: null,
        notes: null,
        pasDeTelephone: null,
        statutSocial: null,
        telephone: null,
        trancheAge: null,
      },
      displayName: getBeneficiaireDisplayName(beneficiaire),
      thematiquesCounts: expectedThematiqueCounts,
      activites: [
        {
          activites: [
            {
              date: new Date('2024-07-07T00:00:00.000Z'),
              niveau: null,
              thematiques: ['ReseauxSociaux', 'CultureNumerique'],
              type: 'collectif',
            },
          ],
          date: '2024-07-07',
        },
        {
          activites: [
            {
              autonomie: null,
              date: new Date('2024-07-05T00:00:00.000Z'),
              thematiques: ['Email', 'Parentalite'],
              type: 'individuel',
            },
            {
              autonomie: null,
              date: new Date('2024-07-05T00:00:00.000Z'),
              thematiques: ['Email', 'Sante'],
              type: 'individuel',
            },
            {
              autonomie: null,
              date: new Date('2024-07-05T00:00:00.000Z'),
              thematiques: ['SocialSante', 'Logement'],
              type: 'demarche',
            },
            {
              autonomie: null,
              date: new Date('2024-07-05T00:00:00.000Z'),
              thematiques: ['SocialSante', 'Justice'],
              type: 'demarche',
            },
            {
              date: new Date('2024-07-05T00:00:00.000Z'),
              niveau: null,
              thematiques: ['Email', 'ReseauxSociaux'],
              type: 'collectif',
            },
          ],
          date: '2024-07-05',
        },
      ],
      totalCrasCount: 6,
    })
  })
})
