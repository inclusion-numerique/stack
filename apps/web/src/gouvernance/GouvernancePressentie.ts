import z from 'zod'
import {
  requiredSiretValidation,
  siretValidation,
} from '@app/web/validation/siretValidation'
import { Option } from '@app/web/utils/options'

export type PerimetreGouvernancePressentie =
  | 'epci'
  | 'departement'
  | 'region'
  | 'autre'

export type CodePorteurGouvernancePressentie = 'region' | 'departement' | 'epci'
export const getPorteurCode = (
  type: CodePorteurGouvernancePressentie,
  code: string,
) => `${type}#${code}`

export const getInfoFromPorteurCode = (porteurCode: string) => {
  const [type, code] = porteurCode.split('#')
  return { type, code } as {
    type: CodePorteurGouvernancePressentie
    code: string
  }
}

export const perimetreOptions: Option<PerimetreGouvernancePressentie>[] = [
  {
    value: 'epci',
    name: 'EPCI ou groupement de communes',
  },
  {
    value: 'departement',
    name: 'Départemental',
  },
  {
    value: 'region',
    name: 'Régional',
  },
  {
    value: 'autre',
    name: 'Autre',
  },
]

export const GouvernancePressentieValidation = z
  .object({
    // Missing for creation, present for update
    id: z.string().uuid().nullish(),

    // Departement qui a remonté cette gouvernance préssentie
    departementCode: z.string({
      required_error:
        'Veuillez renseigner le département qui a remonté cette gouvernance préssentie',
    }),

    perimetre: z.enum(['epci', 'departement', 'region', 'autre'], {
      required_error: 'Veuillez renseigner le périmètre',
    }),

    // This field has a value that has 2 information: type and code.
    // In the form {type}#{code}
    // For default values will be constructed with getPorteurCode() and server side will infer data from it with getInfoFromPorteurCode()
    porteurCode: z.string().nullish(),

    porteurSiret: siretValidation.nullish(),

    siretsRecruteursCoordinateurs: z
      .array(
        z.object({
          siret: requiredSiretValidation,
        }),
      )
      .min(1, {
        message: 'Veuillez renseigner au moins une collectivité/structure',
      }),

    noteDeContexte: z
      .string({
        required_error: 'Veuillez renseigner la note de contexte',
      })
      .nonempty({ message: 'Veuillez renseigner la note de contexte' }),
  })
  .refine((data) => {
    //  If perimetre is 'autre', then porteurSiret is required
    //  IF perimetre is not 'autre', then porteurCode is required
    if (data.perimetre === 'autre') {
      return !!data.porteurSiret
    }
    return !!data.porteurCode
  }, 'Veuillez renseigner un porteur')

export type GouvernancePressentieData = z.infer<
  typeof GouvernancePressentieValidation
>
