import type Prisma from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { formulairesTerminesWhere } from '@app/web/app/(private)/gouvernances/gouvernanceQueryHelpers'
import { generateGouvernanceSelectOptionLabelWithIntention } from '@app/web/app/(private)/gouvernances/departement/[codeDepartement]/gouvernance/GouvernanceSelectOptionLabelWithIntention'
import { getGouvernanceActorCode } from '@app/web/gouvernance/GouvernanceActor'

const getIntention = (
  formulaires: { intention: Prisma.IntentionFormulaireGouvernance | null }[],
): Prisma.IntentionFormulaireGouvernance =>
  formulaires.some(({ intention }) => intention === 'Porter')
    ? 'Porter'
    : 'Participer'

export const getMembresOptions = async ({
  codeDepartement,
  gouvernanceId,
}: {
  codeDepartement: string
  gouvernanceId: string
}) => {
  // Epcis can be in multiple departements / Regions so they are the base for region / departement scopes.

  const epcis = await prismaClient.epci.findMany({
    select: {
      code: true,
      nom: true,
      formulairesGouvernance: {
        select: {
          id: true,
          intention: true,
        },
        where: formulairesTerminesWhere,
      },
      membresGouvernances: {
        select: {
          coporteur: true,
        },
        where: {
          gouvernanceId,
        },
      },
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

  // All departements that have a commune in the epcis except the one we are in
  const departements = await prismaClient.departement.findMany({
    select: {
      code: true,
      nom: true,
      formulairesGouvernance: {
        select: {
          id: true,
          intention: true,
        },
        where: formulairesTerminesWhere,
      },
      membresGouvernances: {
        select: {
          coporteur: true,
        },
        where: {
          gouvernanceId,
        },
      },
    },
    where: {
      code: { not: codeDepartement },
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
      formulairesGouvernance: {
        select: {
          id: true,
          intention: true,
        },
        where: formulairesTerminesWhere,
      },
      membresGouvernances: {
        select: {
          coporteur: true,
        },
        where: {
          gouvernanceId,
        },
      },
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

  // Structures this is wierd ...

  const structures = await prismaClient.formulaireGouvernance.findMany({
    where: {
      ...formulairesTerminesWhere,
      gouvernancePersona: 'structure',
      departementCode: codeDepartement,
    },
    select: {
      id: true,
      siretStructure: true,
      nomStructure: true,
      intention: true,

      membresGouvernance: {
        select: {
          coporteur: true,
        },
        where: {
          gouvernanceId,
        },
      },
    },
  })

  const optionsRegions = regions
    .filter(({ formulairesGouvernance }) => formulairesGouvernance.length > 0)
    .map(({ code, nom, formulairesGouvernance }) => ({
      label: generateGouvernanceSelectOptionLabelWithIntention({
        label: nom,
        intention: getIntention(formulairesGouvernance),
      }),
      stringLabel: nom,
      value: getGouvernanceActorCode({
        type: 'region',
        code,
        formulaireGouvernanceId: formulairesGouvernance.id,
      }),
    }))
  const optionsDepartements = departements
    .filter(({ formulairesGouvernance }) => formulairesGouvernance.length > 0)
    .map(({ code, nom, formulairesGouvernance }) => ({
      label: generateGouvernanceSelectOptionLabelWithIntention({
        label: nom,
        intention: getIntention(formulairesGouvernance),
      }),
      stringLabel: nom,
      value: getGouvernanceActorCode({
        type: 'departement',
        code,
        formulaireGouvernanceId: formulairesGouvernance.id,
      }),
    }))
  const optionsEpcis = epcis
    .filter(({ formulairesGouvernance }) => formulairesGouvernance.length > 0)
    .map(({ code, nom, formulairesGouvernance }) => ({
      label: generateGouvernanceSelectOptionLabelWithIntention({
        label: nom,
        intention: getIntention(formulairesGouvernance),
      }),
      stringLabel: nom,
      value: getGouvernanceActorCode({
        type: 'epci',
        code,
        formulaireGouvernanceId: formulairesGouvernance.id,
      }),
    }))

  // TODO dedupe par siret + departement
  const optionsStructures = structures.map(
    ({ id, siretStructure, nomStructure, intention }) => ({
      label: generateGouvernanceSelectOptionLabelWithIntention({
        label: nomStructure,
        intention,
      }),
      stringLabel: nomStructure ?? siretStructure ?? id,
      value: getGouvernanceActorCode({
        type: 'structure',
        code: siretStructure,
        formulaireGouvernanceId: id,
      }),
    }),
  )

  return [
    { label: 'Conseil régional', options: optionsRegions },
    { label: 'Conseil départemental', options: optionsDepartements },
    { label: 'EPCI', options: optionsEpcis },
    { label: 'Autres', options: optionsStructures },
  ].filter(({ options }) => options.length > 0)
}

export type MembreOptions = Awaited<ReturnType<typeof getMembresOptions>>

export type MembreOptionGroup = MembreOptions[number]

export type MembreOptionItem = MembreOptionGroup['options'][number]

export const getMembreOptionStringLabel = (
  code: string,
  options: MembreOptions,
) =>
  options
    .flatMap(({ options: subOptions }) => subOptions)
    .find(({ value }) => value === code)?.stringLabel ?? ''

export const filterMemberOptions = (
  options: MembreOptions,
  {
    excludeCodes = [],
    onlyCodes = null,
  }: { excludeCodes?: string[]; onlyCodes?: string[] | null },
): MembreOptions =>
  options
    .map(({ label, options: subOptions }) => ({
      label,
      options: subOptions.filter(
        ({ value }) =>
          !excludeCodes.includes(value) &&
          (!onlyCodes || onlyCodes.includes(value)),
      ),
    }))
    .filter(({ options: subOptions }) => subOptions.length > 0)
