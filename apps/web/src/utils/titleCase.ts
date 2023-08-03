export const titleCase = (value: string) =>
  value
    .toLowerCase()
    .replaceAll(/(^|\s|-)(\S)/g, (match) => match.toUpperCase())
    // Handle apostrophe : e.g. D'artagnan => d'Artagnan
    .replaceAll(
      /([A-Z])'(\S)/g,
      (match, beforeApostrophe: string, afterApostrophe: string) =>
        `${beforeApostrophe.toLowerCase()}'${afterApostrophe.toUpperCase()}`,
    )
