/* eslint jsx-a11y/control-has-associated-label: 0  */
import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'

export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle(`Centre d'aide`),
}

const ContentPolicyPage = () => (
  <div className="fr-container">
    <Breadcrumbs currentPage="Centre d'aide" />
    <div className="fr-container landing-main-container fr-my-8w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-md-8">
          <h1>Comment pouvons-nous vous aider ?</h1>
        </div>
      </div>
    </div>
  </div>
)
export default ContentPolicyPage;
