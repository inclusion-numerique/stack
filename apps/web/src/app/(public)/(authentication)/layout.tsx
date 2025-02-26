import { PropsWithChildren } from 'react'

const ConnexionLayout = ({ children }: PropsWithChildren) => (
  <div className="fr-flex fr-direction-column fr-background-alt--blue-ecume fr-height-full">
    <div className="fr-container fr-container--narrow fr-mb-20v">
      {children}
    </div>
  </div>
)

export default ConnexionLayout
