import { camelCase, constantCase, pascalCase, snakeCase } from 'change-case'

type CaseType = 'snake' | 'camel' | 'constant' | 'pascal'

// exemple minimaliste de snake_case
type SnakeCase<S extends string> =
  // on coupe la chaîne caractère par caractère
  S extends `${infer First}${infer Rest}`
    ? // si le prochain caractère n'est pas en majuscule, on colle
      // sinon on insère un underscore
      Rest extends Uncapitalize<Rest>
      ? `${Lowercase<First>}${SnakeCase<Rest>}`
      : `${Lowercase<First>}_${SnakeCase<Rest>}`
    : S

// camelCase depuis snake_case (vraiment simplifié)
type CamelCase<S extends string> = S extends `${infer Before}_${infer After}`
  ? `${Lowercase<Before>}${Capitalize<CamelCase<After>>}`
  : Lowercase<S>

// PASCALcase (simplifié)
// (on part d'une base camelCase et on capitalise le premier)
type PascalCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S

// CONSTANT_CASE (tout majuscule, underscore)
type ConstantCase<S extends string> =
  SnakeCase<S> extends infer R extends string ? Uppercase<R> : never

// on choisit la transformation
type ChangeCase<S extends string, C extends CaseType> = C extends 'snake'
  ? SnakeCase<S>
  : C extends 'camel'
    ? CamelCase<S>
    : C extends 'pascal'
      ? PascalCase<CamelCase<S>> // on “nettoie” la chaîne avant
      : C extends 'constant'
        ? ConstantCase<S>
        : S

// le type récursif sur les clés d’un objet
export type ChangeObjectKeysCaseRecursive<T, C extends CaseType> =
  // si c’est un tableau, on applique récursivement à ses éléments
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends readonly any[]
    ? { [K in keyof T]: ChangeObjectKeysCaseRecursive<T[K], C> }
    : // si c’est un objet "pur" (pas un tableau), on renomme les clés
      T extends object
      ? {
          [K in keyof T as ChangeCase<
            Extract<K, string>,
            C
          >]: ChangeObjectKeysCaseRecursive<T[K], C>
        }
      : T
const changeCaseFunctions = {
  snake: snakeCase,
  camel: camelCase,
  constant: constantCase,
  pascal: pascalCase,
} satisfies Record<CaseType, (input: string) => string>

export const changeObjectKeysCaseRecursive = <T, C extends CaseType>(
  data: T,
  caseType: C,
): ChangeObjectKeysCaseRecursive<T, C> => {
  const changeCase = changeCaseFunctions[caseType]

  if (Array.isArray(data)) {
    return data.map(
      (item) =>
        changeObjectKeysCaseRecursive(
          item,
          caseType,
        ) as ChangeObjectKeysCaseRecursive<T, C>,
    ) as ChangeObjectKeysCaseRecursive<T, C>
  }

  if (data && typeof data === 'object' && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        changeCase(key),
        changeObjectKeysCaseRecursive(value, caseType),
      ]),
    ) as ChangeObjectKeysCaseRecursive<T, C>
  }

  return data as ChangeObjectKeysCaseRecursive<T, C>
}
