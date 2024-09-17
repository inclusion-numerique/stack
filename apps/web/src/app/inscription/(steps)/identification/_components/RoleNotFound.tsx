import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'
import {
  type InscriptionRole,
  inscriptionRolesErrorTitles,
  inscriptionRolesToText,
} from './inscriptionRole'

export const RoleNotFound = ({
  email,
  roleNotFound,
}: {
  email: string
  roleNotFound: InscriptionRole
}) => (
  <div className="fr-flex fr-direction-column fr-flex-gap-10v">
    <h1 className="fr-h3 fr-mb-0 fr-text-title--blue-france fr-text--center">
      {inscriptionRolesErrorTitles[roleNotFound]}
    </h1>
    <Notice
      className="fr-notice--warning"
      title={
        <span className="fr-text--regular fr-text-default--grey">
          <span className="fr-mb-2w">
            <span>
              Nous n’avons pas trouvé de profil de{' '}
              <span className="fr-text--bold">
                {inscriptionRolesToText[roleNotFound]}
              </span>{' '}
              correspondant à l’adresse email {email}
            </span>
            <br />
            <span className="fr-text--sm fr-text-mention--grey">
              Source :{' '}
              <Link
                href="https://conseiller-numerique.gouv.fr"
                target="_blank"
                rel="noreferrer"
              >
                conseiller-numerique.gouv.fr
              </Link>
            </span>
          </span>
          <br />
          <br />
          <Link href="mailto:contact@coop-mednum.fr" className="fr-link wip">
            <span role="img" className="ri-mail-line fr-mr-1w" aria-hidden />
            Veuillez contacter le support
          </Link>
        </span>
      }
    />
  </div>
)
