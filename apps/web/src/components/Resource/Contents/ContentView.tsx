import Alert from '@codegouvfr/react-dsfr/Alert'
import { ContentProjection } from '@app/web/server/resources/feature/createResourceProjection'
import SectionTitleView from './SectionTitleView'
import TextView from './TextView'

const ContentView = ({ content }: { content: ContentProjection }) => {
  const { type } = content
  switch (type) {
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
          title={`Type de contenu ${type} en cours d'implémentation`}
        />
      )
    }
  }
}

export default ContentView
