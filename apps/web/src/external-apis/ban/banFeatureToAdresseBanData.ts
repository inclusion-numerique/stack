import type { Feature } from '@app/web/external-apis/apiAdresse'
import type { AdresseBanData } from '@app/web/external-apis/ban/AdresseBanValidation'

export const banFeatureToAdresseBanData = ({
  properties: { label, id, city, citycode, context, name, postcode },
  geometry: {
    coordinates: [longitude, latitude],
  },
}: Feature): AdresseBanData => ({
  id,
  label,
  codePostal: postcode,
  codeInsee: citycode,
  commune: city,
  nom: name,
  contexte: context,
  longitude,
  latitude,
})
