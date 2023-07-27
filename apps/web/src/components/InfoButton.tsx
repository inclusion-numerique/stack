import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import { ButtonProps } from '@codegouvfr/react-dsfr/src/Button'
import classNames from 'classnames'
import styles from './InfoButton.module.css'

const InfoButton = ({
  className,
  ...buttonProps
}: Exclude<
  ButtonProps.Common & ButtonProps.IconOnly & ButtonProps.AsButton,
  'priority' | 'size' | 'type'
>) => (
  <Button
    priority="tertiary no outline"
    size="small"
    type="button"
    className={classNames(styles.infoButton, className)}
    {...buttonProps}
  />
)

export default InfoButton
