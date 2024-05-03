import type {
  Day,
  DayOpeningHours,
  OpeningHours,
  Timeslot,
  WeekOpeningHours,
} from '@app/web/opening-hours/openingHours'

const osmDaysToWeekDays = {
  Mo: 'monday',
  Tu: 'tuesday',
  We: 'wednesday',
  Th: 'thursday',
  Fr: 'friday',
  Sa: 'saturday',
  Su: 'sunday',
} satisfies { [key: string]: Day }

const timeslotToOSM = (slot: Timeslot): string | null => {
  if (slot === 'closed') return 'off'
  if (slot && 'start' in slot && 'end' in slot)
    return `${slot.start}-${slot.end}`
  return null
}

const dayOpeningHoursToOSM = (day: DayOpeningHours): string | null => {
  if (day === 'closed') return 'off'
  if (!day) return null

  const morning = timeslotToOSM(day.morning)
  const afternoon = timeslotToOSM(day.afternoon)

  if (morning && afternoon) return `${morning},${afternoon}`
  return morning ?? afternoon
}

const groupDaysByOpeningHours = (
  week: WeekOpeningHours,
): Map<string, string[]> => {
  const dayMap = new Map<string, string[]>()

  for (const [osmDay, weekDay] of Object.entries(osmDaysToWeekDays)) {
    const openingHours = dayOpeningHoursToOSM(week[weekDay])
    if (openingHours) {
      const existingEntry = [...dayMap.entries()].find(
        ([openingHoursKey]) => openingHoursKey === openingHours,
      )
      if (existingEntry) {
        existingEntry[1].push(osmDay)
      } else {
        dayMap.set(openingHours, [osmDay])
      }
    }
  }

  return dayMap
}

const weekOpeningHoursToOSM = (week: WeekOpeningHours): string => {
  const groupedDays = groupDaysByOpeningHours(week)

  return [...groupedDays.entries()]
    .map(([openingHours, days]) => `${days.join(',')} ${openingHours}`)
    .join(';')
}

export const openingHoursToOSM = (openingHours: OpeningHours): string => {
  if (openingHours.week === 'closed') return 'off'

  const weekOSM = openingHours.week
    ? weekOpeningHoursToOSM(openingHours.week)
    : ''
  const comment = openingHours.comment
    ? // Including space before comment is best practice for osm readability
      `${weekOSM ? ' ' : ''}"${openingHours.comment}"`
    : ''
  return [weekOSM, comment].filter(Boolean).join(';')
}
