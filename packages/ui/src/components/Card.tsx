import { forwardRef, PropsWithChildren, ReactNode } from 'react'
import { UiComponentProps } from '@stack/ui/utils/uiComponentProps'


const CardFooter = ({ children }: PropsWithChildren) => <div className='fr-card__footer'>
  {children}
</div>

export type CardProps = {
  card?: string,
}

export const Card = {
                       classNames,
                       'data-testid': dataTestId,
                       header,
                       children,
  footer,
                     }: PropsWithChildren<UiComponentProps & { classNames?: CardClassNames, header?: ReactNode, content?: ReactNode, footer?: ReactNode }>) =>
  <div
    className={`${className ?? ''} fr-card`}
    data-testid={dataTestId}>
    <div className='fr-card__body'>
      <div className='fr-card__content'>{children}
      </div>
      {footer ?
        <div className='fr-card__footer'>
          {footer}
        </div> : null}
    </div>
    {header ?
      <div className='fr-card__header'>
        {header}
      </div>
      : null}
  </div>

