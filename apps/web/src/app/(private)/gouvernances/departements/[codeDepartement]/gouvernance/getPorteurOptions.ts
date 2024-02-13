import { prismaClient } from '@app/web/prismaClient'
import { getPorteurCode } from '@app/web/gouvernance/GouvernancePressentie'

export const getPorteurOptions = async (codeDepartement: string) => {
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

  // All departements that have a commune in the epcis
  const departements = await prismaClient.departement.findMany({
    select: {
      code: true,
      nom: true,
    },
    where: {
      OR: [
        {
          communes: {
            some: {
              epci: {
                code: {
                  in: epcis.map((epci) => epci.code),
                },
              },
            },
          },
        },
        {
          code: codeDepartement,
        },
      ],
    },
  })

  // All regions that have a departement in the epcis
  const regions = await prismaClient.region.findMany({
    select: {
      code: true,
      nom: true,
    },
    where: {
      departements: {
        some: {
          code: {
            in: departements.map((departement) => departement.code),
          },
        },
      },
    },
  })

  const optionsRegions = regions.map(({ code, nom }) => ({
    label: nom,
    value: getPorteurCode('region', code),
  }))
  const optionsDepartements = departements.map(({ code, nom }) => ({
    label: `${nom} (${code})`,
    value: getPorteurCode('departement', code),
  }))
  const optionsEpcis = epcis.map(({ code, nom }) => ({
    label: nom,
    value: getPorteurCode('epci', code),
  }))

  return [
    { label: 'Conseil régional', options: optionsRegions },
    { label: 'Conseil départemental', options: optionsDepartements },
    { label: 'EPCI', options: optionsEpcis },
  ]
}
