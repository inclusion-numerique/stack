import { groupChatThreadsByPeriod } from '@app/web/assistant/groupChatThreadsByPeriod'

describe('groupChatThreadsByPeriod', () => {
  it('should group chat threads by period', () => {
    const now = new Date('2024-01-10T12:00:00.000Z')

    const chatThreadHistory = [
      {
        id: '1',
        updated: new Date('2024-01-10T10:00:00.000Z'), // Today
      },
      {
        id: '2',
        updated: new Date('2024-01-09T12:00:00.000Z'), // Yesterday
      },
      {
        id: '3',
        updated: new Date('2024-01-05T12:00:00.000Z'), // Within 7 days
      },
      {
        id: '4',
        updated: new Date('2024-01-01T12:00:00.000Z'), // Within 30 days
      },
      {
        id: '5',
        updated: new Date('2023-12-01T12:00:00.000Z'), // Previous
      },
    ] satisfies { updated: Date; id: string }[]

    const grouped = groupChatThreadsByPeriod(chatThreadHistory, { now })

    expect(grouped).toEqual([
      {
        period: 'Aujourd’hui',
        threads: [chatThreadHistory[0]],
      },
      {
        period: 'Hier',
        threads: [chatThreadHistory[1]],
      },
      {
        period: '7 derniers jours',
        threads: [chatThreadHistory[2]],
      },
      {
        period: '30 derniers jours',
        threads: [chatThreadHistory[3]],
      },
      {
        period: 'Précédents',
        threads: [chatThreadHistory[4]],
      },
    ])
  })
})
