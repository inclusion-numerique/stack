import {
  ThematiqueAccompagnement,
  ThematiqueDemarcheAdministrative,
} from '@prisma/client'
import { mediateurAvecActiviteMediateurId } from '@app/fixtures/users'
import {
  givenCraCollectif,
  givenCraDemarcheAdministrative,
  givenCraIndividuel,
} from '@app/fixtures/givenCra'
import {
  beneficiaireAnonymeMediateurAvecActivite,
  beneficiaireMinimaleMediateurAvecActivite,
  beneficiairesMediateurAvecActivite,
} from '@app/fixtures/beneficiaires'
import { mediateque } from '@app/fixtures/structures'

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
    lieuAccompagnementDomicileCodePostal: '75001',
    lieuAccompagnementDomicileCodeInsee: '75101',
    lieuAccompagnementDomicileCommune: 'Paris 1er',
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
    date: new Date('2024-06-25'),
  }),
  givenCraDemarcheAdministrative({
    beneficiaireId: beneficiaireAnonymeMediateurAvecActivite.id,
    creeParMediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [
      ThematiqueDemarcheAdministrative.Justice,
      ThematiqueDemarcheAdministrative.FamilleScolarite,
    ],
    date: new Date('2024-05-20'),
    lieuActiviteId: mediateque.id,
  }),
]

export const mediateurAvecActiviteCrasCollectifs = [
  givenCraCollectif({
    creeParMediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [
      ThematiqueAccompagnement.Sante,
      ThematiqueAccompagnement.CultureNumerique,
    ],
    date: new Date('2024-08-04'),
    beneficiaireIds: beneficiairesMediateurAvecActivite.map((b) => b.id),
    participantsAnonymes: {},
  }),

  givenCraCollectif({
    creeParMediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [
      ThematiqueAccompagnement.BanqueEtAchatsEnLigne,
      ThematiqueAccompagnement.NavigationSurInternet,
      ThematiqueAccompagnement.CreerAvecLeNumerique,
    ],
    date: new Date('2024-07-05'),
    titreAtelier:
      'Conduites à risque sur internet et les bons usages du numérique',
    beneficiaireIds: beneficiairesMediateurAvecActivite.map((b) => b.id),
    participantsAnonymes: {
      total: 10,
      genreNonCommunique: 10,
      statutSocialEnEmploi: 8,
      statutSocialScolarise: 2,
      trancheAgeVingtCinqTrenteNeuf: 3,
      trancheAgeQuaranteCinquanteNeuf: 5,
      trancheAgeNonCommunique: 2,
    },
  }),
]

export const fixtureCrasIndividuels = [...mediateurAvecActiviteCrasIndividuels]

export const fixtureCrasDemarchesAdministratives = [
  ...mediateurAvecActiviteCrasDemarchesAdministratives,
]

export const fixtureCrasCollectifs = [...mediateurAvecActiviteCrasCollectifs]

export const fixtureCras = [
  ...fixtureCrasIndividuels,
  ...fixtureCrasDemarchesAdministratives,
  ...fixtureCrasCollectifs,
]
