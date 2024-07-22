import classNames from 'classnames'
import type { FieldValues } from 'react-hook-form'
import type { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import InputFormField, {
  type InputFormFieldProps,
} from '@app/ui/components/Form/InputFormField'
import styles from './OneLineIntegerWithPlusAndMinusFormField.module.css'

const OneLineIntegerWithPlusAndMinusFormField = <
  T extends FieldValues = FieldValues,
>({
  classes,
  className,
  ...props
}: Omit<UiComponentProps & InputFormFieldProps<T>, 'type' | 'step'>) => (
  // TODO plus and minus buttons following this guide (removing native ones and adding buttons)
  // https://stackoverflow.com/questions/45396280/customizing-increment-arrows-on-input-of-type-number-using-css
  <InputFormField
    {...props}
    type="number"
    step={1}
    className={classNames(styles.container, className)}
    classes={{
      ...classes,
      label: classNames('fr-text--sm', styles.label, classes?.label),
      input: classNames(styles.input, classes?.input),
    }}
  />
)

export default OneLineIntegerWithPlusAndMinusFormField
