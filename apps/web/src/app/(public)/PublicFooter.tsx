import Footer from '@codegouvfr/react-dsfr/Footer'
import SwitchTheme from '@app/web/app/(public)/SwitchTheme'

const PublicFooter = () => (
  <Footer
    accessibility="non compliant"
    brandTop={
      <>
        République
        <br />
        Française
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
        text: 'Mentions légales',
        linkProps: { href: '/mentions-legales' },
      },
      {
        text: 'Code source',
        linkProps: {
          href: 'https://github.com/inclusion-numerique/coop-inclusion-numerique',
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      <SwitchTheme key="switch-theme" />,
    ]}
  />
)
export default PublicFooter
