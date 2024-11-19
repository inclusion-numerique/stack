import { PropsWithChildren } from 'react'

const ArchivesV1Card = ({ children }: PropsWithChildren) => (
  <div className="fr-border fr-border-radius--8 fr-p-10v fr-flex fr-align-items-center fr-flex-gap-10v fr-flex fr-align-items-center fr-justify-content-center">
    {children}
  </div>
)

export default ArchivesV1Card
