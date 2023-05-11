import { Control } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { EditResourceContent } from '@app/web/server/rpc/resource/editContent'
import { resourceSectionTitleMaxLength } from '@app/web/server/rpc/resource/utils'

const titleInfo = (title: string | null) =>
  `${title?.length ?? 0}/${resourceSectionTitleMaxLength} caractères`

const SectionTitleEdition = ({
  control,
}: {
  control: Control<EditResourceContent>
}) => (
  <InputFormField
    control={control}
    path="title"
    label="Titre de la section"
    hint="Les titres de sections permettent de créer des ancres afin que les visiteurs se rendent directement sur une position précise de votre ressource."
    info={titleInfo}
  />
)

export default SectionTitleEdition
