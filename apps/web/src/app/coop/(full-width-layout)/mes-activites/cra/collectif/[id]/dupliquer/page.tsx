import { notFound, redirect } from 'next/navigation'
import { encodeSerializableState } from '@app/web/utils/encodeSerializableState'
import { getCraCollectifDataDefaultValuesFromExisting } from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/collectif/getCraCollectifDataDefaultValuesFromExisting'
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

  const defaultValues = await getCraCollectifDataDefaultValuesFromExisting({
    id,
    mediateurId: user.mediateur.id,
  })

  if (!defaultValues) {
    notFound()
    return null
  }

  const defaultValuesWithoutIds = {
    ...defaultValues,
    id: undefined,
    participantsAnonymes: defaultValues.participantsAnonymes
      ? {
          ...defaultValues.participantsAnonymes,
          id: undefined,
        }
      : undefined,
  }

  redirect(
    `/coop/mes-activites/cra/collectif?${retour ? `retour=${retour}&` : ''}v=${encodeSerializableState(defaultValuesWithoutIds)}`,
  )

  return null
}

export default DupliquerPage
