import type { AdresseBanData } from '@app/web/external-apis/ban/AdresseBanValidation'
import type { DefaultValues } from 'react-hook-form'

// Used to be typesafe in UI form display of default values
export const banDefaultValueToAdresseBanData = ({
  codeInsee,
  codePostal,
  label,
  contexte,
  id,
  longitude,
  latitude,
  nom,
  commune,
}: DefaultValues<AdresseBanData>): AdresseBanData => ({
  id: id ?? codeInsee ?? '',
  codeInsee: codeInsee ?? '',
  codePostal: codePostal ?? '',
  label: label ?? '',
  contexte: contexte ?? '',
  longitude: longitude ?? 0,
  latitude: latitude ?? 0,
  nom: nom ?? '',
  commune: commune ?? '',
})
