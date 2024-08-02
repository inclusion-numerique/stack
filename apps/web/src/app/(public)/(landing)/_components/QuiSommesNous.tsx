import Link from 'next/link'
import Image from 'next/image'

export const QuiSommesNous = () => (
  <div className="fr-container--standard fr-mx-auto fr-px-2w">
    <div className="fr-text--center">
      <div className="fr-flex fr-align-items-center fr-flex-gap-8v fr-mb-3w fr-justify-content-center">
        <p className="fr-logo">
          République
          <br />
          Française
        </p>
        <Image
          style={{ maxWidth: 244 }}
          className="fr-responsive-img"
          width={244}
          height={104}
          src="images/societe-numerique.svg"
          alt=""
        />
      </div>
      <h2 className="fr-h1 fr-text-title--blue-france">Qui sommes nous ?</h2>
      <p>
        Nous sommes l’équipe du{' '}
        <Link
          className="fr-link"
          href="https://societenumerique.gouv.fr"
          target="_blank"
          rel="noreferrer"
          title="Programme Société Numérique - nouvel onglet"
        >
          Programme Société Numérique
        </Link>{' '}
        qui porte la politique nationale d’inclusion numérique, formalisée par
        une feuille de route co-écrite avec l’ensemble des acteurs du secteur :{' '}
        <Link
          className="fr-link"
          href="https://inclusion-numerique.anct.gouv.fr/"
          target="_blank"
          rel="noreferrer"
          title="France Numérique Ensemble - nouvel onglet"
        >
          France Numérique Ensemble
        </Link>
        .
      </p>
      <p>
        Le programme œuvre pour le développement d’un numérique d’intérêt
        général qui ambitionne d’être ouvert, éthique, durable, souverain et,
        bien sûr, inclusif.
      </p>
      <p className="fr-mb-0">
        Nous suivons l’approche{' '}
        <Link
          className="fr-link"
          href="https://beta.gouv.fr"
          target="_blank"
          rel="noreferrer"
          title="Beta gouv - nouvel onglet"
        >
          beta.gouv.fr
        </Link>{' '}
        qui place l’expérience utilisateur au coeur de la conception produit.
      </p>
    </div>
  </div>
)
