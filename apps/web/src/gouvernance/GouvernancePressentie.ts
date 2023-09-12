import z from 'zod'
import { siretValidation } from '@app/web/validation/siretValidation'
import { Option } from '@app/web/utils/options'

export type PerimetreGouvernancePressentie =
  | 'epci'
  | 'departement'
  | 'region'
  | 'autre'

export type CodePorteurGouvernancePressentie =
  | 'region'
  | 'departement'
  | 'epci'
  | 'siret'
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

export const GouvernancePressentieValidation = z.object({
  // Missing for creation, present for update
  id: z.string().uuid().nullish(),

  // Departement qui a remonté cette gouvernance préssentie
  departementCode: z.string().nonempty(),

  perimetre: z.enum(['epci', 'departement', 'region', 'autre']),

  // This field has a value that has 2 information: type and code.
  // In the form {type}#{code}
  // For default values will be constructed with getPorteurCode() and server side will infer data from it with getInfoFromPorteurCode()
  porteurCode: z.string({
    required_error: 'Veuillez renseigner un porteur',
  }),

  siretsRecruteursCoordinateurs: z.array(siretValidation).min(1),

  noteDeContexte: z.string().min(1),
})

export type GouvernancePressentieData = z.infer<
  typeof GouvernancePressentieValidation
>
