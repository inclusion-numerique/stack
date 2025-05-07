import SwitchTheme from '@app/web/app/(public)/SwitchTheme'
import { getServerDsfrTheme } from '@app/web/app/getServerDsfrTheme'
import Footer, { type FooterProps } from '@codegouvfr/react-dsfr/Footer'

export const publicFooterProps = {
  accessibility: 'non compliant',
  accessibilityLinkProps: { href: '/accessibilite' },
  bottomItems: [
    {
      text: 'Mentions légales',
      linkProps: { href: '/mentions-legales' },
    },
    {
      text: 'Politique de confidentialité',
      linkProps: { href: '/confidentialite' },
    },
    {
      text: `Conditions générales d'utilisation`,
      linkProps: { href: '/cgu' },
    },
    {
      text: 'Code source',
      linkProps: {
        href: 'https://github.com/inclusion-numerique/coop-mediation-numerique',
        target: '_blank',
        rel: 'noreferrer',
      },
    },
    {
      text: `Budget`,
      linkProps: { href: '/budget' },
    },
  ],
} satisfies Pick<
  FooterProps,
  'accessibility' | 'accessibilityLinkProps' | 'bottomItems'
>

const PublicFooter = async () => {
  const initialTheme = await getServerDsfrTheme()

  return (
    <Footer
      accessibility={publicFooterProps.accessibility}
      accessibilityLinkProps={publicFooterProps.accessibilityLinkProps}
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
        ...publicFooterProps.bottomItems,
        <SwitchTheme key="switch-theme" initialTheme={initialTheme} />,
      ]}
    />
  )
}
export default PublicFooter
