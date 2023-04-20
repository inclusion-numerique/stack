import React, { HTMLProps, ReactNode } from 'react'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import classNames from 'classnames'

type CardProps = {
  header?: ReactNode
  footer?: ReactNode
  children?: ReactNode
}

const Card = ({
  header,
  footer,
  children,
  'data-testid': dataTestId,
  className,
  ...rest
}: UiComponentProps & HTMLProps<HTMLDivElement> & CardProps) => (
  <div
    className={classNames('fr-card', className)}
    data-testid={dataTestId}
    {...rest}
  >
    <div className="fr-card__body">
      <div className="fr-card__content">{children}</div>
      {footer ? <div className="fr-card__footer">{footer}</div> : null}
    </div>
    {header ? <div className="fr-card__header">{header}</div> : null}
  </div>
)

export default Card
