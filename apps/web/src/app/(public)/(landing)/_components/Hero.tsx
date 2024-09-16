import Image from 'next/image'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'

export const Hero = () => (
  <div className="fr-container">
    <div className="fr-grid-row fr-grid-row--gutters fr-align-items-center">
      <div className="fr-col-xl-6 col-12 fr-mx-auto">
        <h1 className="fr-text-title--blue-france fr-mb-2w">
          La Coop de la médiation numérique
        </h1>
        <p className="fr-text--xl fr-pr-6w">
          Vos outils du quotidien pour accompagner les personnes éloignées du
          numérique.
        </p>
        <ButtonsGroup
          inlineLayoutWhen="md and up"
          buttonsSize="large"
          buttons={[
            {
              className: 'wip-outline',
              children: 'Se créer un compte',
              linkProps: { href: '/' },
            },
            {
              children: 'Se connecter',
              linkProps: { href: '/connexion' },
              priority: 'secondary',
            },
          ]}
        />
      </div>
      <div className="fr-col-xl-6 fr-col-12">
        <div className="fr-flex fr-direction-row fr-justify-content-center ">
          <div className="fr-flex fr-direction-column fr-mx-md-0 fr-mx-auto fr-pb-1w  fr-justify-content-space-between">
            <Image
              className="fr-border-radius--16 fr-responsive-img"
              src="/images/illustrations/landing-page/hero/besoin.webp"
              alt=""
              width={282}
              height={166}
            />
            <Image
              className="fr-border-radius--16 fr-responsive-img"
              src="/images/illustrations/landing-page/hero/complexité.webp"
              alt=""
              width={282}
              height={166}
            />
          </div>
          <div className="fr-ml-md-4w fr-ml-3w">
            <Image
              className="fr-border-radius--16 fr-responsive-img"
              src="/images/illustrations/landing-page/hero/solution.webp"
              alt=""
              width={282}
              height={356}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)
