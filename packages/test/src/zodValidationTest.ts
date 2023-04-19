import { objectFormValidation } from '@lb/web/pages/api/test/type'

export const normalizeZodErrorForTestExpect = (
  errors: { path: (string | number)[]; message: string }[],
) =>
  Object.fromEntries(
    errors
      .map((error): [string, string] => [error.path.join('.'), error.message])
      .sort((a, b) => a[0].localeCompare(b[0])),
  )

export const expectZodValidationToFail = <T extends object, V extends object>(
  validObject: T,
  fields: V,
  errors: { path: string[]; message: string }[],
) => {
  const result = objectFormValidation.safeParse({ ...validObject, ...fields })
  if (result.success) {
    expect.fail(
      `Fields should not be valid. Expected errors: ${errors
        .map((error) => error.message)
        .join(', ')}`,
    )
    return
  }

  const expectedErrorMessages = normalizeZodErrorForTestExpect(errors)
  const actualErrorMessages = normalizeZodErrorForTestExpect(
    result.error.issues,
  )

  expect(actualErrorMessages).toEqual(expectedErrorMessages)
}
