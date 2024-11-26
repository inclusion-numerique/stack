import { dateFormatter } from '@app/web/utils/formatDate'

// e.g. 02/2023
export const dateAsMonth = dateFormatter('MM/yyyy')

// e.g. février 2023
export const dateAsMonthFull = dateFormatter('MMMM yyyy')
