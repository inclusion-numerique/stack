/* eslint no-param-reassign: off */

import { prismaClient } from '@app/web/prismaClient'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

const hideDemonstration = PublicWebAppConfig.isMain

export const getFormulairesEnCoursByDay = async () => {
  const rows = await prismaClient.$queryRawUnsafe<
    {
      creation: Date
      porter: number
      participer: number
    }[]
  >(`
      SELECT DATE_TRUNC('day', creation)                      as creation,
             COUNT(*) FILTER (WHERE intention = 'porter')     as porter,
             COUNT(*) FILTER (WHERE intention = 'participer') as participer
      FROM formulaire_gouvernance
      WHERE confirme_et_envoye IS NULL
        AND annulation IS NULL
          ${hideDemonstration ? 'AND demonstration = false' : ''}
      GROUP BY
          DATE_TRUNC('day', creation)
      ORDER BY
          DATE_TRUNC('day', creation)
  `)

  const originOfTime = {
    creation: new Date('2023-08-01'),
    porter: 0,
    participer: 0,
  }

  const cumulativeRows = rows.map((row, index) => {
    if (index === 0) {
      return row
    }
    row.participer += rows[index - 1].participer
    row.porter += rows[index - 1].porter

    return row
  })

  const today = new Date()
  const lastRow = cumulativeRows.at(-1)
  const todayRow =
    lastRow && lastRow.creation < today
      ? {
          creation: today,
          porter: lastRow.porter,
          participer: lastRow.participer,
        }
      : undefined

  return [originOfTime, ...cumulativeRows, ...(todayRow ? [todayRow] : [])]
}

export const getFormulairesTerminesByDay = async () => {
  const rows = await prismaClient.$queryRawUnsafe<
    {
      confirme: Date
      porter: number
      participer: number
    }[]
  >(`
      SELECT DATE_TRUNC('day', confirme_et_envoye)            as confirme,
             COUNT(*) FILTER (WHERE intention = 'porter')     as porter,
             COUNT(*) FILTER (WHERE intention = 'participer') as participer
      FROM formulaire_gouvernance
      WHERE confirme_et_envoye IS NOT NULL
        AND annulation IS NULL
          ${hideDemonstration ? 'AND demonstration = false' : ''}
      GROUP BY
          DATE_TRUNC('day', confirme_et_envoye)
      ORDER BY
          DATE_TRUNC('day', confirme_et_envoye)
  `)

  const originOfTime = {
    confirme: new Date('2023-08-01'),
    porter: 0,
    participer: 0,
  }

  const cumulativeRows = rows.map((row, index) => {
    if (index === 0) {
      return row
    }
    row.participer += rows[index - 1].participer
    row.porter += rows[index - 1].porter

    return row
  })

  const today = new Date()
  const lastRow = cumulativeRows.at(-1)
  const todayRow =
    lastRow && lastRow.confirme < today
      ? {
          confirme: today,
          porter: lastRow.porter,
          participer: lastRow.participer,
        }
      : undefined

  return [originOfTime, ...cumulativeRows, ...(todayRow ? [todayRow] : [])]
}

export const getGouvernancesByDay = async () => {
  const rows = await prismaClient.$queryRawUnsafe<
    {
      creation: Date
      nombre: number
    }[]
  >(`
      SELECT DATE_TRUNC('day', creation) as creation,
             COUNT(*)                    as nombre
      FROM gouvernances
      WHERE gouvernances.supression IS NULL
      GROUP BY DATE_TRUNC('day', creation)
      ORDER BY DATE_TRUNC('day', creation)
  `)
  const originOfTime = {
    creation: new Date('2023-08-01'),
    nombre: 0,
  }

  const cumulativeRows = rows.map((row, index) => {
    if (index === 0) {
      return row
    }
    row.nombre += rows[index - 1].nombre

    return row
  })

  const today = new Date()
  const lastRow = cumulativeRows.at(-1)
  const todayRow =
    lastRow && lastRow.creation < today
      ? {
          creation: today,
          nombre: lastRow.nombre,
        }
      : undefined

  return [originOfTime, ...cumulativeRows, ...(todayRow ? [todayRow] : [])]
}
