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
import { mediateque } from '@app/fixtures/structures'
import { getInitialBeneficiairesOptionsForSearch } from '@app/web/beneficiaire/getInitialBeneficiairesOptionsForSearch'

/**
 * Base empty data for all tests
 */

// Fixed graph end date
const graphOptions = {
  fin: new Date('2024-08-15'),
} satisfies MesStatistiquesGraphOptions

const emptyData = {
  nombreAccompagnementsParJour: [
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
  nombreAccompagnementsParMois: [
    { month_name: 'September', label: 'Sep.', count: 0, proportion: 0 },
    { month_name: 'October', label: 'Oct.', count: 0, proportion: 0 },
    { month_name: 'November', label: 'Nov.', count: 0, proportion: 0 },
    { month_name: 'December', label: 'Déc.', count: 0, proportion: 0 },
    { month_name: 'January', label: 'Jan.', count: 0, proportion: 0 },
    { month_name: 'February', label: 'Fév.', count: 0, proportion: 0 },
    { month_name: 'March', label: 'Mars', count: 0, proportion: 0 },
    { month_name: 'April', label: 'Avr.', count: 0, proportion: 0 },
    { month_name: 'May', label: 'Mai', count: 0, proportion: 0 },
    { month_name: 'June', label: 'Juin', count: 0, proportion: 0 },
    { month_name: 'July', label: 'Juil.', count: 0, proportion: 0 },
    { month_name: 'August', label: 'Août', count: 0, proportion: 0 },
  ],
  accompagnementBeneficiaires: {
    accompagnements: 0,
    beneficiaires: 0,
    anonymes: 0,
  },
  modalitesAccompagnement: [
    {
      label: 'Accompagnements individuels',
      count: 0,
      participants: 0,
      proportion: 0,
    },
    {
      label: 'Ateliers collectifs',
      count: 0,
      participants: 0,
      proportion: 0,
    },
    {
      label: 'Aide aux démarches administratives',
      count: 0,
      participants: 0,
      proportion: 0,
    },
  ],
  genresBeneficiaires: [
    { label: 'Masculin', count: 0, proportion: 0 },
    { label: 'Féminin', count: 0, proportion: 0 },
    { label: 'Non communiqué', count: 0, proportion: 0 },
  ],
  statusBeneficiaires: [
    { label: 'Retraité', count: 0, proportion: 0 },
    { label: 'Sans emploi', count: 0, proportion: 0 },
    { label: 'En emploi', count: 0, proportion: 0 },
    { label: 'Scolarisé', count: 0, proportion: 0 },
    { label: 'Non communiqué ou hétérogène', count: 0, proportion: 0 },
  ],
  tranchesAgeBeneficiaires: [
    { label: '70 ans et plus', count: 0, proportion: 0 },
    { label: '60 - 69 ans', count: 0, proportion: 0 },
    { label: '40 - 59 ans', count: 0, proportion: 0 },
    { label: '25 - 39 ans', count: 0, proportion: 0 },
    { label: '18 - 24 ans', count: 0, proportion: 0 },
    { label: 'Mineur', count: 0, proportion: 0 },
    { label: 'Non communiqué', count: 0, proportion: 0 },
  ],
  communesBeneficiaires: [],
  thematiquesAccompagnements: [
    { label: 'Prendre en main du matériel', count: 0, proportion: 0 },
    { label: 'Navigation sur internet', count: 0, proportion: 0 },
    { label: 'E-mail', count: 0, proportion: 0 },
    { label: 'Bureautique', count: 0, proportion: 0 },
    { label: 'Réseaux sociaux communication', count: 0, proportion: 0 },
    { label: 'Santé', count: 0, proportion: 0 },
    { label: 'Banque et achats en ligne', count: 0, proportion: 0 },
    { label: 'Entrepreneuriat', count: 0, proportion: 0 },
    { label: 'Insertion professionnelle', count: 0, proportion: 0 },
    {
      label: 'Prévention en sécurité numérique',
      count: 0,
      proportion: 0,
    },
    { label: 'Parentalité', count: 0, proportion: 0 },
    { label: 'Scolarité et numérique', count: 0, proportion: 0 },
    { label: 'Créer avec le numérique', count: 0, proportion: 0 },
    { label: 'Culture numérique', count: 0, proportion: 0 },
  ],
  thematiquesDemarchesAdministratives: [
    {
      label: 'Papiers - Élections Citoyenneté',
      count: 0,
      proportion: 0,
    },
    { label: 'Famille - Scolarité', count: 0, proportion: 0 },
    { label: 'Social - Santé', count: 0, proportion: 0 },
    { label: 'Travail - Formation', count: 0, proportion: 0 },
    { label: 'Logement', count: 0, proportion: 0 },
    { label: 'Transports - Mobilité', count: 0, proportion: 0 },
    { label: 'Argent - Impôts', count: 0, proportion: 0 },
    { label: 'Justice', count: 0, proportion: 0 },
    { label: 'Étrangers - Europe', count: 0, proportion: 0 },
    { label: 'Loisirs - Sports Culture', count: 0, proportion: 0 },
  ],
  materielsAccompagnements: [
    { label: 'Ordinateur', count: 0, proportion: 0 },
    { label: 'Téléphone', count: 0, proportion: 0 },
    { label: 'Tablette', count: 0, proportion: 0 },
    { label: 'Autre matériel', count: 0, proportion: 0 },
    { label: 'Pas de matériel', count: 0, proportion: 0 },
  ],
  canauxAccompagnements: [
    { label: 'Lieu d’activité', count: 0, proportion: 0 },
    { label: 'À domicile', count: 0, proportion: 0 },
    { label: 'À distance', count: 0, proportion: 0 },
    { label: 'Autre lieu', count: 0, proportion: 0 },
  ],
  dureesAccompagnements: [
    { label: '30', count: 0, proportion: 0 },
    { label: '60', count: 0, proportion: 0 },
    { label: '90', count: 0, proportion: 0 },
    { label: '120', count: 0, proportion: 0 },
  ],
  lieuxAccompagnements: [],
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

  describe('mediateur avec activites', () => {
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

      console.log('DATA', data)

      const completeExpectedData = {
        ...expected,
        ...expectedCommon,
        activitesFilters,
      } satisfies MesStatistiquesPageData

      expect(data).toEqual(completeExpectedData)
    })
  })
})
