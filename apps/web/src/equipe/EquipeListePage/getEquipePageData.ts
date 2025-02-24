import { findConseillersNumeriquesContractInfoByEmails } from '@app/web/external-apis/conseiller-numerique/fetchConseillersCoordonnes'
import { countMediateursCoordonnesBy } from '@app/web/mediateurs/countMediateursCoordonnesBy'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { addMonths, format, isAfter, isBefore, subMonths } from 'date-fns'
import {
  type EquipeSearchParams,
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

export const getEquipePageData = async ({
  searchParams,
  anciensMembres = false,
  coordinateur,
}: {
  searchParams: EquipeSearchParams
  anciensMembres?: boolean
  coordinateur: {
    id: string
    mediateursCoordonnes: { mediateurId: string }[]
  }
}) => {
  const { mediateurs, matchesCount, totalPages } =
    await searchMediateursCoordonneBy(coordinateur)(
      searchParams,
      anciensMembres,
    )

  const conseillersNumeriquesWithContrats =
    await findConseillersNumeriquesContractInfoByEmails(
      mediateurs.map(toUserEmail),
    )

  const stats = await countMediateursCoordonnesBy(coordinateur)

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
        suppression,
        type,
      }) => ({
        id: mediateur_id ?? undefined,
        firstName: first_name ?? undefined,
        lastName: last_name ?? undefined,
        phone: phone ?? undefined,
        email,
        isConseillerNumerique: conseiller_numerique_id != null,
        status:
          suppression == null
            ? statusFor(date_derniere_activite)
            : `Ancien membre depuis le ${dateAsDay(suppression)}`,
        finDeContrat: finDeContratFor(conseiller_numerique_id)(
          conseillersNumeriquesWithContrats,
        ),
        type,
      }),
    ),
    stats,
    matchesCount,
    totalPages,
  }
}

export type MonEquipePageData = Awaited<ReturnType<typeof getEquipePageData>>
