'use client'

import classNames from 'classnames'
import { motion } from 'framer-motion'

const ProgressBar = ({
  progress = [],
  displayProgress = false,
  min = 0,
  max = 100,
  size = 'medium',
  colors = [],
  className,
}: {
  progress?: { value: number; label: string }[]
  displayProgress?: boolean
  min?: number
  max?: number
  size?: 'medium' | 'small' | 'large'
  colors?: string[]
  className?: string
}) => (
  <span
    className={classNames(
      className,
      progress.length > 1 && 'fr-progress-stacked',
      size === 'small' && 'fr-progress--sm',
      size === 'large' && 'fr-progress--lg',
    )}
  >
    {progress.map(({ value, label }, index) => (
      <motion.span
        key={label}
        className={classNames(
          'fr-progress',
          size === 'small' && 'fr-progress--sm',
          size === 'large' && 'fr-progress--lg',
        )}
        role="progressbar"
        aria-label={label}
        aria-valuenow={value ?? 0}
        aria-valuemin={min}
        aria-valuemax={max}
        animate={
          progress.length > 1
            ? { width: `${value ?? 0}%`, transition: { duration: 0.2 } }
            : {}
        }
      >
        <motion.span
          className={`fr-progress__bar ${colors[index % colors.length]}`}
          style={{
            backgroundColor:
              colors.length > 0
                ? colors[index % colors.length]
                : 'var(--background-active-blue-france)',
          }}
          animate={
            progress.length === 1
              ? { width: `${value ?? 0}%`, transition: { duration: 0.2 } }
              : {}
          }
        >
          {displayProgress && `${value ?? 0}%`}
        </motion.span>
      </motion.span>
    ))}
  </span>
)

export default ProgressBar
