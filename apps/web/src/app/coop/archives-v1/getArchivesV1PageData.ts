import { getConseillerNumeriqueCras } from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'

export const getArchivesV1PageData = async ({
  conseillerNumeriqueId,
}: {
  conseillerNumeriqueId: string
}) => {
  const v1Cras = await getConseillerNumeriqueCras({
    conseillerNumeriqueId,
  })

  return {
    v1Cras,
    conseillerNumeriqueId,
  }
}

export type ArchivesV1PageData = Awaited<
  ReturnType<typeof getArchivesV1PageData>
>
