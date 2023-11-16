import { z } from 'zod'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { requiredSiretValidation } from '@app/web/validation/siretValidation'
import { fetchSiretData } from '@app/web/server/siret/fetchSiretData'

type SiretErrorType = 'invalidSiret' | 'apiError'

export const siretRouter = router({
  siretInfo: protectedProcedure
    .input(z.object({ siret: requiredSiretValidation }))
    .query(async ({ input: { siret } }) => {
      const siretResult = await fetchSiretData(siret)

      if ('error' in siretResult) {
        return {
          error: {
            type:
              'statusCode' in siretResult.error &&
              siretResult.error.statusCode.toString().startsWith('4')
                ? ('invalidSiret' as SiretErrorType)
                : ('apiError' as SiretErrorType),
            message: siretResult.error.message,
          },
          siretInfo: null,
        }
      }

      const {
        data: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          unite_legale: { personne_morale_attributs },
          // eslint-disable-next-line @typescript-eslint/naming-convention
          etat_administratif,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          activite_principale,
        },
      } = siretResult

      if (!personne_morale_attributs?.raison_sociale) {
        return {
          error: {
            type: 'invalidSiret' as SiretErrorType,
            message: 'Ce siret ne correspond pas à une personne morale',
          },
          siretInfo: null,
        }
      }

      if (etat_administratif === 'F') {
        return {
          error: {
            type: 'invalidSiret' as SiretErrorType,
            message: 'Cet établissement est fermé',
          },
          siretInfo: null,
        }
      }

      return {
        error: null,
        siretInfo: {
          siret,
          activitePrincipale: activite_principale,
          nom: personne_morale_attributs.raison_sociale,
        },
      }
    }),
})
