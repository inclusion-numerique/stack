export const getDemandesSubventionCounts = (
  demandesSubvention: {
    valideeEtEnvoyee: Date | null
    acceptee: Date | null
  }[],
) => {
  const enCours = demandesSubvention.filter(
    ({ valideeEtEnvoyee }) => !valideeEtEnvoyee,
  ).length
  const aInstruire = demandesSubvention.filter(
    ({ valideeEtEnvoyee, acceptee }) => !!valideeEtEnvoyee && !acceptee,
  ).length
  const validees = demandesSubvention.filter(
    ({ acceptee }) => !!acceptee,
  ).length

  return {
    enCours,
    aInstruire,
    validees,
    total: demandesSubvention.length,
  }
}
