import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import AssistantParametresForm from '@app/web/app/assistant/parametres/AssistantParametresForm'
import type { AssistantParametresPageData } from '@app/web/app/assistant/parametres/getAssistantParametresPageData'
import { assistantConfigurationDefaultValuesFromModel } from '@app/web/assistant/configuration/AssistantConfigurationValidation'
import Breadcrumbs from '@app/web/components/Breadcrumbs'

const AssistantParametresPage = ({
  data,
}: {
  data: AssistantParametresPageData
}) => (
  <div className="fr-container fr-container--800">
    <Breadcrumbs
      currentPage="Paramètres"
      homeLinkHref="/"
      parents={[{ label: 'Assistant', linkProps: { href: '/assistant' } }]}
      className="fr-mb-4v"
    />
    <AdministrationTitle icon="fr-icon-settings-5-line">
      Paramètres de l’assistant
    </AdministrationTitle>
    <AssistantParametresForm
      defaultValues={assistantConfigurationDefaultValuesFromModel(data)}
      defaultConfiguration={data.defaultConfiguration}
    />
  </div>
)

export default AssistantParametresPage
