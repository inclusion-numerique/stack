export type MediateurToAddOption = {
  label: string
  value: {
    mediateurId?: string
    email: string
    isConseillerNumerique?: boolean
  } | null
  isDisabled?: boolean
}
