'use client'

import { useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { QuantifiedShare } from '../quantifiedShare'
import { ProgressListItem } from './ProgressListItem'

export const QuantifiedShareList = ({
  quantifiedShares,
  limit,
  colors = [],
}: {
  quantifiedShares: QuantifiedShare[]
  limit?: {
    showLabel: string
    hideLabel: string
    count: number
  }
  colors?: string[]
}) => {
  const [displayFullList, setDisplayFullList] = useState(false)

  const maxProportion = quantifiedShares.reduce(
    (max, quantifiedShare) =>
      quantifiedShare.proportion > max ? quantifiedShare.proportion : max,
    0,
  )

  return (
    <>
      <ul className="fr-px-0">
        {quantifiedShares
          .slice(0, displayFullList && limit != null ? limit.count : undefined)
          .map((item) => (
            <ProgressListItem
              {...item}
              key={item.label}
              colors={colors}
              maxProportion={maxProportion}
            />
          ))}
      </ul>
      {limit && quantifiedShares.length - limit.count > 0 && (
        <Button
          type="button"
          size="small"
          priority="tertiary no outline"
          className="fr-mt-2w"
          onClick={() => setDisplayFullList(!displayFullList)}
        >
          {displayFullList ? (
            <>
              {limit.showLabel} · {quantifiedShares.length - limit.count}
            </>
          ) : (
            limit.hideLabel
          )}
          <span
            className={
              displayFullList
                ? 'fr-ml-1w ri-arrow-down-s-line'
                : 'fr-ml-1w ri-arrow-up-s-line'
            }
            aria-hidden
          />
        </Button>
      )}
    </>
  )
}
