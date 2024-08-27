import {
  Departement,
  departementsByCode,
} from '@app/web/data/collectivites-territoriales/departements'

export const getDepartementCodeFromCodeInsee = (codeInsee: string): string =>
  codeInsee.startsWith('97') ? codeInsee.slice(0, 3) : codeInsee.slice(0, 2)

export const getDepartementFromCode = (
  codeDepartement: string,
): Departement => {
  const departement = departementsByCode.get(codeDepartement)

  if (!departement)
    throw new Error(`No departement found for code "${codeDepartement}"`)

  return departement
}

export const getDepartementFromCodeInsee = (codeInsee: string): Departement =>
  getDepartementFromCode(getDepartementCodeFromCodeInsee(codeInsee))

export const getDepartementsFromCodesInsee = (
  codesInsee: string[],
): Departement[] => {
  const codes = new Set(codesInsee.map(getDepartementCodeFromCodeInsee))

  return [...codes.values()].map(getDepartementFromCode)
}
