import type { SiretApiResponse } from '@app/web/siret/SiretApiResponse'
import { fetchFromApiEntreprise } from '@app/web/external-apis/apiEntreprise'

export const fetchSiretApiData = (siret: string) =>
  fetchFromApiEntreprise<SiretApiResponse>({
    path: `/v3/insee/sirene/etablissements/${siret}`,
    object:
      'Validation SIRET - Formulaires gouvernance espace France Numérique Ensemble',
  })

export type SiretErrorType = 'invalidSiret' | 'apiError'

export const fetchSiretData = async (siret: string) => {
  const siretResult = await fetchSiretApiData(siret)

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
      unite_legale: { personne_morale_attributs, forme_juridique, siren },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      etat_administratif,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      activite_principale,
      // eslint-disable-next-line @typescript-eslint/naming-convention
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
      siren,
      activitePrincipale: activite_principale,
      nom: personne_morale_attributs.raison_sociale,
      formeJuridique: forme_juridique,
    },
  }
}
