import { AdresseBanData } from '@app/web/external-apis/ban/AdresseBanValidation'
import { DefaultValues } from 'react-hook-form'

// Failsafe function to display a label for an AdresseBanData
export const banMunicipalityLabel = ({
  codePostal,
  commune,
  label,
  nom,
}: Pick<
  DefaultValues<AdresseBanData>,
  'commune' | 'nom' | 'codePostal' | 'label'
>): string => {
  const communeLabel = commune ?? nom ?? label ?? '-'

  return codePostal ? `${communeLabel} · ${codePostal}` : communeLabel
}
