import Link from 'next/link'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import DownloadFileButton from '@app/web/app/(private)/exemples/fichiers/DownloadFileButton'
import OpenFileButton from '@app/web/app/(private)/exemples/fichiers/OpenFileButton'
import UploadImageForm from '@app/web/app/(private)/exemples/images/UploadImageForm'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { prismaClient } from '@app/web/prismaClient'

const ImagesPage = async () => {
  const user = await getAuthenticatedSessionUser()

  const images = await prismaClient.image.findMany({
    where: { upload: { uploadedById: user.id } },
    include: { upload: true },
  })

  return (
    <>
      <h2 className="fr-mt-8v">Envoi d&apos;images </h2>
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
        L&apos;image est ensuite générée en plusieurs tailles et mise en cache,
        en fonction des besoins.
      </p>
      <p>
        N&apos;envoyez aucune donnée personnelle depuis cette page
        d&apos;exemple.
      </p>

      <p>
        Pour un exemple d&apos;envoi et d&apos;affichage de simple fichiers,
        voir{' '}
        <Link href="/exemples/fichiers">
          la page d&apos;exemple d&apos;envoi de fichiers
        </Link>
      </p>

      <h4>Envoyer une image</h4>
      <UploadImageForm required maxSizeInBytes={5_000_000} />

      {images.length > 0 && (
        <>
          <h4 className="fr-mt-8v">Vos images</h4>
          {images.map(
            ({ id, altText, upload: { key, name, mimeType, size } }, index) => {
              const isLast = index === images.length - 1
              return (
                <div key={id}>
                  <p>
                    <strong>{name}</strong> {formatByteSize(size)} ({mimeType}){' '}
                    <OpenFileButton className="fr-ml-1w" fileKey={key} />
                    <DownloadFileButton
                      className="fr-ml-1w"
                      fileKey={key}
                      filename={name}
                    />
                  </p>
                  <ResponsiveUploadedImage
                    id={id}
                    alt={altText ?? ''}
                    breakpoints={[
                      { media: '(max-width: 320px)', width: 320 - 32 },
                      { media: '(max-width: 576px)', width: 576 - 32 },
                      { media: '(max-width: 768px)', width: 768 - 32 },
                      { media: '(min-width: 768px)', width: 180 },
                    ]}
                  />
                  {isLast ? null : <hr />}
                </div>
              )
            },
          )}
        </>
      )}
    </>
  )
}

export default ImagesPage
