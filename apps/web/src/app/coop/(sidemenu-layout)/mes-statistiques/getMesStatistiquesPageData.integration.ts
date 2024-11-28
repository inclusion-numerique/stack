/* eslint no-param-reassign: 0 */
import { resetFixtureUser } from '@app/fixtures/resetFixtureUser'
import { conseillerNumerique } from '@app/fixtures/users/conseillerNumerique'
import {
  mediateurAvecActivite,
  mediateurAvecActiviteMediateurId,
  mediateurAvecActiviteUserId,
} from '@app/fixtures/users/mediateurAvecActivite'
import {
  mediateurSansActivites,
  mediateurSansActivitesUserId,
} from '@app/fixtures/users/mediateurSansActivites'
import {
  getMesStatistiquesPageData,
  MesStatistiquesGraphOptions,
  MesStatistiquesPageData,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/getMesStatistiquesPageData'
import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { cloneDeep } from 'lodash-es'
import { mediateque, seedStructures } from '@app/fixtures/structures'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import {
  dureeAccompagnementStatisticsRanges,
  materielLabels,
  thematiqueDemarcheAdministrativeLabels,
  thematiqueLabels,
  typeActiviteLabels,
  typeLieuLabels,
} from '@app/web/cra/cra'
import {
  genreLabels,
  statutSocialLabels,
  trancheAgeLabels,
} from '@app/web/beneficiaire/beneficiaire'
import { emptyQuantifiedSharesFromEnum } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/statistiquesFixturesHelpers'
import { prismaClient } from '@app/web/prismaClient'
import { QuantifiedShare } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/quantifiedShare'
import { computeProportion } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/allocatePercentages'
import { UserDisplayName, UserProfile } from '@app/web/utils/user'

/**
 * Base empty data for all tests
 */

// Fixed graph end date
const graphOptions = {
  fin: new Date('2024-08-15'),
} satisfies MesStatistiquesGraphOptions

const emptyData: MesStatistiquesPageData = {
  accompagnementsParJour: [
    { label: '17/07', count: 0 },
    { label: '18/07', count: 0 },
    { label: '19/07', count: 0 },
    { label: '20/07', count: 0 },
    { label: '21/07', count: 0 },
    { label: '22/07', count: 0 },
    { label: '23/07', count: 0 },
    { label: '24/07', count: 0 },
    { label: '25/07', count: 0 },
    { label: '26/07', count: 0 },
    { label: '27/07', count: 0 },
    { label: '28/07', count: 0 },
    { label: '29/07', count: 0 },
    { label: '30/07', count: 0 },
    { label: '31/07', count: 0 },
    { label: '01/08', count: 0 },
    { label: '02/08', count: 0 },
    { label: '03/08', count: 0 },
    { label: '04/08', count: 0 },
    { label: '05/08', count: 0 },
    { label: '06/08', count: 0 },
    { label: '07/08', count: 0 },
    { label: '08/08', count: 0 },
    { label: '09/08', count: 0 },
    { label: '10/08', count: 0 },
    { label: '11/08', count: 0 },
    { label: '12/08', count: 0 },
    { label: '13/08', count: 0 },
    { label: '14/08', count: 0 },
    { label: '15/08', count: 0 },
  ],
  accompagnementsParMois: [
    { label: 'Sep.', count: 0 },
    { label: 'Oct.', count: 0 },
    { label: 'Nov.', count: 0 },
    { label: 'Déc.', count: 0 },
    { label: 'Jan.', count: 0 },
    { label: 'Fév.', count: 0 },
    { label: 'Mars', count: 0 },
    { label: 'Avr.', count: 0 },
    { label: 'Mai', count: 0 },
    { label: 'Juin', count: 0 },
    { label: 'Juil.', count: 0 },
    { label: 'Août', count: 0 },
  ],
  totalCounts: {
    accompagnements: {
      total: 0,
      individuels: {
        total: 0,
        proportion: 0,
      },
      collectifs: {
        total: 0,
        proportion: 0,
      },
      demarches: {
        total: 0,
        proportion: 0,
      },
    },
    activites: {
      total: 0,
      individuels: {
        total: 0,
        proportion: 0,
      },
      collectifs: {
        total: 0,
        proportion: 0,
        participants: 0,
      },
      demarches: {
        total: 0,
        proportion: 0,
      },
    },
    beneficiaires: {
      total: 0,
      anonymes: 0,
      suivis: 0,
    },
  },
  activites: {
    total: 0,
    typeActivites: emptyQuantifiedSharesFromEnum(typeActiviteLabels),
    thematiques: emptyQuantifiedSharesFromEnum(thematiqueLabels),
    thematiquesDemarches: emptyQuantifiedSharesFromEnum(
      thematiqueDemarcheAdministrativeLabels,
    ),
    materiels: emptyQuantifiedSharesFromEnum(materielLabels),
    typeLieu: emptyQuantifiedSharesFromEnum(typeLieuLabels),
    durees: dureeAccompagnementStatisticsRanges.map(({ key, label }) => ({
      value: key,
      label,
      count: 0,
      proportion: 0,
    })),
  },
  beneficiaires: {
    total: 0,
    genres: emptyQuantifiedSharesFromEnum(genreLabels),
    trancheAges: emptyQuantifiedSharesFromEnum(trancheAgeLabels),
    statutsSocial: emptyQuantifiedSharesFromEnum(statutSocialLabels),
    communes: [],
  },
  structures: [],

  activitesFilters: {},
  communesOptions: [],
  departementsOptions: [],
  initialBeneficiairesOptions: [],
  initialMediateursOptions: [],
  lieuxActiviteOptions: [],
  activiteDates: {
    first: undefined,
    last: undefined,
  },
}

const createExpectedData = (
  transform: (data: typeof emptyData) => MesStatistiquesPageData,
) => transform(cloneDeep(emptyData))

const expectDayCount = (
  data: MesStatistiquesPageData,
  day: string,
  count: number,
) => {
  const item = data.accompagnementsParJour.find(({ label }) => label === day)
  if (!item) {
    throw new Error(`Day ${day} not found`)
  }
  item.count = count
}

const expectMonthCount = (
  data: MesStatistiquesPageData,
  month: string,
  count: number,
) => {
  const item = data.accompagnementsParMois.find(({ label }) => label === month)
  if (!item) {
    throw new Error(`Month ${month} not found`)
  }
  item.count = count
}

const expectEnum = <T extends string>(
  enumCounts: (QuantifiedShare<string> & { value: T })[],
  value: T,
  count: number,
  total: number,
) => {
  const item = enumCounts.find(({ value: itemValue }) => itemValue === value)
  if (!item) {
    throw new Error(`Value ${value} not found`)
  }
  item.count = count
  item.proportion = computeProportion(count, total)
}

describe('getMesStatistiquesPageData', () => {
  beforeAll(async () => {
    await seedStructures(prismaClient)
    await resetFixtureUser(mediateurAvecActivite, false)
    await resetFixtureUser(mediateurSansActivites, false)
    await resetFixtureUser(conseillerNumerique, false)
  })

  describe('mediateur sans activites', () => {
    test('should give empty data without filters', async () => {
      const user = await prismaClient.user.findUnique({
        where: { id: mediateurSansActivitesUserId },
        select: { mediateur: true },
      })

      const data = await getMesStatistiquesPageData({
        user: user as unknown as UserDisplayName & UserProfile,
        activitesFilters: {},
        graphOptions,
      })
      expect(data).toEqual({
        ...emptyData,
        lieuxActiviteOptions: [
          {
            label: mediateque.nom,
            value: mediateque.id,
            extra: {
              activites: 0,
              adresse: '2 rue des livres, 69002 Lyon 2eme',
              mostUsed: false,
              nom: 'Exemple de Mediateque',
            },
          },
        ],
      })
    })
  })

  describe('mediateur avec activites', () => {
    const cases: {
      title: string
      activitesFilters: ActivitesFilters
      expected: Omit<MesStatistiquesPageData, 'activitesFilters'>
    }[] = [
      {
        title: 'should compute all data without filters',
        activitesFilters: {},
        expected: createExpectedData((data) => {
          // Should have 10 activites
          const totalActivites = 10

          // Should have 13 beneficiaires
          const totalBeneficiaires = 13

          const totalAccompagnements = 22

          data.totalCounts = {
            activites: {
              total: totalActivites,
              individuels: {
                total: 4,
                proportion: 40,
              },
              collectifs: {
                total: 2,
                proportion: 20,
                participants: 14,
              },
              demarches: {
                total: 4,
                proportion: 40,
              },
            },
            beneficiaires: {
              total: totalBeneficiaires,
              suivis: 2,
              anonymes: 11,
            },
            accompagnements: {
              total: totalAccompagnements,
              collectifs: {
                total: 14,
                proportion: computeProportion(14, totalAccompagnements),
              },
              individuels: {
                total: 4,
                proportion: computeProportion(4, totalAccompagnements),
              },
              demarches: {
                total: 4,
                proportion: computeProportion(4, totalAccompagnements),
              },
            },
          }

          data.activites.total = totalActivites

          expectDayCount(data, '28/07', 2)
          expectDayCount(data, '02/08', 2)
          expectDayCount(data, '03/08', 2)
          expectDayCount(data, '04/08', 2)
          expectDayCount(data, '05/08', 1)

          expectMonthCount(data, 'Juin', 1)
          expectMonthCount(data, 'Juil.', 14)

          expectEnum(data.activites.typeLieu, 'Domicile', 2, 10)
          expectEnum(data.activites.typeLieu, 'ADistance', 8, 10)
          expectEnum(data.activites.typeLieu, 'LieuActivite', 0, 10)
          expectEnum(data.activites.typeLieu, 'Autre', 0, 10)

          expectEnum(data.activites.durees, '120', 10, totalActivites)

          expectEnum(data.activites.materiels, 'Ordinateur', 3, 10)
          expectEnum(data.activites.materiels, 'Telephone', 2, 10)
          expectEnum(data.activites.materiels, 'Tablette', 2, 10)
          expectEnum(data.activites.materiels, 'Autre', 3, 10)

          expectEnum(data.activites.thematiques, 'Email', 3, 11)
          expectEnum(data.activites.thematiques, 'ReseauxSociaux', 2, 11)
          expectEnum(data.activites.thematiques, 'Sante', 2, 11)
          expectEnum(
            data.activites.thematiques,
            'InsertionProfessionnelle',
            1,
            11,
          )
          expectEnum(data.activites.thematiques, 'Parentalite', 1, 11)
          expectEnum(data.activites.thematiques, 'CultureNumerique', 2, 11)

          expectEnum(
            data.activites.thematiquesDemarches,
            'FamilleScolarite',
            1,
            8,
          )
          expectEnum(data.activites.thematiquesDemarches, 'SocialSante', 3, 8)
          expectEnum(data.activites.thematiquesDemarches, 'Logement', 1, 8)
          expectEnum(
            data.activites.thematiquesDemarches,
            'TransportsMobilite',
            1,
            8,
          )
          expectEnum(data.activites.thematiquesDemarches, 'Justice', 1, 8)
          expectEnum(
            data.activites.thematiquesDemarches,
            'EtrangersEurope',
            1,
            8,
          )

          expectEnum(
            data.activites.typeActivites,
            'Individuel',
            4,
            totalActivites,
          )
          expectEnum(
            data.activites.typeActivites,
            'Collectif',
            2,
            totalActivites,
          )
          expectEnum(
            data.activites.typeActivites,
            'Demarche',
            4,
            totalActivites,
          )

          expectEnum(
            data.beneficiaires.genres,
            'Masculin',
            1,
            totalBeneficiaires,
          )
          expectEnum(
            data.beneficiaires.genres,
            'NonCommunique',
            12,
            totalBeneficiaires,
          )

          expectEnum(
            data.beneficiaires.statutsSocial,
            'EnEmploi',
            9,
            totalBeneficiaires,
          )
          expectEnum(
            data.beneficiaires.statutsSocial,
            'Scolarise',
            2,
            totalBeneficiaires,
          )
          expectEnum(
            data.beneficiaires.statutsSocial,
            'NonCommunique',
            2,
            totalBeneficiaires,
          )

          expectEnum(
            data.beneficiaires.trancheAges,
            'QuaranteCinquanteNeuf',
            6,
            totalBeneficiaires,
          )
          expectEnum(
            data.beneficiaires.trancheAges,
            'VingtCinqTrenteNeuf',
            3,
            totalBeneficiaires,
          )
          expectEnum(
            data.beneficiaires.trancheAges,
            'DixHuitVingtQuatre',
            1,
            totalBeneficiaires,
          )
          expectEnum(
            data.beneficiaires.trancheAges,
            'NonCommunique',
            3,
            totalBeneficiaires,
          )

          data.beneficiaires.total = totalBeneficiaires

          data.beneficiaires.communes = [
            {
              codeInsee: '75101',
              codePostal: '75001',
              count: 2,
              label: 'Paris · 75001',
              nom: 'Paris',
              proportion: 66.667,
            },
            {
              codeInsee: '69382',
              codePostal: '69002',
              count: 1,
              label: 'Lyon 2eme · 69002',
              nom: 'Lyon 2eme',
              proportion: 33.333,
            },
          ]

          data.structures = [
            {
              id: mediateque.id,
              codePostal: mediateque.codePostal,
              codeInsee: mediateque.codeInsee,
              commune: mediateque.commune,
              count: 2,
              proportion: 100,
              nom: mediateque.nom,
              label: mediateque.nom,
            },
          ]

          data.activiteDates.first = new Date('2024-06-15')
          data.activiteDates.last = new Date('2024-08-05')

          return data
        }),
      },
    ]

    const mediateurId = mediateurAvecActiviteMediateurId

    let expectedCommon: Pick<
      MesStatistiquesPageData,
      | 'communesOptions'
      | 'departementsOptions'
      | 'initialBeneficiairesOptions'
      | 'lieuxActiviteOptions'
    >

    beforeAll(async () => {
      expectedCommon = {
        communesOptions: [
          {
            value: '69382',
            label: 'Lyon 2eme · 69002',
          },
          {
            value: '75101',
            label: 'Paris 1er · 75001',
          },
        ],
        departementsOptions: [
          {
            value: '69',
            label: '69 · Rhône',
          },
          {
            value: '75',
            label: '75 · Paris',
          },
        ],
        initialBeneficiairesOptions:
          await getInitialBeneficiairesOptionsForSearch({ mediateurId }),
        lieuxActiviteOptions: [
          {
            label: mediateque.nom,
            value: mediateque.id,
            extra: {
              activites: 2,
              adresse: '2 rue des livres, 69002 Lyon 2eme',
              mostUsed: true,
              nom: 'Exemple de Mediateque',
            },
          },
        ],
      }
    })

    test.each(cases)('$title', async ({ activitesFilters, expected }) => {
      const user = await prismaClient.user.findUnique({
        where: { id: mediateurAvecActiviteUserId },
        select: { mediateur: true },
      })

      const data = await getMesStatistiquesPageData({
        user: user as unknown as UserDisplayName & UserProfile,
        activitesFilters,
        graphOptions,
      })

      const completeExpectedData = {
        ...expected,
        ...expectedCommon,
        activitesFilters,
      } satisfies MesStatistiquesPageData

      expect(data).toEqual(completeExpectedData)
    })
  })
})
