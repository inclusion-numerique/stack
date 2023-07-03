import { createReadStream } from 'node:fs'
import neatCsv from 'neat-csv'
import { getDataFilePath } from '@app/web/data/dataFiles'
import { mapStructuresBySiret } from '@app/web/data/siret'

export const CnfsStructures = {
  url: 'https://www.data.gouv.fr/fr/datasets/conseiller-numerique-liste-des-structures-validees-par-le-comite-de-selection/',
  dataFile: '20230405-3925-cnfs.csv',
}

type BooleanChelou = 'oui' | 'non' | 'Non défini'
export const booleanChelouToBoolean = (value: BooleanChelou) => {
  switch (value) {
    case 'oui': {
      return true
    }
    case 'non': {
      return false
    }
    case 'Non défini': {
      return null
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unexpected chelou boolean value: ${value}`)
    }
  }
}

export type CnfsStructure = {
  'Raison sociale': string
  // Nom commune
  'Commune INSEE': string
  // Nom du département
  Département: string
  // Nom de la région
  Région: string
  // Nombre en string
  'Nombre de conseillers validés par le COSELEC': string
  // Date jj/mm/aaaa
  'Date de validation en comité de sélection': string
  Type: 'privée' | 'TODO'
  SIRET: string
  'Code département': string
  Adresse: string
  'Code commune INSEE': string
  'Code postal': string
  // En euro en string
  'Investissement financier estimatif total de l’Etat': string
  ZRR: BooleanChelou
  QPV: BooleanChelou
  'France services': BooleanChelou
}

export const getCnfsStructures = async () => {
  const data = await neatCsv(
    createReadStream(getDataFilePath(CnfsStructures.dataFile)),
    {
      separator: ';',
    },
  )
  return data as CnfsStructure[]
}

export const mapCnfsStructuresBySiret = (structures: CnfsStructure[]) =>
  mapStructuresBySiret(structures, 'SIRET')
