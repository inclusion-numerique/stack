import { Decimal } from 'decimal.js'
import type { BesoinSubvention } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import {
  besoinSubventionCategories,
  besoinSubventionLabel,
} from '@app/web/gouvernance/besoinSubvention'

export const getAdministrationBesoinsSubventionsData = async () => {
  const rows = await prismaClient.demandeDeSubvention.findMany({
    select: {
      besoins: true,
      subventionDemandee: true,
    },
  })

  const flattenBesoins = rows.flatMap((demande) =>
    demande.besoins.map((besoin) => ({
      besoin,
      subventionDemandee: demande.subventionDemandee,
    })),
  )

  const besoinsMap = new Map<
    BesoinSubvention,
    {
      besoin: BesoinSubvention
      montant: Decimal
      label: string
      actions: number
      categorie: string
    }
  >(
    Object.keys(besoinSubventionLabel).map((besoin) => {
      const categorie = besoinSubventionCategories.find((category) =>
        category.options.includes(besoin as never),
      )

      if (!categorie) {
        throw new Error(
          `Besoin ${besoin} not found in besoinSubventionCategories`,
        )
      }
      return [
        besoin as BesoinSubvention,
        {
          besoin: besoin as BesoinSubvention,
          label: besoinSubventionLabel[besoin as BesoinSubvention],
          montant: new Decimal(0),
          actions: 0,
          categorie: categorie.adminLabel,
        },
      ]
    }),
  )

  for (const { besoin, subventionDemandee } of flattenBesoins) {
    const besoinData = besoinsMap.get(besoin)
    if (!besoinData) {
      throw new Error(`Besoin ${besoin} not found in besoinsMap`)
    }

    besoinsMap.set(besoin, {
      ...besoinData,
      montant: besoinData.montant.add(subventionDemandee),
      actions: besoinData.actions + 1,
    })
  }

  return [...besoinsMap.values()]
}

export type AdministrationBesoinSubventionDataRow = Awaited<
  ReturnType<typeof getAdministrationBesoinsSubventionsData>
>[number]

export const getAdministrationBesoinsSubventionsMetadata = (
  search: string | undefined,
  data: AdministrationBesoinSubventionDataRow[],
) => {
  const montantTotal = data.reduce(
    (accumulator, row) => accumulator.add(row.montant),
    new Decimal(0),
  )

  const actionsTotal = data.reduce(
    (accumulator, row) => accumulator + row.actions,
    0,
  )

  const categoriesMap = new Map<
    string,
    { montant: Decimal; actions: number; label: string }
  >(
    Object.values(besoinSubventionCategories).map((categorie) => [
      categorie.adminLabel,
      { montant: new Decimal(0), actions: 0, label: categorie.adminLabel },
    ]),
  )

  for (const besoin of data) {
    const categorieData = categoriesMap.get(besoin.categorie)
    if (!categorieData) {
      throw new Error(
        `Categorie ${besoin.categorie} not found in categoriesMap`,
      )
    }

    categoriesMap.set(besoin.categorie, {
      ...categorieData,
      montant: categorieData.montant.add(besoin.montant),
      actions: categorieData.actions + besoin.actions,
    })
  }

  const availableCategoriesInData = new Set(
    data.map(({ categorie }) => categorie),
  )

  const categories = [...categoriesMap.values()]
    .sort((a, b) => a.label.localeCompare(b.label))
    .filter(({ label }) =>
      // If filtered, we hide the category if it has no data in the filtered data
      search?.trim() ? availableCategoriesInData.has(label) : true,
    )

  return {
    montantTotal,
    actionsTotal,
    categories,
  }
}
