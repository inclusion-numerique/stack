'use client'

import { Popover } from '@app/web/components/Popover'
import Calendar from '@app/web/components/calendar/Calendar'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import classNames from 'classnames'
import { formatDate } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'
import { CalendarProps } from 'react-calendar/src/Calendar'
import { FilterFooter } from './elements/FilterFooter'
import TriggerButton from './elements/TriggerButton'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]
export type PeriodFilterValue = { du: string; au: string }

const FilterCalendar = ({
  defaultValue,
  onChange,
  title,
  value,
  maxDate = new Date(),
  minDate = new Date('2024-01-01'),
}: Pick<CalendarProps, 'onChange' | 'defaultValue' | 'value'> & {
  title: ReactNode
  maxDate?: Date
  minDate?: Date
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

export const PeriodeFilter = ({
  minDate,
  defaultValue,
}: {
  minDate?: Date
  defaultValue?: PeriodFilterValue
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const [isOpen, setIsOpen] = useState(false)

  const [start, setStart] = useState<Date | null>(
    defaultValue ? new Date(defaultValue.du) : null,
  )
  const [end, setEnd] = useState<Date | null>(
    defaultValue ? new Date(defaultValue.au) : null,
  )

  useEffect(() => {
    setStart(defaultValue ? new Date(defaultValue.du) : null)
    setEnd(defaultValue ? new Date(defaultValue.au) : null)
  }, [defaultValue])

  const onStartChange = (value: Value) => {
    if (!value || Array.isArray(value)) return setStart(null)

    if (end && value > end) {
      setEnd(null)
      setStart(value)
      return
    }

    setStart(value)
  }

  const onEndChange = (value: Value) => {
    if (!value || Array.isArray(value)) return setStart(null)

    if (start && value < start) {
      setStart(null)
      setEnd(value)
      return
    }

    setEnd(value)
  }

  const closePopover = (close: boolean = false) => {
    close && setIsOpen(false)
    router.replace(`?${params}`, { scroll: false })
  }

  const handleSubmit = (close: boolean = false) => {
    if (start == null || end == null) {
      params.delete('du')
      params.delete('au')
      return
    }

    params.set('du', dateAsIsoDay(start))
    params.set('au', dateAsIsoDay(end))

    closePopover(close)
  }

  const handleClearFilters = () => {
    setStart(null)
    setEnd(null)
    params.delete('du')
    params.delete('au')
    closePopover(true)
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      onInteractOutside={() => handleSubmit()}
      onEscapeKeyDown={() => handleSubmit()}
      trigger={
        <TriggerButton isOpen={isOpen} isFilled={start != null && end != null}>
          {start && end
            ? `${formatDate(start, 'dd.MM.yy')} - ${formatDate(end, 'dd.MM.yy')}`
            : 'Période'}
        </TriggerButton>
      }
    >
      <div className="fr-flex fr-flex-gap-4v">
        <FilterCalendar
          minDate={minDate}
          onChange={onStartChange}
          title="Début"
          value={start}
        />
        <FilterCalendar
          minDate={minDate}
          onChange={onEndChange}
          title="Fin"
          value={end}
        />
      </div>

      {start && end && (
        <form action={() => handleSubmit(true)}>
          <FilterFooter onClearFilters={handleClearFilters} />
        </form>
      )}
    </Popover>
  )
}
