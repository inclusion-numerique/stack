import StructureEditionSideMenu from '@app/web/structure/EditStructureSideMenu'
import StructureHorairesForm from '@app/web/structure/StructureHorairesForm'
import StructureInfosGeneralesForm from '@app/web/structure/StructureInfosGeneralesForm'
import StructureInfosPratiquesForm from '@app/web/structure/StructureInfosPratiquesForm'
import StructurePresentationForm from '@app/web/structure/StructurePresentationForm'
import StructureSuppressionForm from '@app/web/structure/StructureSuppressionForm'
import type { StructureDataForForm } from '@app/web/structure/getStructureDataForForm'
import React from 'react'

const StructureEdition = ({
  structure,
}: {
  structure: StructureDataForForm
}) => (
  <>
    <div className="fr-grid-row">
      <div className="fr-col-offset-lg-3">
        <h1 className="fr-text-title--blue-france">
          {structure.titlecase.nom}
        </h1>
      </div>
    </div>
    <div className="fr-grid-row">
      <StructureEditionSideMenu />
      <div className="fr-col-12 fr-col-lg-6">
        <StructureInfosGeneralesForm structure={structure} />
        <StructurePresentationForm structure={structure} />
        <StructureInfosPratiquesForm structure={structure} />
        <StructureHorairesForm structure={structure} />
        <StructureSuppressionForm structure={structure} />
      </div>
    </div>
  </>
)

export default StructureEdition
