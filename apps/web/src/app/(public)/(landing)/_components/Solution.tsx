import Image from 'next/image'

export const Solution = () => (
  <div className="fr-container">
    <div className="fr-text--center">
      <h2 className="fr-h1 fr-text-title--blue-france fr-mb-15v">
        Pourquoi utiliser
        <br />
        La Coop de la médiation numérique&nbsp;?
      </h2>
    </div>
    <div className="fr-flex fr-direction-lg-row fr-direction-column fr-flex-gap-6v">
      <div className="fr-background-default--grey fr-border-radius--16 fr-p-6w">
        <Image
          width={73}
          height={88}
          src="/images/illustrations/landing-page/solution/former.svg"
          alt=""
        />
        <h3 className="fr-h6 fr-my-2w">
          Une solution accessible à toutes et tous
        </h3>
        <p className="fr-mb-0 fr-text-mention--grey">
          La Coop est accessible à{' '}
          <strong>l’ensemble des médiatrices et médiateurs</strong>, intégrés ou
          non au dispositif Conseiller numérique de l’Agence Nationale de la
          Cohésion des Territoires.
        </p>
      </div>
      <div className="fr-background-default--grey fr-border-radius--16 fr-p-6w">
        <Image
          width={86}
          height={88}
          src="/images/illustrations/landing-page/solution/instituer.svg"
          alt=""
        />
        <h3 className="fr-h6 fr-my-2w">Une solution publique et souveraine</h3>
        <p className="fr-mb-0 fr-text-mention--grey">
          La Coop est une solution numérique{' '}
          <strong>développée par l’État</strong>, au sein de l’Incubateur de
          Territoires de l’Agence Nationale de la Cohésion des Territoires.
        </p>
      </div>
      <div className="fr-background-default--grey fr-border-radius--16 fr-p-6w">
        <Image
          width={62}
          height={88}
          src="/images/illustrations/landing-page/solution/financer.svg"
          alt=""
        />
        <h3 className="fr-h6 fr-my-2w">Une solution simple et gratuite</h3>
        <p className="fr-mb-0 fr-text-mention--grey">
          La Coop est{' '}
          <strong>mise à disposition gratuitement des acteurs</strong> de la
          médiation numérique. Elle offre un large panel d’outils adaptés aux
          différents métiers.
        </p>
      </div>
    </div>
  </div>
)
