import { resetFixtureUser } from '@app/fixtures/resetFixtureUser'
import {
  conseillerNumerique,
  mediateurAvecActivite,
  mediateurSansActivites,
} from '@app/fixtures/users'
import {
  getMesStatistiquesPageData,
  MesStatistiquesGraphOptions,
  MesStatistiquesPageData,
} from '@app/web/app/coop/mes-statistiques/getMesStatistiquesPageData'
import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { cloneDeep } from 'lodash-es'
import { mediateque, seedStructures } from '@app/fixtures/structures'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'
import {
  dureeAccompagnementLabels,
  materielLabels,
  thematiqueDemarcheAdministrativeLabels,
  thematiqueLabels,
  typeActiviteLabels,
  typeLieuAtelierLabels,
  typeLieuLabels,
} from '@app/web/cra/cra'
import {
  genreLabels,
  statutSocialLabels,
  trancheAgeLabels,
} from '@app/web/beneficiaire/beneficiaire'
import { emptyQuantifiedSharesFromEnum } from '@app/web/app/coop/mes-statistiques/statistiquesFixturesHelpers'
import { prismaClient } from '@app/web/prismaClient'

/**
 * Base empty data for all tests
 */

// Fixed graph end date
const graphOptions = {
  fin: new Date('2024-08-15'),
} satisfies MesStatistiquesGraphOptions

const emptyData = {
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
        count: 0,
        proportion: 0,
      },
      collectifs: {
        count: 0,
        proportion: 0,
      },
      demarches: {
        count: 0,
        proportion: 0,
      },
    },
    activites: {
      total: 0,
      individuel: {
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
    typeLieuAtelier: emptyQuantifiedSharesFromEnum(typeLieuAtelierLabels),
    mergedTypeLieu: emptyQuantifiedSharesFromEnum({
      ...typeLieuLabels,
      ...typeLieuAtelierLabels,
    }),
    durees: emptyQuantifiedSharesFromEnum(dureeAccompagnementLabels),
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
  lieuxActiviteOptions: [],
} satisfies MesStatistiquesPageData

const getEmptyData = () =>
  // Use cloneDeep to avoid mutating the original object when assigning values for tests expects
  cloneDeep(emptyData)

const createExpectedData = (
  transform: (data: typeof emptyData) => MesStatistiquesPageData,
) => transform(getEmptyData())

describe('getMesStatistiquesPageData', () => {
  beforeAll(async () => {
    await seedStructures(prismaClient)
    await resetFixtureUser(mediateurAvecActivite)
    await resetFixtureUser(mediateurSansActivites)
    await resetFixtureUser(conseillerNumerique)
  })

  describe('mediateur sans activites', () => {
    test('should give empty data without filters', async () => {
      const data = await getMesStatistiquesPageData({
        mediateurId: mediateurSansActivites.mediateur.connectOrCreate.where.id,
        activitesFilters: {},
        graphOptions,
      })
      expect(data).toEqual({
        ...getEmptyData(),
        lieuxActiviteOptions: [{ label: mediateque.nom, value: mediateque.id }],
      })
    })
  })

  describe.skip('mediateur avec activites', () => {
    const cases: {
      title: string
      activitesFilters: ActivitesFilters
      expected: Omit<MesStatistiquesPageData, 'activitesFilters'>
    }[] = [
      {
        title: 'should compute all data without filters',
        activitesFilters: {},
        expected: createExpectedData((data) => data),
      },
    ]

    const mediateurId = mediateurAvecActivite.mediateur.connectOrCreate.where.id

    let expectedCommon: Pick<
      MesStatistiquesPageData,
      | 'communesOptions'
      | 'departementsOptions'
      | 'initialBeneficiairesOptions'
      | 'lieuxActiviteOptions'
    >

    beforeAll(async () => {
      expectedCommon = {
        communesOptions: [],
        departementsOptions: [],
        initialBeneficiairesOptions:
          await getInitialBeneficiairesOptionsForSearch({
            mediateurId,
          }),
        lieuxActiviteOptions: [{ label: mediateque.nom, value: mediateque.id }],
      }
    })

    test.each(cases)('$title', async ({ activitesFilters, expected }) => {
      const data = await getMesStatistiquesPageData({
        mediateurId: mediateurAvecActivite.mediateur.connectOrCreate.where.id,
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
