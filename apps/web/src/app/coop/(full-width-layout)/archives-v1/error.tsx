'use client'

import ContactSupportLink from '@app/web/components/ContactSupportLink'
import ArchivesV1Card from '@app/web/app/coop/(full-width-layout)/archives-v1/ArchivesV1Card'

const ErrorPage = () => (
  <ArchivesV1Card>
    <p className="fr-text-default--error fr-mb-0">
      Une erreur est survenue lors de la récupération de vos archives.
      <br />
      Veuillez réessayer ultérieurement ou <ContactSupportLink size="md" />
    </p>
  </ArchivesV1Card>
)

export default ErrorPage
