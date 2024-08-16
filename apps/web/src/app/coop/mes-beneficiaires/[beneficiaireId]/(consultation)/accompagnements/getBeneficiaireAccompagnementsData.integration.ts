import { prismaClient } from '@app/web/prismaClient'
import {
  LieuAccompagnement,
  LieuAtelier,
  ThematiqueAccompagnement,
  ThematiqueDemarcheAdministrative,
} from '@prisma/client'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'
import { getBeneficiaireAccompagnementsPageData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/getBeneficiaireAccompagnementsPageData'
import { flushPromises } from '@app/test/flushPromises'

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
  await prismaClient.activiteBeneficiaire.deleteMany({
    where: {
      beneficiaireId: {
        in: beneficiaireIds,
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

describe.skip('getBeneficiaireAccompagnementsData', () => {
  afterAll(async () => {
    await cleanup()
  })

  it('returns no activites for beneficiaire with no data', async () => {
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
          activites: 0,
        },
      },
      activitesByDate: [],
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

    await prismaClient.craIndividuel.create({
      data: {
        ...commonData,
        id: crasIndividuelsIds[0],
        thematiques: [
          ThematiqueAccompagnement.Email,
          ThematiqueAccompagnement.Parentalite,
        ],
        activiteBeneficiaire: {
          create: {
            beneficiaireId: beneficiaire.id,
          },
        },
      },
    })

    await prismaClient.craIndividuel.create({
      data: {
        ...commonData,
        id: crasIndividuelsIds[1],
        thematiques: [
          ThematiqueAccompagnement.Email,
          ThematiqueAccompagnement.Sante,
        ],
        activiteBeneficiaire: {
          create: {
            beneficiaireId: beneficiaire.id,
          },
        },
      },
    })

    await prismaClient.craDemarcheAdministrative.create({
      data: {
        ...commonData,
        id: crasDemarchesIds[0],
        thematiques: [
          ThematiqueDemarcheAdministrative.SocialSante,
          ThematiqueDemarcheAdministrative.Logement,
        ],
        activiteBeneficiaire: {
          create: {
            beneficiaireId: beneficiaire.id,
          },
        },
      },
    })

    await prismaClient.craDemarcheAdministrative.create({
      data: {
        ...commonData,
        id: crasDemarchesIds[1],
        thematiques: [
          ThematiqueDemarcheAdministrative.SocialSante,
          ThematiqueDemarcheAdministrative.Justice,
        ],
        activiteBeneficiaire: {
          create: {
            beneficiaireId: beneficiaire.id,
          },
        },
      },
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
    await prismaClient.activiteBeneficiaire.createMany({
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
          activites: 6,
        },
      },
      activitesByDate: [
        {
          activites: [
            {
              type: 'collectif',
              cra: {
                date: new Date('2024-07-07T00:00:00.000Z'),
                duree: 90,
                id: crasCollectifsIds[1], // 'faf81ac7-cb7f-4949-8dbf-330b435fa87c'
                lieuAccompagnementAutreCodeInsee: null,
                lieuAccompagnementAutreCodePostal: null,
                lieuAccompagnementAutreCommune: null,
                lieuActivite: null,
                lieuAtelier: 'LieuActivite',
                niveau: null,
                notes: null,
                participants: [
                  {
                    beneficiaire: {
                      id: beneficiaire.id,
                      nom: 'Integration',
                      prenom: 'Test',
                    },
                  },
                ],
                participantsAnonymes: {
                  ...participantsAnonymesDefault,
                  id: crasCollectifsIds[1],
                },
                thematiques: ['ReseauxSociaux', 'CultureNumerique'],
                titreAtelier: 'Exemple de titre',
              },
            },
          ],
          date: '2024-07-07',
        },
        {
          activites: [
            {
              type: 'individuel',
              cra: {
                autonomie: null,
                beneficiaire: {
                  _count: {
                    activites: 6,
                  },
                  commune: null,
                  communeCodePostal: null,
                  genre: null,
                  id: beneficiaire.id,
                  nom: 'Integration',
                  prenom: 'Test',
                  statutSocial: null,
                  trancheAge: null,
                  vaPoursuivreParcoursAccompagnement: null,
                },
                date: new Date('2024-07-05T00:00:00.000Z'),
                duree: 90,
                id: crasIndividuelsIds[1], // '3921644e-2343-4fce-954b-0c69bd81a358'
                lieuAccompagnement: 'ADistance',
                lieuAccompagnementDomicileCodeInsee: null,
                lieuAccompagnementDomicileCodePostal: null,
                lieuAccompagnementDomicileCommune: null,
                lieuActivite: null,
                materiel: [],
                notes: null,
                orienteVersStructure: null,
                structureDeRedirection: null,
                thematiques: ['Email', 'Sante'],
              },
            },
            {
              type: 'individuel',
              cra: {
                autonomie: null,
                beneficiaire: {
                  _count: {
                    activites: 6,
                  },
                  commune: null,
                  communeCodePostal: null,
                  genre: null,
                  id: beneficiaire.id,
                  nom: 'Integration',
                  prenom: 'Test',
                  statutSocial: null,
                  trancheAge: null,
                  vaPoursuivreParcoursAccompagnement: null,
                },
                date: new Date('2024-07-05T00:00:00.000Z'),
                duree: 90,
                id: crasIndividuelsIds[0], // '69cc03f6-12ee-47e5-8759-8a82fb97ba89'
                lieuAccompagnement: 'ADistance',
                lieuAccompagnementDomicileCodeInsee: null,
                lieuAccompagnementDomicileCodePostal: null,
                lieuAccompagnementDomicileCommune: null,
                lieuActivite: null,
                materiel: [],
                notes: null,
                orienteVersStructure: null,
                structureDeRedirection: null,
                thematiques: ['Email', 'Parentalite'],
              },
            },
            {
              type: 'demarche',
              cra: {
                autonomie: null,
                beneficiaire: {
                  _count: {
                    activites: 6,
                  },
                  commune: null,
                  communeCodePostal: null,
                  genre: null,
                  id: beneficiaire.id,
                  nom: 'Integration',
                  prenom: 'Test',
                  statutSocial: null,
                  trancheAge: null,
                  vaPoursuivreParcoursAccompagnement: null,
                },
                date: new Date('2024-07-05T00:00:00.000Z'),
                degreDeFinalisation: null,
                duree: 90,
                id: crasDemarchesIds[1], // 'aa9765e2-7f8e-4af5-8bf1-d40bdf6ec5cd'
                lieuAccompagnement: 'ADistance',
                lieuAccompagnementDomicileCodeInsee: null,
                lieuAccompagnementDomicileCodePostal: null,
                lieuAccompagnementDomicileCommune: null,
                lieuActivite: null,
                notes: null,
                precisionsDemarche: null,
                structureDeRedirection: null,
                thematiques: ['SocialSante', 'Justice'],
              },
            },
            {
              type: 'demarche',
              cra: {
                autonomie: null,
                beneficiaire: {
                  _count: {
                    activites: 6,
                  },
                  commune: null,
                  communeCodePostal: null,
                  genre: null,
                  id: beneficiaire.id,
                  nom: 'Integration',
                  prenom: 'Test',
                  statutSocial: null,
                  trancheAge: null,
                  vaPoursuivreParcoursAccompagnement: null,
                },
                date: new Date('2024-07-05T00:00:00.000Z'),
                degreDeFinalisation: null,
                duree: 90,
                id: crasDemarchesIds[0], // '31a4230e-b992-49cc-92de-1823fadd4d6a'
                lieuAccompagnement: 'ADistance',
                lieuAccompagnementDomicileCodeInsee: null,
                lieuAccompagnementDomicileCodePostal: null,
                lieuAccompagnementDomicileCommune: null,
                lieuActivite: null,
                notes: null,
                precisionsDemarche: null,
                structureDeRedirection: null,
                thematiques: ['SocialSante', 'Logement'],
              },
            },
            {
              type: 'collectif',
              cra: {
                date: new Date('2024-07-05T00:00:00.000Z'),
                duree: 90,
                id: crasCollectifsIds[0], // 'bfce1609-2170-431a-903e-728c541d3fe3'
                lieuAccompagnementAutreCodeInsee: null,
                lieuAccompagnementAutreCodePostal: null,
                lieuAccompagnementAutreCommune: null,
                lieuActivite: null,
                lieuAtelier: 'Autre',
                niveau: null,
                notes: null,
                participants: [
                  {
                    beneficiaire: {
                      id: beneficiaire.id,
                      nom: 'Integration',
                      prenom: 'Test',
                    },
                  },
                ],
                participantsAnonymes: {
                  ...participantsAnonymesDefault,
                  id: crasCollectifsIds[0],
                },
                thematiques: ['Email', 'ReseauxSociaux'],
                titreAtelier: null,
              },
            },
          ],
          date: '2024-07-05',
        },
      ],
    })
  })
})
