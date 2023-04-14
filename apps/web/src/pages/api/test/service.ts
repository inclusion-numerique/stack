let value = 'John Doe'

export const reset = () => {
  value = 'John Doe'
}

// eslint-disable-next-line unicorn/no-useless-promise-resolve-reject
export const getValue = async () => Promise.resolve(value)

export const updateValue = (newValue: string) => {
  if (newValue) {
    value = newValue
  }

  return Promise.resolve()
}
