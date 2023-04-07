export const formatInteger = (value: number) => {
  if (value < 10_000) {
    return value.toString()
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
