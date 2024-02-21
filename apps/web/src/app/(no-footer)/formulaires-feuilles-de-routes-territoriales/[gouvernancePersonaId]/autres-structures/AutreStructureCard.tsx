import Button from '@codegouvfr/react-dsfr/Button'
import WhiteCard from '@app/web/ui/WhiteCard'
import {
  AutreStructure,
  UseAutresStructuresReturn,
} from '@app/web/app/(no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/autres-structures/useAutresStructures'
import AutreStructureForm from '@app/web/app/(no-footer)/formulaires-feuilles-de-routes-territoriales/[gouvernancePersonaId]/autres-structures/AutreStructureForm'
import InfoLabelValue from '@app/web/components/Gouvernance/InfoLabelValue'
import ContactInfo from '@app/web/components/Gouvernance/ContactInfo'

const AutreStructureCard = ({
  structureKey,
  autreStructure,
  disabled,
  formulaireGouvernanceId,
  supprimerAutreStructure,
  validerAutreStructure,
  modifierAutreStructure,
}: {
  structureKey: string
  autreStructure: AutreStructure
  disabled: boolean
  formulaireGouvernanceId: string
} & Pick<
  UseAutresStructuresReturn,
  'supprimerAutreStructure' | 'modifierAutreStructure' | 'validerAutreStructure'
>) => (
  <WhiteCard className="fr-mb-6v">
    <div className="fr-flex fr-align-items-center fr-justify-content-space-between fr-mb-0">
      <h5 className="fr-text-title--blue-france fr-my-0">
        {autreStructure.nomStructure}
      </h5>
      {autreStructure.state === 'saved' && (
        <Button
          type="button"
          priority="tertiary"
          iconId="fr-icon-edit-line"
          title="Modifier la structure"
          disabled={disabled}
          onClick={() => modifierAutreStructure(structureKey)}
        />
      )}
    </div>
    {autreStructure.state === 'pending' || !autreStructure.contact ? (
      <AutreStructureForm
        autreStructure={autreStructure}
        validerAutreStructure={validerAutreStructure}
        supprimerAutreStructure={supprimerAutreStructure}
        structureKey={structureKey}
        disabled={disabled}
        formulaireGouvernanceId={formulaireGouvernanceId}
      />
    ) : (
      <>
        <hr className="fr-mt-6v" />
        <InfoLabelValue
          label="Contact de la structure :"
          value={<ContactInfo contact={autreStructure.contact} />}
        />
      </>
    )}
  </WhiteCard>
)

export default AutreStructureCard
