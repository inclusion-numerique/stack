import { fetchSiretData } from '@app/web/siret/fetchSiretData'
import { requiredSiretValidation } from '@app/web/siret/siretValidation'

/**
 * Takes a SIRET
 * If it exists in the database, update and returns corresponding data
 * If not, fetch from data Entreprise API and returns it
 */
export const checkSiret = (siret: string) =>
  requiredSiretValidation.safeParse(siret).success
    ? // Do not execute API call if siret is malformed
      fetchSiretData(siret)
    : Promise.resolve({
        siretInfo: null,
        error: {
          type: 'invalidSiret',
          message: 'Ce SIRET n’est pas valide',
        },
      })
