/* eslint jsx-a11y/no-noninteractive-tabindex : off */

import { SelectOption } from '@app/ui/components/Form/utils/options'
import classNames from 'classnames'

import { Fragment, KeyboardEventHandler, memo } from 'react'
import Stars from '@app/web/components/Stars'
import styles from './RichCardLabel.module.css'

export type RichCardOptionExtras = {
  illustration?: string
  stars?: number
  tooltips?: string[]
}

export type RichCardOption<T extends string> = SelectOption<
  T,
  RichCardOptionExtras
>

export const richCardFieldsetElementClassName = styles.fieldsetElement

export const richCardRadioGroupClassName = styles.radioGroup

const RichCardLabel = memo(
  <T extends string>({
    option,
    htmlFor,
    className,
    paddingX = 24,
    paddingRight,
  }: {
    option: RichCardOption<T>
    className?: string
    htmlFor: string
    paddingX?: 16 | 24
    paddingRight?: 16 | 24
  }) => {
    const tooltipId = `${htmlFor}-tooltip`
    const hintsTooltip = option.extra?.tooltips ? (
      <div className={styles.tooltipContainer}>
        <button
          type="button"
          className="fr-btn--tooltip fr-btn"
          aria-describedby={tooltipId}
        >
          Information
        </button>
        <span
          className="fr-tooltip fr-placement"
          id={tooltipId}
          role="tooltip"
          aria-hidden="true"
        >
          {option.extra.tooltips.map((tooltipContent) => (
            <Fragment key={tooltipContent}>
              {tooltipContent}
              <br />
            </Fragment>
          ))}
        </span>
      </div>
    ) : null

    const handleKeyPress: KeyboardEventHandler = (event) => {
      if (event.key === ' ' && event.target instanceof HTMLLabelElement) {
        event.preventDefault()
        const inputElement = document.getElementById(htmlFor)
        if (inputElement) {
          inputElement.click()
        }
      }
    }

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <label
        htmlFor={htmlFor}
        className={classNames(
          'fr-border-radius--4 fr-border',
          styles.label,
          paddingX === 16 ? styles.paddingX16 : styles.paddingX24,
          paddingRight
            ? paddingRight === 16
              ? styles.paddingRight16
              : styles.paddingRight24
            : null,
          className,
        )}
        tabIndex={0}
        onKeyDown={handleKeyPress}
      >
        <div className="fr-flex fr-justify-content-space-between fr-flex-gap-4v fr-width-full fr-height-full">
          <div className="fr-text--sm fr-mb-0 fr-text--medium fr-flex-grow-1 fr-flex fr-justify-content-center fr-direction-column">
            {typeof option.extra?.stars === 'number' && (
              <Stars count={option.extra.stars} className="fr-mb-1v" />
            )}
            {option.label}
            {!!option.hint && (
              <>
                <br />
                <span className="fr-text--xs fr-mb-0 fr-text--regular fr-text-mention--grey fr-flex-grow-1">
                  {option.hint}
                </span>{' '}
              </>
            )}
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          {!!option.extra?.illustration && (
            <div
              className={classNames(
                'fr-flex-shrink-0 fr-flex fr-align-items-center',
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.illustration}
                alt=""
                src={option.extra.illustration}
              />
            </div>
          )}
        </div>
        {hintsTooltip}
      </label>
    )
  },
)
RichCardLabel.displayName = 'RichCardLabel'

export default RichCardLabel
