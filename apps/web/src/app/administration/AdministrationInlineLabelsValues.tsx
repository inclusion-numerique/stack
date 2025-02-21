import { Fragment, ReactNode } from 'react'

import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import classNames from 'classnames'
import styles from './AdministrationInlineLabelsValues.module.css'

export type LabelAndValue = {
  label: ReactNode
  value: ReactNode
}

const AdministrationInlineLabelsValues = ({
  items,
  className,
}: {
  items: (LabelAndValue | undefined | null)[]
  className?: string
}) => (
  <div className={classNames(styles.grid, className)}>
    {items.filter(onlyDefinedAndNotNull).map(({ label, value }, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        <p className="fr-text--sm fr-mb-0">
          <strong>{label}&nbsp;:</strong>
        </p>
        <div>{value}</div>
      </Fragment>
    ))}
  </div>
)

export default AdministrationInlineLabelsValues
