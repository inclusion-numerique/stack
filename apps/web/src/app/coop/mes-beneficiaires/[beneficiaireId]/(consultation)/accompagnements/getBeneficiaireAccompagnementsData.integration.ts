import { getBeneficiaireAccompagnementsPageData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/accompagnements/getBeneficiaireAccompagnementsPageData'
import { resetFixtureUser } from '@app/fixtures/resetFixtureUser'
import { mediateurAvecActivite } from '@app/fixtures/users'
import {
  beneficiaireMaximaleMediateurAvecActivite,
  beneficiaireSansAccompagnementsMediateurAvecActivite,
} from '@app/fixtures/beneficiaires'
import {
  mediateurAvecActiviteCrasCollectifs,
  mediateurAvecActiviteCrasDemarchesAdministratives,
  mediateurAvecActiviteCrasIndividuels,
} from '@app/fixtures/activites'

describe('getBeneficiaireAccompagnementsData', () => {
  beforeAll(async () => {
    await resetFixtureUser(mediateurAvecActivite)
  })

  it('returns no activites for beneficiaire with no data', async () => {
    const beneficiaire = beneficiaireSansAccompagnementsMediateurAvecActivite
    const beneficiaireId = beneficiaire.id
    const { mediateurId } = beneficiaire

    expect(
      await getBeneficiaireAccompagnementsPageData({
        mediateurId,
        beneficiaireId,
      }),
    ).toEqual({
      beneficiaire: {
        id: beneficiaireId,
        mediateurId,
        prenom: beneficiaire.prenom,
        nom: beneficiaire.nom,
        anneeNaissance: beneficiaire.anneeNaissance,
        _count: {
          accompagnements: 0,
        },
      },
      activitesByDate: [],
    })
  })

  it('returns thematiques for beneficiaire with cras', async () => {
    const beneficiaire = beneficiaireMaximaleMediateurAvecActivite
    const beneficiaireId = beneficiaire.id
    const { mediateurId } = beneficiaire

    expect(
      await getBeneficiaireAccompagnementsPageData({
        mediateurId,
        beneficiaireId,
      }),
    ).toEqual({
      beneficiaire: {
        id: beneficiaire.id,
        mediateurId,
        prenom: beneficiaire.prenom,
        nom: beneficiaire.nom,
        anneeNaissance: beneficiaire.anneeNaissance,
        _count: {
          accompagnements: 6,
        },
      },
      activitesByDate: [
        {
          activites: [
            // Collective CRA on 2024-08-04 (creation: 08:00:00)
            expect.objectContaining({
              id: mediateurAvecActiviteCrasCollectifs[0].activite.id,
            }),
          ],
          date: '2024-08-04',
        },
        {
          activites: [
            // Demarche Admin on 2024-08-03 (creation: 16:00:00)
            expect.objectContaining({
              id: mediateurAvecActiviteCrasDemarchesAdministratives[2].activite
                .id,
            }),
            // Demarche Admin on 2024-08-03 (creation: 15:00:00)
            expect.objectContaining({
              id: mediateurAvecActiviteCrasDemarchesAdministratives[1].activite
                .id,
            }),
          ],
          date: '2024-08-03',
        },
        {
          activites: [
            // Individuel CRA on 2024-07-28 (creation: 10:00:00)
            expect.objectContaining({
              id: mediateurAvecActiviteCrasIndividuels[2].activite.id,
            }),
            // Individuel CRA on 2024-07-28 (creation: 09:00:00)
            expect.objectContaining({
              id: mediateurAvecActiviteCrasIndividuels[3].activite.id,
            }),
          ],
          date: '2024-07-28',
        },
        {
          activites: [
            // Collective CRA on 2024-07-05 (creation: 09:00:00)
            expect.objectContaining({
              id: mediateurAvecActiviteCrasCollectifs[1].activite.id,
            }),
          ],
          date: '2024-07-05',
        },
      ],
    })
  })
})
