import Footer from '@codegouvfr/react-dsfr/Footer'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import SwitchTheme from '@app/web/app/(public)/SwitchTheme'

const PublicFooter = () => (
  <Footer
    accessibility="non compliant"
    accessibilityLinkProps={{
      href: '/accessibilite',
    }}
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
        text: 'FAQ & Support',
        linkProps: { href: PublicWebAppConfig.supportUrl, target: '_blank' },
      },
      {
        text: 'Code source',
        linkProps: {
          href: 'https://github.com/inclusion-numerique/projets-territoires',
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      <SwitchTheme key="switch-theme" />,
    ]}
  />
)
export default PublicFooter
