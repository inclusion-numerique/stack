import { prismaClient } from '@app/web/prismaClient'
import { getBeneficiaireInformationsPageData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/(informations)/getBeneficiaireInformationsPageData'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import {
  LieuAccompagnement,
  LieuAtelier,
  ThematiqueAccompagnement,
  ThematiqueDemarcheAdministrative,
} from '@prisma/client'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'
import { CountThematiquesResult } from '@app/web/beneficiaire/beneficiaireQueries'
import { flushPromises } from '@app/test/flushPromises'

const userId = 'b5df4e0b-2642-43db-a094-6213703c0361'
const mediateurId = '9c31ad6d-e3cf-4ac3-9cc8-9d24d0e8587b'
const beneficiaireIds: string[] = [
  'b384c9b7-5c56-44da-bf14-5afa855385d2',
  '494069cb-76ea-4db8-99ee-3a7317ad1adb',
]
const crasIndividuelsIds: string[] = [
  'ed3be0e4-f537-4d1a-bfd4-0e15d453b235',
  '754dcf57-72a9-49dc-a90b-d3a899440635',
]
const crasCollectifsIds: string[] = [
  'b09a3ce2-18e0-41d2-b695-972a25e8041d',
  '2bc6ea4d-46a4-4ec1-9464-de5aa36af738',
]
const crasDemarchesIds: string[] = [
  '792ed9f3-1679-4fd8-9a11-80ce828f4854',
  '27527178-dd3b-441e-8062-f42c42bb2485',
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

  await flushPromises()
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

describe('getBeneficiaireInformationsData', () => {
  afterAll(async () => {
    await cleanup()
  })

  it('returns no thematiques for beneficiaire with no data', async () => {
    await prepare()
    await flushPromises()
    const beneficiaire = await prismaClient.beneficiaire.create({
      data: {
        id: beneficiaireIds[0],
        prenom: 'Test',
        nom: 'Integration',
        mediateurId,
      },
    })

    expect(
      await getBeneficiaireInformationsPageData({
        mediateurId,
        beneficiaireId: beneficiaire.id,
      }),
    ).toEqual({
      beneficiaire: {
        _count: {
          activites: 0,
          crasDemarchesAdministratives: 0,
          crasIndividuels: 0,
          participationsAteliersCollectifs: 0,
        },
        anneeNaissance: null,
        email: null,
        id: beneficiaire.id,
        mediateurId,
        nom: beneficiaire.nom,
        prenom: beneficiaire.prenom,

        adresse: null,
        commune: null,
        communeCodeInsee: null,
        communeCodePostal: null,
        creation: expect.any(Date) as string,
        genre: null,
        notes: null,
        pasDeTelephone: null,
        statutSocial: null,
        telephone: null,
        trancheAge: null,
      },
      displayName: getBeneficiaireDisplayName(beneficiaire),
      thematiquesCounts: [],
      totalCrasCount: 0,
    })
  })

  it('returns thematiques for beneficiaire with cras', async () => {
    await prepare()
    await flushPromises()
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
      await getBeneficiaireInformationsPageData({
        mediateurId,
        beneficiaireId: beneficiaire.id,
      }),
    ).toEqual({
      beneficiaire: {
        _count: {
          crasDemarchesAdministratives: 2,
          crasIndividuels: 2,
          participationsAteliersCollectifs: 2,
          activites: 0,
        },
        anneeNaissance: null,
        email: null,
        id: beneficiaire.id,
        mediateurId,
        nom: beneficiaire.nom,
        prenom: beneficiaire.prenom,

        adresse: null,
        commune: null,
        communeCodeInsee: null,
        communeCodePostal: null,
        creation: expect.any(Date) as string,
        genre: null,
        notes: null,
        pasDeTelephone: null,
        statutSocial: null,
        telephone: null,
        trancheAge: null,
      },
      displayName: getBeneficiaireDisplayName(beneficiaire),
      thematiquesCounts: expectedThematiqueCounts,
      totalCrasCount: 6,
    })
  })
})
