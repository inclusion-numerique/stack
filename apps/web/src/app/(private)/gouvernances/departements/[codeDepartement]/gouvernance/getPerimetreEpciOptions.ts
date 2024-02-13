import { prismaClient } from '@app/web/prismaClient'

export const getPerimetreEpciOptions = async (codeDepartement: string) => {
  // Epcis can be in multiple departements / Regions so they are the base for region / departement scopes.

  const epcis = await prismaClient.epci.findMany({
    select: {
      code: true,
      nom: true,
    },
    where: {
      communes: {
        some: {
          departement: {
            code: codeDepartement,
          },
        },
      },
    },
  })

  const optionsEpcis = epcis.map(({ code, nom }) => ({
    name: nom,
    value: code,
  }))

  return optionsEpcis
}
