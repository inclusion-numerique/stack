export type QuantifiedShare<TLabel = string> = {
  label: TLabel
  count: number
  proportion: number
}

export type AccompagnementLabel =
  | 'Accompagnements individuels'
  | 'Ateliers collectifs'
  | 'Aide aux démarches administratives'

export type MaterielLabel =
  | 'Ordinateur'
  | 'Smartphone'
  | 'Tablette'
  | 'Autre'
  | 'Sans matériel'
