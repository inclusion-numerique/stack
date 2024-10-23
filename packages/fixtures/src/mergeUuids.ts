/**
 * We use deterministic related entity ids for easier upsert / merging logic
 * Use first half of a and second half of b uuid v4
 */
export const mergeUuids = (a: string, b: string): string =>
  a.slice(0, 16) + b.slice(16)
