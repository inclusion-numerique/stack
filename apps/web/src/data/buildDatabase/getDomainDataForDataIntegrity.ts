import { prismaClient } from '@app/web/prismaClient'

export const getDomainDataForDataIntegrity = async () => {
  const formulaires = await prismaClient.formulaireGouvernance.findMany({
    select: {
      id: true,
      communeCode: true,
      departementCode: true,
      epciCode: true,
      regionCode: true,
    },
  })
  const departementsParticipants =
    await prismaClient.departementParticipantFormulaireGouvernance.findMany({
      select: {
        id: true,
        formulaireGouvernanceId: true,
        departementCode: true,
      },
    })
  const epciParticipants =
    await prismaClient.epciParticipantFormulaireGouvernance.findMany({
      select: {
        id: true,
        formulaireGouvernanceId: true,
        epciCode: true,
      },
    })
  const communesParticipantes =
    await prismaClient.communeParticipanteFormulaireGouvernance.findMany({
      select: {
        id: true,
        formulaireGouvernanceId: true,
        communeCode: true,
      },
    })

  return {
    formulaires,
    departementsParticipants,
    epciParticipants,
    communesParticipantes,
  }
}

export type DomainDataForDataIntegrity = Awaited<
  ReturnType<typeof getDomainDataForDataIntegrity>
>
