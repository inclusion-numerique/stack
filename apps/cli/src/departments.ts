import dataGouvDepartments from './departements-region.json'

export type DataGouvDepartment = (typeof dataGouvDepartments)[number]

let departmentsIndex: Map<string, DataGouvDepartment>

export const getDataGouvDepartment = (departmentNumber: string) => {
  if (!departmentsIndex) {
    departmentsIndex = new Map(
      dataGouvDepartments.map((dataGouvDepartment) => [
        dataGouvDepartment.num_dep.toString(),
        dataGouvDepartment,
      ]),
    )
  }

  return departmentsIndex.get(departmentNumber)
}
