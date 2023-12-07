export const sideMenuHashItem =
  (hash?: string) =>
  (text: string, id: string, isDefault: boolean = false) => ({
    text,
    linkProps: { href: `#${id}` },
    isActive: (isDefault && hash == '') || hash === id,
  })
