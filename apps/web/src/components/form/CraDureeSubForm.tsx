import type { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import classNames from 'classnames'
import { dureeAccompagnementPersonnaliseeValue } from '@app/web/cra/cra'
import type { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import type { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import type { CraDemarcheAdministrativeData } from '@app/web/cra/CraDemarcheAdministrativeValidation'
import { maxHeures, maxMinutes } from '@app/web/cra/CraDureeValidation'
import styles from './CraDureeSubForm.module.css'

const step = 1
const min = 0

const CraDureeSubForm = ({
  form,
  dureeOptions,
}: {
  form:
    | UseFormReturn<CraIndividuelData>
    | UseFormReturn<CraCollectifData>
    | UseFormReturn<CraDemarcheAdministrativeData>
  dureeOptions: SelectOption[]
}) => {
  const { watch, control } = form as UseFormReturn<CraIndividuelData> // cannot union types with react-hook-form

  const dureeData = watch('duree')

  const showCustomFields =
    dureeData?.duree === dureeAccompagnementPersonnaliseeValue

  return (
    <>
      <SelectFormField
        label="Durée"
        path="duree.duree"
        control={control}
        options={dureeOptions}
        placeholder="Sélectionnez une durée"
        asterisk
        className="fr-mb-1v"
        classes={{
          label: 'fr-text--medium fr-mb-3v',
          select: 'fr-select--white fr-select--14v',
        }}
      />
      {showCustomFields && (
        <div className="fr-flex fr-flex-gap-4v">
          <InputFormField
            control={control}
            path="duree.dureePersonnaliseeHeures"
            type="number"
            label=" "
            className={classNames(
              'fr-flex-basis-0 fr-flex-grow-1',
              styles.hours,
            )}
            min={min}
            max={maxHeures}
            step={step}
            classes={{
              label: 'fr-text--medium fr-mb-3v',
              input: 'fr-input--white fr-input--14v',
            }}
          />
          <InputFormField
            control={control}
            path="duree.dureePersonnaliseeMinutes"
            type="number"
            label=" "
            className={classNames(
              'fr-flex-basis-0 fr-flex-grow-1',
              styles.minutes,
            )}
            min={min}
            max={maxMinutes}
            step={step}
            classes={{
              label: 'fr-text--medium fr-mb-3v',
              input: 'fr-input--white fr-input--14v',
            }}
          />
        </div>
      )}
    </>
  )
}

export default CraDureeSubForm
