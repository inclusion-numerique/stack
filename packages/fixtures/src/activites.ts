import { Thematique, ThematiqueDemarcheAdministrative } from '@prisma/client'
import { mediateurAvecActiviteMediateurId } from '@app/fixtures/users'
import {
  givenCraCollectif,
  givenCraDemarcheAdministrative,
  givenCraIndividuel,
} from '@app/fixtures/givenCra'
import {
  beneficiaireMaximaleMediateurAvecActivite,
  beneficiaireMinimaleMediateurAvecActivite,
} from '@app/fixtures/beneficiaires'
import { mediateque } from '@app/fixtures/structures'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'

export const mediateurAvecActiviteCrasIndividuels = [
  givenCraIndividuel({
    beneficiaireId: beneficiaireMinimaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [Thematique.Sante, Thematique.CultureNumerique],
    date: new Date('2024-06-15'),
  }),
  givenCraIndividuel({
    beneficiaireId: beneficiaireMinimaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [Thematique.InsertionProfessionnelle, Thematique.Sante],
    date: new Date('2024-08-02'),
    lieuCodePostal: '75001',
    lieuCodeInsee: '75101',
    lieuCommune: 'Paris 1er',
  }),
  givenCraIndividuel({
    beneficiaireId: beneficiaireMaximaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [Thematique.Email, Thematique.Parentalite],
    date: new Date('2024-07-21'),
    typeLieu: 'ADistance',
  }),
  givenCraIndividuel({
    beneficiaireId: beneficiaireMaximaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [Thematique.Email, Thematique.Sante],
    date: new Date('2024-07-28'),
    typeLieu: 'Domicile',
    lieuCodePostal: '75001',
    lieuCodeInsee: '75101',
    lieuCommune: 'Paris 1er',
  }),
]

export const mediateurAvecActiviteCrasDemarchesAdministratives = [
  givenCraDemarcheAdministrative({
    beneficiaireId: beneficiaireMinimaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiquesDemarche: [
      ThematiqueDemarcheAdministrative.SocialSante,
      ThematiqueDemarcheAdministrative.EtrangersEurope,
    ],
    date: new Date('2024-08-02'),
  }),
  givenCraDemarcheAdministrative({
    beneficiaireId: beneficiaireMaximaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiquesDemarche: [
      ThematiqueDemarcheAdministrative.SocialSante,
      ThematiqueDemarcheAdministrative.Logement,
    ],
    date: new Date('2024-08-03'),
    structureId: mediateque.id,
  }),
  givenCraDemarcheAdministrative({
    beneficiaireId: beneficiaireMaximaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiquesDemarche: [
      ThematiqueDemarcheAdministrative.SocialSante,
      ThematiqueDemarcheAdministrative.Justice,
    ],
    date: new Date('2024-08-03'),
    structureId: mediateque.id,
  }),
]

export const mediateurAvecActiviteCrasCollectifs = [
  givenCraCollectif({
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [Thematique.Email, Thematique.ReseauxSociaux],
    date: new Date('2024-08-04'),
    beneficiaireIds: [
      beneficiaireMinimaleMediateurAvecActivite,
      beneficiaireMaximaleMediateurAvecActivite,
    ].map((b) => b.id),
    participantsAnonymes: participantsAnonymesDefault,
  }),

  givenCraCollectif({
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [Thematique.ReseauxSociaux, Thematique.CultureNumerique],
    date: new Date('2024-07-05'),
    titreAtelier:
      'Conduites à risque sur internet et les bons usages du numérique',
    beneficiaireIds: [
      beneficiaireMinimaleMediateurAvecActivite,
      beneficiaireMaximaleMediateurAvecActivite,
    ].map((b) => b.id),
    participantsAnonymes: {
      ...participantsAnonymesDefault,
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
