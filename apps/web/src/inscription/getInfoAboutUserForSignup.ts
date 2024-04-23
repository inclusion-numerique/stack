import { getCoordinateursConseillerNumerique } from '@app/web/data/conseiller-numerique/coordinateursConseillerNumerique'

export const getInfoAboutUserForSignup = async ({
  user: { email },
}: {
  user: { email: string }
}) => {
  // Check if user is a coconum
  const coordinateursConseillerNumerique =
    await getCoordinateursConseillerNumerique()

  const coordinateurConseillerNumerique = coordinateursConseillerNumerique.find(
    (coconum) => coconum.courriel.toLowerCase() === email.toLowerCase(),
  )

  if (coordinateurConseillerNumerique) {
    return {
      coordinateurConseillerNumerique,
    }
  }

  // TODO Fetch if user is a conseiller numerique
  // TODO Fetch his organisation and permanences
}
