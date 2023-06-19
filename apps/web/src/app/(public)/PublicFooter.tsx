import Footer from '@codegouvfr/react-dsfr/Footer'

const PublicFooter = () => (
  <Footer
    accessibility="non compliant"
    operatorLogo={{
      imgUrl: '/images/logo-anct.svg',
      alt: "Logo de l'Agence Nationale de la Cohésion des Territoires",
      orientation: 'horizontal',
    }}
    bottomItems={[
      {
        text: 'Politique de confidentialité',
        linkProps: { href: '/confidentialite' },
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
