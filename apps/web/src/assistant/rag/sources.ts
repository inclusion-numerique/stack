export const ragSources = {
  centreAideNotion: 'centre-aide-notion',
  lesBases: 'les-bases',
} as const

export type RagSource = keyof typeof ragSources
