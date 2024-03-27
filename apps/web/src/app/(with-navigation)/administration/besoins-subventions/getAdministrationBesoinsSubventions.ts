import { stringify } from 'csv-stringify/sync'
import { Decimal } from 'decimal.js'
import type { BesoinSubvention } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { SortDirection } from '@app/web/app/(with-navigation)/administration/SortLink'
import { compareMultiple } from '@app/web/utils/compareMultiple'
import {
  besoinSubventionCategories,
  besoinSubventionLabel,
} from '@app/web/gouvernance/besoinSubvention'
import { getSearchTokens } from '@app/web/app/(with-navigation)/administration/administrationSearch'

export type AdministrationBesoinsSubventionsListSearchParams = {
  recherche?: string
  tri?: 'besoin' | 'actions' | 'montant' | 'categorie'
  ordre?: SortDirection
}

export const getAdministrationBesoinsSubventions = async ({
  codeDepartement,
  recherche,
  tri,
  ordre,
}: {
  codeDepartement?: string
} & AdministrationBesoinsSubventionsListSearchParams) => {
  const demandesRows = await prismaClient.demandeDeSubvention.findMany({
    select: {
      besoins: true,
      subventionDemandee: true,
    },
    where: {
      code: codeDepartement,
    },
  })

  const flattenBesoins = demandesRows.flatMap((demande) =>
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
        category.options.includes(besoin as BesoinSubvention),
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

  const rechercheTokens = getSearchTokens(recherche)

  const besoins = rechercheTokens
    ? [...besoinsMap.values()].filter(({ label, categorie }) => {
        const searchableBesoin = label
          .toLowerCase()
          .normalize('NFD')
          .replaceAll(/[\u0300-\u036F]/g, '')

        const searchableCategory = categorie
          .toLowerCase()
          .normalize('NFD')
          .replaceAll(/[\u0300-\u036F]/g, '')

        return rechercheTokens.some(
          (token) =>
            searchableBesoin.includes(token) ||
            searchableCategory.includes(token),
        )
      })
    : [...besoinsMap.values()]

  const categoriesMap = new Map<
    string,
    { montant: Decimal; actions: number; label: string }
  >(
    Object.values(besoinSubventionCategories).map((categorie) => [
      categorie.adminLabel,
      { montant: new Decimal(0), actions: 0, label: categorie.adminLabel },
    ]),
  )

  for (const besoin of besoins) {
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
    besoins.map(({ categorie }) => categorie),
  )

  const categories = [...categoriesMap.values()]
    .sort((a, b) => a.label.localeCompare(b.label))
    .filter(({ label }) =>
      // If filtered, we hide the category if it has no data in the filtered data
      rechercheTokens ? availableCategoriesInData.has(label) : true,
    )

  const data = besoins.sort((a, b) => {
    const orderMultiplier = ordre === 'desc' ? -1 : 1

    const defaultOrder = a.label.localeCompare(b.label)

    if (tri === 'categorie') {
      return (
        compareMultiple(a.categorie.localeCompare(b.categorie), defaultOrder) *
        orderMultiplier
      )
    }

    if (tri === 'actions') {
      return (
        compareMultiple((a.actions ?? 0) - (b.actions ?? 0), defaultOrder) *
        orderMultiplier
      )
    }

    if (tri === 'montant') {
      return (
        compareMultiple(a.montant.sub(b.montant).toNumber(), defaultOrder) *
        orderMultiplier
      )
    }

    return defaultOrder * orderMultiplier
  })

  const csvData = stringify(
    [
      ['Catégorie', 'Besoin', 'Actions', 'Montant demandé'],
      ...data.map(({ label, actions, montant, categorie }) => [
        categorie,
        label,
        actions,
        montant.toNumber(),
      ]),
    ],
    {
      delimiter: ',',
      record_delimiter: '\r\n', // For Windows compatibility
    },
  )

  return {
    data,
    categories,
    csvData,
  }
}

export type DepartementAdministrationInfo = Awaited<
  ReturnType<typeof getAdministrationBesoinsSubventions>
>
