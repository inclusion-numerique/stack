export const mediateurCoordonnesIdsFor = (user: {
  coordinateur?: { mediateursCoordonnes: { mediateurId: string }[] } | null
}) =>
  (user.coordinateur?.mediateursCoordonnes ?? []).map(
    ({ mediateurId }) => mediateurId,
  )
