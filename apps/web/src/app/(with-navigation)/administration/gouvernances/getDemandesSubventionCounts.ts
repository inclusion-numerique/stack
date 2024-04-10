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
  const acceptees = demandesSubvention.filter(
    ({ acceptee }) => !!acceptee,
  ).length

  // Includes a instruire and acceptees
  const convention = demandesSubvention.filter(
    ({ valideeEtEnvoyee, acceptee }) => !!valideeEtEnvoyee || !!acceptee,
  ).length

  return {
    enCours,
    aInstruire,
    acceptees,
    convention,
    total: demandesSubvention.length,
  }
}
