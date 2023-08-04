'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useRouter } from 'next/navigation'

const TableauDeBordCtaModal = createModal({
  id: 'tableau-de-bord-cta-modal',
  isOpenedByDefault: false,
})

const TableauDeBordCtaButton = () => {
  const router = useRouter()
  const onConfirm = () =>
    router.push('/connexion?role=prefecture&suivant=/tableau-de-bord')
  return (
    <>
      <Button
        onClick={TableauDeBordCtaModal.open}
        className="fr-mt-8v"
        data-testid="tableau-de-bord-cta"
      >
        Accéder au tableau de bord
      </Button>
      <TableauDeBordCtaModal.Component
        title="Tableau de bord accessible uniquement aux services préfectoraux"
        buttons={[
          {
            priority: 'secondary',
            doClosesModal: true,
            children: 'Annuler',
            type: 'button',
          },
          {
            priority: 'primary',
            children: 'J’ai compris',
            onClick: onConfirm,
            type: 'button',
          },
        ]}
      >
        Ce premier prototype est restreint aux services préfectoraux. Il a
        vocation, au fil de l’eau, à s’enrichir de nouvelles fonctionnalités et
        données, tout en s’étendant à l’ensemble des acteurs territoriaux
        impliqués dans la coordination et la mise en œuvre de la feuille de
        route France Numérique Ensemble.
      </TableauDeBordCtaModal.Component>
    </>
  )
}

export default TableauDeBordCtaButton
