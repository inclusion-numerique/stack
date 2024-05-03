import type { OpeningHours } from '@app/web/opening-hours/openingHours'
import { openingHoursToOSM } from '@app/web/opening-hours/openingHoursToOsm'

describe('openingHoursToOSM', () => {
  const cases: { case: string; input: OpeningHours; expected: string }[] = [
    {
      case: 'Entire week is closed',
      input: { comment: null, week: 'closed' },
      expected: 'off',
    },
    {
      case: 'Only comment, no week info',
      input: { comment: 'Only a comment', week: null },
      expected: '"Only a comment"',
    },
    {
      case: 'Single day, fully closed',
      input: {
        comment: null,
        week: {
          monday: 'closed',
          tuesday: null,
          wednesday: null,
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
        },
      },
      expected: 'Mo off',
    },
    {
      case: 'Single day, full day open',
      input: {
        comment: null,
        week: {
          monday: {
            morning: { start: '08:00', end: '12:00' },
            afternoon: { start: '13:00', end: '18:00' },
          },
          tuesday: null,
          wednesday: null,
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
        },
      },
      expected: 'Mo 08:00-12:00,13:00-18:00',
    },
    {
      case: 'Multiple grouped days, fully closed',
      input: {
        comment: null,
        week: {
          monday: 'closed',
          tuesday: 'closed',
          wednesday: null,
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
        },
      },
      expected: 'Mo,Tu off',
    },
    {
      case: 'Mixed grouped days and open days',
      input: {
        comment: null,
        week: {
          monday: {
            morning: { start: '09:00', end: '11:00' },
            afternoon: { start: '14:00', end: '16:00' },
          },
          tuesday: 'closed',
          wednesday: {
            morning: { start: '10:00', end: '12:00' },
            afternoon: { start: '15:00', end: '17:00' },
          },
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
        },
      },
      expected: 'Mo 09:00-11:00,14:00-16:00;Tu off;We 10:00-12:00,15:00-17:00',
    },
    {
      case: 'Multiple grouped days and comment',
      input: {
        comment: 'Grouped days comment',
        week: {
          monday: {
            morning: { start: '09:00', end: '11:00' },
            afternoon: { start: '14:00', end: '16:00' },
          },
          tuesday: {
            morning: { start: '09:00', end: '11:00' },
            afternoon: { start: '14:00', end: '16:00' },
          },
          wednesday: 'closed',
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
        },
      },
      expected: 'Mo,Tu 09:00-11:00,14:00-16:00;We off; "Grouped days comment"',
    },
  ]

  test.each(cases)('$case', ({ input, expected }) => {
    const result = openingHoursToOSM(input)
    expect(result).toBe(expected)
  })
})
