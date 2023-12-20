export const generateBaseAvatarSeed = (baseId: string): number => {
  // Seed is uuid, want to get a number between 0 and 1
  // To be as efficient as possible, we use the first 9 digits of the uuid
  const match = baseId.replaceAll(/\D/g, '').slice(0, 3)

  const randomSeed = Number(match) / 1e3

  return randomSeed
}
