import { dateFormatter } from '@app/web/utils/formatDate'

// date-fn date -> Ven. 22 Mars 2024 (in french)
const activiteDayDateFormatter = dateFormatter('EEE d MMMM yyyy')

export const formatActiviteDayDate = (date: Date | string) =>
  activiteDayDateFormatter(typeof date === 'string' ? new Date(date) : date)
