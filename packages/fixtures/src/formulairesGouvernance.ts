import type { Prisma } from '@prisma/client'

export const users: Prisma.UserCreateInput[] = [
  {
    id: '99afd613-9d54-4110-9062-065c627eda8a',
    firstName: 'Hugues',
    lastName: 'Maignol',
    name: 'Hugues Maignol',
    role: 'Administrator',
    email: 'hugues.maignol@beta.gouv.fr',
    emailVerified: new Date(),
  },
  {
    id: 'eecac657-f415-47e1-8087-c4508ea16191',
    firstName: 'Xavier',
    lastName: 'Desoindre',
    name: 'Xavier Desoindre',
    role: 'Administrator',
    email: 'xavier.desoindre@beta.gouv.fr',
    emailVerified: new Date(),
  },
  {
    id: '8e3c9cdc-3125-4c2e-a49e-796903e9989e',
    firstName: 'Thibault',
    lastName: 'Rouveyrol',
    name: 'Thibault Rouveyrol',
    role: 'Administrator',
    email: 'thibault.rouveyrol@beta.gouv.fr',
    emailVerified: new Date(),
  },
  {
    id: '153aa33b-9938-4458-a5ec-7676636bdccd',
    firstName: 'Amélie',
    lastName: 'Naquet',
    name: 'Amélie Naquet',
    email: 'amelie.naquet@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: '511a5801-78c5-45f0-8b55-be524f43a207',
    firstName: 'Sylvain',
    lastName: 'Aubry',
    name: 'Sylvain Aubry',
    email: 'sylvain.aubry@beta.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: '7de33f33-9a65-4473-83b6-4892d14155a4',
    firstName: 'Laurène',
    lastName: 'Zyskind',
    name: 'Laurène Zyskind',
    email: 'laurene.zyskind@beta.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: 'f618dff9-b217-41fa-9dbb-a441aad535ed',
    firstName: 'Gabriel',
    lastName: 'Fonlladosa',
    name: 'Gabriel Fonlladosa',
    email: 'gabriel.fonlladosa@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: '80fb420f-e9c5-44e9-ae2d-d5b431a9bbc4',
    firstName: 'Julie',
    lastName: 'Ripa',
    name: 'Julie Ripa',
    email: 'julie.ripa@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: 'f5dfe079-7534-47de-b00d-ec415c89a662',
    firstName: 'Estelle',
    lastName: 'Patat',
    name: 'Estelle Patat',
    email: 'estelle.patat@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: 'de0dfd09-5958-4467-be86-b16002f9e00a',
    firstName: 'Julia',
    lastName: 'Herriot',
    name: 'Julia Herriot',
    email: 'julia.herriot@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: '124843a6-7682-4234-b9b7-646f7ae09cfb',
    firstName: 'Pierre-Louis',
    lastName: 'Rolle',
    name: 'Pierre-Louis Rolle',
    email: 'pierre-louis.rolle@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: '33d9b439-2a7c-4fa7-bf68-36345ac9d9d2',
    firstName: 'Léa',
    lastName: 'Gislais',
    name: 'Léa Gislais',
    email: 'lea.gislais@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: 'a5e05571-9fdb-4adc-8abb-ef3beecb0a16',
    firstName: 'Marine',
    lastName: 'Jouan',
    name: 'Marine Jouan',
    email: 'marine.jouan@anct.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: '63aa97b4-cd37-4487-8d27-e093bcb28a02',
    firstName: 'Kevin',
    lastName: 'Thuillier',
    name: 'Kevin Thuillier',
    email: 'kevin.thuillier@numerique.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
  {
    id: 'cec429c0-47c7-49f3-9200-66bd82b69347',
    firstName: 'Célestin',
    lastName: 'Leroux',
    name: 'Célestin Leroux',
    email: 'celestin.leroux@beta.gouv.fr',
    role: 'Demo',
    emailVerified: new Date(),
  },
]

const formulaireGouvernanceConnect = (id: string) => ({
  connect: {
    id,
  },
})
const contactConnectOrCreate = ({
  id,
  formulaireGouvernanceId,
  ...data
}: {
  formulaireGouvernanceId: string
  id: string
  nom: string
  prenom: string
  fonction: string
  email: string
}) => ({
  connectOrCreate: {
    where: {
      id,
    },
    create: {
      id,
      formulaireGouvernance: formulaireGouvernanceConnect(
        formulaireGouvernanceId,
      ),
      ...data,
    },
  },
})

const contacts = [
  {
    id: '47d7db0f-1684-417e-8fa7-eedd32d6c1f7',
    prenom: 'Jean',
    nom: 'Dupont',
    fonction: 'Robot de test',
    email: 'jean.dupont@inclusion-numerique.anct.gouv.fr',
  },
  {
    id: '8256386c-48e2-449e-9928-3e6e8c5f7d5d',
    prenom: 'Marie',
    nom: 'Leroux',
    fonction: 'Robot de test',
    email: 'marie.leroux@inclusion-numerique.anct.gouv.fr',
  },
  {
    id: '6d209021-1c69-4c11-8977-3d837ecdafae',
    prenom: 'Luc',
    nom: 'Martin',
    fonction: 'Robot de test',
    email: 'luc.martin@inclusion-numerique.anct.gouv.fr',
  },
  {
    id: 'd10f6ad2-b4e6-40dc-8ca3-8278d04130f2',
    prenom: 'Sophie',
    nom: 'Petit',
    fonction: 'Robot de test',
    email: 'sophie.petit@inclusion-numerique.anct.gouv.fr',
  },
  {
    id: '8c3a62ef-94b5-4e93-b514-e58dd5ca6850',
    prenom: 'Henri',
    nom: 'Bernard',
    fonction: 'Robot de test',
    email: 'henri.bernard@inclusion-numerique.anct.gouv.fr',
  },
  {
    id: 'fe7cde30-7ba5-4912-8c18-eb08523deea3',
    prenom: 'Isabelle',
    nom: 'Dubois',
    fonction: 'Robot de test',
    email: 'isabelle.dubois@inclusion-numerique.anct.gouv.fr',
  },
  {
    id: '48949b5d-e0da-4db8-a60c-6d42ef42253f',
    prenom: 'Pierre',
    nom: 'Moreau',
    fonction: 'Robot de test',
    email: 'pierre.moreau@inclusion-numerique.anct.gouv.fr',
  },
  {
    id: '7a6b8e20-6ab7-49d4-9885-aa81c3e8f60e',
    prenom: 'Céline',
    nom: 'Fournier',
    fonction: 'Robot de test',
    email: 'celine.fournier@inclusion-numerique.anct.gouv.fr',
  },
  {
    id: 'daac220a-6b26-4c65-a17d-515b57b524e1',
    prenom: 'Éric',
    nom: 'Lefebvre',
    fonction: 'Robot de test',
    email: 'eric.lefebvre@inclusion-numerique.anct.gouv.fr',
  },
  {
    id: '0fb31c7c-5ad7-45f4-9a2d-17cf9cc33c39',
    prenom: 'Christine',
    nom: 'Roussel',
    fonction: 'Robot de test',
    email: 'christine.roussel@inclusion-numerique.anct.gouv.fr',
  },
  {
    id: 'c61c6213-5f3f-47db-85f8-7515a7b2c04a',
    prenom: 'François',
    nom: 'Simon',
    fonction: 'Robot de test',
    email: 'francois.simon@inclusion-numerique.anct.gouv.fr',
  },
] as const

export const formulairesGouvernance = () => {
  const createur = { connect: { id: users[0].id } }
  const participants = {
    connect: [{ id: users[0].id }],
  }
  const rhone = {
    connect: {
      code: '69',
    },
  }
  const gironde = {
    connect: {
      code: '33',
    },
  }

  const metropoleDeLyon = {
    connect: {
      code: '200046977',
    },
  }

  const rhonePorteurEpciParticipantId = '8eea8b99-7f4d-4826-9751-bc81aa2687f2'
  const rhonePorteurEpciParticipant = {
    id: rhonePorteurEpciParticipantId,
    gouvernancePersona: 'conseil-departemental',
    intention: 'Porter',
    confirmeEtEnvoye: new Date(),
    createur,
    departement: rhone,
    participants,
    schemaOuGouvernanceLocale: 'Un exemple de gouvernance locale',
    contactPolitique: contactConnectOrCreate({
      formulaireGouvernanceId: rhonePorteurEpciParticipantId,
      id: '841cf5ce-b3a0-4528-ba25-27c1292eee0b',
      nom: 'Dupont',
      prenom: 'Jean',
      fonction: 'Directeur',
      email: 'jean@example.com',
    }),
    epcisParticipantes: {
      connectOrCreate: [
        {
          where: {
            id: 'de900392-6b2f-4d4e-a3e5-92e7853a0092',
          },
          create: {
            id: 'de900392-6b2f-4d4e-a3e5-92e7853a0092',
            epci: metropoleDeLyon,
            contact: contactConnectOrCreate({
              id: '3c00f6c7-53e2-4c02-88da-8c29e42ec776',
              formulaireGouvernanceId: rhonePorteurEpciParticipantId,
              prenom: 'Benoit',
              nom: 'Evrard',
              fonction: 'Directeur',
              email: 'benoit@example.com',
            }),
          },
        },
      ],
    },
    communesParticipantes: {
      connectOrCreate: [
        {
          where: {
            id: '8a358b2c-5328-429b-b639-669013b4bf40',
          },
          create: {
            id: '8a358b2c-5328-429b-b639-669013b4bf40',
            commune: {
              connect: {
                code: '69381',
              },
            },
            contact: contactConnectOrCreate({
              formulaireGouvernanceId: rhonePorteurEpciParticipantId,
              ...contacts[0],
            }),
          },
        },
        {
          where: {
            id: '1156be7b-563f-49d1-b17c-5d3c254f28b3',
          },
          create: {
            id: '1156be7b-563f-49d1-b17c-5d3c254f28b3',
            commune: {
              connect: {
                code: '69382',
              },
            },
            contact: contactConnectOrCreate({
              formulaireGouvernanceId: rhonePorteurEpciParticipantId,
              ...contacts[1],
            }),
          },
        },
        {
          where: {
            id: '803f15c1-31e9-4df5-a558-afc1417182b3',
          },
          create: {
            id: '803f15c1-31e9-4df5-a558-afc1417182b3',
            commune: {
              connect: {
                code: '69383',
              },
            },
            contact: contactConnectOrCreate({
              formulaireGouvernanceId: rhonePorteurEpciParticipantId,
              ...contacts[2],
            }),
          },
        },
      ],
    },
    structuresParticipantes: {
      connectOrCreate: [
        {
          where: {
            id: '8c41f3e8-3e11-4382-b305-82f7826025c3',
          },
          create: {
            id: '8c41f3e8-3e11-4382-b305-82f7826025c3',
            nomStructure: 'Structure exemple',
            contact: contactConnectOrCreate({
              formulaireGouvernanceId: rhonePorteurEpciParticipantId,
              ...contacts[3],
            }),
          },
        },
        {
          where: {
            id: '94e06205-d9aa-4a11-9ca3-ae3108d8fb62',
          },
          create: {
            id: '94e06205-d9aa-4a11-9ca3-ae3108d8fb62',
            nomStructure: 'Association exemple',
            contact: contactConnectOrCreate({
              formulaireGouvernanceId: rhonePorteurEpciParticipantId,
              ...contacts[4],
            }),
          },
        },
      ],
    },
  } satisfies Prisma.FormulaireGouvernanceCreateInput

  const girondePorteurVide = {
    id: 'b7496d9f-a9c8-46f5-8e83-d8724e84fd01',
    gouvernancePersona: 'conseil-departemental',
    intention: 'Porter',
    confirmeEtEnvoye: new Date(),
    createur,
    departement: gironde,
    participants,
    contactPolitique: contactConnectOrCreate({
      formulaireGouvernanceId: 'b7496d9f-a9c8-46f5-8e83-d8724e84fd01',
      ...contacts[5],
    }),
  } satisfies Prisma.FormulaireGouvernanceCreateInput

  const lyon6Participant = {
    id: '52d9386e-768f-4cad-8749-22b5751f6d35',
    gouvernancePersona: 'commune',
    intention: 'Participer',
    confirmeEtEnvoye: new Date(),
    createur,
    commune: {
      connect: {
        code: '69386',
      },
    },
    contactPolitique: contactConnectOrCreate({
      formulaireGouvernanceId: '52d9386e-768f-4cad-8749-22b5751f6d35',
      ...contacts[6],
    }),
    contactTechnique: contactConnectOrCreate({
      formulaireGouvernanceId: '52d9386e-768f-4cad-8749-22b5751f6d35',
      ...contacts[7],
    }),
  } satisfies Prisma.FormulaireGouvernanceCreateInput

  const asso1Participant = {
    id: 'f4577ba2-6fc3-482f-b4ae-a2608df780e8',
    gouvernancePersona: 'structure',
    intention: 'Participer',
    confirmeEtEnvoye: new Date(),
    nomStructure: 'Association exemple A',
    siretStructure: '12345678901234',
    createur,
    departement: rhone,
    contactStructure: contactConnectOrCreate({
      formulaireGouvernanceId: 'f4577ba2-6fc3-482f-b4ae-a2608df780e8',
      ...contacts[8],
    }),
  } satisfies Prisma.FormulaireGouvernanceCreateInput

  const asso2Participant = {
    id: 'd575dfd3-4230-41d2-9170-9d8c05bd1d18',
    gouvernancePersona: 'structure',
    intention: 'Participer',
    confirmeEtEnvoye: new Date(),
    nomStructure: 'Association exemple B',
    createur,
    departement: rhone,
    contactStructure: contactConnectOrCreate({
      formulaireGouvernanceId: 'd575dfd3-4230-41d2-9170-9d8c05bd1d18',
      ...contacts[9],
    }),
  } satisfies Prisma.FormulaireGouvernanceCreateInput

  return [
    rhonePorteurEpciParticipant,
    girondePorteurVide,
    lyon6Participant,
    asso1Participant,
    asso2Participant,
  ]
}
