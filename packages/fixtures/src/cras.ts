import { mediateurAvecActiviteMediateurId } from '@app/fixtures/users'
import {
  givenCraDemarcheAdministrative,
  givenCraIndividuel,
} from '@app/fixtures/givenCra'
import {
  beneficiaireMaximaleMediateurAvecActivite,
  beneficiaireMinimaleMediateurAvecActivite,
} from '@app/fixtures/beneficiaires'
import {
  ThematiqueAccompagnement,
  ThematiqueDemarcheAdministrative,
} from '@prisma/client'

export const mediateurAvecActiviteCrasIndividuels = [
  givenCraIndividuel({
    beneficiaireId: beneficiaireMinimaleMediateurAvecActivite.id,
    creeParMediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [
      ThematiqueAccompagnement.Sante,
      ThematiqueAccompagnement.CultureNumerique,
    ],
    date: new Date('2024-06-15'),
  }),
  givenCraIndividuel({
    beneficiaireId: beneficiaireMinimaleMediateurAvecActivite.id,
    creeParMediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [
      ThematiqueAccompagnement.InsertionProfessionnelle,
      ThematiqueAccompagnement.Sante,
    ],
    date: new Date('2024-06-25'),
  }),
]

export const mediateurAvecActiviteCrasDemarchesAdministratives = [
  givenCraDemarcheAdministrative({
    beneficiaireId: beneficiaireMinimaleMediateurAvecActivite.id,
    creeParMediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [
      ThematiqueDemarcheAdministrative.SocialSante,
      ThematiqueDemarcheAdministrative.EtrangersEurope,
    ],
    date: new Date('2024-06-30'),
  }),
  givenCraDemarcheAdministrative({
    beneficiaireId: beneficiaireMaximaleMediateurAvecActivite.id,
    creeParMediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [
      ThematiqueDemarcheAdministrative.Justice,
      ThematiqueDemarcheAdministrative.FamilleScolarite,
    ],
    date: new Date('2024-05-20'),
  }),
]

export const fixtureCrasIndividuels = [...mediateurAvecActiviteCrasIndividuels]

export const fixtureCrasDemarchesAdministratives = [
  ...mediateurAvecActiviteCrasDemarchesAdministratives,
]
