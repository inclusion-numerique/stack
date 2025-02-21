import classNames from 'classnames'
import React, { ReactNode } from 'react'

const InfoLabelValue = ({
  value,
  label,
  labelClassName,
  valueClassName,
}: {
  label: ReactNode
  value: ReactNode
  labelClassName?: string
  valueClassName?: string
}) => (
  <>
    <p className={classNames('fr-text-mention--grey fr-mb-0', labelClassName)}>
      {label}
    </p>
    <p className={classNames('fr-mb-0 fr-text--medium', valueClassName)}>
      {value}
    </p>
  </>
)

export default InfoLabelValue
