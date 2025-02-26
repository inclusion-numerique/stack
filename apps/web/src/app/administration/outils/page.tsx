import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Button from '@codegouvfr/react-dsfr/Button'
import DatePickerDownload from './DatePickerDownload'
import Card from '@app/web/components/Card'

export const metadata = {
  title: metadataTitle('Outils administrateur'),
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = () => {
  return (
    <CoopPageContainer>
      <AdministrationBreadcrumbs currentPage="Outils" />
      <AdministrationTitle icon="fr-icon-settings-5-line">
        Outils administrateur
      </AdministrationTitle>

      <div className="fr-container fr-my-8w">
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12">
            <Card title={'Export des accompagnements'}>
              <DatePickerDownload />
            </Card>
          </div>
        </div>
      </div>
    </CoopPageContainer>
  )
}

export default Page
