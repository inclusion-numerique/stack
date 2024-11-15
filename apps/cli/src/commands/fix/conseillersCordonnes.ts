import { Command } from '@commander-js/extra-typings'
import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import { prismaClient } from '@app/web/prismaClient'

type MongoMediateur = {
  id: string
  emailPro: string | null | undefined
  prenom: string
  nom: string
}

type Mediateur = {
  id?: string
  mediateurId?: string
  coordinateurId?: string
}

const onlyDefined = <T>(coordinateur: T | null): coordinateur is T =>
  coordinateur != null

const matchWith =
  (id?: string) =>
  ({ id: matchId }: { id: string }) =>
    id === matchId

const mediateurCoordonneToDelete =
  ([email, mediateur]: [string, Mediateur]) =>
  (mongoMediateur?: MongoMediateur) =>
    mongoMediateur
      ? {
          coordinateur: {
            id: mediateur.coordinateurId,
            email,
          },
          mediateur: {
            id: mediateur.mediateurId,
            conseillerId: mediateur.id,
            email: mongoMediateur.emailPro,
            prenom: mongoMediateur.prenom,
            nom: mongoMediateur.nom,
          },
        }
      : {
          coordinateur: {
            id: mediateur.coordinateurId,
            email,
          },
          mediateur: {
            conseillerId: mediateur.id,
            mediateurId: mediateur.mediateurId,
          },
        }

/**
 * This command removes the conseillers numériques that should not be linked to a coordinateur
 */
export const conseillersCoordonnes = new Command()
  .command('fix:conseillers-cordonnes')
  .action(async () => {
    const coordinateurs = await prismaClient.coordinateur.findMany({
      where: {
        mediateursCoordonnes: { some: {} },
      },
      select: {
        id: true,
        user: { select: { email: true } },
        mediateursCoordonnes: {
          where: {
            mediateur: { conseillerNumerique: { isNot: null } },
          },
          select: {
            id: true,
            mediateur: { select: { conseillerNumerique: true } },
          },
        },
      },
    })

    const coordinateursMap = new Map(
      coordinateurs.map((coordinateur) => [
        coordinateur.user.email,
        coordinateur.mediateursCoordonnes.map(({ mediateur }) => ({
          id: mediateur.conseillerNumerique?.id,
          mediateurId: mediateur.conseillerNumerique?.mediateurId,
          coordinateurId: coordinateur.id,
        })),
      ]),
    )

    const coordinateursFromMongoMap = await Promise.all(
      coordinateurs.map(({ user: { email } }) =>
        fetchConseillerNumeriqueV1Data({ email }),
      ),
    )
      .then((coordinateursFromMongo) =>
        coordinateursFromMongo.filter(onlyDefined),
      )
      .then(
        (coordinateursFromMongo) =>
          new Map(
            coordinateursFromMongo.map((coordinateur) => [
              coordinateur.conseiller.emailPro,
              coordinateur.conseillersCoordonnes?.map(
                ({ id, emailPro, prenom, nom }) => ({
                  id,
                  emailPro,
                  prenom,
                  nom,
                }),
              ),
            ]),
          ),
      )

    const toDelete = coordinateursMap
      .entries()
      .flatMap(([email, mediateurs]) =>
        mediateurs
          .filter(({ id }) =>
            coordinateursFromMongoMap.get(email)?.some(matchWith(id)),
          )
          .map((mediateur) =>
            mediateurCoordonneToDelete([email, mediateur])(
              coordinateursFromMongoMap
                .get(email)
                ?.find(matchWith(mediateur.id)),
            ),
          ),
      )
      .toArray()

    console.log('--- TO DELETE ---')
    console.log(toDelete)

    await Promise.all(
      toDelete.map(async ({ coordinateur, mediateur }) => {
        console.log('For coordinateur', coordinateur)
        console.log('delete mediateur', mediateur)
        await prismaClient.mediateurCoordonne.deleteMany({
          where: {
            mediateurId: mediateur.id,
            coordinateurId: coordinateur.id,
          },
        })
      }),
    )
  })
