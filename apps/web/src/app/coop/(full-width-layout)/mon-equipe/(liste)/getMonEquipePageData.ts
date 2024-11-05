import { addMonths, format, isAfter, isBefore, subMonths } from 'date-fns'
import { prismaClient } from '@app/web/prismaClient'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { getMediateursCount } from '@app/web/mediateurs/getMediateursCount'
import { AuthenticatedCoordinateur } from '@app/web/auth/getAuthenticatedMediateur'
import { findConseillersNumeriquesContractInfoByEmails } from '@app/web/external-apis/conseiller-numerique/findConseillerNumeriqueByEmail'

const toId = ({ id }: { id: string }) => id

const statusFor = (activites: { date: Date }[]) => {
  if (activites.length === 0) return 'Inactif'

  const lastActivity = activites[0].date

  return isAfter(lastActivity, subMonths(new Date(), 2))
    ? 'Actif'
    : `Inactif depuis le ${dateAsDay(lastActivity)}`
}

const toUserEmail = ({ user: { email } }: { user: { email: string } }) => email

const byConseillerNumeriqueId =
  (conseillerNumerique: { id: string } | null) =>
  ({ conseillerNumeriqueId }: { conseillerNumeriqueId: string }) =>
    conseillerNumeriqueId === conseillerNumerique?.id

const finDeContratFor =
  (conseillerNumerique: { id: string } | null) =>
  (
    contracts: {
      conseillerNumeriqueId: string
      contractInfo: { dateFinDeContrat?: Date } | null
    }[],
  ) => {
    const contractInfo = contracts.find(
      byConseillerNumeriqueId(conseillerNumerique),
    )?.contractInfo

    return contractInfo?.dateFinDeContrat &&
      isBefore(contractInfo.dateFinDeContrat, addMonths(new Date(), 3))
      ? `Fin de contrat le ${format(new Date(contractInfo.dateFinDeContrat), 'dd.MM.yyyy')}`
      : undefined
  }

export const getMonEquipePageData = async ({
  coordinateur,
}: AuthenticatedCoordinateur) => {
  const mediateurs = await prismaClient.mediateur.findMany({
    where: {
      coordinations: {
        some: { coordinateurId: coordinateur.id },
      },
    },
    select: {
      id: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
      conseillerNumerique: {
        select: { id: true },
      },
      activites: {
        select: { date: true },
        orderBy: { date: 'desc' },
        take: 1,
      },
    },
  })

  const conseillersNumeriquesWithContrats =
    await findConseillersNumeriquesContractInfoByEmails(
      mediateurs.map(toUserEmail),
    )

  const mediateurCount = await getMediateursCount(mediateurs.map(toId))

  return {
    mediateurs: mediateurs.map(({ user, conseillerNumerique, activites }) => ({
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      phone: user.phone ?? undefined,
      email: user.email,
      isConseillerNumerique: conseillerNumerique?.id != null,
      status: statusFor(activites),
      finDeContrat: finDeContratFor(conseillerNumerique)(
        conseillersNumeriquesWithContrats,
      ),
    })),
    stats: {
      total: mediateurCount[0],
      conseillerNumerique: mediateurCount[1],
      mediateurNumerique: mediateurCount[2],
    },
  }
}

export type MonEquipePageData = Awaited<ReturnType<typeof getMonEquipePageData>>
