export type LabelAndCount<TLabel = string> = {
  label: TLabel
  count: number
}

export type QuantifiedShareToProcess<
  TCategoryType = string,
  TLabel = string,
> = LabelAndCount<TLabel> & {
  category_type: TCategoryType
}

export type QuantifiedShare<TLabel = string> = LabelAndCount<TLabel> & {
  proportion: number
}

export type AccompagnementLabel =
  | 'Accompagnements individuels'
  | 'Ateliers collectifs'
  | 'Aide aux démarches administratives'

export type MaterielLabel =
  | 'Ordinateur'
  | 'Téléphone'
  | 'Tablette'
  | 'Autre matériel'
  | 'Pas de matériel'
