import classNames from 'classnames'
import { PropsWithChildren } from 'react'

export const AuthCard = ({ children }: PropsWithChildren) => (
  <main role="main" id="content">
    <div className="fr-grid-row fr-grid-row--center fr-mb-md-12v fr-mt-12v">
      <div
        className={classNames(
          'fr-col-12',
          'fr-col-md-8',
          'fr-col-lg-6',
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
