import { getBeneficiaireInformationsPageData } from '@app/web/app/coop/mes-beneficiaires/[beneficiaireId]/(consultation)/(informations)/getBeneficiaireInformationsPageData'
import { getBeneficiaireDisplayName } from '@app/web/beneficiaire/getBeneficiaireDisplayName'
import { CountThematiquesResult } from '@app/web/beneficiaire/beneficiaireQueries'
import { resetFixtureUser } from '@app/fixtures/resetFixtureUser'
import { mediateurAvecActivite } from '@app/fixtures/users'
import {
  beneficiaireMaximaleMediateurAvecActivite,
  beneficiaireSansAccompagnementsMediateurAvecActivite,
} from '@app/fixtures/beneficiaires'
import { seedStructures } from '@app/fixtures/structures'
import { prismaClient } from '@app/web/prismaClient'

describe('getBeneficiaireInformationsData', () => {
  beforeAll(async () => {
    await seedStructures(prismaClient)
    await resetFixtureUser(mediateurAvecActivite)
  })

  it('returns no thematiques for beneficiaire with no data', async () => {
    const beneficiaire = beneficiaireSansAccompagnementsMediateurAvecActivite
    const beneficiaireId = beneficiaire.id
    const { mediateurId } = beneficiaire

    const {
      adresse,
      anneeNaissance,
      commune,
      communeCodeInsee,
      communeCodePostal,
      creation,
      email,
      genre,
      id,
      nom,
      notes,
      pasDeTelephone,
      prenom,
      statutSocial,
      telephone,
      trancheAge,
    } = beneficiaire

    expect(
      await getBeneficiaireInformationsPageData({
        mediateurId,
        beneficiaireId,
      }),
    ).toEqual({
      beneficiaire: {
        adresse,
        anneeNaissance,
        commune,
        communeCodeInsee,
        communeCodePostal,
        creation,
        email,
        genre,
        id,
        mediateurId,
        nom,
        notes,
        pasDeTelephone,
        prenom,
        statutSocial,
        telephone,
        trancheAge,
        _count: {
          accompagnements: 0,
        },
      },
      displayName: getBeneficiaireDisplayName(beneficiaire),
      thematiquesCounts: [],
    })
  })

  it('returns thematiques for beneficiaire with cras', async () => {
    const beneficiaire = beneficiaireMaximaleMediateurAvecActivite
    const beneficiaireId = beneficiaire.id
    const { mediateurId } = beneficiaire

    const {
      adresse,
      anneeNaissance,
      commune,
      communeCodeInsee,
      communeCodePostal,
      creation,
      email,
      genre,
      id,
      nom,
      notes,
      pasDeTelephone,
      prenom,
      statutSocial,
      telephone,
      trancheAge,
    } = beneficiaire

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
        count: 2,
        enumValue: 'social_sante',
        label: 'Social - Santé',
        thematique: 'SocialSante',
      },
    ] satisfies CountThematiquesResult

    expect(
      await getBeneficiaireInformationsPageData({
        mediateurId,
        beneficiaireId,
      }),
    ).toEqual({
      beneficiaire: {
        _count: {
          accompagnements: 6,
        },
        adresse,
        anneeNaissance,
        commune,
        communeCodeInsee,
        communeCodePostal,
        creation,
        email,
        genre,
        id,
        nom,
        notes,
        pasDeTelephone,
        prenom,
        statutSocial,
        telephone,
        trancheAge,
        mediateurId,
      },
      displayName: getBeneficiaireDisplayName(beneficiaire),
      thematiquesCounts: expectedThematiqueCounts,
    })
  })
})
