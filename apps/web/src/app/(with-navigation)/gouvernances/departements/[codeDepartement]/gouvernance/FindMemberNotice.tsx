import React from 'react'
import classNames from 'classnames'

const FindMemberNotice = ({ className }: { className?: string }) => (
  <div className={classNames('fr-notice fr-notice--info', className)}>
    <div className="fr-container">
      <div className="fr-notice__body ">
        <p className="fr-text--lg fr-text--bold fr-mb-1v ">
          Vous ne trouvez pas une collectivité/structure dans la liste&nbsp;?
        </p>
        <p className="fr-text--sm fr-mb-0 ">
          <strong>Afin de récupérer leurs informations de contact</strong>,
          invitez les collectivités et structures qui n’ont pas encore manifesté
          leur souhait de participer à compléter le formulaire disponible via ce
          lien&nbsp;:{' '}
          <a
            target="_blank"
            href="https://inclusion-numerique.anct.gouv.fr/gouvernance"
          >
            https://inclusion-numerique.anct.gouv.fr/gouvernance/
          </a>
        </p>
      </div>
    </div>
  </div>
)

export default FindMemberNotice
