import { formatInTimeZone } from 'date-fns-tz'
import { dateFormatter } from '@app/web/utils/formatDate'

export const dateAsDayAndTime = dateFormatter("dd/MM/yyyy HH'h'mm")

export const dateAsTime = dateFormatter("HH'h'mm")

export const dateAsDayAndTimeInTimeZone = (date: Date, timezone: string) =>
  formatInTimeZone(date, timezone, "dd/MM/yyyy HH'h'mm")

export const dateAsTimeInTimeZone = (date: Date, timezone: string) =>
  formatInTimeZone(date, timezone, "HH'h'mm")
