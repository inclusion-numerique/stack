import { AuthenticatedConseillerNumerique } from '@app/web/auth/getAuthenticatedConseillerNumerique'
import { getConseillerNumeriqueCras } from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'

export const getArchivesV1PageData = async ({
  user,
}: {
  user: AuthenticatedConseillerNumerique
}) => {
  const {
    mediateur: { conseillerNumerique },
  } = user

  const v1Cras = await getConseillerNumeriqueCras({
    conseillerNumeriqueId: conseillerNumerique.id,
  })

  return {
    v1Cras,
    user,
  }
}

export type ArchivesV1PageData = Awaited<
  ReturnType<typeof getArchivesV1PageData>
>
