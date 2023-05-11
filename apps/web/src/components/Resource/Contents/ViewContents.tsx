import Alert from '@codegouvfr/react-dsfr/Alert'
import { ResourceContent } from '@app/web/server/resources'
import SectionTitleView from './SectionTitleView'
import TextView from './TextView'

export const getContent = (content: ResourceContent) => {
  switch (content.type) {
    case 'Text': {
      return <TextView content={content} />
    }
    case 'SectionTitle': {
      return <SectionTitleView content={content} />
    }
    default: {
      return (
        <Alert
          severity="info"
          title={`Type de contenu ${content.type} en cours d'implémentation`}
        />
      )
    }
  }
}
