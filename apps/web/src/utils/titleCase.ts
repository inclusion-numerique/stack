export const titleCase = (string_: string) =>
  string_.replaceAll(
    /\b\w+/g,
    (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(),
  )
