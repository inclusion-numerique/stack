import Footer from '@codegouvfr/react-dsfr/Footer'

const PublicFooter = () => (
  <Footer
    accessibility="non compliant"
    brandTop={
      <>
        Ministère
        <br />
        de la transition
        <br />
        écologique
        <br />
        et de la cohésion
        <br />
        des territoires
      </>
    }
    operatorLogo={{
      imgUrl: '/images/logo-anct.svg',
      alt: "Logo de l'Agence Nationale de la Cohésion des Territoires",
      orientation: 'horizontal',
    }}
    homeLinkProps={{
      href: '/',
      title: 'Accueil',
    }}
    bottomItems={[
      {
        text: 'Politique de confidentialité',
        linkProps: { href: '/confidentialite' },
      },
      {
        iconId: 'fr-icon-user-setting-line',
        text: 'Espace ANCT',
        linkProps: { href: '/connexion' },
      },
      {
        text: 'Code source',
        linkProps: {
          href: {
            href: 'https://github.com/inclusion-numerique/projets-territoires',
          },
          target: '_blank',
          rel: 'noreferrer',
        },
      },
    ]}
  />
)
export default PublicFooter
