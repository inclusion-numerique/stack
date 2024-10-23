import { Thematique, ThematiqueDemarcheAdministrative } from '@prisma/client'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'
import { conseillerNumeriqueMediateurId } from '@app/fixtures/users/conseillerNumerique'
import { mediateurAvecActiviteMediateurId } from '@app/fixtures/users/mediateurAvecActivite'
import {
  givenCraCollectif,
  givenCraDemarcheAdministrative,
  givenCraIndividuel,
} from '@app/fixtures/givenCra'
import {
  beneficiaireAnonymeConseillerNumerique,
  beneficiaireAnonymeMediateurAvecActivite,
  beneficiaireMaximaleConseillerNumerique,
  beneficiaireMaximaleMediateurAvecActivite,
  beneficiaireMinimaleConseillerNumerique,
  beneficiaireMinimaleMediateurAvecActivite,
} from '@app/fixtures/beneficiaires'
import { mediateque } from '@app/fixtures/structures'

export const mediateurAvecActiviteCrasIndividuels = [
  givenCraIndividuel({
    id: 'bcb0ad21-5be2-417a-9ff2-d8b4dd9c62b0',
    beneficiaireId: beneficiaireMinimaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [Thematique.Sante, Thematique.CultureNumerique],
    date: new Date('2024-06-15'),
    creation: new Date('2024-06-15T09:30:00'),
  }),
  givenCraIndividuel({
    id: 'f005e2ec-b974-4ccb-a09a-ea17382dc1de',
    beneficiaireId: beneficiaireMinimaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [Thematique.InsertionProfessionnelle, Thematique.Sante],
    date: new Date('2024-08-02'),
    creation: new Date('2024-08-02T19:00:00'),
    typeLieu: 'Domicile',
    lieuCodePostal: '75001',
    lieuCodeInsee: '75101',
    lieuCommune: 'Paris 1er',
    materiel: ['Ordinateur', 'Telephone', 'Autre'],
  }),
  givenCraIndividuel({
    id: 'b0f901a3-38b0-4c30-89b8-ace056801ca2',
    beneficiaireId: beneficiaireMaximaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [Thematique.Email, Thematique.Parentalite],
    date: new Date('2024-07-28'),
    creation: new Date('2024-07-28T10:00:00'),
    typeLieu: 'ADistance',
    materiel: ['Ordinateur', 'Telephone', 'Tablette', 'Autre'],
  }),
  givenCraIndividuel({
    id: 'b72eb129-86e7-4cda-8238-5a57c79999a1',
    beneficiaireId: beneficiaireMaximaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [Thematique.Email],
    date: new Date('2024-07-28'),
    creation: new Date('2024-07-28T09:00:00'),
    typeLieu: 'Domicile',
    lieuCodePostal: '75001',
    lieuCodeInsee: '75101',
    lieuCommune: 'Paris 1er',
  }),
]

export const mediateurAvecActiviteCrasDemarchesAdministratives = [
  givenCraDemarcheAdministrative({
    id: '1c083c39-beec-4606-ba1a-f1cdf173e5d4',
    beneficiaireId: beneficiaireMinimaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiquesDemarche: [
      ThematiqueDemarcheAdministrative.SocialSante,
      ThematiqueDemarcheAdministrative.EtrangersEurope,
    ],
    date: new Date('2024-08-02'),
    creation: new Date('2024-08-02T14:00:00'),
  }),
  givenCraDemarcheAdministrative({
    id: '42b5be6b-5140-48e3-9c56-af7b6dda04f0',
    beneficiaireId: beneficiaireMaximaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiquesDemarche: [
      ThematiqueDemarcheAdministrative.SocialSante,
      ThematiqueDemarcheAdministrative.Logement,
    ],
    date: new Date('2024-08-03'),
    creation: new Date('2024-08-03T15:00:00'),
    structureId: mediateque.id,
  }),
  givenCraDemarcheAdministrative({
    id: 'c96812d9-cbfe-4260-9430-77f9befd22aa',
    beneficiaireId: beneficiaireAnonymeMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiquesDemarche: [
      ThematiqueDemarcheAdministrative.FamilleScolarite,
      ThematiqueDemarcheAdministrative.TransportsMobilite,
    ],
    date: new Date('2024-08-05'),
    creation: new Date('2024-08-05T15:30:00'),
    lieuCommune: 'Lyon 2eme',
    lieuCodePostal: '69002',
    lieuCodeInsee: '69382',
    structureId: null,
  }),
  givenCraDemarcheAdministrative({
    id: '36e41a5c-95ad-405d-8b59-8be586017924',
    beneficiaireId: beneficiaireMaximaleMediateurAvecActivite.id,
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiquesDemarche: [
      ThematiqueDemarcheAdministrative.SocialSante,
      ThematiqueDemarcheAdministrative.Justice,
    ],
    date: new Date('2024-08-03'),
    creation: new Date('2024-08-03T16:00:00'),
    structureId: mediateque.id,
  }),
]

export const mediateurAvecActiviteCrasCollectifs = [
  givenCraCollectif({
    id: '1b5d4e97-de3d-4e6d-87f2-b1ab28c6af5e',
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [Thematique.Email, Thematique.ReseauxSociaux],
    date: new Date('2024-08-04'),
    creation: new Date('2024-08-04T08:00:00'),
    beneficiaireIds: [
      beneficiaireMinimaleMediateurAvecActivite,
      beneficiaireMaximaleMediateurAvecActivite,
    ].map((b) => b.id),
    participantsAnonymes: participantsAnonymesDefault,
    materiel: ['Ordinateur', 'Tablette', 'Autre'],
  }),

  givenCraCollectif({
    id: 'ae49f9d3-f7ee-454b-b54b-f4683757cb70',
    mediateurId: mediateurAvecActiviteMediateurId,
    thematiques: [Thematique.ReseauxSociaux, Thematique.CultureNumerique],
    date: new Date('2024-07-05'),
    creation: new Date('2024-07-05T09:00:00'),
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

export const fixturesActivitesMediateurAvecActivite = [
  ...mediateurAvecActiviteCrasCollectifs,
  ...mediateurAvecActiviteCrasDemarchesAdministratives,
  ...mediateurAvecActiviteCrasIndividuels,
]

export const conseillerNumeriqueCrasIndividuels = [
  givenCraIndividuel({
    id: 'fa05c7eb-a4a5-4b90-bc59-8c83eea045ea',
    beneficiaireId: beneficiaireMinimaleConseillerNumerique.id,
    mediateurId: conseillerNumeriqueMediateurId,
    thematiques: [Thematique.Sante, Thematique.CultureNumerique],
    date: new Date('2024-06-15'),
    creation: new Date('2024-06-15T09:30:00'),
  }),
  givenCraIndividuel({
    id: 'f8ffef47-ef81-46fa-a5c3-49f8aadef935',
    beneficiaireId: beneficiaireMinimaleConseillerNumerique.id,
    mediateurId: conseillerNumeriqueMediateurId,
    thematiques: [Thematique.InsertionProfessionnelle, Thematique.Sante],
    date: new Date('2024-08-02'),
    creation: new Date('2024-08-02T19:00:00'),
    typeLieu: 'Domicile',
    lieuCodePostal: '75001',
    lieuCodeInsee: '75101',
    lieuCommune: 'Paris 1er',
    materiel: ['Ordinateur', 'Telephone', 'Tablette'],
  }),
  givenCraIndividuel({
    id: '4edab41b-f924-431f-b59e-def20528d1ef',
    beneficiaireId: beneficiaireMaximaleConseillerNumerique.id,
    mediateurId: conseillerNumeriqueMediateurId,
    thematiques: [Thematique.Email, Thematique.Parentalite],
    date: new Date('2024-07-28'),
    creation: new Date('2024-07-28T10:00:00'),
    typeLieu: 'ADistance',
    materiel: ['Ordinateur', 'Telephone', 'Tablette', 'Autre'],
  }),
  givenCraIndividuel({
    id: 'a0e12e9c-46c7-4f83-86bd-824d18113bf6',
    beneficiaireId: beneficiaireMaximaleConseillerNumerique.id,
    mediateurId: conseillerNumeriqueMediateurId,
    thematiques: [Thematique.Email, Thematique.Sante],
    date: new Date('2024-07-28'),
    creation: new Date('2024-07-28T09:00:00'),
    typeLieu: 'Domicile',
    lieuCodePostal: '75001',
    lieuCodeInsee: '75101',
    lieuCommune: 'Paris 1er',
  }),
]

export const conseillerNumeriqueCrasDemarchesAdministratives = [
  givenCraDemarcheAdministrative({
    id: '26c0e764-1959-4ff5-b447-fd086e9120a7',
    beneficiaireId: beneficiaireMinimaleConseillerNumerique.id,
    mediateurId: conseillerNumeriqueMediateurId,
    thematiquesDemarche: [
      ThematiqueDemarcheAdministrative.SocialSante,
      ThematiqueDemarcheAdministrative.EtrangersEurope,
    ],
    date: new Date('2024-08-02'),
    creation: new Date('2024-08-02T14:00:00'),
  }),
  givenCraDemarcheAdministrative({
    id: 'bd477c86-9222-4997-bc7c-f109f401ccd8',
    beneficiaireId: beneficiaireMaximaleConseillerNumerique.id,
    mediateurId: conseillerNumeriqueMediateurId,
    thematiquesDemarche: [
      ThematiqueDemarcheAdministrative.SocialSante,
      ThematiqueDemarcheAdministrative.Logement,
    ],
    date: new Date('2024-08-03'),
    creation: new Date('2024-08-03T15:00:00'),
    structureId: mediateque.id,
  }),
  givenCraDemarcheAdministrative({
    id: '863d8cda-e020-4379-b222-5ae468ce6b4b',
    beneficiaireId: beneficiaireAnonymeConseillerNumerique.id,
    mediateurId: conseillerNumeriqueMediateurId,
    thematiquesDemarche: [
      ThematiqueDemarcheAdministrative.FamilleScolarite,
      ThematiqueDemarcheAdministrative.TransportsMobilite,
    ],
    date: new Date('2024-08-05'),
    creation: new Date('2024-08-05T15:30:00'),
    lieuCommune: 'Lyon 2eme',
    lieuCodePostal: '69002',
    lieuCodeInsee: '69382',
    structureId: null,
  }),
  givenCraDemarcheAdministrative({
    id: '3c91bec2-8828-4f52-801a-d9be09c2ae80',
    beneficiaireId: beneficiaireMaximaleConseillerNumerique.id,
    mediateurId: conseillerNumeriqueMediateurId,
    thematiquesDemarche: [
      ThematiqueDemarcheAdministrative.SocialSante,
      ThematiqueDemarcheAdministrative.Justice,
    ],
    date: new Date('2024-08-03'),
    creation: new Date('2024-08-03T16:00:00'),
    structureId: mediateque.id,
  }),
]

export const conseillerNumeriqueCrasCollectifs = [
  givenCraCollectif({
    id: 'c9740386-4257-489d-b431-d63e2f6570de',
    mediateurId: conseillerNumeriqueMediateurId,
    thematiques: [Thematique.Email, Thematique.ReseauxSociaux],
    date: new Date('2024-08-04'),
    creation: new Date('2024-08-04T08:00:00'),
    beneficiaireIds: [
      beneficiaireMinimaleConseillerNumerique,
      beneficiaireMaximaleConseillerNumerique,
    ].map((b) => b.id),
    participantsAnonymes: participantsAnonymesDefault,
    materiel: ['Ordinateur', 'Tablette', 'Autre'],
  }),

  givenCraCollectif({
    id: '608de160-f16d-41af-a388-024ba4a79493',
    mediateurId: conseillerNumeriqueMediateurId,
    thematiques: [Thematique.ReseauxSociaux, Thematique.CultureNumerique],
    date: new Date('2024-07-05'),
    creation: new Date('2024-07-05T09:00:00'),
    titreAtelier:
      'Conduites à risque sur internet et les bons usages du numérique',
    beneficiaireIds: [
      beneficiaireMinimaleConseillerNumerique,
      beneficiaireMaximaleConseillerNumerique,
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

export const fixturesActivitesConseillerNumerique = [
  ...conseillerNumeriqueCrasCollectifs,
  ...conseillerNumeriqueCrasDemarchesAdministratives,
  ...conseillerNumeriqueCrasIndividuels,
]

export const fixtureCrasIndividuels = [
  ...mediateurAvecActiviteCrasIndividuels,
  ...conseillerNumeriqueCrasIndividuels,
]

export const fixtureCrasDemarchesAdministratives = [
  ...mediateurAvecActiviteCrasDemarchesAdministratives,
  ...conseillerNumeriqueCrasDemarchesAdministratives,
]

export const fixtureCrasCollectifs = [
  ...mediateurAvecActiviteCrasCollectifs,
  ...conseillerNumeriqueCrasCollectifs,
]

export const fixtureCras = [
  ...fixtureCrasIndividuels,
  ...fixtureCrasDemarchesAdministratives,
  ...fixtureCrasCollectifs,
]

export type ActiviteFixture = (typeof fixtureCras)[number]
