export const createWhereStructureInDepartement = (codeDepartement: string) => ({
  OR: [{ codeDepartement }, { commune: { codeDepartement } }],
})
