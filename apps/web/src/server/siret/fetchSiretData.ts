import { fetchFromApiEntreprise } from '@app/web/server/apiEntreprise/apiEntreprise'
import { SiretApiResponse } from '@app/web/server/siret/SiretApiResponse'

export const fetchSiretData = (siret: string) =>
  fetchFromApiEntreprise<SiretApiResponse>({
    path: `/v3/insee/sirene/etablissements/${siret}`,
    object:
      'Validation SIRET - Formulaires gouvernance espace France Numérique Ensemble',
  })
