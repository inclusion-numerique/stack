import { AdresseBanData } from '@app/web/external-apis/ban/AdresseBanValidation'

export type InformationsGeneralesProps = {
  nom: string
  adresseBan: AdresseBanData
  complementAdresse?: string
  siret?: string
  rna?: string
}
