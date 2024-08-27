import { notFound, redirect } from 'next/navigation'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { encodeSerializableState } from '@app/web/utils/encodeSerializableState'
import { getCraCollectifDataDefaultValuesFromExisting } from '@app/web/app/coop/mes-activites/cra/collectif/getCraCollectifDataDefaultValuesFromExisting'

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
  const user = await getAuthenticatedMediateur()

  const defaultValues = await getCraCollectifDataDefaultValuesFromExisting({
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
    `/coop/mes-activites/cra/collectif?${retour ? `retour=${retour}&` : ''}v=${encodeSerializableState(defaultValuesWithoutId)}`,
  )

  return null
}

export default DupliquerPage
