import axios from 'axios'
import { mapStructuresBySiret } from '@app/web/data/siret'
import { mapStructuresByKey } from '@app/web/data/mapByKey'

export const CnfsPermanences = {
  url: 'https://api.conseiller-numerique.gouv.fr/permanences',
}

export type CnfsAidant = {
  // Internal id
  aidantId: string
  nom: string
  courriel: string
  telephone: string
}

export type CnfsPermanence = {
  // Internal ID
  id: string
  // Nom de la permanence (ressemble à une structure...)
  nom: string
  // Separated with ";"
  services: string
  // SIRET
  pivot: string
  // Nom de la commune
  commune: string
  // Code postal
  code_postal: string
  adresse: string
  latitude: number
  longitude: number
  telephone: string
  // Humain e.g.  "Gratuit : Je peux accéder gratuitement au lieu et à ses services"
  conditions_acces: string
  labels_nationaux: string
  horaires: string
  source: string
  // yyyy-mm-jj
  date_maj: string
  // Id CnfsStructure (CF cnfsStructures.ts)
  structureId: string
  // Nom de structure
  structureNom: string
  // CNFS, 1 CNFS peut être dans plusieurs permanences
  aidants: CnfsAidant[]
}

export const getCnfsPermanences = async () => {
  const response = await axios.get<CnfsPermanence[]>(CnfsPermanences.url)

  return response.data
}

export const mapCnfsPermanencesBySiret = (permanences: CnfsPermanence[]) =>
  mapStructuresBySiret(permanences, 'pivot')

export const mapCnfsPermanencesById = (permanences: CnfsPermanence[]) =>
  mapStructuresByKey(permanences, 'id')
