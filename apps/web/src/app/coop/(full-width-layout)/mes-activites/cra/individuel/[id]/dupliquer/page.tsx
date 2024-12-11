import { notFound, redirect } from 'next/navigation'
import { encodeSerializableState } from '@app/web/utils/encodeSerializableState'
import { getCraIndividuelDataDefaultValuesFromExisting } from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/individuel/getCraIndividuelDataDefaultValuesFromExisting'
import { authenticateMediateur } from '@app/web/auth/authenticateUser'

const DupliquerPage = async ({
  params: { id },
  searchParams: { retour } = {},
}: {
  params: {
    id: string
  }
  searchParams?: {
    retour?: string
  }
}) => {
  const user = await authenticateMediateur()

  const defaultValues = await getCraIndividuelDataDefaultValuesFromExisting({
    id,
    mediateurId: user.mediateur.id,
  })

  if (!defaultValues) {
    notFound()
    return null
  }

  const defaultValuesWithoutId = {
    ...defaultValues,
    id: undefined,
  }

  redirect(
    `/coop/mes-activites/cra/individuel?${retour ? `retour=${retour}&` : ''}v=${encodeSerializableState(defaultValuesWithoutId)}`,
  )

  return null
}

export default DupliquerPage
