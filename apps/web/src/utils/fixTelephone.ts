import { CleanOperation } from './clean-operation'

const fixDetailsInParenthesisInPhone = (field: string): CleanOperation => ({
  name: 'trailing details in phone',
  selector: /\s\(.*\)$/g,
  field,
  fix: (toFix: string): string => toFix.replace(/\s\(.*\)$/g, ''),
})

const fixHeadingDetailsInPhone = (field: string): CleanOperation => ({
  name: 'heading details in phone',
  selector: /^\D{3,}/g,
  field,
  fix: (toFix: string): string => toFix.replace(/^\D{3,}/g, ''),
})

const fixTrailingDetailsInPhone = (field: string): CleanOperation => ({
  name: 'trailing details in phone',
  selector: /\s[A-Za-z].*$/g,
  field,
  fix: (toFix: string): string => toFix.replace(/\s[A-Za-z].*$/g, ''),
})

const fixWrongCharsInPhone = (field: string): CleanOperation => ({
  name: 'wrong chars in phone',
  selector: /(?!\w|\+)./g,
  field,
  fix: (toFix: string): string => toFix.replace(/(?!\w|\+)./g, ''),
})

const fixUnexpectedPhoneList = (field: string): CleanOperation => ({
  name: 'unexpected phone list',
  selector: /\d{10}\/\/?\d{10}/,
  field,
  fix: (toFix: string): string => toFix.split('/')[0] ?? '',
})

const fixShortCafPhone = (field: string): CleanOperation => ({
  name: 'short CAF phone',
  selector: /3230/,
  field,
  fix: (): string => '+33969322121',
})

const fixShortAssuranceRetraitePhone = (field: string): CleanOperation => ({
  name: 'short assurance retraite phone',
  selector: /3960/,
  field,
  fix: (): string => '+33971103960',
})

const fixMissingPlusCharAtStartingPhone = (field: string): CleanOperation => ({
  name: 'fix missing + at starting phone number',
  selector: /^(33|262|590|594|596)(\d+)/,
  field,
  fix: (toFix: string): string =>
    toFix.replace(/^(33|262|590|594|596)(\d+)/, '+$1$2'),
})

const fixReplaceLeading0With33InPhoneNumberStatingWithPlus = (
  field: string,
): CleanOperation => ({
  name: 'fix missing + at starting phone number',
  selector: /^\+0(\d{9})/,
  field,
  fix: (toFix: string): string => toFix.replace(/^\+0(\d{9})/, '+33$1'),
})

const removeTooFewDigitsInPhone = (field: string): CleanOperation => ({
  name: 'too few digits in phone',
  selector: /^.{0,9}$/,
  field,
})

const removeTooManyDigitsInPhone = (field: string): CleanOperation => ({
  name: 'too many digits in phone',
  selector: /^0.{10,}/,
  field,
})

const removeOnly0ValueInPhone = (field: string): CleanOperation => ({
  name: 'fake number in phone',
  selector: /^0{10}$/,
  field,
})

const removeNoValidNumbersInPhone = (field: string): CleanOperation => ({
  name: 'fake number in phone',
  selector: /^[1-9]\d{9}$/,
  field,
})

const removeStartingByTwoZeroInPhone = (field: string): CleanOperation => ({
  name: 'fake number in phone',
  selector: /^00.+/,
  field,
})

const keepFirstNumberIfMultiple = (field: string): CleanOperation => ({
  name: 'keep only the first phone number',
  selector: /\n/,
  field,
  fix: (toFix: string): string =>
    /^(?<phone>[^\n]+)/u.exec(toFix)?.groups?.phone ?? '',
})

const cleanOperationIfAny = (
  cleanOperator: (colonne: string) => CleanOperation,
  telephone: string | null,
): CleanOperation[] => (telephone == null ? [] : [cleanOperator(telephone)])

export const cleanTelephone = (telephone: string | null): CleanOperation[] => [
  ...cleanOperationIfAny(removeStartingByTwoZeroInPhone, telephone),
  ...cleanOperationIfAny(removeNoValidNumbersInPhone, telephone),
  ...cleanOperationIfAny(fixUnexpectedPhoneList, telephone),
  ...cleanOperationIfAny(fixDetailsInParenthesisInPhone, telephone),
  ...cleanOperationIfAny(fixHeadingDetailsInPhone, telephone),
  ...cleanOperationIfAny(fixTrailingDetailsInPhone, telephone),
  ...cleanOperationIfAny(fixWrongCharsInPhone, telephone),
  ...cleanOperationIfAny(fixShortCafPhone, telephone),
  ...cleanOperationIfAny(fixShortAssuranceRetraitePhone, telephone),
  ...cleanOperationIfAny(removeTooFewDigitsInPhone, telephone),
  ...cleanOperationIfAny(removeTooManyDigitsInPhone, telephone),
  ...cleanOperationIfAny(removeOnly0ValueInPhone, telephone),
  ...cleanOperationIfAny(keepFirstNumberIfMultiple, telephone),
  ...cleanOperationIfAny(fixMissingPlusCharAtStartingPhone, telephone),
  ...cleanOperationIfAny(
    fixReplaceLeading0With33InPhoneNumberStatingWithPlus,
    telephone,
  ),
]

const canFixTelephone = (
  telephone: string | null,
  cleanOperation: CleanOperation,
): telephone is string =>
  telephone != null && cleanOperation.selector.test(telephone)

const applyOperation =
  (cleanOperation: CleanOperation) => (telephone: string) =>
    cleanOperation.fix ? cleanOperation.fix(telephone) : null

const toFixedTelephone = (
  telephone: string | null,
  cleanOperation: CleanOperation,
): string | null =>
  canFixTelephone(telephone, cleanOperation)
    ? applyOperation(cleanOperation)(telephone)
    : telephone

const toInternationalFormat = (phone: string): string =>
  /^0\d{9}$/.test(phone) ? `+33${phone.slice(1)}` : phone

export const fixTelephone = (telephone: string | null) => {
  const fixed = cleanTelephone(telephone).reduce(toFixedTelephone, telephone)
  return fixed == null ? null : toInternationalFormat(fixed)
}
