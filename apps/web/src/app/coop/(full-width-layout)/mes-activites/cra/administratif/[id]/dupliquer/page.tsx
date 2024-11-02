import { notFound, redirect } from 'next/navigation'
import { getCraDemarcheAdministrativeDataDefaultValuesFromExisting } from '@app/web/app/coop/(full-width-layout)/mes-activites/cra/administratif/getCraDemarcheAdministrativeDataDefaultValuesFromExisting'
import { getAuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { encodeSerializableState } from '@app/web/utils/encodeSerializableState'

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

  const defaultValues =
    await getCraDemarcheAdministrativeDataDefaultValuesFromExisting({
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
    `/coop/mes-activites/cra/administratif?${retour ? `retour=${retour}&` : ''}v=${encodeSerializableState(defaultValuesWithoutId)}`,
  )

  return null
}

export default DupliquerPage
