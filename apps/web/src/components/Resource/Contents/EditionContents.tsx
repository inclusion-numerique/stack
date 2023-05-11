import { Control } from 'react-hook-form'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { ResourceContent } from '@app/web/server/resources'
import { EditResourceContent } from '@app/web/server/rpc/resource/editContent'
import SectionTitleEdition from './SectionTitleEdition'

export const getEditContent = (
  content: ResourceContent,
  control: Control<EditResourceContent>,
) => {
  switch (content.type) {
    case 'SectionTitle': {
      return <SectionTitleEdition control={control} />
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
