import InputFormField, {
  type InputFormFieldProps,
} from '@app/ui/components/Form/InputFormField'
import type { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import classNames from 'classnames'
import { type RefObject, useRef } from 'react'
import type { FieldValues } from 'react-hook-form'
import styles from './PlusMinusNumberFormField.module.css'

const getInputFromRef = (
  ref: RefObject<HTMLDivElement>,
): HTMLInputElement | undefined =>
  ref.current?.querySelector('input') ?? undefined

const PlusMinusNumberFormField = <T extends FieldValues = FieldValues>({
  classes,
  className,
  step,
  ...props
}: Omit<UiComponentProps & InputFormFieldProps<T>, 'type'>) => {
  const ref = useRef<HTMLDivElement>(null)

  const onPlus = () => {
    const input = getInputFromRef(ref)
    if (!input) {
      return
    }

    input.stepUp()
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }

  const onMinus = () => {
    const input = getInputFromRef(ref)
    if (!input) {
      return
    }

    input.stepDown()
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }

  return (
    <div className={styles.container} ref={ref}>
      <InputFormField
        {...props}
        type="number"
        step={step ?? 1}
        className={classNames(styles.inputContainer, className)}
        classes={{
          ...classes,
          label: classNames('fr-text--sm', styles.label, classes?.label),
          input: classNames(styles.input, classes?.input),
        }}
      />
      <button
        className={classNames(
          'fr-icon-add-line fr-text-title--blue-france',
          styles.button,
          styles.plus,
        )}
        onClick={onPlus}
        type="button"
        disabled={props.disabled}
        tabIndex={-1}
      />
      <button
        className={classNames(
          'fr-icon-subtract-line  fr-text-title--blue-france',
          styles.button,
          styles.minus,
        )}
        onClick={onMinus}
        type="button"
        disabled={props.disabled}
        tabIndex={-1}
      />
    </div>
  )
}

export default PlusMinusNumberFormField
