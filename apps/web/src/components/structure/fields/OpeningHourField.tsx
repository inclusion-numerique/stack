import React, { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { OsmDaysOfWeek } from '@gouvfr-anct/timetable-to-osm-opening-hours'
import InputFormField from '@app/ui/components/Form/InputFormField'
import ToggleFormField from '@app/ui/components/Form/ToggleFormField'
import { OpeningHoursData } from '@app/web/app/structure/OpeningHoursValidation'
import { daysTexts, Period, periodsTexts } from './openingHoursHelpers'

export type OpeningHourFieldFormValues = { openingHours: OpeningHoursData }

export const OpeningHourField = <T extends OpeningHourFieldFormValues>({
  day,
  period,
  form: formProperty,
}: {
  day: OsmDaysOfWeek
  period: Period
  form: UseFormReturn<T>
}) => {
  const form =
    formProperty as unknown as UseFormReturn<OpeningHourFieldFormValues>
  const { control, watch, setValue } = form
  const disabled = !watch(`openingHours.${day}.${period}.isOpen`)

  useEffect(() => {
    if (!disabled) return
    setValue(`openingHours.${day}.${period}.startTime`, '')
    setValue(`openingHours.${day}.${period}.endTime`, '')
  }, [disabled, setValue, day, period])

  return (
    <>
      <div className="fr-text--center fr-text-mention--grey fr-text--sm fr-mb-1w">
        <span style={{ textTransform: 'capitalize' }}>{daysTexts[day]}</span>{' '}
        {periodsTexts[period]}
      </div>
      <div
        className={`fr-border fr-border-radius--4 ${disabled && 'fr-background-alt--grey'}`}
      >
        <div className="fr-flex fr-border-bottom">
          <InputFormField
            disabled={disabled}
            labelSrOnly
            label={`Horaire d'ouverture du ${daysTexts[day]} ${periodsTexts[period]}`}
            className="fr-flex-grow-1 fr-border-right fr-m-0"
            classes={{ input: 'fr-input--clear fr-text--center' }}
            type="time"
            control={control}
            path={`openingHours.${day}.${period}.startTime`}
          />
          <InputFormField
            disabled={disabled}
            labelSrOnly
            label={`Horaire de fermeture du ${daysTexts[day]} ${periodsTexts[period]}`}
            className="fr-flex-grow-1 fr-m-0"
            classes={{ input: 'fr-input--clear fr-text--center' }}
            type="time"
            control={control}
            path={`openingHours.${day}.${period}.endTime`}
          />
        </div>
        <div className="fr-px-6w">
          <ToggleFormField
            classes={{ fieldsetElement: 'fr-m-0' }}
            className="fr-m-0"
            label={disabled ? 'Fermé' : 'Ouvert'}
            labelPosition="left"
            checkedLabel={null}
            uncheckedLabel={null}
            control={control}
            path={`openingHours.${day}.${period}.isOpen`}
          />
        </div>
      </div>
    </>
  )
}
