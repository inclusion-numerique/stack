// Transform v1 name
//  - "Département : Alpes-de-Haute-Provence (04)" to "04"
// - "Outre-Mer : La Réunion (974)" to "974"
const departmentFromTagName = (name: string) => {
  // Extract the digits inside parenthesis
  const match = name.match(/\((\d+)\)/)

  if (!match) {
    return null
  }

  return match[1]
}

export const departmentTagCategory = 6n

export const getDepartmentFromTags = (
  tags?: { name: string; category_id: bigint }[] | null | undefined,
) => {
  if (!tags || tags.length === 0) {
    return null
  }

  const departmentTag = tags.find(
    ({ category_id }) => category_id === departmentTagCategory,
  )

  if (!departmentTag) {
    return null
  }

  return departmentFromTagName(departmentTag.name)
}
