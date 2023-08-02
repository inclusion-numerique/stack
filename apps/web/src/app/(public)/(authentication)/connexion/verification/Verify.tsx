import { cookies } from 'next/headers'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { PublicWebAppConfig } from '@app/web/webAppConfig'
import ContainerCard from '@app/web/components/ContainerCard'
import styles from './Verify.module.css'

export const Verify = () => {
  const email = cookies().get('email-signin')?.value
  return (
    <ContainerCard illustrationSrc="/dsfr/artwork/pictograms/digital/mail-send.svg">
      <div className={styles.topContainer}>
        <h2 style={{ textAlign: 'center' }} className="fr-mt-4v">
          Rendez-vous dans votre boite email
        </h2>
        <p style={{ textAlign: 'center' }}>
          {email ? (
            <>Un lien de connexion sécurisé a été envoyé à l’adresse {email}.</>
          ) : (
            <>Un lien de connexion sécurisé vous a été envoyé par&nbsp;email.</>
          )}
          <br />
          Veuillez l’utiliser pour confirmer votre adresse.
        </p>
        <p className="fr-text--sm fr-mb-0" style={{ textAlign: 'center' }}>
          Vous pouvez fermer cet onglet de navigation.
          <br />
          En cas de problème ou de questions, merci de contacter{' '}
          <a
            href={
              PublicWebAppConfig.contactEmail &&
              `mailto:${PublicWebAppConfig.contactEmail}`
            }
          >
            {PublicWebAppConfig.contactEmail}
          </a>
          .
        </p>
      </div>
      <Notice
        className="fr-mt-8v"
        title="Si vous ne recevez pas cet email, n’oubliez pas de vérifier dans vos spams. Il peut également avoir été mis en quarantaine."
      />
    </ContainerCard>
  )
}
