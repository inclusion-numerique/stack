import z from 'zod'
import {
  requiredSiretValidation,
  optionalSiretValidation,
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

export const GouvernancePressentieValidation = z.intersection(
  z
    // We have to use an intersection so the perimetre/code refine is triggered at the same time as the other fields
    .object({
      v1Perimetre: z.enum(['epci', 'departement', 'region', 'autre'], {
        required_error: 'Veuillez renseigner le périmètre',
      }),

      // This field has a value that has 2 information: type and code.
      // In the form {type}#{code}
      // For default values will be constructed with getPorteurCode() and server side will infer data from it with getInfoFromPorteurCode()
      v1PorteurCode: z.string().nullish(),

      v1PorteurSiret: optionalSiretValidation.nullish(),
    })
    .refine((data) => !(data.v1Perimetre === 'autre' && !data.v1PorteurSiret), {
      message: 'Veuillez renseigner un porteur',
      path: ['porteurSiret'],
    })
    .refine((data) => !(data.v1Perimetre !== 'autre' && !data.v1PorteurCode), {
      message: 'Veuillez renseigner un porteur',
      path: ['porteurCode'],
    }),
  z.object({
    // Missing for creation, present for update
    id: z.string().uuid().nullish(),

    // Departement qui a remonté cette gouvernance préssentie
    departementCode: z.string({
      required_error:
        'Veuillez renseigner le département qui a remonté cette gouvernance préssentie',
    }),
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
  }),
)

export type GouvernancePressentieData = z.infer<
  typeof GouvernancePressentieValidation
>
