export type LabelAndCount<TLabel = string> = {
  label: TLabel
  count: number
}

export type QuantifiedShare<TLabel = string> = LabelAndCount<TLabel> & {
  proportion: number
}
