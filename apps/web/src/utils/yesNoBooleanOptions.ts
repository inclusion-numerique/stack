import { labelsToOptions } from '@app/ui/components/Form/utils/options'

export const yesNoLabels = {
  yes: 'Oui',
  no: 'Non',
} as const

export type YesOrNo = keyof typeof yesNoLabels

export const yesOrNo = Object.keys(yesNoLabels) as [keyof typeof yesNoLabels]

export const yesNoBooleanOptions = labelsToOptions(yesNoLabels)

export const yesNoToBoolean = (value: YesOrNo): boolean => value === 'yes'
export const booleanToYesNo = (boolean: boolean): YesOrNo =>
  boolean ? 'yes' : 'no'

export const yesNoToOptionalBoolean = (
  value: YesOrNo | undefined,
): boolean | undefined => (value === undefined ? undefined : value === 'yes')
