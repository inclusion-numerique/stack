import styles from './CraForm.module.css'

export const craFormFieldsetClassname = (variant?: string) =>
  variant ? `${styles.fieldset} ${variant}` : styles.fieldset
