import { addMonths, format, isAfter, isBefore, subMonths } from 'date-fns'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { getMediateursCount } from '@app/web/mediateurs/getMediateursCount'
import { findConseillersNumeriquesContractInfoByEmails } from '@app/web/external-apis/conseiller-numerique/fetchConseillersCoordonnes'
import { mediateurCoordonnesIdsFor } from '@app/web/mediateurs/mediateurCoordonnesIdsFor'
import {
  type MonEquipeSearchParams,
  searchMediateursCoordonneBy,
} from './searchMediateursCoordonneBy'

const statusFor = (date: Date | null) => {
  if (date == null) return 'Inactif'

  return isAfter(date, subMonths(new Date(), 2))
    ? 'Actif'
    : `Inactif depuis le ${dateAsDay(date)}`
}

const toUserEmail = ({ email }: { email: string }) => email

const byConseillerNumeriqueId =
  (id: string | null) =>
  ({ conseillerNumeriqueId }: { conseillerNumeriqueId: string }) =>
    conseillerNumeriqueId === id

const finDeContratFor =
  (id: string | null) =>
  (
    contracts: {
      conseillerNumeriqueId: string
      contractInfo: { dateFinDeContrat: Date | null } | null
    }[],
  ) => {
    const contractInfo = contracts.find(
      byConseillerNumeriqueId(id),
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
  coordinateur: {
    id: string
    mediateursCoordonnes: { mediateurId: string }[]
  }
}) => {
  const { mediateurs, matchesCount, totalPages } =
    await searchMediateursCoordonneBy(coordinateur)(searchParams)

  const conseillersNumeriquesWithContrats =
    await findConseillersNumeriquesContractInfoByEmails(
      mediateurs.map(toUserEmail),
    )

  const mediateurCount = await getMediateursCount(
    mediateurCoordonnesIdsFor({ coordinateur }),
  )

  return {
    mediateurs: mediateurs.map(
      ({
        mediateur_id,
        email,
        phone,
        first_name,
        last_name,
        conseiller_numerique_id,
        date_derniere_activite,
        type,
      }) => ({
        id: mediateur_id ?? undefined,
        firstName: first_name ?? undefined,
        lastName: last_name ?? undefined,
        phone: phone ?? undefined,
        email,
        isConseillerNumerique: conseiller_numerique_id != null,
        status: statusFor(date_derniere_activite),
        finDeContrat: finDeContratFor(conseiller_numerique_id)(
          conseillersNumeriquesWithContrats,
        ),
        type,
      }),
    ),
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
