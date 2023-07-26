import { getDataFilePath } from '@app/web/data/dataFiles'
import { parseCsvFileWithMapper } from '@app/web/data/parseCsvFile'

export const CommunesDepartementRegion = {
  url: 'https://www.data.gouv.fr/fr/datasets/communes-de-france-base-des-codes-postaux/',
  updated: '2023-04-17',
  dataFile: 'communes-departement-region.csv',
}

export type CommunesDepartementRegionRow = {
  code_commune_INSEE: string
  nom_commune_postal: string
  code_postal: string
  libelle_acheminement: string
  ligne_5: string
  latitude: string
  longitude: string
  code_commune: string
  article: string | null
  nom_commune: string
  nom_commune_complet: string
  code_departement: string
  nom_departement: string
  code_region: string
  nom_region: string
}

const cleanDepartementCode = (row: CommunesDepartementRegionRow) => {
  // Empty string
  if (!row.code_departement) {
    return null
  }
  if (row.code_departement.length < 2) {
    return row.code_departement.padStart(2, '0')
  }

  if (row.code_departement === '98' || row.code_departement === '97') {
    return row.code_commune_INSEE.slice(0, 3)
  }

  return row.code_departement
}

export const getCommunesDepartementRegion = () =>
  parseCsvFileWithMapper(
    getDataFilePath(CommunesDepartementRegion.dataFile),
    (row: CommunesDepartementRegionRow) => {
      const departementCode = cleanDepartementCode(row)

      return {
        ...row,
        article: row.article === '' ? null : row.article,
        code_commune_INSEE: row.code_commune_INSEE.padStart(5, '0'),
        code_postal: row.code_postal.padStart(5, '0'),
        code_departement: departementCode,

        // Unique missing data for Culey 55138
        latitude:
          row.code_commune_INSEE === '55138'
            ? 48.755_28
            : row.latitude
            ? Number.parseFloat(row.latitude)
            : null,
        longitude:
          row.code_commune_INSEE === '55138'
            ? 5.266_389
            : row.longitude
            ? Number.parseFloat(row.longitude)
            : null,
      }
    },
  ).then((rows) => {
    // We have duplicates on INSEE codes (lieux-dits, same commune), so we need to filter them out
    const seen = new Set<string>()
    return rows.filter((row) => {
      // Remove monaco
      if (row.code_commune_INSEE === '99138') {
        return false
      }

      if (seen.has(row.code_commune_INSEE)) {
        return false
      }
      seen.add(row.code_commune_INSEE)
      return true
    })
  })
