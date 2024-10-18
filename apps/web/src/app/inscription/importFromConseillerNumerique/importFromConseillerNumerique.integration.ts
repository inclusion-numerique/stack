/* eslint-disable unicorn/no-useless-promise-resolve-reject */

import { ProfilInscription } from '@prisma/client'
import { deleteAll } from '@app/fixtures/seeds'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { ConseillerNumeriqueFound } from '@app/web/external-apis/conseiller-numerique/findConseillerNumeriqueByEmail'
import { ObjectId } from 'mongodb'
import { Conseiller } from '@app/web/external-apis/conseiller-numerique/conseillersProjection'
import { StructureConseillerNumerique } from '@app/web/external-apis/conseiller-numerique/StructureConseillerNumerique'
import { PremanenceConseillerNumerique } from '@app/web/external-apis/conseiller-numerique/PremanenceConseillerNumerique'
import {
  assignConseillerNumeriqueRoleToCoordinateur,
  importFromConseillerNumerique,
} from './importFromConseillerNumerique'

const cannotFindConseillerNumeriqueByEmail =
  async (): Promise<ConseillerNumeriqueFound | null> => Promise.resolve(null)

const coordinateur = {
  id: new ObjectId('802a5b097b4c4b1b8b3b4c4b'),
  nom: 'MARTIN',
  prenom: 'Marcel',
  nonAffichageCarto: false,
}

const conseillerCoordonne: Conseiller = {
  id: new ObjectId('988ab78e4c4b904b4cad78e4'),
  coordinateurs: [coordinateur],
} as unknown as Conseiller

const conseiller: Conseiller = {
  id: new ObjectId('60462000871498b5cec20c14'),
  coordinateurs: [coordinateur],
} as unknown as Conseiller

const miseEnRelation: StructureConseillerNumerique = {
  siret: '81834687600019',
  nom: 'ESPACE NUMERIQUE SUD CHARENTE',
  adresseInsee2Ban: {
    city: 'Montmoreau',
    postcode: '16190',
    name: '3 Avenue Henri Dunant',
    x: 475_494.5,
    y: 6_481_573.35,
    citycode: '16230',
  },
} as StructureConseillerNumerique

const permanences: PremanenceConseillerNumerique[] = [
  {
    _id: new ObjectId('62c458a1c9ce0606dcdcfb67'),
    nomEnseigne: 'ESPACE NUMERIQUE SUD CHARENTE',
    siteWeb: 'https://numeriquesudcharente.org/',
    location: { type: 'Point', coordinates: [0.1316, 45.407] },
    adresse: {
      numeroRue: '3',
      rue: 'AVENUE HENRI DUNANT',
      codePostal: '16190',
      codeCommune: '16230',
      ville: 'MONTMOREAU',
    },
  } as PremanenceConseillerNumerique,
]

const fakeFindConseillerNumeriqueByEmail =
  async (): Promise<ConseillerNumeriqueFound> =>
    Promise.resolve({
      conseiller,
      miseEnRelation,
      permanences,
      conseillersCoordonnes: [conseillerCoordonne],
    })

describe('import from conseiller numerique', () => {
  beforeEach(async () => {
    await deleteAll(prismaClient)
  })

  it('do not do anything when user is not a mediateur', async () => {
    const user: SessionUser = {
      ...testSessionUser,
      checkConseillerNumeriqueInscription: '2024-10-16 21:31:18.358',
    }

    const importedUser = await importFromConseillerNumerique(
      cannotFindConseillerNumeriqueByEmail,
    )({
      user,
      profil: ProfilInscription.ConseillerNumerique,
    })

    expect(importedUser).toStrictEqual(user)
  })

  it('update existing user when user is a mediateur and cannot find matching email in conseiller numerique data', async () => {
    const userCreated = await prismaClient.user.create({
      data: {
        email: 'jean.biche@example.com',
        phone: '0123456789',
        firstName: 'Jean',
        lastName: 'Biche',
        profilInscription: ProfilInscription.ConseillerNumerique,
      },
    })

    const user: SessionUser = {
      ...testSessionUser,
      id: userCreated.id,
    }

    await importFromConseillerNumerique(cannotFindConseillerNumeriqueByEmail)({
      user,
      profil: ProfilInscription.ConseillerNumerique,
    })

    const updatedUser = await prismaClient.user.findUnique({
      where: { id: user.id },
    })

    const mediateur = await prismaClient.mediateur.findUnique({
      where: { userId: user.id },
    })

    expect(updatedUser?.checkConseillerNumeriqueInscription).toBeTruthy()
    expect(updatedUser?.checkCoordinateurInscription).toBeFalsy()
    expect(updatedUser?.profilInscription).toStrictEqual(
      ProfilInscription.Mediateur,
    )
    expect(mediateur).toBeTruthy()
  })

  it('create conseiller for user when we can find a conseiller numérique with matching email in conseiller numerique data', async () => {
    const userCreated = await prismaClient.user.create({
      data: {
        email: 'jean.biche@example.com',
        phone: '0123456789',
        firstName: 'Jean',
        lastName: 'Biche',
        profilInscription: ProfilInscription.ConseillerNumerique,
      },
    })

    const user: SessionUser = {
      ...testSessionUser,
      id: userCreated.id,
    }

    await importFromConseillerNumerique(fakeFindConseillerNumeriqueByEmail)({
      user,
      profil: ProfilInscription.ConseillerNumerique,
    })

    const updatedUser = await prismaClient.user.findUnique({
      where: { id: user.id },
    })

    const mediateur = await prismaClient.mediateur.findUnique({
      where: { userId: user.id },
    })

    const conseillerNumerique =
      await prismaClient.conseillerNumerique.findUnique({
        where: { mediateurId: mediateur?.id },
      })

    const structureEmployeuse = await prismaClient.structure.findFirst({
      where: {
        siret: miseEnRelation.siret,
        nom: miseEnRelation.nom,
      },
    })

    const lieuActivite = await prismaClient.structure.findFirst({
      where: {
        siret: null,
        nom: miseEnRelation.nom,
      },
    })

    const mediateurEnActivite =
      await prismaClient.mediateurEnActivite.findFirst({
        where: { mediateurId: mediateur?.id, structureId: lieuActivite?.id },
      })

    const mediateurCoordonne = await prismaClient.mediateurCoordonne.findFirst({
      where: { mediateurId: mediateur?.id },
    })

    expect(updatedUser?.checkConseillerNumeriqueInscription).toBeTruthy()
    expect(updatedUser?.checkCoordinateurInscription).toBeFalsy()
    expect(updatedUser?.profilInscription).toStrictEqual(
      ProfilInscription.ConseillerNumerique,
    )
    expect(conseillerNumerique).toBeTruthy()
    expect(structureEmployeuse).toBeTruthy()
    expect(lieuActivite).toBeTruthy()
    expect(mediateurEnActivite).toBeTruthy()
    expect(mediateurCoordonne).toBeFalsy()
  })

  it('create conseiller numerique for user and associate with existing coordinateur', async () => {
    const userCoordinateurCreated = await prismaClient.user.create({
      data: {
        email: `${coordinateur.prenom}.${coordinateur.nom}@example.com`,
        firstName: coordinateur.prenom,
        lastName: coordinateur.nom,
        profilInscription: ProfilInscription.Coordinateur,
      },
    })

    const coordinateurCreated = await prismaClient.coordinateur.create({
      data: {
        conseillerNumeriqueId: coordinateur.id.toString(),
        userId: userCoordinateurCreated.id,
      },
    })

    const userCreated = await prismaClient.user.create({
      data: {
        email: 'jean.biche@example.com',
        phone: '0123456789',
        firstName: 'Jean',
        lastName: 'Biche',
        profilInscription: ProfilInscription.ConseillerNumerique,
      },
    })

    const user: SessionUser = {
      ...testSessionUser,
      id: userCreated.id,
      mediateur: {
        id: '1',
        conseillerNumerique: null,
        _count: { enActivite: 1 },
      },
    }

    await importFromConseillerNumerique(fakeFindConseillerNumeriqueByEmail)({
      user,
      profil: ProfilInscription.ConseillerNumerique,
    })

    const mediateur = await prismaClient.mediateur.findUnique({
      where: { userId: user.id },
    })

    const mediateurCoordonne = await prismaClient.mediateurCoordonne.findFirst({
      where: {
        mediateurId: mediateur?.id,
        coordinateurId: coordinateurCreated?.id,
      },
    })

    expect(mediateurCoordonne).toBeTruthy()
  })

  it('create coordinateur for user when we can find a conseiller numérique with matching email in conseiller numerique data', async () => {
    const userConseillerCreated = await prismaClient.user.create({
      data: {
        email: 'jean.biche@example.com',
        phone: '0123456789',
        firstName: 'Jean',
        lastName: 'Biche',
        profilInscription: ProfilInscription.ConseillerNumerique,
      },
    })

    const userCoordinateurCreated = await prismaClient.user.create({
      data: {
        email: `${coordinateur.prenom}.${coordinateur.nom}@example.com`,
        firstName: coordinateur.prenom,
        lastName: coordinateur.nom,
        profilInscription: ProfilInscription.Coordinateur,
      },
    })

    const user: SessionUser = {
      ...testSessionUser,
      id: userCoordinateurCreated.id,
    }

    await prismaClient.conseillerNumerique.create({
      data: {
        id: conseillerCoordonne.id,
        mediateur: {
          connectOrCreate: {
            where: { userId: userConseillerCreated.id },
            create: { userId: userConseillerCreated.id },
          },
        },
      },
    })

    await importFromConseillerNumerique(fakeFindConseillerNumeriqueByEmail)({
      user,
      profil: ProfilInscription.Coordinateur,
    })

    const updatedUser = await prismaClient.user.findUnique({
      where: { id: user.id },
    })

    const coordinateurCreated = await prismaClient.coordinateur.findUnique({
      where: { userId: user.id },
    })

    const structureEmployeuse = await prismaClient.structure.findFirst({
      where: {
        siret: miseEnRelation.siret,
        nom: miseEnRelation.nom,
      },
    })

    const lieuActivite = await prismaClient.structure.findFirst({
      where: {
        siret: null,
        nom: miseEnRelation.nom,
      },
    })

    const mediateurEnActivite =
      await prismaClient.mediateurEnActivite.findFirst({
        where: {
          mediateurId: coordinateurCreated?.id,
          structureId: lieuActivite?.id,
        },
      })

    const mediateurCoordonne = await prismaClient.mediateurCoordonne.findFirst({
      where: { coordinateurId: coordinateurCreated?.id },
    })

    expect(updatedUser?.checkConseillerNumeriqueInscription).toBeFalsy()
    expect(updatedUser?.checkCoordinateurInscription).toBeTruthy()
    expect(updatedUser?.profilInscription).toStrictEqual(
      ProfilInscription.Coordinateur,
    )
    expect(coordinateurCreated).toBeTruthy()
    expect(structureEmployeuse).toBeTruthy()
    expect(lieuActivite).toBeFalsy()
    expect(mediateurEnActivite).toBeFalsy()
    expect(mediateurCoordonne).toBeTruthy()
  })

  it('should assign conseiller numérique role to médiateur', async () => {
    const userCoordinateurCreated = await prismaClient.user.create({
      data: {
        email: `${coordinateur.prenom}.${coordinateur.nom}@example.com`,
        firstName: coordinateur.prenom,
        lastName: coordinateur.nom,
        profilInscription: ProfilInscription.Coordinateur,
      },
    })

    const user: SessionUser = {
      ...testSessionUser,
      id: userCoordinateurCreated.id,
    }

    const userImported = await importFromConseillerNumerique(
      fakeFindConseillerNumeriqueByEmail,
    )({
      user,
      profil: ProfilInscription.Coordinateur,
    })

    await assignConseillerNumeriqueRoleToCoordinateur(
      fakeFindConseillerNumeriqueByEmail,
    )(userImported)

    const updatedUser = await prismaClient.user.findUnique({
      where: { id: user.id },
    })

    const lieuActivite = await prismaClient.structure.findFirst({
      where: {
        siret: null,
        nom: miseEnRelation.nom,
      },
    })

    expect(updatedUser?.checkConseillerNumeriqueInscription).toBeTruthy()
    expect(updatedUser?.checkCoordinateurInscription).toBeTruthy()
    expect(lieuActivite).toBeTruthy()
  })
})

/* eslint-enable */
