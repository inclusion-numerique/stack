export const titleCase = (value: string) =>
  value
    .toLowerCase()
    .replaceAll(/(^|\s|-)\S/g, (match) => match.normalize('NFC').toUpperCase())
