import {
  OsmDaysOfWeek,
  toTimetableOpeningHours,
} from '@gouvfr-anct/timetable-to-osm-opening-hours'

export type Period = 'am' | 'pm'

export const daysTexts: Record<OsmDaysOfWeek, string> = {
  Mo: 'lundi',
  Tu: 'mardi',
  We: 'mercredi',
  Th: 'jeudi',
  Fr: 'vendredi',
  Sa: 'samedi',
  Su: 'dimanche',
}

export const indexedDayLabels: Record<number, string> = {
  0: 'Lundi',
  1: 'Mardi',
  2: 'Mercredi',
  3: 'Jeudi',
  4: 'Vendredi',
  5: 'Samedi',
  6: 'Dimanche',
}

export const periodsTexts: Record<Period, string> = {
  am: 'matin',
  pm: 'après-midi',
}

const defaultOpeningHours = {
  am: { startTime: null, endTime: null, isOpen: false },
  pm: { startTime: null, endTime: null, isOpen: false },
}

export const emptyOpeningHours = {
  Mo: defaultOpeningHours,
  Tu: defaultOpeningHours,
  We: defaultOpeningHours,
  Th: defaultOpeningHours,
  Fr: defaultOpeningHours,
  Sa: defaultOpeningHours,
  Su: defaultOpeningHours,
}

export const osmOpeningHoursToOpeningHours = (
  osmOpeningHours?: string | null,
) =>
  osmOpeningHours
    ? toTimetableOpeningHours(new Date())(osmOpeningHours)
    : emptyOpeningHours

export const appendComment = (
  osmOpeningHours: string,
  comment?: string | null,
) =>
  [
    osmOpeningHours,
    ...((comment?.length ?? 0) > 1 ? [`"${comment?.replace('"', "'")}"`] : []),
  ].join(' ')
