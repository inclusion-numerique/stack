export const contactDefaultValuesFromData = (
  nullable: boolean,
  contactData?: {
    nom?: string | null
    prenom?: string | null
    email?: string | null
    fonction?: string | null
  } | null,
) => {
  if (!contactData) {
    return nullable ? undefined : {}
  }

  return {
    nom: contactData.nom ?? undefined,
    prenom: contactData.prenom ?? undefined,
    email: contactData.email ?? undefined,
    fonction: contactData.fonction ?? undefined,
  }
}
