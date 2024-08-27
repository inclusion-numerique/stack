'use client'

import { ReactNode, useState } from 'react'
import { CalendarProps } from 'react-calendar/src/Calendar'
import classNames from 'classnames'
import FilterTag from '@app/web/components/filters/FilterTag'
import Calendar from '@app/web/components/calendar/Calendar'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export type PeriodFilterCalendarValue = {
  du: Date
  au: Date
}

const valueLabel = (value: PeriodFilterCalendarValue): ReactNode => (
  <>
    {dateAsDay(value.du)}&nbsp;-&nbsp;{dateAsDay(value.au)}
  </>
)

const minDate = new Date('2024-01-01')
const maxDate = new Date()

const FilterCalendar = ({
  defaultValue,
  onChange,
  title,
  value,
}: Pick<CalendarProps, 'onChange' | 'defaultValue' | 'value'> & {
  title: ReactNode
}) => (
  <div
    className={classNames('fr-flex fr-align-items-center fr-direction-column')}
  >
    <h4 className="fr-text--bold fr-text--md fr-mb-2v">{title}</h4>
    <Calendar
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      selectRange={false}
      minDate={minDate}
      maxDate={maxDate}
      minDetail="year"
    />
  </div>
)

export type PeriodFilterValue = {
  du: string // iso day e.g. 2024-01-01
  au: string
}

export type PeriodFilterOnChange = (value: PeriodFilterValue | null) => void

const PeriodFilter = ({
  onChange,
  defaultValue,
}: {
  onChange: PeriodFilterOnChange
  defaultValue?: PeriodFilterValue
}) => {
  const [start, setStart] = useState<Date | null>(
    defaultValue ? new Date(defaultValue.du) : null,
  )
  const [end, setEnd] = useState<Date | null>(
    defaultValue ? new Date(defaultValue.au) : null,
  )

  const onStartChange = (value: Value) => {
    if (Array.isArray(value)) {
      return
    }
    if (!value) {
      return setStart(null)
    }

    if (end && value > end) {
      setEnd(null)
      setStart(value)
      return
    }

    setStart(value)
    if (end) {
      onChange({
        du: dateAsIsoDay(value),
        au: dateAsIsoDay(end),
      })
    }
  }

  const onEndChange = (value: Value) => {
    if (Array.isArray(value)) {
      return
    }
    if (!value) {
      return setEnd(null)
    }

    if (start && value < start) {
      setStart(null)
      setEnd(value)
      return
    }

    setEnd(value)
    if (start) {
      onChange({
        du: dateAsIsoDay(start),
        au: dateAsIsoDay(value),
      })
    }
  }

  const onClear = () => {
    setStart(null)
    setEnd(null)
    onChange(null)
  }

  const tagValue = start && end ? { du: start, au: end } : null

  return (
    <FilterTag
      value={tagValue}
      valueLabel={valueLabel}
      onClear={onClear}
      label="Période"
    >
      <div className="fr-flex fr-flex-gap-4v">
        <FilterCalendar onChange={onStartChange} title="Début" value={start} />
        <FilterCalendar onChange={onEndChange} title="Fin" value={end} />
      </div>
    </FilterTag>
  )
}

export default PeriodFilter
