'use client'

import Notice from '@codegouvfr/react-dsfr/Notice'
import React from 'react'
import { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import BackLink from '@app/web/components/BackLink'
import WhiteCard from '@app/web/ui/WhiteCard'
import RedAsterisk from '@app/web/ui/RedAsterisk'

const Participer = ({
  persona,
  formulaireGouvernance,
}: {
  persona: GouvernancePersona
  formulaireGouvernance: GouvernanceFormulaireForForm
}) => (
  <>
    <BackLink href="/formulaires-feuilles-de-routes-territoriales" />
    <WhiteCard className="fr-mt-6v fr-mb-30v">
      <h2 className="fr-text-title--blue-france">
        Formulaire {persona.title.toLocaleLowerCase('fr')}
      </h2>
      <p className="fr-text--lg fr-my-4v">
        Complétez ce formulaire pour participer à l’élaboration des feuilles de
        routes territoriales de votre département. Vous serez sollicités à
        l’occasion des concertations territoriales.
      </p>
      <p className="fr-text--sm fr-text--medium fr-my-4v">
        Les champs avec <RedAsterisk /> sont obligatoires
      </p>
      <hr className="separator--10v" />
      <h5>
        Renseignez votre {persona.title.toLocaleLowerCase('fr')} <RedAsterisk />
      </h5>
      <hr className="separator--10v" />
      <h5>Contact politique</h5>
      <pre>{formulaireGouvernance.id}</pre>
      <Notice title="🚧 En cours de développement 🚧" />
    </WhiteCard>
  </>
)

export default withTrpc(Participer)
