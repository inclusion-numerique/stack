import Button from '@codegouvfr/react-dsfr/Button'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'
import { InscriptionRole, inscriptionRolesToText } from './inscriptionRole'

export const RoleNotFound = ({
  email,
  roleNotFound,
}: {
  email: string
  roleNotFound: InscriptionRole
}) => (
  <div className="fr-flex fr-direction-column fr-flex-gap-10v">
    <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france">
      Problème d’identification sur votre adresse email
    </h1>
    <Notice
      className="fr-notice--warning"
      title={
        <div className="fr-text--regular fr-text-default--grey">
          <div className="fr-mb-2w">
            <div>
              Nous n’avons pas trouvé de profil de{' '}
              <span className="fr-text--bold">
                {inscriptionRolesToText[roleNotFound]}
              </span>{' '}
              correspondant à l’adresse email {email}
            </div>
            <div className="fr-text--sm fr-text-mention--grey">
              Source :{' '}
              <Link
                href="https://conseiller-numerique.gouv.fr"
                target="_blank"
                rel="noreferrer"
              >
                conseiller-numerique.gouv.fr
              </Link>
            </div>
          </div>
          <Link href="mailto:contact@coop-mednum.fr" className="fr-link wip">
            <span role="img" className="ri-mail-line fr-mr-1w" aria-hidden />
            Veuillez contacter le support
          </Link>
        </div>
      }
    />
    <p className="fr-mb-0">
      Vous pouvez également essayer de retrouver votre profil en renseignant une
      autre adresse email.{' '}
      <Link href="/" className="fr-link wip">
        En savoir plus
      </Link>
    </p>
    <Button size="large" className="fr-width-full fr-display-block wip-outline">
      Essayer une autre adresse email
    </Button>
  </div>
)
