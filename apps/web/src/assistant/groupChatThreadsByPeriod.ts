import type { UserChatThreadsList } from '@app/web/assistant/getChatThread'

const startOfDay = (date: Date): Date => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

const filterByDateRange =
  (from: Date, to?: Date) => (thread: { updated: Date }) =>
    to ? thread.updated >= from && thread.updated < to : thread.updated >= from

// Groupe les messages pour la sidebar
// "Aujourd'hui
// "Hier
// "7 derniers jours"
// "30 derniers jours"
export const groupChatThreadsByPeriod = <
  T extends Pick<UserChatThreadsList[number], 'updated'>,
>(
  chatThreadHistory: T[],
  _internal?: { now: Date }, // for testing only
): {
  period: string
  threads: T[]
}[] => {
  const now = _internal?.now ?? new Date()

  const startOfToday = startOfDay(now)

  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfYesterday.getDate() - 1)

  const startOf7DaysAgo = new Date(startOfToday)
  startOf7DaysAgo.setDate(startOf7DaysAgo.getDate() - 7)

  const startOf30DaysAgo = new Date(startOfToday)
  startOf30DaysAgo.setDate(startOf30DaysAgo.getDate() - 30)

  return [
    {
      period: 'Aujourd’hui',
      threads: chatThreadHistory.filter(filterByDateRange(startOfToday)),
    },
    {
      period: 'Hier',
      threads: chatThreadHistory.filter(
        filterByDateRange(startOfYesterday, startOfToday),
      ),
    },
    {
      period: '7 derniers jours',
      threads: chatThreadHistory.filter(
        filterByDateRange(startOf7DaysAgo, startOfYesterday),
      ),
    },
    {
      period: '30 derniers jours',
      threads: chatThreadHistory.filter(
        filterByDateRange(startOf30DaysAgo, startOf7DaysAgo),
      ),
    },
    {
      period: 'Précédents',
      threads: chatThreadHistory.filter(
        filterByDateRange(new Date(0), startOf30DaysAgo),
      ),
    },
  ].filter(({ threads }) => threads.length > 0)
}
