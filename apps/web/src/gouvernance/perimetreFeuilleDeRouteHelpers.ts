export const filterDansTerritoire = ({
  horsTerritoire,
}: {
  horsTerritoire: boolean
}) => !horsTerritoire

export const filterHorsTerritoire = ({
  horsTerritoire,
}: {
  horsTerritoire: boolean
}) => !!horsTerritoire

export const idForEpci = (codeEpci: string) => `epci#${codeEpci}`
export const idForCommune = (codeCommune: string) => `commune#${codeCommune}`
