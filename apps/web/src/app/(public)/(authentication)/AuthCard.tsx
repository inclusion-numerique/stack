import { PropsWithChildren } from 'react'
import classNames from 'classnames'

export const AuthCard = ({
  children,
  wide,
}: PropsWithChildren<{ wide?: boolean }>) => (
  <main role="main" id="content">
    <div className="fr-grid-row fr-grid-row--center fr-mb-md-12v fr-mt-12v">
      <div
        className={classNames(
          'fr-col-12',
          wide ? 'fr-col-md-10' : 'fr-col-md-8',
          wide ? 'fr-col-lg-8' : 'fr-col-lg-6',
          'fr-background-alt--grey',
          'fr-px-4v',
          'fr-py-4v',
          'fr-p-md-14v',
        )}
      >
        {children}
      </div>
    </div>
  </main>
)
