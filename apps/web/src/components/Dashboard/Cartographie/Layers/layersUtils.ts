import { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec'

export const isHoveredCondition = [
  'boolean',
  ['feature-state', 'hover'],
  false,
] satisfies ExpressionSpecification
export const isNotHoveredCondition = [
  '!',
  isHoveredCondition,
] satisfies ExpressionSpecification

export const isSelectedCondition = [
  'boolean',
  ['feature-state', 'selected'],
  false,
] satisfies ExpressionSpecification
export const isNotSelectedCondition = [
  '!',
  isSelectedCondition,
] satisfies ExpressionSpecification
