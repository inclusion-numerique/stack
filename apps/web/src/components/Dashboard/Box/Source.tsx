import React from 'react'
import Link from 'next/link'
import { dateAsDay } from '@app/web/utils/dateAsDay'

const Source = ({
  date,
  source,
  className,
}: {
  date: Date
  source: string
  className?: string
}) => (
  <div className={className}>
    <p className="fr-hint-text fr-text--xs fr-mb-0 fr-mt-1w">
      Mise à jour le {dateAsDay(date)}
    </p>
    <p className="fr-hint-text fr-text--xs fr-my-0">
      Source :{' '}
      <Link href={`https://${source}`} target="_blank">
        {source}
      </Link>
    </p>
  </div>
)

export default Source
