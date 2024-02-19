import DonneesDepartementSelectInput from '@app/web/app/(public)/donnees/DonneesDepartementSelectInput'
import { getDepartementOptions } from '@app/web/data/getDepartementOptions'

const DonneesDepartementSelect = async ({
  defaultDepartementCode,
}: {
  defaultDepartementCode?: string
}) => {
  const departementOptions = await getDepartementOptions()

  return (
    <DonneesDepartementSelectInput
      optionsDepartements={departementOptions}
      defaultDepartementCode={defaultDepartementCode}
    />
  )
}

export default DonneesDepartementSelect
