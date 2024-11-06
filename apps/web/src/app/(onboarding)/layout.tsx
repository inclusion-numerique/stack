import { PropsWithChildren } from 'react'

const OnboardingLayout = ({ children }: PropsWithChildren) => (
  <div className="fr-layout">
    <div className="fr-layout__inner">{children}</div>
  </div>
)

export default OnboardingLayout
