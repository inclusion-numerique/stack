import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import {
  dureeAccompagnementParDefautOptions,
  dureeAccompagnementPersonnaliseeTypeOptions,
  dureeAccompagnementPersonnaliseeValue,
} from '@app/web/cra/cra'
import { CraIndividuelData } from '@app/web/cra/CraIndividuelValidation'
import { CraCollectifData } from '@app/web/cra/CraCollectifValidation'
import { CraDemarcheAdministrativeData } from '@app/web/cra/CraDemarcheAdministrativeValidation'

const CraDureeSubForm = ({
  form,
}: {
  form:
    | UseFormReturn<CraIndividuelData>
    | UseFormReturn<CraCollectifData>
    | UseFormReturn<CraDemarcheAdministrativeData>
}) => {
  const { watch, control } = form as UseFormReturn<CraIndividuelData> // cannot union types with react-hook-form

  const dureeData = watch('duree')

  const step = dureeData?.dureePersonnaliseeType === 'minutes' ? 5 : 1
  const max = dureeData?.dureePersonnaliseeType === 'minutes' ? 600 : 20

  const showCustomFields =
    dureeData?.duree === dureeAccompagnementPersonnaliseeValue

  return (
    <>
      <SelectFormField
        label="Durée"
        path="duree.duree"
        control={control}
        options={dureeAccompagnementParDefautOptions}
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
            path="duree.dureePersonnalisee"
            type="number"
            label=" "
            className="fr-flex-basis-0 fr-flex-grow-1"
            min={0}
            max={max}
            step={step}
            classes={{
              label: 'fr-text--medium fr-mb-3v',
              input: 'fr-input--white fr-input--14v',
            }}
          />
          <SelectFormField
            control={control}
            label=" "
            className="fr-flex-basis-0 fr-flex-grow-1"
            path="duree.dureePersonnaliseeType"
            options={dureeAccompagnementPersonnaliseeTypeOptions}
            classes={{
              label: 'fr-text--medium fr-mb-3v',
              select: 'fr-select--white fr-select--14v',
            }}
          />
        </div>
      )}
    </>
  )
}

export default CraDureeSubForm
