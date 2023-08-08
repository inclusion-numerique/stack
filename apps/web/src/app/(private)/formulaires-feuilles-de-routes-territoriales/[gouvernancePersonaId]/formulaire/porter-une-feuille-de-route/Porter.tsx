'use client'

import Notice from '@codegouvfr/react-dsfr/Notice'
import React from 'react'
import { GouvernancePersona } from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { GouvernanceFormulaireForForm } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/getFormulaireGouvernanceForForm'
import { EtapeFormulaireGouvernance } from '@app/web/app/(private)/formulaires-feuilles-de-routes-territoriales/etapeFormulaireGouvernance'

const Porter = ({
  persona,
  formulaireGouvernance,
  etape,
}: {
  persona: GouvernancePersona
  formulaireGouvernance: GouvernanceFormulaireForForm
  etape?: EtapeFormulaireGouvernance
}) => (
  <>
    <h3>Porter une feuille de route territoriale</h3>
    <h5>{persona.title}</h5>
    <pre>{formulaireGouvernance.id}</pre>
    <pre>{etape}</pre>
    <Notice title="🚧 En cours de développement 🚧" />
  </>
)

export default Porter
