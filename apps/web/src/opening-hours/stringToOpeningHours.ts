import Oh from 'opening_hours'

import {
  type Closed,
  type DayOpeningHours,
  type OpeningHours,
  type Timeslot,
  type WeekOpeningHours,
  closed,
  days,
} from '@app/web/opening-hours/openingHours'

const toOpeningHoursObject = (input: string | null) => {
  if (!input) return null

  // The lib will throw if no valid osm input is given
  try {
    return new Oh(input)
  } catch {
    return null
  }
}

const convertIntervalsToDayOpeningHours = (
  intervals: [Date, Date, boolean, string | undefined][],
): DayOpeningHours | Closed => {
  // Check for 'off' or empty intervals
  if (intervals.length === 0) return null

  const result: DayOpeningHours = { morning: null, afternoon: null }

  for (const [start, end, , state] of intervals) {
    // Check for explicit 'off'
    if (state === 'off') {
      if (start.getHours() < 12) {
        result.morning = closed
      } else {
        result.afternoon = closed
      }
      continue
    }

    const timeslot: Timeslot = {
      start: start.toTimeString().slice(0, 5), // Extracts 'HH:MM'
      end: end.toTimeString().slice(0, 5),
    }

    if (start.getHours() < 12) {
      result.morning = timeslot
    } else {
      result.afternoon = timeslot
    }
  }

  // Consider a day closed if both morning and afternoon are explicitly 'closed'
  if (result.morning === closed && result.afternoon === closed) {
    return closed
  }

  return result
}

const osmToWeekOpeningHours = (input: Oh): WeekOpeningHours => {
  const thisMonday = new Date()
  thisMonday.setDate(
    thisMonday.getDate() -
      thisMonday.getDay() +
      (thisMonday.getDay() === 0 ? -6 : 1),
  )
  thisMonday.setHours(0, 0, 0, 0)

  const week: WeekOpeningHours = {
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null,
  }

  for (const [dayIndex, day] of days.entries()) {
    const startDate = new Date(thisMonday)
    startDate.setDate(thisMonday.getDate() + dayIndex)
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + 1)

    const intervals = input.getOpenIntervals(startDate, endDate)

    week[day as keyof WeekOpeningHours] =
      convertIntervalsToDayOpeningHours(intervals) ?? null
  }

  return week
}

export const stringToOpeningHours = (
  input: string | null,
): OpeningHours & { parser: string } => {
  if (!input || input.trim().length === 0) {
    return {
      comment: null,
      week: null,
      parser: 'na',
    }
  }

  const oh = toOpeningHoursObject(input)

  if (!oh) {
    // TODO we will use carto's algo to best guess OH format
    // From https://github.com/anct-cartographie-nationale/mednum-cli/blob/main/src/transformer/fields/horaires/opening-hours-from-week.ts
    // use openingHoursFromWeek()

    return {
      comment: input,
      week: null,
      parser: 'na',
    }
  }

  return {
    comment: oh.getComment() ?? null,
    week: osmToWeekOpeningHours(oh),
    parser: 'oh',
  }
}
