import {
  ObjectFormData,
  objectFormValidation,
} from '@stack/web/pages/api/test/type'
import { expectZodValidationToFail } from '@stack/test/zodValidationTest'

const validObject: ObjectFormData = { name: 'John Doe' }

describe('objectFormValidation', () => {
  it('allows valid value', () => {
    const result = objectFormValidation.safeParse(validObject)
    expect(result.success).toEqual(true)
  })

  it('does not allow empty name', () => {
    expectZodValidationToFail(validObject, { name: undefined }, [
      { path: ['name'], message: 'Required' },
    ])
  })

  it('does not allow additional field', () => {
    expectZodValidationToFail(
      validObject,
      { otherName: 'Jane Dane', fridayIsHard: true },
      [
        {
          path: [''],
          message: "Unrecognized key(s) in object: 'otherName', 'fridayIsHard'",
        },
      ],
    )
  })
})
