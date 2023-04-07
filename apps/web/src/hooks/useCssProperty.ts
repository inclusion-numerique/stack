import useCSSCustomProperty from 'react-use-css-custom-property'

export const useCssProperty = (propertyName: string): string => {
  const [property] = useCSSCustomProperty(propertyName)
  return property.propertyValue
}

export const useCssProperties = (propertyNames: string[]): string[] =>
  propertyNames.map(useCssProperty)
