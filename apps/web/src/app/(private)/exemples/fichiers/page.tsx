import Link from 'next/link'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import DownloadFileButton from '@app/web/app/(private)/exemples/fichiers/DownloadFileButton'
import OpenFileButton from '@app/web/app/(private)/exemples/fichiers/OpenFileButton'
import UploadFileForm from '@app/web/app/(private)/exemples/fichiers/UploadFileForm'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { prismaClient } from '@app/web/prismaClient'

const UploadsPage = async () => {
  const user = await getAuthenticatedSessionUser()

  const uploads = await prismaClient.upload.findMany({
    where: { uploadedById: user.id },
  })

  return (
    <>
      <h2 className="fr-mt-8v">Envoi de fichiers</h2>
      <p>
        Lors de la soumission du formulaire, un fichier est automatiquement
        envoyé dans un stockage de fichier directement depuis le navigateur,
        sans passer par le serveur applicatif.
      </p>
      <p>
        Le fichier est enregistré dans un répertoire utilisateur a des fins de
        tracabilité.
      </p>
      <p>
        N&apos;envoyez aucune donnée personnelle depuis cette page
        d&apos;exemple.
      </p>

      <p>
        Pour un exemple d&apos;envoi et d&apos;affichage d&apos;images, voir{' '}
        <Link href="/exemples/images">
          la page d&apos;exemple d&apos;envoi d&apos;images
        </Link>
      </p>

      <h4>Envoyer un fichier</h4>
      <UploadFileForm required maxSizeInBytes={5_000_000} />

      {uploads.length > 0 && (
        <>
          <h4 className="fr-mt-8v">Vos fichiers</h4>
          <ul>
            {uploads.map(({ key, name, mimeType, size }) => (
              <li key={key}>
                <strong>{name}</strong> {formatByteSize(size)} ({mimeType}){' '}
                <OpenFileButton className="fr-ml-1w" fileKey={key} />
                <DownloadFileButton
                  className="fr-ml-1w"
                  fileKey={key}
                  filename={name}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default UploadsPage
