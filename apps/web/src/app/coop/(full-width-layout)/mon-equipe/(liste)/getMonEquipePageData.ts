import { addMonths, format, isAfter, isBefore, subMonths } from 'date-fns'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { getMediateursCount } from '@app/web/mediateurs/getMediateursCount'
import type { AuthenticatedCoordinateur } from '@app/web/auth/getAuthenticatedMediateur'
import { findConseillersNumeriquesContractInfoByEmails } from '@app/web/external-apis/conseiller-numerique/fetchConseillersCoordonnes'
import { mediateurCoordonnesIdsFor } from '@app/web/mediateurs/mediateurCoordonnesIdsFor'
import {
  type MonEquipeSearchParams,
  searchMediateursCordonneBy,
} from './searchMediateursCordonneBy'

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
      contractInfo: { dateFinDeContrat: Date | null } | null
    }[],
  ) => {
    const contractInfo = contracts.find(
      byConseillerNumeriqueId(conseillerNumerique),
    )?.contractInfo

    return contractInfo?.dateFinDeContrat &&
      isBefore(contractInfo.dateFinDeContrat, addMonths(new Date(), 3))
      ? `${format(new Date(contractInfo.dateFinDeContrat), 'dd.MM.yyyy')}`
      : undefined
  }

export const getMonEquipePageData = async ({
  searchParams,
  coordinateur,
}: {
  searchParams: MonEquipeSearchParams
  coordinateur: AuthenticatedCoordinateur['coordinateur']
}) => {
  const { mediateurs, matchesCount, totalPages } =
    await searchMediateursCordonneBy(coordinateur)(searchParams)

  const conseillersNumeriquesWithContrats =
    await findConseillersNumeriquesContractInfoByEmails(
      mediateurs.map(toUserEmail),
    )

  const mediateurCount = await getMediateursCount(
    mediateurCoordonnesIdsFor({ coordinateur }),
  )

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
    matchesCount,
    totalPages,
  }
}

export type MonEquipePageData = Awaited<ReturnType<typeof getMonEquipePageData>>
