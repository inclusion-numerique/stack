// Define a type to represent explicit "off" status similar to OSM
export type Closed = 'closed'

export type TimeslotTimes = {
  start: string
  end: string
}

export type Timeslot = TimeslotTimes | Closed | null

export type DayOpeningHoursTimes = {
  morning: Timeslot
  afternoon: Timeslot
}

export type DayOpeningHours = DayOpeningHoursTimes | Closed | null

export type WeekOpeningHours = {
  monday: DayOpeningHours
  tuesday: DayOpeningHours
  wednesday: DayOpeningHours
  thursday: DayOpeningHours
  friday: DayOpeningHours
  saturday: DayOpeningHours
  sunday: DayOpeningHours
}

export type OpeningHours = {
  comment: string | null
  week: WeekOpeningHours | Closed | null
}

export type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export const closed: Closed = 'closed'

export const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const satisfies [Day, Day, Day, Day, Day, Day, Day]
