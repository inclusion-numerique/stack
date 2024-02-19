import { prismaClient } from '@app/web/prismaClient'

export const getBesoinsEnIngenierieFinanciereForForm = (
  gouvernanceId: string,
) =>
  prismaClient.gouvernance
    .findUnique({
      where: {
        id: gouvernanceId,
      },
      select: {
        besoinsEnIngenierieFinanciere: true,
      },
    })
    .then((res) => res?.besoinsEnIngenierieFinanciere ?? null)

export type BesoinsEnIngenierieFinanciereForForm = Exclude<
  Awaited<ReturnType<typeof getBesoinsEnIngenierieFinanciereForForm>>,
  null
>
