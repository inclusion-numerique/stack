import dataGouvDepartements from './departements-region.json'

export type DataGouvDepartement = (typeof dataGouvDepartements)[number]

let departementsIndex: Map<string, DataGouvDepartement>

export const getDataGouvDepartement = (departementNumber: string) => {
  if (!departementsIndex) {
    departementsIndex = new Map(
      dataGouvDepartements.map((dataGouvDepartement) => [
        dataGouvDepartement.num_dep.toString(),
        dataGouvDepartement,
      ]),
    )
  }

  return departementsIndex.get(departementNumber)
}
